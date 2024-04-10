import axios from 'axios';
import HttpCommon from "../http-common";

const JUN_API_BASE_URL = HttpCommon.defaults.baseURL+"/juniorpurplesocieties";

class JuniorService {

    getLists(page){
        return axios.get(JUN_API_BASE_URL+"?page="+page);
    }

    create(data){
        return axios.post(JUN_API_BASE_URL, data);
    }

    getById(Id){
        return axios.get(JUN_API_BASE_URL + '/' + Id);
    }

    update(data, Id){
        return axios.put(JUN_API_BASE_URL + '/' + Id, data);
    }

    delete(Id){
        return axios.delete(JUN_API_BASE_URL + '/' + Id);
    }
}

export default new JuniorService()