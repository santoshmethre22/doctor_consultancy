import express, { Router } from "express"
import {chatmodel} from "../controllers/chat.controllers.js"


const router =Router();

router.post("/chat-gemini",chatmodel);

export default router;