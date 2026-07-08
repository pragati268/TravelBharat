import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";

import { createCity, getAllCities, getCityBySlug, updateCity, deleteCity, getCitiesByStateId } from "../controllers/cityController.js";

router.post("/", isLoggedIn, isAdmin, createCity);
router.get("/", getAllCities);
router.get("/:slug", getCityBySlug);
router.put("/:id", isLoggedIn, isAdmin, updateCity);
router.delete("/:id", isLoggedIn, isAdmin, deleteCity);
router.get("/:stateId/cities", getCitiesByStateId);


export default router;