import axios from "axios";

const API_URL = "http://localhost:5000/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", user)
      .then(response => {
        if (response.data.accessToken) {
            console.log(response.data.accessToken)
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(newUser) {
    return axios.post(API_URL + "signup", newUser);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();