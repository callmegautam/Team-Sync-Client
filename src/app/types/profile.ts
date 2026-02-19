export interface ProfilePayload {
  name: string;
  username: string;
  avatarUrl?: string | null | undefined;
}

export interface Profile {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl?: string | null | undefined;
  currentWorkspace: string;
}

export interface ProfileResponse {
  success: boolean;
  data?: Profile;
  error?: string;
}
