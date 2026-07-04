import express from "express";
const router = express.Router();

import { createTouristPlace, getAllTouristPlaces, getTouristPlaceBySlug, updateTouristPlace, deleteTouristPlace } from "../controllers/touristPlaceController.js";

router.post("/", createTouristPlace);

router.get("/", getAllTouristPlaces);

router.get("/:slug", getTouristPlaceBySlug);

router.put("/:id", updateTouristPlace);

router.delete("/:id", deleteTouristPlace);