import express from "express";
import {
  getCurrentWeather,
  getForecast,
  getAirPollution,
  getDirectGeocoding,
} from "../controllers/weatherController";

const router = express.Router();

router.get("/current", getCurrentWeather);
router.get("/forecast", getForecast);
router.get("/air_pollution", getAirPollution);
router.get("/geo/direct", getDirectGeocoding);

export default router;
