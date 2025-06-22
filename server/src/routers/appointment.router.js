
import express, { Router } from "express"

import {
  BookAppointMent,
   acceptAppointment,
   rejectAppointment,
   cancelAppointment,
   getAllDoctorappointments,
   getUserAppointment

} from "../controllers/appointment.controller.js"

import { verifyJWT } from "../middleware/auth.middleware.js";

const router =Router();


// todo :doctor -------------------------------------->
router.patch("/accept-appointment/:id",verifyJWT,acceptAppointment);
router.post("/reject-appointment/:id",verifyJWT,rejectAppointment);

// todo :user 
router.post("/book-appointment/:id",verifyJWT,BookAppointMent);// here id is doctorid;
router.patch("/cancel-appointment/:id",verifyJWT,cancelAppointment);// here id is appointment id;
router.get("/get-user-appointment",verifyJWT,getUserAppointment);


// todo : get all the appointmen with the doctor
router.get("/get-all-appointments",verifyJWT,getAllDoctorappointments);


export default router

