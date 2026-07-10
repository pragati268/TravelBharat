import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
import upload from "../middleware/uploadMiddleware.js";

import { createTouristPlace, getAllTouristPlaces, getTouristPlaceBySlug, updateTouristPlace, deleteTouristPlace, searchTouristPlaces, getFeaturedTouristPlaces, getUNESCOTouristPlaces, getTouristPlacesByCategory, getTouristPlacesByCity, getTouristPlacesByState } from "../controllers/touristPlaceController.js";

router.post("/", isLoggedIn, isAdmin, upload("tourist-places").fields([
  { name: "coverImage", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
]), createTouristPlace);

router.get("/", getAllTouristPlaces);

router.put("/:id", isLoggedIn, isAdmin, upload("tourist-places").fields([
  { name: "coverImage", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
]), updateTouristPlace);

router.delete("/:id", isLoggedIn, isAdmin, deleteTouristPlace);

router.get("/search", searchTouristPlaces);

router.get("/featured", getFeaturedTouristPlaces);

router.get("/unesco", getUNESCOTouristPlaces);

router.get("/category/:categoryId", getTouristPlacesByCategory);

router.get("/city/:cityId", getTouristPlacesByCity);

router.get("/state/:stateId", getTouristPlacesByState);

router.get("/:slug", getTouristPlaceBySlug); 

export default router;