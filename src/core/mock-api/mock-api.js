import axios from "axios";
import SERVER_API_URL from "../../static/const";

export default class MockApi {
    async login(userName, password) {
        return await axios.post(SERVER_API_URL + '/login', {
            userName,
            password
        });
    }

    async getList() {
        return await axios.get(SERVER_API_URL + '/users');
    }
}
