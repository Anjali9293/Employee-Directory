import axios from "axios";
const BASEURL = "https://randomuser.me/api/?results=50&nat=ca,us";


export default {
  getUsers: function() {
    return axios.get(BASEURL);
  }
};
