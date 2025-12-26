import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  CreateProjectInput,
  Project,
  ProjectRole,
  ProjectWithRole,
} from "@/core/domain/project.schema";
import { createNotFoundError } from "@/core/domain/repositoryError";

import { handleRepositoryError } from "@/infrastructure/supabase/shared/errors/errorHandlers";
import type { ProjectRow } from "@/infrastructure/supabase/types";

import {
  isNonEmptyString,
  isObject,
  isProjectRole,
} from "@/shared/utils/guards";

import {
  mapProjectRowToDomain,
  mapProjectToProjectWithRole,
} from "./ProjectMapper.supabase";

import type { ProjectRepository } from "@/core/ports/projectRepository";

/**
 * Create a ProjectRepository implementation using the provided Supabase client.
 * This allows using different clients (browser/server) based on context.
 *
 * @param client - Supabase client instance to use
 * @returns ProjectRepository implementation
 */
export const createProjectRepository = (
  client: SupabaseClient
): ProjectRepository => ({
  async findById(id: string): Promise<Project | null> {
    try {
      const { data, error } = await client
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        return null;
      }

      return mapProjectRowToDomain(data as ProjectRow);
    } catch (error) {
      handleRepositoryError(error, "Project");
    }
  },

  async list(): Promise<ProjectWithRole[]> {
    try {
      const { data, error } = await client
        .from("projects")
        .select(
          `
          *,
          project_members!inner(role)
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      if (!data || !Array.isArray(data)) {
        return [];
      }

      // Transform the data to match ProjectWithRole structure
      return data.map((row: unknown) => {
        if (!isObject(row)) {
          throw new Error("Invalid project data structure");
        }

        const project = mapProjectRowToDomain(row as ProjectRow);

        // Extract role from project_members relationship
        // The data structure has project_members as an array with one element
        const members = (row as { project_members?: Array<{ role?: string }> })
          .project_members;
        if (!Array.isArray(members) || members.length === 0) {
          throw new Error("Project member role not found");
        }

        const roleValue = members[0]?.role;
        if (!roleValue || !isProjectRole(roleValue)) {
          throw new Error(`Invalid project role: ${roleValue}`);
        }

        return mapProjectToProjectWithRole(project, roleValue);
      });
    } catch (error) {
      handleRepositoryError(error, "Project");
    }
  },

  async create(input: CreateProjectInput): Promise<Project> {
    try {
      const { data, error } = await client
        .from("projects")
        .insert({
          name: input.name,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("No data returned from insert");
      }

      return mapProjectRowToDomain(data as ProjectRow);
    } catch (error) {
      handleRepositoryError(error, "Project");
    }
  },

  async update(
    id: string,
    input: Partial<CreateProjectInput>
  ): Promise<Project> {
    try {
      const updateData: Partial<{ name: string }> = {};

      if (input.name !== undefined) {
        if (!isNonEmptyString(input.name)) {
          throw new Error("Project name cannot be empty");
        }
        updateData.name = input.name;
      }

      if (Object.keys(updateData).length === 0) {
        // No fields to update, return existing project
        const existing = await this.findById(id);
        if (!existing) {
          throw createNotFoundError("Project", id);
        }
        return existing;
      }

      const { data, error } = await client
        .from("projects")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw createNotFoundError("Project", id);
      }

      return mapProjectRowToDomain(data as ProjectRow);
    } catch (error) {
      handleRepositoryError(error, "Project");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await client.from("projects").delete().eq("id", id);

      if (error) {
        throw error;
      }
    } catch (error) {
      handleRepositoryError(error, "Project");
    }
  },

  async addCurrentUserAsMember(
    projectId: string,
    role: ProjectRole = "viewer"
  ): Promise<Project> {
    try {
      // Get current user session first
      const {
        data: { session },
      } = await client.auth.getSession();
      if (!session?.user?.id) {
        throw new Error("User must be authenticated");
      }

      // Verify the project exists using RPC function (bypasses RLS)
      const { data: exists, error: existsError } = await client.rpc(
        "project_exists",
        { project_uuid: projectId }
      );

      if (existsError || !exists) {
        throw createNotFoundError("Project", projectId);
      }

      // Try to add user as member
      // Note: RLS allows users to self-add as 'viewer', or admins can add with any role
      // If user tries to add themselves with a role other than 'viewer', it will fail unless they're admin
      const { error: insertError } = await client
        .from("project_members")
        .insert({
          project_id: projectId,
          user_id: session.user.id,
          role,
        });

      if (insertError) {
        throw insertError;
      }

      // After successful insertion, fetch the project (user is now a member)
      const project = await this.findById(projectId);
      if (!project) {
        // This shouldn't happen, but handle it just in case
        throw createNotFoundError("Project", projectId);
      }

      return project;
    } catch (error) {
      handleRepositoryError(error, "Project");
    }
  },

  async hasProjectAccess(): Promise<boolean> {
    try {
      // Use SQL function for optimized boolean check
      // This function checks if the current user has any project membership
      const { data, error } = await client.rpc("has_any_project_access");

      if (error) {
        throw error;
      }

      // SQL function returns boolean, but Supabase RPC might return null
      // Default to false if data is null/undefined
      return Boolean(data);
    } catch (error) {
      handleRepositoryError(error, "Project");
    }
  },
});
