import axios from "axios";

export default axios.create({
  
  baseURL: "https://purplehelp.org:8082/api",
  imageURL:"https://purplehelp.org:8082",

  //baseURL: "https://localhost:8082/api",
  //imageURL:"https://localhost:8082",
  headers: {
    "Content-type": "application/json"
  }
});