import axios from "axios";

const api = axios.create({
  baseURL: "https://aia-flickr-be.herokuapp.com/api",
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
