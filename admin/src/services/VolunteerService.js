import axios from 'axios';
import HttpCommon from "../http-common";

const VOLUNTEER_API_BASE_URL = HttpCommon.defaults.baseURL+"/volunteers";

class VolunteerService {

    getLists(page){
        return axios.get(VOLUNTEER_API_BASE_URL+"?page="+page);
    }

    create(data){
        return axios.post(VOLUNTEER_API_BASE_URL, data);
    }

    getById(Id){
        return axios.get(VOLUNTEER_API_BASE_URL + '/' + Id);
    }

    update(data, Id){
        return axios.put(VOLUNTEER_API_BASE_URL + '/' + Id, data);
    }

    delete(Id){
        return axios.delete(VOLUNTEER_API_BASE_URL + '/' + Id);
    }
}

export default new VolunteerService()