import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Landmark } from "lucide-react";

const DestinationCard = ({ destination, index }) => {
  const navigate = useNavigate();

  const cityName = destination.city?.name || "";
  const stateName = destination.city?.state?.name || "";
  const categoryName = destination.category?.name || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative cursor-pointer"
      onClick={() => navigate(`/tourist-place/${destination.slug}`)}
    >
      {/* Card container */}
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg shadow-dark/[0.06] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/12">
        {/* Image section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={destination.coverImage?.url}
            alt={destination.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />

          {/* Gradient overlay — always visible, deepens on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/5 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/40" />

          {/* Category badge — top left */}
          {categoryName && (
            <div className="absolute left-4 top-4 z-10">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                {categoryName}
              </span>
            </div>
          )}

          {/* UNESCO badge — top right */}
          {destination.isUNESCO && (
            <div className="absolute right-4 top-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/90 px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-accent/25 backdrop-blur-sm">
                <Landmark size={12} strokeWidth={2.5} />
                UNESCO Heritage
              </span>
            </div>
          )}

          {/* Bottom content overlay */}
          <div className="absolute right-0 bottom-0 left-0 z-10 p-5 sm:p-6">
            {/* Location */}
            <div className="flex items-center gap-1.5 text-white/60">
              <MapPin size={13} strokeWidth={2} />
              <span className="font-body text-xs font-medium uppercase tracking-wider">
                {cityName}
                {stateName && `, ${stateName}`}
              </span>
            </div>

            {/* Name */}
            <h3 className="mt-2 font-heading text-xl font-bold leading-tight text-white sm:text-2xl">
              {destination.name}
            </h3>

            {/* Short description */}
            {destination.shortDescription && (
              <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-white/65">
                {destination.shortDescription}
              </p>
            )}

            {/* Explore button */}
            <div className="mt-4 flex items-center gap-2 overflow-hidden">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-body text-xs font-semibold text-white backdrop-blur-sm transition-all duration-500 group-hover:border-white/40 group-hover:bg-white/20">
                Explore
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="transition-transform duration-500 group-hover:translate-x-1.5"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
