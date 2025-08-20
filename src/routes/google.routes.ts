import express from "express";
import { googleRegister } from "../controllers/google.controller";

const router = express.Router();

const googleRoutes = () => {
	router.post("/register", googleRegister);
	return router;
};

export { googleRoutes };
