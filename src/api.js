import axios from "axios";

export const API = axios.create({
//   baseURL: "http://localhost:5000",
    baseURL: "https://schmooze-media-backend.onrender.com"
});
