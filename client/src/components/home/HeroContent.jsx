import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const HeroContent = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative z-10 mx-auto max-w-4xl px-4 text-center"
    >
      <motion.h1
        variants={fadeUp}
        className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Discover the Soul
        <br />
        <span className="text-accent">of India</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mx-auto mt-5 max-w-2xl font-body text-base leading-relaxed text-white/80 sm:text-lg md:mt-6 md:text-xl"
      >
        Explore breathtaking destinations, rich heritage,
        <br className="hidden sm:block" /> vibrant cultures, and unforgettable
        journeys.
      </motion.p>
    </motion.div>
  );
};

export default HeroContent;
