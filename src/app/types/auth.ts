export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  token: string;
  avatarUrl: string | null;
  currentWorkspace: string;
}

export interface AuthResponse {
  success: boolean;
  data?: User;
  error?: string;
}
