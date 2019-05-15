import axios from "axios";
// http://192.168.43.110
const axiosQ = axios.create({
  baseURL: "http://192.168.1.106:8000/"
});
export default axiosQ;
