import { create } from "zustand";
import axios from "axios";

const API_URL = `http://localhost:5000/api/auth`;

const useAuthStore = create((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (accessToken, refreshToken) => {
    set({ isLoading: true, error: null });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      set({
        user: response.data,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Login failed",
        isLoading: false,
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },

  refreshAccessToken: async () => {
    set({ isLoading: true, error: null });
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      set({ isAuthenticated: false, isLoading: false });
      return false;
    }

    try {
      const response = await axios.post(`${API_URL}/refresh-token`, {
        refreshToken,
      });
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      set({ accessToken, isAuthenticated: true, isLoading: false });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to refresh token",
        isLoading: false,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        user: null,
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (err) {
      set({
        error: err.response?.data?.error || "Logout failed",
        isLoading: false,
      });
    }
  },
}));

export default useAuthStore;
