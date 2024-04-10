import axios from 'axios';
import HttpCommon from "../http-common";

const USER_API_BASE_URL = HttpCommon.defaults.baseURL+"/users";

class UserService {

    getUsers(page){
        return axios.get(HttpCommon.defaults.baseURL+"/all-users?page="+page);
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL, user);
    }

    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    updateUser(user, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }

    deleteUser(userId){
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }
}

export default new UserService()