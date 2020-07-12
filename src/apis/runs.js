import axios from "axios";

export default axios.create({
  baseURL: "https://therunup-e8116.firebaseio.com/",
});
