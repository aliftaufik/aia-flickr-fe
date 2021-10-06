import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getImageList = async () => {
  const { data } = await api.get("/images");

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
