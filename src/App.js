import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import { getImageList } from "./service/api";

function App() {
  const [lastUpdate, setLastUpdate] = useState("");
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    getImageList().then(({ lastUpdate, images }) => {
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
    });
  }, []);

  return (
    <div className="h-screen">
      <header className="text-center pt-6">
        <h1 className="text-xl font-bold">Flickr Feeds</h1>

        <p>
          For you who really have nothing to do in life, just look at theese
          images to make you feel a bit better.
        </p>
      </header>

      <p className="text-center text-sm mt-8">Last Update: {lastUpdate}</p>

      <Carousel
        imageList={imageList}
        className="mt-2 max-w-screen-lg mx-auto"
      ></Carousel>
    </div>
  );
}

export default App;
