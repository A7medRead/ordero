import { api } from "@/lib/api";

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export const authService = {
  login(data: LoginDto) {
    return api.post<LoginResponse>("/auth/login", data);
  },

  me() {
    return api.get("/auth/me");
  },
};