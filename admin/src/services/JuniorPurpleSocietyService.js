import axios from 'axios';
import HttpCommon from "../http-common";

const JUNIOR_API_BASE_URL = HttpCommon.defaults.baseURL+"/juniors";

class JuniorPurpleSocietyService {

    getLists(page){
        return axios.get(JUNIOR_API_BASE_URL+"?page="+page);
    }

    create(data){
        return axios.post(JUNIOR_API_BASE_URL, data);
    }

    getById(Id){
        return axios.get(JUNIOR_API_BASE_URL + '/' + Id);
    }

    update(data, Id){
        return axios.put(JUNIOR_API_BASE_URL + '/' + Id, data);
    }

    delete(Id){
        return axios.delete(JUNIOR_API_BASE_URL + '/' + Id);
    }
}

export default new JuniorPurpleSocietyService()