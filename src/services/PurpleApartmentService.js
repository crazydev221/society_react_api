import axios from 'axios';
import HttpCommon from "../http-common";

const APARTMENT_API_BASE_URL = HttpCommon.defaults.baseURL+"/purpleapartments";

class PurpleApartmentService {

    getLists(page){
        return axios.get(APARTMENT_API_BASE_URL+"?page="+page);
    }

    create(data){
        return axios.post(APARTMENT_API_BASE_URL, data);
    }

    getById(Id){
        return axios.get(APARTMENT_API_BASE_URL + '/' + Id);
    }

    update(data, Id){
        return axios.put(APARTMENT_API_BASE_URL + '/' + Id, data);
    }

    delete(Id){
        return axios.delete(APARTMENT_API_BASE_URL + '/' + Id);
    }
}

export default new PurpleApartmentService()