import axios from "axios";

class TeacherApi {
    constructor() {
        this.event = "/teacher";
    }

    getData = async (data) => {
        try {
            const response = await axios.get(`${this.event}/all`, {params: data});
            return response.data;
        } catch (error) {
            console.error("Error while sending POST request:",error.response.data);
            return error.response.data;
        }
    }
    postData = async (data) => {
        try { 
            const response = await axios.post(`${this.event}/register`, data);
            return response.data;
        } catch (error) {
            console.error("Error while sending POST request:", error.response.data);
            return error.response.data;
        }
    }

    updateData = async (data) => { 
        console.log(data);
        try { 
            const response = await axios.put(`${this.event}/update`, data);
            return response.data;
        } catch (error) {
            console.error("Error while sending POST request:", error.response.data);
            return error.response.data;
        }
    }
}
const TeacherApiObject = new TeacherApi();
export { TeacherApiObject };