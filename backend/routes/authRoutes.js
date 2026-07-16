import express from "express";
<<<<<<< HEAD
import { registerUser, loginUser } from "../controllers/authController.js";
=======
import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";
>>>>>>> d332f3876260dcf16ee5fddbfb1e28dbe1c4d94c

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;