import axios from "axios";

export const httpClient = axios.create({
    baseURL: 'http://192.168.0.235:3333',
});


