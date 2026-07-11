import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import States from "../pages/States";
import StateDetails from "../pages/StateDetails";
import CityDetails from "../pages/CityDetails";
import TouristPlaceDetails from "../pages/TouristPlaceDetails";
import Categories from "../pages/Categories";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/states" element={<States />} />
      <Route path="/states/:slug" element={<StateDetails />} />
      <Route path="/cities/:slug" element={<CityDetails />} />
      <Route path="/tourist-place/:slug" element={<TouristPlaceDetails />} />
      <Route path="/categories/:slug" element={<Categories />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
