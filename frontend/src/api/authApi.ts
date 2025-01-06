// src/api/authApi.ts
import apiClient from "./apiClient";

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export const AdminLogin = async (data: AdminLoginRequest) => {
  const response = await apiClient.post("/auth/login", data);
  return response;
};
