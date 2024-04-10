import axios from 'axios';
import HttpCommon from "../http-common";

const TEAM_API_BASE_URL = HttpCommon.defaults.baseURL+"/leadershipteams";

class LeadershipTeamService {

    getLists(page){
        return axios.get(TEAM_API_BASE_URL+"?page="+page);
    }

    create(data){
        return axios.post(TEAM_API_BASE_URL, data);
    }

    getById(Id){
        return axios.get(TEAM_API_BASE_URL + '/' + Id);
    }

    update(data, Id){
        return axios.put(TEAM_API_BASE_URL + '/' + Id, data);
    }

    delete(Id){
        return axios.delete(TEAM_API_BASE_URL + '/' + Id);
    }
}

export default new LeadershipTeamService()