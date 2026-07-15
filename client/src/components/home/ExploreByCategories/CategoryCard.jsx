import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Landmark,
  Church,
  Leaf,
  Tent,
  PawPrint,
  Waves,
  Snowflake,
  Building2,
  Castle,
  Trees,
  Droplet,
  Sailboat,
  Crown,
  Mountain,
  Theater,
  ScrollText,
  Flower,
  Dam,
  Rabbit,
  Compass,
  Map,
  Camera,
} from "lucide-react";

const ICON_MAP = {
  Landmark,
  Church,
  Leaf,
  Tent,
  PawPrint,
  Waves,
  Snow: Snowflake,
  Building2,
  Castle,
  Trees,
  Droplet,
  Sailboat,
  Crown,
  Mountain,
  Theatre: Theater,
  ScrollText,
  Flower,
  Dam,
  Rabbit,
  Compass,
  Map,
  Camera,
};

const COLOR_MAP = {
  heritage: {
    bg: "from-amber-50 to-amber-100/50",
    icon: "text-amber-600",
    iconBg: "bg-amber-100",
    border: "border-amber-200/60",
    hoverBorder: "hover:border-amber-300",
    hoverShadow: "hover:shadow-amber-200/40",
    gradientOverlay: "from-amber-500/5 to-transparent",
    accent: "#D97706",
  },
  religious: {
    bg: "from-violet-50 to-violet-100/50",
    icon: "text-violet-600",
    iconBg: "bg-violet-100",
    border: "border-violet-200/60",
    hoverBorder: "hover:border-violet-300",
    hoverShadow: "hover:shadow-violet-200/40",
    gradientOverlay: "from-violet-500/5 to-transparent",
    accent: "#7C3AED",
  },
  nature: {
    bg: "from-emerald-50 to-emerald-100/50",
    icon: "text-emerald-600",
    iconBg: "bg-emerald-100",
    border: "border-emerald-200/60",
    hoverBorder: "hover:border-emerald-300",
    hoverShadow: "hover:shadow-emerald-200/40",
    gradientOverlay: "from-emerald-500/5 to-transparent",
    accent: "#059669",
  },
  adventure: {
    bg: "from-orange-50 to-orange-100/50",
    icon: "text-orange-600",
    iconBg: "bg-orange-100",
    border: "border-orange-200/60",
    hoverBorder: "hover:border-orange-300",
    hoverShadow: "hover:shadow-orange-200/40",
    gradientOverlay: "from-orange-500/5 to-transparent",
    accent: "#EA580C",
  },
  wildlife: {
    bg: "from-teal-50 to-teal-100/50",
    icon: "text-teal-600",
    iconBg: "bg-teal-100",
    border: "border-teal-200/60",
    hoverBorder: "hover:border-teal-300",
    hoverShadow: "hover:shadow-teal-200/40",
    gradientOverlay: "from-teal-500/5 to-transparent",
    accent: "#0D9488",
  },
  beaches: {
    bg: "from-sky-50 to-sky-100/50",
    icon: "text-sky-600",
    iconBg: "bg-sky-100",
    border: "border-sky-200/60",
    hoverBorder: "hover:border-sky-300",
    hoverShadow: "hover:shadow-sky-200/40",
    gradientOverlay: "from-sky-500/5 to-transparent",
    accent: "#0EA5E9",
  },
  "hill-stations": {
    bg: "from-blue-50 to-blue-100/50",
    icon: "text-blue-600",
    iconBg: "bg-blue-100",
    border: "border-blue-200/60",
    hoverBorder: "hover:border-blue-300",
    hoverShadow: "hover:shadow-blue-200/40",
    gradientOverlay: "from-blue-500/5 to-transparent",
    accent: "#2563EB",
  },
  museums: {
    bg: "from-slate-50 to-slate-100/50",
    icon: "text-slate-600",
    iconBg: "bg-slate-100",
    border: "border-slate-200/60",
    hoverBorder: "hover:border-slate-300",
    hoverShadow: "hover:shadow-slate-200/40",
    gradientOverlay: "from-slate-500/5 to-transparent",
    accent: "#475569",
  },
  forts: {
    bg: "from-yellow-50 to-yellow-100/50",
    icon: "text-yellow-600",
    iconBg: "bg-yellow-100",
    border: "border-yellow-200/60",
    hoverBorder: "hover:border-yellow-300",
    hoverShadow: "hover:shadow-yellow-200/40",
    gradientOverlay: "from-yellow-500/5 to-transparent",
    accent: "#CA8A04",
  },
  "national-parks": {
    bg: "from-green-50 to-green-100/50",
    icon: "text-green-600",
    iconBg: "bg-green-100",
    border: "border-green-200/60",
    hoverBorder: "hover:border-green-300",
    hoverShadow: "hover:shadow-green-200/40",
    gradientOverlay: "from-green-500/5 to-transparent",
    accent: "#16A34A",
  },
  waterfalls: {
    bg: "from-cyan-50 to-cyan-100/50",
    icon: "text-cyan-600",
    iconBg: "bg-cyan-100",
    border: "border-cyan-200/60",
    hoverBorder: "hover:border-cyan-300",
    hoverShadow: "hover:shadow-cyan-200/40",
    gradientOverlay: "from-cyan-500/5 to-transparent",
    accent: "#0891B2",
  },
  lakes: {
    bg: "from-indigo-50 to-indigo-100/50",
    icon: "text-indigo-600",
    iconBg: "bg-indigo-100",
    border: "border-indigo-200/60",
    hoverBorder: "hover:border-indigo-300",
    hoverShadow: "hover:shadow-indigo-200/40",
    gradientOverlay: "from-indigo-500/5 to-transparent",
    accent: "#4F46E5",
  },
  monuments: {
    bg: "from-rose-50 to-rose-100/50",
    icon: "text-rose-600",
    iconBg: "bg-rose-100",
    border: "border-rose-200/60",
    hoverBorder: "hover:border-rose-300",
    hoverShadow: "hover:shadow-rose-200/40",
    gradientOverlay: "from-rose-500/5 to-transparent",
    accent: "#E11D48",
  },
  temples: {
    bg: "from-purple-50 to-purple-100/50",
    icon: "text-purple-600",
    iconBg: "bg-purple-100",
    border: "border-purple-200/60",
    hoverBorder: "hover:border-purple-300",
    hoverShadow: "hover:shadow-purple-200/40",
    gradientOverlay: "from-purple-500/5 to-transparent",
    accent: "#9333EA",
  },
  palaces: {
    bg: "from-amber-50 to-yellow-100/50",
    icon: "text-amber-600",
    iconBg: "bg-amber-100",
    border: "border-amber-200/60",
    hoverBorder: "hover:border-amber-300",
    hoverShadow: "hover:shadow-amber-200/40",
    gradientOverlay: "from-amber-500/5 to-transparent",
    accent: "#D97706",
  },
  caves: {
    bg: "from-stone-50 to-stone-100/50",
    icon: "text-stone-600",
    iconBg: "bg-stone-100",
    border: "border-stone-200/60",
    hoverBorder: "hover:border-stone-300",
    hoverShadow: "hover:shadow-stone-200/40",
    gradientOverlay: "from-stone-500/5 to-transparent",
    accent: "#78716C",
  },
  pilgrimage: {
    bg: "from-fuchsia-50 to-fuchsia-100/50",
    icon: "text-fuchsia-600",
    iconBg: "bg-fuchsia-100",
    border: "border-fuchsia-200/60",
    hoverBorder: "hover:border-fuchsia-300",
    hoverShadow: "hover:shadow-fuchsia-200/40",
    gradientOverlay: "from-fuchsia-500/5 to-transparent",
    accent: "#C026D3",
  },
  cultural: {
    bg: "from-pink-50 to-pink-100/50",
    icon: "text-pink-600",
    iconBg: "bg-pink-100",
    border: "border-pink-200/60",
    hoverBorder: "hover:border-pink-300",
    hoverShadow: "hover:shadow-pink-200/40",
    gradientOverlay: "from-pink-500/5 to-transparent",
    accent: "#DB2777",
  },
  historical: {
    bg: "from-orange-50 to-amber-100/50",
    icon: "text-orange-600",
    iconBg: "bg-orange-100",
    border: "border-orange-200/60",
    hoverBorder: "hover:border-orange-300",
    hoverShadow: "hover:shadow-orange-200/40",
    gradientOverlay: "from-orange-500/5 to-transparent",
    accent: "#F59E0B",
  },
  gardens: {
    bg: "from-lime-50 to-lime-100/50",
    icon: "text-lime-600",
    iconBg: "bg-lime-100",
    border: "border-lime-200/60",
    hoverBorder: "hover:border-lime-300",
    hoverShadow: "hover:shadow-lime-200/40",
    gradientOverlay: "from-lime-500/5 to-transparent",
    accent: "#65A30D",
  },
  dams: {
    bg: "from-cyan-50 to-teal-100/50",
    icon: "text-cyan-600",
    iconBg: "bg-cyan-100",
    border: "border-cyan-200/60",
    hoverBorder: "hover:border-cyan-300",
    hoverShadow: "hover:shadow-cyan-200/40",
    gradientOverlay: "from-cyan-500/5 to-transparent",
    accent: "#0891B2",
  },
  zoos: {
    bg: "from-green-50 to-emerald-100/50",
    icon: "text-green-600",
    iconBg: "bg-green-100",
    border: "border-green-200/60",
    hoverBorder: "hover:border-green-300",
    hoverShadow: "hover:shadow-green-200/40",
    gradientOverlay: "from-green-500/5 to-transparent",
    accent: "#16A34A",
  },
};

