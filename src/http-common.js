import axios from "axios";

export default axios.create({
  //baseURL: "https://localhost:8082/api",
  //imageURL:"https://localhost:8082",
  //baseURL: "https://purplehelp.org:8082/api",
  //imageURL:"https://purplehelp.org:8082",
  baseURL: "https://0q4bp0dmhb.execute-api.us-east-1.amazonaws.com/production/api",
  imageURL:"https://static.werpurple.org",
  headers: {
    "Content-type": "application/json"
  }
});