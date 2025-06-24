import express, { Router } from "express"
import {chatmodel} from "../controllers/chat.controllers.js"


const router =Router();

router.post("/chat-gemini",chatmodel);

// for the socket.io connection

export default router;