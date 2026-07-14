import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import States from "../pages/States/States";
import StateDetails from "../pages/StateDetails/StateDetails";
import CityDetails from "../pages/CityDetails/CityDetails";
import TouristPlaceDetails from "../pages/TouristPlaceDetails/TouristPlaceDetails";
import Categories from "../pages/Categories/Categories";
import About from "../pages/About/About";
import Search from "../pages/Search/Search";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Admin/Dashboard";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/states" element={<States />} />
        <Route path="/states/:slug" element={<StateDetails />} />
        <Route path="/cities/:slug" element={<CityDetails />} />
        <Route
          path="/tourist-place/:slug"
          element={<TouristPlaceDetails />}
        />
        <Route path="/category/:slug" element={<Categories />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<Dashboard />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
