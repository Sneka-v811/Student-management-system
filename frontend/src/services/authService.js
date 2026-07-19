import api from "./api";

/**
 * Logs in an admin with email + password.
 * Returns { token, admin } on success.
 */
const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

/**
 * Fetches the currently logged-in admin's profile.
 */
const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

const authService = { login, getMe };

export default authService;
