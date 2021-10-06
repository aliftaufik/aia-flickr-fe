import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Zoom } from "swiper";
import { useMemo, useState } from "react";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/zoom/zoom.min.css";

SwiperCore.use([Navigation, Pagination, Zoom]);

export default function Carousel({ imageList = [], className, ...props }) {
  const [swiperController, setSwiperController] = useState(null);

  const handleMouseEnter = useMemo(() => {
    if (!swiperController) return null;
    return () => {
      swiperController.zoom.in();
    };
  }, [swiperController]);

  const handleMouseLeave = useMemo(() => {
    if (!swiperController) return null;
    return () => {
      swiperController.zoom.out();
    };
  }, [swiperController]);

  return (
    <div className={"relative h-[520px] " + className} {...props}>
      <Swiper
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        loop
        zoom={{ maxRatio: 2 }}
        onSwiper={setSwiperController}
        className="h-full"
      >
        {imageList.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container">
              <img
                className="h-full mx-auto mb-12"
                src={image.image}
                alt="Feeds"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              ></img>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute z-10 inset-x-0 bottom-8 flex justify-center items-center">
        <a
          href="flickr.com"
          className="rounded px-4 py-2 bg-gray-700 transition-opacity opacity-20 hover:opacity-100 text-white"
        >
          See High Res Version
        </a>
      </div>
    </div>
  );
}
