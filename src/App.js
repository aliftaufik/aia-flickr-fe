import { useEffect, useState } from "react";
import { getImageList } from "./service/api";

function App() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    getImageList().then(setImageList);
  }, []);

  return (
    <div className="bg-blue-600 text-white">
      <header>
        <h1>Flickr Feeds</h1>
      </header>

      <div>
        {imageList.map((image) => (
          <img src={image.image} alt="Feeds"></img>
        ))}
      </div>
    </div>
  );
}

export default App;
