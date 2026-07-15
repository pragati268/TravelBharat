import Hero from "../../components/home/Hero";
import FeaturedStates from "../../components/home/FeaturedStates/FeaturedStates";
import FeaturedDestinations from "../../components/home/FeaturedDestinations/FeaturedDestinations";
import UNESCOHeritage from "../../components/home/UNESCOHeritage/UNESCOHeritage";
import ExploreByCategories from "../../components/home/ExploreByCategories/ExploreByCategories";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedStates />
      <FeaturedDestinations />
      <UNESCOHeritage />
      <ExploreByCategories />
    </div>
  );
};

export default Home;
