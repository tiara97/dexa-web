export type Role = "employee" | "admin";

export interface Employee {
  id: string;
  name: string;
  position: string;
  role: Role;
  nip: string;
  password?: string;
}

export enum AttendanceStatus {
  Intime = 1,
  Late = 2,
  Alfa = 3,
}

export interface Attendance {
  id: string;
  nip: string;
  employeeName: string;
  timestamp: string; // ISO string
  status: AttendanceStatus;
  photoBase64?: string;
  photoUrl?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: Employee | null;
}
