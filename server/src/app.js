import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import server from "./utils/socket.io.js";

// import { app } from "./utils/socket.io.js";

const app = express();


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());



// Routes
import userRouter from "./routers/user.routers.js";
import appointmentRouter from "./routers/appointment.router.js"
import doctorRouter from "./routers/doctor.router.js"
import hostpitalRouter from "./routers/hospital.router.js"
import chatRouter from "./routers/chat.routers.js"

app.use("/api/v1/user", userRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/appointment",appointmentRouter)
app.use("/api/v1/hospital",hostpitalRouter);
app.use("/api/v1/chat",chatRouter);
// Default route


export { app };
