import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getImageList = async (tagList) => {
  const { data } = await api.get("/images?tags=" + tagList?.join(",") ?? "");

  return {
    lastUpdate: data.last_update,
    images:
      data.images?.map((image) => ({
        title: image.title,
        imageUrl: image.image_url,
        flickrLink: image.flickr_link,
      })) ?? [],
  };
};
