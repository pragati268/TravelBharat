import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  MapPin,
  Calendar,
  Cloud,
  Thermometer,
} from "lucide-react";

const CityHero = ({ city }) => {
  return (
    <section className="relative flex min-h-[520px] items-end overflow-hidden sm:min-h-[600px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={city.coverImage?.url}
          alt={city.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/35 to-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-36 lg:px-8 lg:pb-20">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex items-center gap-1.5 font-body text-xs text-white/50 sm:text-sm"
        >
          <Link
            to="/"
            className="transition-colors duration-200 hover:text-white/80"
          >
            Home
          </Link>
          <ChevronRight size={12} strokeWidth={2} />
          <Link
            to="/states"
            className="transition-colors duration-200 hover:text-white/80"
          >
            States
          </Link>
          {city.state && (
            <>
              <ChevronRight size={12} strokeWidth={2} />
              <Link
                to={`/states/${city.state.slug}`}
                className="transition-colors duration-200 hover:text-white/80"
              >
                {city.state.name}
              </Link>
            </>
          )}
          <ChevronRight size={12} strokeWidth={2} />
          <span className="text-white/80">{city.name}</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm"
          >
            <MapPin size={14} strokeWidth={2} />
            {city.state?.name || "India"}
          </motion.span>

          {/* City Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {city.name}
          </motion.h1>

          {/* State Name */}
          {city.state && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-2 font-body text-base text-white/60 sm:text-lg"
            >
              {city.state.name}
            </motion.p>
          )}

          {/* Short Description */}
          {city.description && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-3 max-w-xl font-body text-base text-white/70 sm:text-lg"
            >
              {city.description.length > 160
                ? city.description.slice(0, 160) + "..."
                : city.description}
            </motion.p>
          )}

          {/* Info pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            {city.bestTimeToVisit && (
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 backdrop-blur-sm">
                <Calendar
                  size={14}
                  strokeWidth={2}
                  className="text-accent"
                />
                <span className="font-body text-xs font-medium text-white/80">
                  Best Time: {city.bestTimeToVisit}
                </span>
              </div>
            )}
            {city.climate && (
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 backdrop-blur-sm">
                <Cloud size={14} strokeWidth={2} className="text-accent" />
                <span className="font-body text-xs font-medium text-white/80">
                  {city.climate}
                </span>
              </div>
            )}
            {city.averageTemperature && (
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 backdrop-blur-sm">
                <Thermometer
                  size={14}
                  strokeWidth={2}
                  className="text-accent"
                />
                <span className="font-body text-xs font-medium text-white/80">
                  {city.averageTemperature}
                </span>
              </div>
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#tourist-places"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-body text-sm font-semibold text-primary shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.03]"
            >
              Explore Tourist Places
              <ChevronRight size={16} strokeWidth={2.5} />
            </a>
            <Link
              to={city.state ? `/states/${city.state.slug}` : "/states"}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 font-body text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white"
            >
              Back to {city.state?.name || "States"}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CityHero;
