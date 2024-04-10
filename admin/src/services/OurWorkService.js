import axios from 'axios';
import HttpCommon from "../http-common";

const OURWORK_API_BASE_URL = HttpCommon.defaults.baseURL+"/ourworks";

class OurWorkService {

    getLists(page){
        return axios.get(HttpCommon.defaults.baseURL+"/ourworks?page="+page);
    }

    create(ourWork){
        return axios.post(OURWORK_API_BASE_URL, ourWork);
    }

    getById(ourWorkId){
        return axios.get(OURWORK_API_BASE_URL + '/' + ourWorkId);
    }

    update(ourWork, ourWorkId){
        return axios.put(OURWORK_API_BASE_URL + '/' + ourWorkId, ourWork);
    }

    delete(ourWorkId){
        return axios.delete(OURWORK_API_BASE_URL + '/' + ourWorkId);
    }
}

export default new OurWorkService()