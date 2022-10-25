import axios from "axios";

const api = axios.create({
  baseURL: "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest",
});

export default api;