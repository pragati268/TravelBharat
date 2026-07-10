import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
import upload from "../middleware/uploadMiddleware.js";

import { createCity, getAllCities, getCityBySlug, updateCity, deleteCity, getCitiesByStateId } from "../controllers/cityController.js";

router.post("/", isLoggedIn, isAdmin, upload("cities").single("coverImage"), createCity);
router.get("/", getAllCities);
router.get("/:slug", getCityBySlug);
router.put("/:id", isLoggedIn, isAdmin, upload("cities").single("coverImage"), updateCity);
router.delete("/:id", isLoggedIn, isAdmin, deleteCity);
router.get("/:stateId/cities", getCitiesByStateId);


export default router;