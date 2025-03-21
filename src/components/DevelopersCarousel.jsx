import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const developers = [
  { name: "Alice", image: "https://randomuser.me/api/portraits/women/45.jpg" },
  { name: "Bob", image: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Charlie", image: "https://randomuser.me/api/portraits/men/50.jpg" },
  { name: "Diana", image: "https://randomuser.me/api/portraits/women/50.jpg" },
  { name: "Ethan", image: "https://randomuser.me/api/portraits/men/52.jpg" },
  { name: "Fiona", image: "https://randomuser.me/api/portraits/women/52.jpg" },
];

const DevelopersCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: false, // Removed arrows
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-center text-white text-2xl font-bold mb-6">
        Meet Our Developers
      </h2>
      <Slider {...settings}>
        {developers.map((dev, index) => (
          <div key={index} className="flex flex-col items-center text-center px-2">
            <div className="relative flex flex-col items-center">
              <img
                src={dev.image}
                alt={dev.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <p className="mt-3 text-white text-sm font-semibold bg-gray-800 px-4 py-2 rounded-full shadow-md">
                {dev.name}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DevelopersCarousel;
