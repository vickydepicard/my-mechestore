import express from "express";
import { getProductById } from "../controllers/productController";

const router = express.Router();

router.get("/:id", getProductById);

export default router;
