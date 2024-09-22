import axios from "axios";

const ApiClient = axios.create({
    baseURL: 'http://localhost:8080'
});

export const retrieveSecTypes = () => ApiClient.get('/api/secTypeOptions');
export const retrieveFundTypes = () => ApiClient.get('/api/fundTypeOptions');
export const retrieveAllData=() => ApiClient.get("/api/allData");



