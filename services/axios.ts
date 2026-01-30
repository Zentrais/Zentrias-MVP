import axios from "axios";

export const api = axios.create({
  //baseURL: "http://localhost:3000",
  baseURL: "http://chat-alb-1799367065.us-east-1.elb.amazonaws.com",
  withCredentials: false,
});

// // Optional (recommended later)
// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     console.error("API Error:", err?.response?.data || err.message);
//     return Promise.reject(err);
//   }
// );
