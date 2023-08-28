import axios from "axios";
class schoolRegistration {
    constructor() {
        this.event = "/school";
    }

    postData = async (data) => {
        try {
            data.foundedYear = parseInt(data.foundedYear) 
            const response = await axios.post(`${this.event}/register`, data);
            return response.data;
        } catch (error) {
            console.error("Error while sending POST request:", error.response.data);
            return error.response.data;
        }
    }

    getData = async (data) => {
        console.log(data);
        try { 
            const response = await axios.get(`${this.event}/`, { params: data });
            return response.data;
        } catch (error) {
            console.error("Error while sending POST request:", error.response.data);
            return error.response.data;
        }
    }

    verifyData = async (data) => {
        try { 
            const response = await axios.post(`${this.event}/verify`, data);
            return response.data;
        } catch (error) {
            console.error("Error while sending POST request:", error.response.data);
            return error.response.data;
        }
    }
}

export const schoolRegister = new schoolRegistration();
