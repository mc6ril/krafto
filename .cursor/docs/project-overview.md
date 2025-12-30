# Project Overview — Workbench

## 1. Purpose

**Workbench** is a modular project space designed to help individuals and teams transform ideas into concrete projects and see them through to completion.

**Tagline**: *"A space to transform an idea into a concrete project, and carry it through to completion — alone or together."*

Workbench provides a structured environment where projects (professional or personal) can be managed with clarity, visibility, and collaboration. Each project is a context with participants and activated views (Board, Backlog, Epics, Budget, Notes, Checklist, etc.).

The goal is **not** to replace enterprise tools like Jira, nor to become a generic task manager. Instead, Workbench focuses on:

- Simple structure and clear visibility
- Solid permissions and collaboration
- Modular views activated per project
- Support for both professional and personal projects

---

## 2. Core Principles

1. **Secure and authenticated**
   - Users must be authenticated to access any project
   - Access is restricted to project members only
   - Edit/delete permissions are role-based (admin or member)

2. **Project-first**
   - Projects can be professional (development, business) or personal (vacations, home, hobbies)
   - Each project is a self-contained space with its own participants and views
   - Role-based permissions enable collaboration (admin, member, viewer)

3. **Modular views**
   - Views (Board, Backlog, Epics, Budget, Notes, Checklist) are activated per project
   - Not all projects need all views
   - Each view serves a specific purpose in project management

4. **Incremental construction**
   - One feature = one vertical slice
   - Each slice is usable on its own
   - Built progressively, feature by feature

5. **Clarity over power**
   - Fewer features, explicit structure
   - No hidden magic
   - Every feature has a clear purpose

6. **Domain-driven**
   - Clear concepts
   - Stable domain model
   - UI reflects the domain, not the opposite

---

## 3. Core Features (MVP Scope)

### 3.1 Projects

Projects are the foundation of Workbench. Each project represents a context (professional or personal) with:
- Participants (members with roles: admin, member, viewer)
- Activated views (Board, Backlog, Epics, etc.)
- Permissions and access control

**Capabilities**

- Create projects (professional or personal)
- Manage project members and roles
- Activate/deactivate views per project
- Configure project settings

**Rules**

- Users must be authenticated to create or access projects
- Project membership is required to view or interact with project data
- Project creators are automatically assigned the `admin` role

---

### 3.2 Backlog

The backlog is a view for managing all project items in a flat list.

**Capabilities**

- Create tickets
- Edit title and description
- Delete tickets
- View all tickets in a flat list
- Filter and sort tickets

**Rules**

- Tickets exist independently of the board
- No status logic required to exist in the backlog

---

### 3.3 Board

The board is a **visual representation** of tickets organized by status columns.

**Capabilities**

- Custom columns (statuses)
- Drag and drop tickets between columns
- Reorder tickets within a column
- Persist ticket position and status

**Rules**

- The board does not create tickets
- Moving a ticket updates its status and position
- Board configuration is fully user-defined

---

### 3.4 Epics

Epics provide long-term structure and grouping for related tickets.

**Capabilities**

- Create Epics
- Assign tickets to an Epic
- View all tickets linked to an Epic
- Display Epic progress (basic)

**Rules**

- A ticket may belong to at most one Epic
- Epics do not affect ticket workflow directly

---

### 3.5 Sub-tasks

Sub-tasks allow hierarchical decomposition of work.

**Capabilities**

- Create sub-tasks under a ticket
- View parent/child relationships
- Track completion of sub-tasks

**Rules**

- Sub-tasks are tickets with a parent reference
- Only one level of nesting (no infinite trees)

---

## 4. Security and Access Control

### Authentication

- All users must be authenticated via Supabase Auth to access the application
- Only authenticated users can view or interact with projects

### Project Membership

- Users must be members of a project to access it
- Project membership is managed via the `project_members` table
- Each user has a role in each project: `admin`, `member`, or `viewer`

### Permissions

- **View access**: Users can view projects where they are members (any role)
- **Edit access**: Only users with `admin` or `member` roles can create, update, or delete tickets, epics, boards, and columns
- **Admin access**: Only users with `admin` role can:
  - Delete projects
  - Manage project members (add/remove users, change roles)

See `docs/supabase/row-level-security.md` for detailed information about RLS policies and permissions.

---

## 5. Non-Goals (Explicitly Out of Scope)

- **Replace Jira in enterprise**: Workbench is not designed to compete with enterprise project management tools
- **Do everything like Notion**: Workbench focuses on project management, not general knowledge management
- **Become a generic task tool**: Workbench is project-centric, not task-centric
- Notifications (may be considered later)
- Comments or mentions (may be considered later)
- Time tracking (may be considered later)
- Sprint management (may be considered later)
- Reports or burndown charts (may be considered later)

These may be considered **only after** the core is stable.

---

## 6. Domain Model (Conceptual)

### Entities

- **Project** - A context (pro/perso) with participants and activated views
- **Ticket** - A work item within a project
- **Epic** - A grouping of related tickets
- **Board** - A visual representation of tickets organized by status
- **Column** - A status column in a board

### Relationships

- A Project contains many Tickets
- A Ticket may belong to one Epic
- A Ticket may have one parent Ticket
- A Board contains ordered Columns
- Columns reference Tickets by status and position

---

## 7. Architecture

Workbench follows **Clean Architecture** principles.

### Layers

- **Domain**
  - Entities
  - Business rules
- **Application**
  - Use cases
  - Commands and queries
- **Infrastructure**
  - Database
  - Repositories
- **UI**
  - Pages
  - View models

### Guiding Rule

> The domain knows nothing about frameworks, databases, or UI.

---

## 8. Development Strategy

### Vertical Slices

Each feature is implemented as a **complete vertical slice**:

- UI
- Use case
- Domain logic
- Persistence

### Order of Implementation

1. Project setup and health check
2. Projects (create, list, access control)
3. Backlog (ticket CRUD)
4. Board columns configuration
5. Drag and drop workflow
6. Epics
7. Sub-tasks

No feature is started until the previous one is **fully done**.

---

## 9. Success Criteria

Workbench is successful if:

- It helps users transform ideas into structured projects
- Managing projects feels calm and predictable
- The system remains understandable after months away
- Every feature has a clear reason to exist
- Both professional and personal projects are well-supported

---

## 10. Long-Term Vision (Optional)

If Workbench grows beyond the MVP:

- Additional views (Budget, Notes, Checklist)
- Project templates
- Enhanced collaboration features
- Advanced permissions and workflows

But **only** if the core remains simple and solid.

---

## 11. One-Sentence Summary

> **Workbench is a modular project space built incrementally, where every feature earns its place and nothing exists without purpose.**
