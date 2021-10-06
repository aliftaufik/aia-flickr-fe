import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import { getImageList } from "./service/api";

function App() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    getImageList().then(setImageList);
  }, []);

  return (
    <div className="text-white">
      <header>
        <h1>Flickr Feeds</h1>
      </header>

      <Carousel imageList={imageList}></Carousel>
    </div>
  );
}

export default App;
