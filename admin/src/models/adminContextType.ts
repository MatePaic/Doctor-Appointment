export interface AdminContextType {
  adminToken: string;
  setAdminToken: (token: string) => void;
  backendUrl: string;
}