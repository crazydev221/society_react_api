import axios from 'axios';
import HttpCommon from "../http-common";

const CONTACT_API_BASE_URL = HttpCommon.defaults.baseURL+"/contacts";

class ContactService {

    getLists(page){
        return axios.get(CONTACT_API_BASE_URL+"?page="+page);
    }

    create(data){
        return axios.post(CONTACT_API_BASE_URL, data);
    }

    getById(Id){
        return axios.get(CONTACT_API_BASE_URL + '/' + Id);
    }

    update(data, Id){
        return axios.put(CONTACT_API_BASE_URL + '/' + Id, data);
    }

    delete(Id){
        return axios.delete(CONTACT_API_BASE_URL + '/' + Id);
    }
}

export default new ContactService()