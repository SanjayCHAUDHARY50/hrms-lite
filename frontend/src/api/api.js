import axios from "axios";

export const API = axios.create({
  baseURL: "https://hrms-backend-5ad7.onrender.com"
});