import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import Tags from "./components/Tags";
import { getImageList } from "./service/api";

function App() {
  const [lastUpdate, setLastUpdate] = useState("");
  const [imageList, setImageList] = useState([]);
  const [tagList, setTagList] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getImageList(tagList)
      .then(({ lastUpdate, images }) => {
        setImageList(images);
        if (lastUpdate) {
          const formattedDate = new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(lastUpdate));
          setLastUpdate(formattedDate);
        } else setLastUpdate("");
      })
      .finally(() => setLoading(false));
  }, [tagList]);

  return (
    <div className="min-h-screen py-6">
      <header className="text-center">
        <h1 className="text-xl font-bold">Flickr Feeds</h1>

        <p>
          For you who really have nothing to do in life, just look at theese
          images to make you feel a bit better.
        </p>
      </header>

      <p className="text-center text-sm mt-8">
        Feeds Last Update: {lastUpdate}
      </p>

      <Carousel
        imageList={imageList}
        loading={loading}
        className="mt-2 max-w-screen-lg mx-auto"
      ></Carousel>

      <Tags
        tagList={tagList}
        onTagListChanged={setTagList}
        loading={loading}
        className="mt-6"
      ></Tags>
    </div>
  );
}

export default App;