const DEFAULT_COLORS = {
  bg: "from-gray-50 to-gray-100/50",
  icon: "text-gray-600",
  iconBg: "bg-gray-100",
  border: "border-gray-200/60",
  hoverBorder: "hover:border-gray-300",
  hoverShadow: "hover:shadow-gray-200/40",
  gradientOverlay: "from-gray-500/5 to-transparent",
  accent: "#6B7280",
};

const CategoryCard = ({ category, index }) => {
  const navigate = useNavigate();

  const colors = COLOR_MAP[category.slug] || DEFAULT_COLORS;
  const IconComponent = ICON_MAP[category.icon] || Compass;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative cursor-pointer"
      onClick={() => navigate(`/category/${category.slug}`)}
    >
      {/* Card */}
      <div
        className={`relative overflow-hidden rounded-2xl border ${colors.border} ${colors.hoverBorder} bg-gradient-to-br ${colors.bg} shadow-sm transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl ${colors.hoverShadow}`}
      >
        {/* Subtle gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${colors.gradientOverlay} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />

        {/* Decorative corner circle */}
        <div
          className={`absolute -top-8 -right-8 h-24 w-24 rounded-full ${colors.iconBg} opacity-40 transition-all duration-700 group-hover:scale-[2.5] group-hover:opacity-20`}
        />

        <div className="relative p-6 sm:p-7">
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center rounded-xl ${colors.iconBg} p-3.5 transition-transform duration-500 ease-out group-hover:scale-110`}
          >
            <IconComponent
              size={26}
              className={`${colors.icon} transition-colors duration-300`}
              strokeWidth={1.8}
            />
          </div>

          {/* Name */}
          <h3 className="mt-4 font-heading text-lg font-bold tracking-tight text-dark">
            {category.name}
          </h3>

          {/* Description */}
          {category.description && (
            <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-muted">
              {category.description}
            </p>
          )}

          {/* Divider */}
          <div className="my-4 h-px w-full bg-gradient-to-r from-dark/5 via-dark/8 to-transparent" />

          {/* Explore link */}
          <div className="flex items-center gap-2">
            <span
              className="font-body text-sm font-semibold transition-colors duration-300"
              style={{ color: colors.accent }}
            >
              Explore
            </span>
            <ArrowRight
              size={15}
              strokeWidth={2.5}
              className="transition-all duration-500 group-hover:translate-x-1.5"
              style={{ color: colors.accent }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
