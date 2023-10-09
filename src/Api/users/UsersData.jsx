import axios from "axios";

class usersData {
    getData = async (data) => {
        try {
            const response = await axios.get(`/${data.type}`, {params: data});
            return response.data;
        } catch (error) {
            console.error("Error while sending POST request:",error.response.data);
            return error.response.data;
        }
    }
}

const user = new usersData();
export { user };