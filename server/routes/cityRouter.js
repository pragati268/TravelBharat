import express from "express";
const router = express.Router();

import { createCity, getAllCities, getCityBySlug, updateCity, deleteCity } from "../controllers/cityController.js";

router.post("/", createCity);
router.get("/all", getAllCities);
router.get("/slug/:slug", getCityBySlug);
router.put("/update/:id", updateCity);
router.delete("/delete/:id", deleteCity);


export default router;