import axios from "axios";
import HttpCommon from "../http-common";

const API_URL = HttpCommon.defaults.baseURL+"/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  reset_password(username) {
    return axios
      .post(API_URL + "send-reset-link", { username })
      .then((response) => {
        return response.data;
      });
  }

  update_password(code, password) {
    return axios
      .post(API_URL + "reset-password", { code, password })
      .then((response) => {
        return response.data;
      });
  }


  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
