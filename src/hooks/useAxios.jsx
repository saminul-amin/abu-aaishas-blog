import axios from "axios";

const useAxios = axios.create({
  baseURL: "https://abu-aaishas-blog-server.vercel.app/",
});

export default useAxios;
