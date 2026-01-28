export interface Workspace {
  id: string;
  owner: string;
  name: string;
  description: string;
  imageUrl: string | null;
  inviteCode: string;
}

export interface WorkspaceResponse {
  success: boolean;
  data?: Workspace;
  error?: string;
}

export interface WorkspacesResponse {
  success: boolean;
  data?: Workspace[];
  error?: string;
}

export interface CreateWorkspacePayload {
  name: string;
  description: string | null | undefined;
  imageUrl?: string | null | undefined;
}
