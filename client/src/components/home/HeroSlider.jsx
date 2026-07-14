import { useState, useEffect, useCallback } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&q=80",
    alt: "Taj Mahal at sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1920&q=80",
    alt: "Golden Temple, Amritsar",
  },
  {
    src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=80",
    alt: "Kerala backwaters",
  },
  {
    src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=80",
    alt: "Hawa Mahal, Jaipur",
  },
  {
    src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80",
    alt: "Ladakh mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=80",
    alt: "Goa beach sunset",
  },
];

const SLIDE_DURATION = 5500;
const FADE_DURATION = 1500;

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDuration: `${FADE_DURATION}ms` }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover animate-ken-burns"
            style={{ animationDelay: `${index * -2}s` }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/35 to-black/50" />
    </div>
  );
};

export default HeroSlider;
