import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getStates } from "../../../services/stateService";
import StateCard from "./StateCard";

const FALLBACK_STATES = [
  {
    _id: "1",
    name: "Rajasthan",
    slug: "rajasthan",
    capital: "Jaipur",
    tourismTagline: "Land of Kings — where every corner tells a royal story",
    featured: true,
    coverImage: {
      url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
    },
  },
  {
    _id: "2",
    name: "Kerala",
    slug: "kerala",
    capital: "Thiruvananthapuram",
    tourismTagline: "God's Own Country — serene backwaters and lush hills",
    featured: true,
    coverImage: {
      url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    },
  },
  {
    _id: "3",
    name: "Uttarakhand",
    slug: "uttarakhand",
    capital: "Dehradun",
    tourismTagline: "Dev Bhumi — the abode of gods and Himalayan splendour",
    featured: true,
    coverImage: {
      url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    },
  },
  {
    _id: "4",
    name: "Goa",
    slug: "goa",
    capital: "Panaji",
    tourismTagline: "Sun, sand, and centuries of Portuguese heritage",
    featured: true,
    coverImage: {
      url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    },
  },
];

const sectionFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const headingFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
  },
};

const FeaturedStates = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const data = await getStates();
        const featured = data.filter((s) => s.featured);
        setStates(featured.length > 0 ? featured : data.slice(0, 4));
      } catch {
        setStates(FALLBACK_STATES);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  if (!loading && states.length === 0) return null;

  return (
    <section className="relative bg-surface pt-36 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6"
        >
          <motion.div variants={headingFade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-accent">
              Explore India
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
              Featured States
            </h2>
            <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-muted sm:text-lg">
              From royal deserts to tranquil backwaters — discover India's most
              breathtaking states.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => navigate("/states")}
            className="group flex shrink-0 items-center gap-2 font-body text-sm font-semibold text-primary transition-all duration-300 hover:text-accent hover:gap-3"
          >
            View All States
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-7">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-4/5 animate-pulse rounded-3xl bg-dark/5"
                />
              ))
            : states.map((state, i) => (
                <StateCard key={state._id} state={state} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStates;
