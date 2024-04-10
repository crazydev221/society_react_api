import axios from 'axios';
import HttpCommon from "../http-common";

const NEWS_API_BASE_URL = HttpCommon.defaults.baseURL+"/newsletters";

class NewsletterService {

    getLists(page){
        return axios.get(NEWS_API_BASE_URL+"?page="+page);
    }

    create(data){
        return axios.post(NEWS_API_BASE_URL, data);
    }

    getById(Id){
        return axios.get(NEWS_API_BASE_URL + '/' + Id);
    }

    update(data, Id){
        return axios.put(NEWS_API_BASE_URL + '/' + Id, data);
    }

    delete(Id){
        return axios.delete(NEWS_API_BASE_URL + '/' + Id);
    }
}

export default new NewsletterService()