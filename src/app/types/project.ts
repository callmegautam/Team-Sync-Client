export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  imageUrl?: string | null | undefined;
}

export interface CreateProjectPayload {
  name: string;
  description?: string | null | undefined;
  imageUrl?: string | null | undefined;
}

export interface ProjectResponse {
  success: boolean;
  data?: Project;
  error?: string;
}
export interface ProjectListResponse {
  data: Project[];
  error?: string;
}
