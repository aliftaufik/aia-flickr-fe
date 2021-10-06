import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import { getImageList } from "./service/api";

function App() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    getImageList().then(setImageList);
  }, []);

  return (
    <div className="h-screen">
      <header className="text-center mt-6">
        <h1 className="text-xl font-bold">Flickr Feeds</h1>
        <p>
          For you who really have nothing to do in life, just look at theese
          images to make you feel a bit better.
        </p>
      </header>

      <Carousel
        imageList={imageList}
        className="mt-6 max-w-screen-lg mx-auto"
      ></Carousel>
    </div>
  );
}

export default App;
