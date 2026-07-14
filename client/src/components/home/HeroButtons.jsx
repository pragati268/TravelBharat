import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.7 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HeroButtons = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative z-10 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5 md:mt-10"
    >
      <motion.button
        variants={fadeUp}
        onClick={() => navigate("/states")}
        className="group flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 font-body text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/25 sm:px-8 sm:py-4 sm:text-base"
      >
        Explore Destinations
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </motion.button>

      <motion.button
        variants={fadeUp}
        onClick={() => navigate("/about")}
        className="group flex items-center gap-2.5 rounded-full border-2 border-white/30 bg-white/10 px-7 py-3.5 font-body text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20 hover:scale-105 sm:px-8 sm:py-4 sm:text-base"
      >
        <Play
          size={16}
          className="transition-transform duration-300 group-hover:scale-110"
        />
        Plan Your Journey
      </motion.button>
    </motion.div>
  );
};

export default HeroButtons;
