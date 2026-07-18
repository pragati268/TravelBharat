import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { getCityBySlug, getCitiesByStateId } from "../../services/cityService";
import { getTouristPlacesByCity } from "../../services/touristPlaceService";
import CityHero from "../../components/city-details/CityHero";
import AboutCity from "../../components/city-details/AboutCity";
import TouristPlacesSection from "../../components/city-details/TouristPlacesSection";
import LocalHighlights from "../../components/city-details/LocalHighlights";
import TravelTips from "../../components/city-details/TravelTips";
import RelatedCities from "../../components/city-details/RelatedCities";

const FALLBACK_CITY = {
  _id: "1",
  name: "Jaipur",
  slug: "jaipur",
  description:
    "Jaipur, the Pink City of India, is a vibrant blend of heritage, culture, and modernity. Known for its magnificent palaces, bustling bazaars, and warm hospitality, the city offers an unforgettable experience to every traveler.",
  bestTimeToVisit: "Oct - Mar",
  climate: "Semi-arid",
  averageTemperature: "22°C - 35°C",
  featured: true,
  coverImage: {
    url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
  },
  state: { name: "Rajasthan", slug: "rajasthan" },
};

const FALLBACK_PLACES = [
  {
    _id: "p1",
    name: "Amber Fort",
    slug: "amber-fort",
    shortDescription:
      "A majestic hilltop fortress blending Hindu and Mughal architecture.",
    isUNESCO: true,
    coverImage: {
      url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
    },
    city: { name: "Jaipur" },
    category: { name: "Heritage" },
  },
  {
    _id: "p2",
    name: "City Palace",
    slug: "city-palace-jaipur",
    shortDescription:
      "A stunning palace complex showcasing Rajasthani and Mughal artistry.",
    isUNESCO: false,
    coverImage: {
      url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    },
    city: { name: "Jaipur" },
    category: { name: "Palace" },
  },
  {
    _id: "p3",
    name: "Hawa Mahal",
    slug: "hawa-mahal",
    shortDescription:
      "The iconic Palace of Winds with its intricate latticed facade.",
    isUNESCO: false,
    coverImage: {
      url: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&q=80",
    },
    city: { name: "Jaipur" },
    category: { name: "Palace" },
  },
];

const FALLBACK_RELATED = [
  {
    _id: "c1",
    name: "Udaipur",
    slug: "udaipur",
    description: "City of Lakes — romantic palaces reflected in serene waters.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    },
    state: { name: "Rajasthan" },
  },
  {
    _id: "c2",
    name: "Jodhpur",
    slug: "jodhpur",
    description:
      "The Blue City — a striking landscape of indigo houses and desert fortresses.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
    },
    state: { name: "Rajasthan" },
  },
  {
    _id: "c3",
    name: "Jaisalmer",
    slug: "jaisalmer",
    description:
      "The Golden City — rising from the Thar Desert like a mirage.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1624467275689-08f40c7c50d9?w=800&q=80",
    },
    state: { name: "Rajasthan" },
  },
];

const HeroSkeleton = () => (
  <div className="relative flex min-h-130 items-end overflow-hidden sm:min-h-150">
    <div className="absolute inset-0 animate-pulse bg-dark/10" />
    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-36 lg:px-8 lg:pb-20">
      <div className="mb-6 h-4 w-48 animate-pulse rounded-full bg-white/10" />
      <div className="h-5 w-28 animate-pulse rounded-full bg-white/10" />
      <div className="mt-5 h-12 w-72 animate-pulse rounded-full bg-white/10 sm:h-14 sm:w-96" />
      <div className="mt-4 h-5 w-64 animate-pulse rounded-full bg-white/10 sm:w-80" />
      <div className="mt-7 flex gap-3">
        <div className="h-9 w-36 animate-pulse rounded-full bg-white/10" />
        <div className="h-9 w-24 animate-pulse rounded-full bg-white/10" />
      </div>
    </div>
  </div>
);

const SectionSkeleton = () => (
  <div className="py-20 sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="h-4 w-20 animate-pulse rounded-full bg-dark/5" />
      <div className="mt-3 h-8 w-48 animate-pulse rounded-full bg-dark/5" />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-dark/3">
            <div className="aspect-16/10 animate-pulse bg-dark/5" />
            <div className="p-5">
              <div className="h-3 w-16 animate-pulse rounded-full bg-dark/5" />
              <div className="mt-2 h-5 w-32 animate-pulse rounded-full bg-dark/5" />
              <div className="mt-2 h-3 w-full animate-pulse rounded-full bg-dark/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InfoSkeleton = () => (
  <div className="py-20 sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto h-4 w-20 animate-pulse rounded-full bg-dark/5" />
      <div className="mx-auto mt-3 h-8 w-48 animate-pulse rounded-full bg-dark/5" />
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-primary/8 bg-surface/60 p-6"
          >
            <div className="h-12 w-12 animate-pulse rounded-xl bg-dark/5" />
            <div className="mt-4 h-4 w-24 animate-pulse rounded-full bg-dark/5" />
            <div className="mt-2 h-3 w-full animate-pulse rounded-full bg-dark/5" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
      <RefreshCw size={32} strokeWidth={1.5} className="text-red-400" />
    </div>
    <h2 className="mt-6 font-heading text-2xl font-bold text-dark">
      Something went wrong
    </h2>
    <p className="mt-2 max-w-sm font-body text-sm text-muted">
      We couldn't load this city's details. Please try again.
    </p>
    <button
      onClick={onRetry}
      className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
    >
      <RefreshCw size={15} strokeWidth={2.5} />
      Retry
    </button>
  </div>
);

const CityDetails = () => {
  const { slug } = useParams();
  const [city, setCity] = useState(null);
  const [places, setPlaces] = useState([]);
  const [siblingCities, setSiblingCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async (citySlug) => {
    setLoading(true);
    setError(false);
    try {
      const cityData = await getCityBySlug(citySlug);
      setCity(cityData);

      const [placesData, siblingsData] = await Promise.allSettled([
        getTouristPlacesByCity(cityData._id),
        cityData.state
          ? getCitiesByStateId(cityData.state._id || cityData.state)
          : Promise.resolve([]),
      ]);

      if (
        placesData.status === "fulfilled" &&
        Array.isArray(placesData.value)
      ) {
        setPlaces(placesData.value);
      } else {
        setPlaces(FALLBACK_PLACES);
      }

      if (
        siblingsData.status === "fulfilled" &&
        Array.isArray(siblingsData.value)
      ) {
        setSiblingCities(siblingsData.value);
      } else {
        setSiblingCities(FALLBACK_RELATED);
      }
    } catch {
      setCity(FALLBACK_CITY);
      setPlaces(FALLBACK_PLACES);
      setSiblingCities(FALLBACK_RELATED);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCity(null);
    setPlaces([]);
    setSiblingCities([]);
    fetchData(slug);
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface">
        <HeroSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
        <InfoSkeleton />
      </div>
    );
  }

  if (!city) {
    return <ErrorState onRetry={() => fetchData(slug)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      <CityHero city={city} />
      <AboutCity city={city} />
      <TouristPlacesSection places={places} />
      <LocalHighlights />
      <TravelTips city={city} />
      <RelatedCities cities={siblingCities} currentSlug={city.slug} />
    </motion.div>
  );
};

export default CityDetails;
