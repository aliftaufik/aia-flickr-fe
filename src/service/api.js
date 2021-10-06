import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getImageList = async () => {
  const { data } = await api.get("/images");

  return data;
};
