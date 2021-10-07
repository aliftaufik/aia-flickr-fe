import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Zoom } from "swiper";
import { useCallback, useEffect, useState } from "react";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/zoom/zoom.min.css";

SwiperCore.use([Navigation, Pagination, Zoom]);

export default function Carousel({
  imageList = [],
  className,
  loading,
  ...props
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiperController, setSwiperController] = useState(null);

  const handleSlideChange = useCallback(
    (swiper) => {
      const activeIndex = swiper.activeIndex;
      const currentIndex = (activeIndex % imageList.length) - 1;

      if (currentIndex < 0) setCurrentIndex(imageList.length - 1);
      else setCurrentIndex(currentIndex);
    },
    [imageList.length]
  );

  const handleMouseEnter = useCallback(() => {
    if (!swiperController) return;
    swiperController.zoom.in();
  }, [swiperController]);

  const handleMouseLeave = useCallback(() => {
    if (!swiperController) return;
    swiperController.zoom.out();
  }, [swiperController]);

  useEffect(() => {
    if (swiperController) {
      handleSlideChange(swiperController);
    }
  }, [handleSlideChange, swiperController]);

  return (
    <div className={"relative h-[520px] " + className} {...props}>
      <Swiper
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        loop
        zoom={{ maxRatio: 2 }}
        className="h-full"
        onSwiper={setSwiperController}
        onRealIndexChange={handleSlideChange}
      >
        {loading ? (
          <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-2xl">Loading</p>
            </div>
          </SwiperSlide>
        ) : (
          imageList.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <img
                  className="h-full mx-auto mb-12"
                  src={image.imageUrl}
                  alt={image.title}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                ></img>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <div className="absolute z-10 inset-x-0 bottom-8 flex justify-center items-center">
        <a
          href={imageList[currentIndex]?.flickrLink ?? "/"}
          target="_blank"
          rel="noreferrer"
          className="rounded px-4 py-2 bg-gray-700 transition-opacity opacity-20 hover:opacity-100 text-white"
        >
          See High Res Version
        </a>
      </div>
    </div>
  );
}
