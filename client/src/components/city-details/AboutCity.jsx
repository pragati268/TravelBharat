import { motion } from "framer-motion";
import {
  Calendar,
  Cloud,
  Thermometer,
  Star,
  Users,
} from "lucide-react";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const infoCards = [
  { key: "bestTimeToVisit", icon: Calendar, label: "Best Time to Visit" },
  { key: "climate", icon: Cloud, label: "Climate" },
  {
    key: "averageTemperature",
    icon: Thermometer,
    label: "Temperature",
  },
  { key: "population", icon: Users, label: "Population" },
];

const AboutCity = ({ city }) => {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left: Image */}
          <motion.div variants={fadeUp} className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={city.coverImage?.url}
                alt={city.name}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            {city.featured && (
              <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-full border border-accent/20 bg-accent px-4 py-2.5 shadow-lg shadow-accent/20 sm:-bottom-5 sm:-right-5">
                <Star
                  size={15}
                  strokeWidth={2}
                  className="fill-primary text-primary"
                />
                <span className="font-body text-xs font-bold uppercase tracking-wider text-primary">
                  Featured City
                </span>
              </div>
            )}
          </motion.div>

          {/* Right: Content */}
          <motion.div variants={fadeUp}>
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-accent">
              About
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-dark sm:text-4xl">
              {city.name}
            </h2>

            {city.description && (
              <p className="mt-5 font-body text-base leading-relaxed text-muted sm:text-lg">
                {city.description}
              </p>
            )}

            {/* Info cards grid */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4">
              {infoCards.map(({ key, icon: Icon, label }) => {
                if (!city[key]) return null;
                return (
                  <div
                    key={key}
                    className="rounded-xl border border-primary/8 bg-surface/60 p-4 transition-all duration-300 hover:border-primary/20 hover:bg-white"
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className="text-primary"
                    />
                    <p className="mt-2.5 font-body text-xs text-muted">
                      {label}
                    </p>
                    <p className="mt-0.5 font-heading text-sm font-semibold text-dark">
                      {city[key]}
                    </p>
                  </div>
                );
              })}

              {city.featured && (
                <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 transition-all duration-300 hover:border-accent/40 hover:bg-accent/10">
                  <Star
                    size={18}
                    strokeWidth={1.8}
                    className="text-accent"
                  />
                  <p className="mt-2.5 font-body text-xs text-muted">
                    Status
                  </p>
                  <p className="mt-0.5 font-heading text-sm font-semibold text-dark">
                    Featured City
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCity;
