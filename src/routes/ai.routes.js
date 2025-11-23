import { Router } from "express";
import { generateReview } from "../controller/ai.controller.js";

const router = Router()

router.route('/get-review').post(generateReview)


export default router