import { Doctor } from "./doctor";

export interface AppContextType {
  doctors: Doctor[];
  currencySymbol: string;
}