import api from "../api";
import { handleErrors, handleSuccess } from "../utils/handleResponse";

class AuthService {
  async signup(signupData) {
    try {
      const response = await api.post("/auth/signup", signupData);
      handleSuccess(response.data.message);
      return response;
    } catch (error) {
      handleErrors(error.response.data.detail);
      throw error;
    }
  }

  async signupWithGoogle(signupData) {
    try {
      const response = await api.post("/auth/signup-with-google", signupData);
      handleSuccess(response.data.message);
      sessionStorage.setItem("authToken", response.data.token);
      return response;
    } catch (error) {
      handleErrors(error.response.data.detail);
      throw error;
    }
  }

  async login(loginData) {
    try {
      const response = await api.post("/auth/login", loginData);
      handleSuccess(response.data.message);
      sessionStorage.setItem("authToken", response.data.token);
      sessionStorage.setItem("authUser", JSON.stringify(response.data.data._data))
      return response;
    } catch (error) {
      handleErrors(error.response.data.detail);
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      const response = await api.post("/auth/forgot-password", email);
      handleSuccess(response.data.message);
      sessionStorage.setItem("authToken", response.data.token);
      return response;
    } catch (error) {
      handleErrors(error.response.data.detail);
    }
  }
}

export default new AuthService();
