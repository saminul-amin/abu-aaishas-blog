import axios from "axios";

const useAxios = axios.create({
  baseURL: "http://localhost:8000/",
});

export default useAxios;
