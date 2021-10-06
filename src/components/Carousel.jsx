import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([Navigation, Pagination]);

export default function Carousel({ imageList = [] }) {
  return (
    <Swiper
      navigation
      pagination={{ clickable: true, dynamicBullets: true }}
      loop
    >
      {imageList.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            className="h-96 mx-auto mb-6"
            src={image.image}
            alt="Feeds"
          ></img>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
