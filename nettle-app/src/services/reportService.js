import { handleErrors, handleSuccess } from "../utils/handleResponse";
import api from "../api";

class ReportService {
  async generateReport(query) {
    try {
      const response = await api.get("/user/generate-report/" + query);
      handleSuccess(response.data.message);
      return response;
    } catch (error) {
      handleErrors(error.response.data.detail);
    }
  }

  async getReport(id) {
    try {
      const response = await api.get("/user/reports/" + id);
      return response.data;
    } catch (error) {
      handleErrors(error.response.data.detail);
    }
  }
  async getReports() {
    try {
      const response = await api.get("/user/reports");
      return response.data;
    } catch (error) {
      handleErrors(error.response.data.detail);
    }
  }
}

export default new ReportService();
