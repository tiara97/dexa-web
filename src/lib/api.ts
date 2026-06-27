import axios from "axios";
import { Employee, Attendance } from "../types";

const API_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: process.env.API_URL || API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // --- Employees ---
  getEmployees: async (
    index: number = 1,
    limit: number = 10,
    search?: string,
  ): Promise<{
    data: Employee[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }> => {
    const response = await apiClient.get(`/admin/employees`, {
      params: {
        index,
        limit,
        search,
      },
    });
    return response.data;
  },

  saveEmployee: async (
    employee: Omit<Employee, "id"> | Employee,
  ): Promise<Employee> => {
    if ("id" in employee && employee.id) {
      // Update
      const response = await apiClient.put(
        `/admin/employees/${employee.id}`,
        employee,
      );
      return response.data;
    } else {
      // Create
      const response = await apiClient.post("/admin/employees", employee);
      return response.data;
    }
  },

  deleteEmployee: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/employees/${id}`);
  },

  // --- Attendance ---
  getAttendances: async (
    index: number = 1,
    limit: number = 10,
    date?: string,
    status?: string,
  ): Promise<{
    data: Attendance[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }> => {
    const url = "/admin/attendances";
    const response = await apiClient.get(url, {
      params: {
        index,
        limit,
        date,
        status,
      },
    });
    return response.data;
  },

  getAttendanceById: async (id: string): Promise<Attendance> => {
    const response = await apiClient.get(`/admin/attendance/${id}`);
    return response.data;
  },

  submitAttendance: async (formData: FormData): Promise<any> => {
    // We expect FormData because we need to upload an image
    const response = await apiClient.post("/attendance/check-in", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // --- Auth ---
  login: async (
    nip?: string,
    password?: string,
  ): Promise<{ token: string; user: Employee }> => {
    const response = await apiClient.post("/auth/login", { nip, password });
    return response.data; // Expected { message, token, user }
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_user");
  },
};
