import React from "react";

import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

import img1 from "../../assets/img-1.jpg";
import img2 from "../../assets/img-2.jpg";
import img3 from "../../assets/img-3.jpg";
import img4 from "../../assets/img-4.jpg";

const SwiperGallery = () => {
  const images = [img1, img2, img3, img4];
  const styles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };
  return (
    <>
      <Swiper
        style={{
          marginTop: "50px",
          width: "70%",
        }}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              style={styles}
              className="swiperimages"
              src={image}
              alt="swiperImage"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperGallery;
