import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  googleLogin,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";

const router: Router = express.Router();

router.get("/ping", (req, res) => {
  res.status(200).json({ message: "Server is awake" });
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
