import { AuthController } from "@controllers/AuthController";
import { Router } from "express";

const router = Router();

router.post("/login", AuthController.AdminLogin);
router.post("/create", AuthController.createAdmin);
export default router;
