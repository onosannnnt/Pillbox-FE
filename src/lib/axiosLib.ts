import axios from "axios";
import { baseApiUrl } from "../config/env";

export const axiosLib = axios.create({
    baseURL: baseApiUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});