import axios from 'axios';
import HttpCommon from "../http-common";

const SUPPORT_API_BASE_URL = HttpCommon.defaults.baseURL+"/supports";

class SupportService {

    getLists(page){
        return axios.get(SUPPORT_API_BASE_URL+"?page="+page);
    }

    create(data){
        return axios.post(SUPPORT_API_BASE_URL, data);
    }

    getById(Id){
        return axios.get(SUPPORT_API_BASE_URL + '/' + Id);
    }

    update(data, Id){
        return axios.put(SUPPORT_API_BASE_URL + '/' + Id, data);
    }

    delete(Id){
        return axios.delete(SUPPORT_API_BASE_URL + '/' + Id);
    }
}

export default new SupportService()