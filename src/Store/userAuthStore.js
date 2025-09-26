import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isVerified: false,

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/register`,
        {
          email,
          password,
          name,
        },
        { withCredentials: true }
      );
      set({
        user: response.data.user,
        isAuthenticated: false,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error signing up",
        isLoading: false,
      });

      throw error;
    }
  },

  verifyUser: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });

      set({
        user: response.data.user,
        isAuthenticated: false,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error verifying email",
        isLoading: false,
      });

      throw error;
    }
  },

  LoginUser: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        hasFetched: true,
      });
      // console.log(response.data.user);
      return response.data.user;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error logging in",
        isLoading: false,
      });

      throw error;
    }
  },

  getUser: async () => {
    set({ isAuthenticated: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-me`, {
        withCredentials: true,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
        hasFetched: true,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  refreshToken: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const res = await axios.post(
        `${API_URL}/refresh-token`,
        {},
        { withCredentials: true }
      );

      const { accessToken, user } = res.data;

      // axios default header এ token বসাও
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // zustand state আপডেট করো
      set({
        user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });

      return accessToken; // future use এর জন্য return করা ভালো
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to refresh token",
        isCheckingAuth: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  resendCode: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      await axios.post(
        `${API_URL}/resend-email`,
        {},
        { withCredentials: true }
      );
      set({
        isAuthenticated: true, // user remains authenticated
        isCheckingAuth: false,
        error: null,
      });
    } catch (error) {
      set({
        isAuthenticated: false,
        isCheckingAuth: false,
        error: error.response?.data?.message || error.message,
      });
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });

      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isCheckingAuth: false,
      });
    } catch (error) {
      console.error("Logout failed:", error.message);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isCheckingAuth: false,
      });
    }
  },
}));

export default useAuthStore;
