import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { getFeaturedTouristPlaces } from "../../../services/touristPlaceService";
import DestinationCard from "./DestinationCard";

const FALLBACK_DESTINATIONS = [
  {
    _id: "1",
    name: "Taj Mahal",
    slug: "taj-mahal",
    shortDescription: "An ivory-white marble mausoleum and one of the Seven Wonders of the World, built by Emperor Shah Jahan.",
    coverImage: { url: "https://res.cloudinary.com/iq57dq0u/image/upload/v1784016429/travelbharat/tourist-places/fbav2duy8qr6h1unzzpq.jpg" },
    isUNESCO: true,
    category: { name: "Monuments", slug: "monuments" },
    city: { name: "Agra", slug: "agra", state: { name: "Uttar Pradesh", slug: "uttar-pradesh" } },
  },
  {
    _id: "2",
    name: "Amer Fort",
    slug: "amer-fort",
    shortDescription: "A grand palace complex blending Rajasthani and Mughal architecture, the heart of Jaipur's royal heritage.",
    coverImage: { url: "https://res.cloudinary.com/iq57dq0u/image/upload/v1784016827/travelbharat/tourist-places/mirtnurht39aguqijfk3.jpg" },
    isUNESCO: false,
    category: { name: "Palaces", slug: "palaces" },
    city: { name: "Jaipur", slug: "jaipur", state: { name: "Rajasthan", slug: "rajasthan" } },
  },
  {
    _id: "3",
    name: "Alleppey Backwaters",
    slug: "alleppey-backwaters",
    shortDescription: "Known as the Venice of the East, famous for serene backwater cruises and houseboat experiences.",
    coverImage: { url: "https://res.cloudinary.com/iq57dq0u/image/upload/v1784017204/travelbharat/tourist-places/qtddkdjx197s8rhtp9uh.jpg" },
    isUNESCO: false,
    category: { name: "Backwaters", slug: "backwaters" },
    city: { name: "Alleppey", slug: "alleppey", state: { name: "Kerala", slug: "kerala" } },
  },
  {
    _id: "4",
    name: "Kashi Vishwanath Temple",
    slug: "kashi-vishwanath-temple",
    shortDescription: "One of the twelve Jyotirlingas, a sacred Shiva temple on the banks of the Ganges in Varanasi.",
    coverImage: { url: "https://res.cloudinary.com/iq57dq0u/image/upload/v1784016056/travelbharat/tourist-places/o0xlvst5muz9b21jwzc9.jpg" },
    city: { name: "Varanasi", slug: "varanasi", state: { name: "Uttar Pradesh", slug: "uttar-pradesh" } },
  },
  {
    _id: "5",
    name: "Golden Temple",
    slug: "golden-temple-amritsar",
    shortDescription: "The holiest shrine of Sikhism, a stunning gold-plated gurdwara surrounded by the sacred Amrit Sarovar.",
    coverImage: { url: "https://res.cloudinary.com/iq57dq0u/image/upload/v1783665510/travelbharat/tourist-places/znvhyoew6o9tctxop3py.jpg" },
    isUNESCO: false,
    category: { name: "Temples", slug: "temples" },
    city: { name: "Amritsar", slug: "amritsar", state: { name: "Punjab", slug: "punjab" } },
  },
  {
    _id: "6",
    name: "Hampi Ruins",
    slug: "hampi-ruins",
    shortDescription: "UNESCO World Heritage site featuring the magnificent ruins of the Vijayanagara Empire.",
    coverImage: { url: "https://res.cloudinary.com/iq57dq0u/image/upload/v1784017467/travelbharat/tourist-places/wxfnqhbpx2ymefrxzdd4.jpg" },
    isUNESCO: true,
    category: { name: "Heritage", slug: "heritage" },
    city: { name: "Hampi", slug: "hampi", state: { name: "Karnataka", slug: "karnataka" } },
  },
  {
    _id: "7",
    name: "Mehrangarh Fort",
    slug: "mehrangarh-fort",
    shortDescription: "One of the largest forts in India, towering 122 meters above the Blue City of Jodhpur.",
    coverImage: { url: "https://res.cloudinary.com/iq57dq0u/image/upload/v1784017740/travelbharat/tourist-places/t71o0f3pqf2wbldhkk5l.png" },
    isUNESCO: false,
    category: { name: "Forts", slug: "forts" },
    city: { name: "Jodhpur", slug: "jodhpur", state: { name: "Rajasthan", slug: "rajasthan" } },
  },
  {
    _id: "8",
    name: "Khajuraho Temples",
    slug: "khajuraho-temples",
    shortDescription: "UNESCO site renowned for its stunning Nagara-style architecture and intricate erotic sculptures.",
    coverImage: { url: "https://images.unsplash.com/photo-1590050752117-2981300b863d?w=800&q=80" },
    isUNESCO: true,
    category: { name: "Temples", slug: "temples" },
    city: { name: "Khajuraho", slug: "khajuraho", state: { name: "Madhya Pradesh", slug: "madhya-pradesh" } },
  },
  {
    _id: "9",
    name: "Dal Lake",
    slug: "dal-lake",
    shortDescription: "The jewel of Srinagar, famous for its elegant houseboats, shikaras, and Mughal gardens.",
    coverImage: { url: "https://images.unsplash.com/photo-1597074866923-dc0589150a32?w=800&q=80" },
    isUNESCO: false,
    category: { name: "Lakes", slug: "lakes" },
    city: { name: "Srinagar", slug: "srinagar", state: { name: "Jammu & Kashmir", slug: "jammu-and-kashmir" } },
  },
  {
    _id: "10",
    name: "Gateway of India",
    slug: "gateway-of-india",
    shortDescription: "An iconic arch monument overlooking the Arabian Sea, built to commemorate the visit of King George V.",
    coverImage: { url: "https://res.cloudinary.com/iq57dq0u/image/upload/v1784018160/travelbharat/tourist-places/yavorlmotgpltcsqpyi7.jpg" },
    isUNESCO: false,
    category: { name: "Monuments", slug: "monuments" },
    city: { name: "Mumbai", slug: "mumbai", state: { name: "Maharashtra", slug: "maharashtra" } },
  },
  {
    _id: "11",
    name: "Konark Sun Temple",
    slug: "konark-sun-temple",
    shortDescription: "A 13th-century UNESCO temple shaped like a giant chariot of the Sun God with 24 carved wheels.",
    coverImage: { url: "https://images.unsplash.com/photo-1621427623012-d099faa1238e?w=800&q=80" },
    isUNESCO: true,
    category: { name: "Temples", slug: "temples" },
    city: { name: "Konark", slug: "konark", state: { name: "Odisha", slug: "odisha" } },
  },
  {
    _id: "12",
    name: "Mysore Palace",
    slug: "mysore-palace",
    shortDescription: "A magnificent Indo-Saracenic palace illuminated by 97,000 bulbs, the pride of Karnataka.",
    coverImage: { url: "https://images.unsplash.com/photo-1600112356915-089fba061759?w=800&q=80" },
    isUNESCO: false,
    category: { name: "Palaces", slug: "palaces" },
    city: { name: "Mysuru", slug: "mysuru", state: { name: "Karnataka", slug: "karnataka" } },
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getFeaturedTouristPlaces();
        if (Array.isArray(data) && data.length > 0) {
          setDestinations(data.slice(0, 12));
        } else {
          setDestinations(FALLBACK_DESTINATIONS);
        }
      } catch {
        setDestinations(FALLBACK_DESTINATIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (!loading && destinations.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-28 lg:py-36">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-accent/[0.03] via-transparent to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-primary/[0.03] via-transparent to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end sm:gap-8"
        >
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <Compass size={14} strokeWidth={2} />
                Top Destinations
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="mt-5 font-heading text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl"
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
                Destinations
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl font-body text-base leading-relaxed text-muted sm:text-lg"
            >
              Explore India's most loved tourist attractions, from magnificent
              monuments and serene beaches to breathtaking mountains and spiritual
              landmarks.
            </motion.p>

            {/* Decorative line */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex items-center gap-3"
            >
              <div className="h-px w-12 bg-gradient-to-r from-primary to-primary/0" />
              <div className="h-1.5 w-1.5 rotate-45 bg-primary/40" />
              <div className="h-px w-20 bg-primary/15" />
            </motion.div>
          </div>

          {/* View All button */}
          <motion.button
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => navigate("/states")}
            className="group flex shrink-0 items-center gap-2.5 rounded-full border border-primary/15 bg-white px-6 py-3 font-body text-sm font-semibold text-primary shadow-sm transition-all duration-500 hover:border-primary/30 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/10 hover:gap-3"
          >
            View All Destinations
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </motion.button>
        </motion.div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-3xl bg-dark/[0.03]"
                >
                  <div className="aspect-[4/3] animate-pulse bg-dark/5" />
                  <div className="p-5 sm:p-6">
                    <div className="h-3 w-20 animate-pulse rounded-full bg-dark/5" />
                    <div className="mt-3 h-5 w-3/4 animate-pulse rounded-full bg-dark/5" />
                    <div className="mt-2 h-3 w-full animate-pulse rounded-full bg-dark/5" />
                    <div className="mt-1 h-3 w-2/3 animate-pulse rounded-full bg-dark/5" />
                    <div className="mt-4 h-8 w-24 animate-pulse rounded-full bg-dark/5" />
                  </div>
                </div>
              ))
            : destinations.map((destination, i) => (
                <DestinationCard
                  key={destination._id}
                  destination={destination}
                  index={i}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
