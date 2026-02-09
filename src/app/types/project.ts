export interface Project {
  id: string;
  workspaceId: string;
  title: string;
  description: string | null;
  imageUrl?: string | null | undefined;
}

export interface CreateProjectPayload {
  title: string;
  description?: string | null | undefined;
  imageUrl?: string | null | undefined;
}

export interface ProjectResponse {
  success: boolean;
  data?: Project;
  error?: string;
}
