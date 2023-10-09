import axios from "axios";
class classDetailsApi {
    constructor() {
        this.event = "/school/class";
    }

    postClass = async (data) => {
        try {
            const response = await axios.post(`${this.event}/register`, data);
            return response.data;
        } catch (error) {
            console.error("Error while sending POST request:", error.response.data);
            return error.response.data;
        }
    }

    getClass = async (data) => {
        try {
            const response = await axios.get(`${this.event}/all/`, { params: data });
            return response.data;
        } catch (error) {
            console.error("Error while sending POST request:", error.response.data);
            return error.response.data;
        }
    }

    deleteClass = async(data) => {
        try {
            const response = await axios.delete(`${this.event}/delete`, { params: data });
            return response.data;
        } catch (error) {
            console.error("Error while sending POST request:", error.response.data);
            return error.response.data;
        }
    }
}

export const ClassApi = new classApi();