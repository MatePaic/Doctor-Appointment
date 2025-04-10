import { Doctor } from '../../../frontend/src/models/doctor'; // Update the path to the correct location of Doctor

export interface AdminContextType {
  adminToken: string;
  setAdminToken: (token: string) => void;
  backendUrl: string;
  doctors: Doctor[];
  getAllDoctors: () => void; // Add this property
  changeAvailability: (docId: string) => Promise<void>;
}