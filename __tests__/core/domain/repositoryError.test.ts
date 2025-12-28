import {
  type ConstraintError,
  createConstraintError,
  createDatabaseError,
  createNotFoundError,
  type DatabaseError,
  type NotFoundError,
} from "@/core/domain/repositoryError";

describe("Domain Error Factory Functions", () => {
  describe("createNotFoundError", () => {
    it("should create NotFoundError with correct structure and message", () => {
      // Arrange
      const entityType = "Project";
      const entityId = "123e4567-e89b-12d3-a456-426614174000";

      // Act
      const error = createNotFoundError(entityType, entityId);

      // Assert
      expect(error).toEqual({
        code: "NOT_FOUND",
        message:
          "Project with id 123e4567-e89b-12d3-a456-426614174000 not found",
        entityType: "Project",
        entityId: "123e4567-e89b-12d3-a456-426614174000",
      });
      expect(error).toMatchObject<NotFoundError>({
        code: "NOT_FOUND",
        message: expect.any(String),
        entityType: expect.any(String),
        entityId: expect.any(String),
      });
    });

    it("should format error messages correctly with entity type and ID", () => {
      // Arrange
      const entityType = "Ticket";
      const entityId = "456e7890-e89b-12d3-a456-426614174001";

      // Act
      const error = createNotFoundError(entityType, entityId);

      // Assert
      expect(error.message).toBe(
        "Ticket with id 456e7890-e89b-12d3-a456-426614174001 not found"
      );
      expect(error.entityType).toBe("Ticket");
      expect(error.entityId).toBe("456e7890-e89b-12d3-a456-426614174001");
    });

    it("should handle different entity types and IDs", () => {
      // Arrange & Act
      const projectError = createNotFoundError("Project", "project-123");
      const ticketError = createNotFoundError("Ticket", "ticket-456");

      // Assert
      expect(projectError.message).toContain("Project");
      expect(projectError.message).toContain("project-123");
      expect(ticketError.message).toContain("Ticket");
      expect(ticketError.message).toContain("ticket-456");
    });
  });

  describe("createConstraintError", () => {
    it("should create ConstraintError with correct structure and message", () => {
      // Arrange
      const constraint = "unique_project_name";

      // Act
      const error = createConstraintError(constraint);

      // Assert
      expect(error).toEqual({
        code: "CONSTRAINT_VIOLATION",
        message: "Database constraint violation: unique_project_name",
        constraint: "unique_project_name",
      });
      expect(error).toMatchObject<ConstraintError>({
        code: "CONSTRAINT_VIOLATION",
        message: expect.any(String),
        constraint: expect.any(String),
      });
    });

    it("should use custom message when provided", () => {
      // Arrange
      const constraint = "foreign_key_project";
      const customMessage = "Project does not exist";

      // Act
      const error = createConstraintError(constraint, customMessage);

      // Assert
      expect(error).toEqual({
        code: "CONSTRAINT_VIOLATION",
        message: "Project does not exist",
        constraint: "foreign_key_project",
      });
    });

    it("should use default message when custom message is not provided", () => {
      // Arrange
      const constraint = "check_valid_status";

      // Act
      const error = createConstraintError(constraint);

      // Assert
      expect(error.message).toBe(
        "Database constraint violation: check_valid_status"
      );
      expect(error.constraint).toBe("check_valid_status");
    });
  });

  describe("createDatabaseError", () => {
    it("should create DatabaseError with correct structure and message", () => {
      // Arrange
      const message = "Connection timeout";

      // Act
      const error = createDatabaseError(message);

      // Assert
      expect(error).toEqual({
        code: "DATABASE_ERROR",
        message: "Connection timeout",
        originalError: undefined,
      });
      expect(error).toMatchObject<DatabaseError>({
        code: "DATABASE_ERROR",
        message: expect.any(String),
      });
    });

    it("should include original error when provided", () => {
      // Arrange
      const message = "Database operation failed";
      const originalError = new Error("Network error");

      // Act
      const error = createDatabaseError(message, originalError);

      // Assert
      expect(error).toEqual({
        code: "DATABASE_ERROR",
        message: "Database operation failed",
        originalError: originalError,
      });
      expect(error.originalError).toBe(originalError);
    });

    it("should handle different original error types", () => {
      // Arrange
      const message = "Query failed";
      const stringError = "String error";
      const objectError = { code: "ERR_DB", details: "Connection lost" };

      // Act
      const errorWithString = createDatabaseError(message, stringError);
      const errorWithObject = createDatabaseError(message, objectError);

      // Assert
      expect(errorWithString.originalError).toBe(stringError);
      expect(errorWithObject.originalError).toBe(objectError);
    });

    it("should create error without original error when not provided", () => {
      // Arrange
      const message = "Simple database error";

      // Act
      const error = createDatabaseError(message);

      // Assert
      expect(error.originalError).toBeUndefined();
      expect(error.code).toBe("DATABASE_ERROR");
      expect(error.message).toBe("Simple database error");
    });
  });
});
