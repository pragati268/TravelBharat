import Hero from "../../components/home/Hero";
import FeaturedStates from "../../components/home/FeaturedStates/FeaturedStates";
import ExploreByCategories from "../../components/home/ExploreByCategories/ExploreByCategories";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedStates />
      <ExploreByCategories />
    </div>
  );
};

export default Home;
