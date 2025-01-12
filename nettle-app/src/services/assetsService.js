import { handleErrors, handleSuccess } from "../utils/handleResponse";
import api from "../api";

class AssetService {
  async addAsset(asset) {
    try {
      const response = await api.post("/user/asset", asset);
      handleSuccess(response.data.message);
      return response;
    } catch (error) {
      handleErrors(error.response.data.detail);
    }
  }

  async getAssets() {
    try {
      const response = await api.get("/user/asset");
      return response.data;
    } catch (error) {
      handleErrors(error.response.data.detail);
    }
  }
}

export default new AssetService();
