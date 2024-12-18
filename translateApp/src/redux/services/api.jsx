//*api istegi
import axios from "axios";

export default axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "adc992c353msh25202572049a6c8p1bf004jsn30fae2f4c03f",
    "x-rapidapi-host": "text-translator2.p.rapidapi.com",
  },
});
