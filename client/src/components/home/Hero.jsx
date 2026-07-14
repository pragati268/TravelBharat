import HeroSlider from "./HeroSlider";
import HeroContent from "./HeroContent";
import HeroButtons from "./HeroButtons";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <HeroSlider />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center pb-24 pt-28 sm:pt-36 sm:pb-28 md:pb-32">
        <HeroContent />
        <HeroButtons />
      </div>

    </section>
  );
};

export default Hero;
