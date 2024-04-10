import axios from 'axios';
import HttpCommon from "../http-common";

const NITALIABLANKET_API_BASE_URL = HttpCommon.defaults.baseURL+"/nitaliablankets";

class NitaliaBlanketService {

    getLists(page){
        return axios.get(NITALIABLANKET_API_BASE_URL+"?page="+page);
    }

    create(data){
        return axios.post(NITALIABLANKET_API_BASE_URL, data);
    }

    getById(Id){
        return axios.get(NITALIABLANKET_API_BASE_URL + '/' + Id);
    }

    update(data, Id){
        return axios.put(NITALIABLANKET_API_BASE_URL + '/' + Id, data);
    }

    delete(Id){
        return axios.delete(NITALIABLANKET_API_BASE_URL + '/' + Id);
    }
}

export default new NitaliaBlanketService()