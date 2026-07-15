import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { getCategories } from "../../../services/categoryService";
import CategoryCard from "./CategoryCard";

const FALLBACK_CATEGORIES = [
  { _id: "1", name: "Heritage", slug: "heritage", description: "Historic sites, ancient ruins and culturally significant landmarks that showcase India's rich past.", icon: "Landmark", featured: true },
  { _id: "2", name: "Religious", slug: "religious", description: "Sacred places of worship including temples, mosques, churches, gurdwaras and monasteries.", icon: "Church", featured: true },
  { _id: "3", name: "Nature", slug: "nature", description: "Scenic natural landscapes, valleys, forests and biodiversity hotspots.", icon: "Leaf", featured: true },
  { _id: "4", name: "Adventure", slug: "adventure", description: "Thrilling experiences like trekking, river rafting, paragliding, skiing and mountaineering.", icon: "Tent", featured: false },
  { _id: "5", name: "Wildlife", slug: "wildlife", description: "National parks, wildlife sanctuaries and animal reserves for spotting endangered species.", icon: "PawPrint", featured: true },
  { _id: "6", name: "Beaches", slug: "beaches", description: "Pristine coastal stretches, sandy shores and seaside getaways along India's coastline.", icon: "Waves", featured: true },
  { _id: "7", name: "Hill Stations", slug: "hill-stations", description: "Mountain retreats offering cool climates, panoramic views and serene landscapes.", icon: "Snow", featured: true },
  { _id: "8", name: "Monuments", slug: "monuments", description: "Iconic architectural marvels and memorials commemorating historical events and figures.", icon: "Landmark", featured: true },
  { _id: "9", name: "Pilgrimage", slug: "pilgrimage", description: "Sacred destinations and spiritual circuits drawing devotees from across the world.", icon: "Church", featured: true },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

const ExploreByCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data.slice(0, 9));
        } else {
          setCategories(FALLBACK_CATEGORIES);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories(FALLBACK_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (!loading && categories.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-36">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] blur-3xl" />

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
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.05] px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Sparkles size={14} strokeWidth={2} />
                Explore by Interest
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="mt-5 font-heading text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl"
            >
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
                Journey
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl font-body text-base leading-relaxed text-muted sm:text-lg"
            >
              Whether you seek history, adventure, spirituality, or nature,
              discover destinations that match your travel style.
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
            onClick={() => navigate("/categories")}
            className="group flex shrink-0 items-center gap-2.5 rounded-full border border-primary/15 bg-white px-6 py-3 font-body text-sm font-semibold text-primary shadow-sm transition-all duration-500 hover:border-primary/30 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/10 hover:gap-3"
          >
            View All Categories
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </motion.button>
        </motion.div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-dark/5 bg-dark/[0.02] p-6 sm:p-7"
                >
                  <div className="h-14 w-14 animate-pulse rounded-xl bg-dark/5" />
                  <div className="mt-4 h-5 w-2/3 animate-pulse rounded-full bg-dark/5" />
                  <div className="mt-3 h-3 w-full animate-pulse rounded-full bg-dark/5" />
                  <div className="mt-1.5 h-3 w-4/5 animate-pulse rounded-full bg-dark/5" />
                  <div className="my-4 h-px w-full animate-pulse bg-dark/5" />
                  <div className="h-4 w-16 animate-pulse rounded-full bg-dark/5" />
                </div>
              ))
            : categories.map((category, i) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  index={i}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreByCategories;
