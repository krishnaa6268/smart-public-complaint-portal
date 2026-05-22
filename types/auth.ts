export interface AdminCredentials {
  email: string;
  password: string;
}

export interface AuthContextValue {
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
