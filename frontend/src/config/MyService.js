import axios from "axios";

const URL = "http://localhost:5555/";


export function allfiles(data) {
    return axios.post(`${URL}allfiles`, data);
}
export function getfiles() {
    return axios.get(`${URL}getfiles`);
}
