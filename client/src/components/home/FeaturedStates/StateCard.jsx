import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const StateCard = ({ state, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
      onClick={() => navigate(`/states/${state.slug}`)}
    >
      {/* Image */}
      <div className="relative aspect-4/5 overflow-hidden">
        <img
          src={state.coverImage?.url}
          alt={state.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* Featured badge */}
        {state.featured && (
          <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-accent/90 px-3 py-1 font-body text-xs font-semibold text-white backdrop-blur-sm">
            Featured
          </div>
        )}

        {/* Bottom content */}
        <div className="absolute right-0 bottom-0 left-0 p-5 sm:p-6">
          <div className="flex items-center gap-1.5 text-white/70">
            <MapPin size={14} />
            <span className="font-body text-xs font-medium uppercase tracking-wider">
              {state.capital}
            </span>
          </div>

          <h3 className="mt-1.5 font-heading text-xl font-bold text-white sm:text-2xl">
            {state.name}
          </h3>

          {state.tourismTagline && (
            <p className="mt-1.5 line-clamp-2 font-body text-sm leading-relaxed text-white/75">
              {state.tourismTagline}
            </p>
          )}

          {/* Explore button */}
          <div className="mt-4 flex items-center gap-2 font-body text-sm font-semibold text-accent transition-all duration-300 group-hover:gap-3">
            <span>Explore</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StateCard;
