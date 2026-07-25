import axios from "axios";

export const BASE_URL =
  "http://localhost:5000";

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});
export const getHomeReviews = async () => {

  const res =
    await API.get("/reviews/home");

  return res.data;

};
// ✅ ATTACH TOKEN
API.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {
    return Promise.reject(error);
  }
);

// ✅ HANDLE JWT EXPIRED
API.interceptors.response.use(

  (response) => response,

  (error) => {

    // 🔥 TOKEN EXPIRED
    if (error.response?.status === 401) {

  alert(
    "Session expired. Please login again."
  );

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
}

    return Promise.reject(error);

  }

);

export default API;