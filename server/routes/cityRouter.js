import express from "express";
const router = express.Router();

import { createCity, getAllCities, getCityBySlug, updateCity, deleteCity } from "../controllers/cityController.js";

router.post("/", createCity);
router.get("/", getAllCities);
router.get("/:slug", getCityBySlug);
router.put("/:id", updateCity);
router.delete("/:id", deleteCity);


export default router;