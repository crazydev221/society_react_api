import axios from 'axios';
import HttpCommon from "../http-common";

const USER_API_BASE_URL = HttpCommon.defaults.baseURL+"/pages";

class PageService {

    getPages(page){
        return axios.get(HttpCommon.defaults.baseURL+"/pages?page="+page);
    }

    createPage(page){
        return axios.post(USER_API_BASE_URL, page);
    }

    getPageById(pageId){
        return axios.get(USER_API_BASE_URL + '/' + pageId);
    }

    updatePage(page, pageId){
        return axios.put(USER_API_BASE_URL + '/' + pageId, page);
    }

    deletePage(pageId){
        return axios.delete(USER_API_BASE_URL + '/' + pageId);
    }
}

export default new PageService()