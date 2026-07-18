import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Landmark } from "lucide-react";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const CityCard = ({ city }) => (
  <motion.div variants={fadeUp} whileHover={{ y: -5 }}>
    <Link
      to={`/cities/${city.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-xl hover:shadow-primary/8"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={city.coverImage?.url}
          alt={city.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {city.featured && (
          <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-accent/90 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            Featured
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-1.5 text-primary/50">
          <MapPin size={13} strokeWidth={2} />
          <span className="font-body text-xs font-medium uppercase tracking-wider">
            {city.state?.name || "India"}
          </span>
        </div>
        <h3 className="mt-1.5 font-heading text-lg font-bold text-dark transition-colors duration-300 group-hover:text-primary">
          {city.name}
        </h3>
        {city.description && (
          <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-muted">
            {city.description}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2 font-body text-sm font-semibold text-primary transition-all duration-300 group-hover:text-accent group-hover:gap-3">
          <span>Explore {city.name}</span>
          <ArrowRight
            size={14}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  </motion.div>
);

const CitiesSection = ({ cities }) => {
  if (!cities || cities.length === 0) return null;

  return (
    <section
      id="cities"
      className="relative overflow-hidden bg-surface py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6"
        >
          <div>
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-accent">
              Cities
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-dark sm:text-4xl">
              Explore Cities
            </h2>
            <p className="mt-3 max-w-xl font-body text-base text-muted sm:text-lg">
              Discover the vibrant cities and unique character of each destination.
            </p>
          </div>
          <span className="shrink-0 font-body text-sm text-muted">
            {cities.length} {cities.length === 1 ? "city" : "cities"}
          </span>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7"
        >
          {cities.map((city) => (
            <CityCard key={city._id} city={city} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CitiesSection;
