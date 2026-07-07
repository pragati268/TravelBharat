import express from "express";
const router = express.Router();

import { createTouristPlace, getAllTouristPlaces, getTouristPlaceBySlug, updateTouristPlace, deleteTouristPlace, searchTouristPlaces, getFeaturedTouristPlaces, getUNESCOTouristPlaces, getTouristPlacesByCategory, getTouristPlacesByCity, getTouristPlacesByState } from "../controllers/touristPlaceController.js";

router.post("/", createTouristPlace);

router.get("/", getAllTouristPlaces);

router.put("/:id", updateTouristPlace);

router.delete("/:id", deleteTouristPlace);

router.get("/search", searchTouristPlaces);

router.get("/featured", getFeaturedTouristPlaces);

router.get("/unesco", getUNESCOTouristPlaces);

router.get("/category/:categoryId", getTouristPlacesByCategory);

router.get("/city/:cityId", getTouristPlacesByCity);

router.get("/state/:stateId", getTouristPlacesByState);

router.get("/:slug", getTouristPlaceBySlug); 

export default router;