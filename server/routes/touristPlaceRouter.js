import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";

import { createTouristPlace, getAllTouristPlaces, getTouristPlaceBySlug, updateTouristPlace, deleteTouristPlace, searchTouristPlaces, getFeaturedTouristPlaces, getUNESCOTouristPlaces, getTouristPlacesByCategory, getTouristPlacesByCity, getTouristPlacesByState } from "../controllers/touristPlaceController.js";

router.post("/", isLoggedIn, isAdmin, createTouristPlace);

router.get("/", getAllTouristPlaces);

router.put("/:id", isLoggedIn, isAdmin, updateTouristPlace);

router.delete("/:id", isLoggedIn, isAdmin, deleteTouristPlace);

router.get("/search", searchTouristPlaces);

router.get("/featured", getFeaturedTouristPlaces);

router.get("/unesco", getUNESCOTouristPlaces);

router.get("/category/:categoryId", getTouristPlacesByCategory);

router.get("/city/:cityId", getTouristPlacesByCity);

router.get("/state/:stateId", getTouristPlacesByState);

router.get("/:slug", getTouristPlaceBySlug); 

export default router;