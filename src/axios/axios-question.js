import axios from "axios";

const axiosQ = axios.create({
  baseURL: "http://192.168.43.110:3000/"
});
export default axiosQ;
