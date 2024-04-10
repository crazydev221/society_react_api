import axios from 'axios';
import HttpCommon from "../http-common";

const TESTIMONIAL_API_BASE_URL = HttpCommon.defaults.baseURL+"/leadershiptestimonials";

class LeadershipTestimonialService {

    getLists(page){
        return axios.get(TESTIMONIAL_API_BASE_URL+"?page="+page);
    }

    create(data){
        return axios.post(TESTIMONIAL_API_BASE_URL, data);
    }

    getById(Id){
        return axios.get(TESTIMONIAL_API_BASE_URL + '/' + Id);
    }

    update(data, Id){
        return axios.put(TESTIMONIAL_API_BASE_URL + '/' + Id, data);
    }

    delete(Id){
        return axios.delete(TESTIMONIAL_API_BASE_URL + '/' + Id);
    }
}

export default new LeadershipTestimonialService()