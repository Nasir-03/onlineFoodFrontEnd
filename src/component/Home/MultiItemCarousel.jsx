import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import imageData from "./PictureData";

const MultiItemCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // ✅ show 4 images at a time
    slidesToScroll: 1,
    autoplay: true,  // ✅ auto scroll
    autoplaySpeed: 2000, // scroll every 2s
    arrows: false, // ✅ left/right buttons
    pauseOnHover: true, // pause on hover
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // small mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="px-8">
      <Slider {...settings}>
        {imageData.map((item, index) => (
          <div key={index} className="p-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[250px] object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold mt-2 text-center">{item.name}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MultiItemCarousel;
