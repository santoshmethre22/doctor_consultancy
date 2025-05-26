
import express, { Router } from "express"

import {
  BookAppointMent,
   acceptAppointment,
   rejectAppointment,
   cancelAppointment,
   getAllpendingAppointments
   

} from "../controllers/appointment.controller.js"

import { verifyJWT } from "../middleware/auth.middleware.js";

const router =Router();


// todo :doctor -------------------------------------->
router.post("/accept-appointment",verifyJWT,acceptAppointment);
router.post("/reject-appointment",verifyJWT,rejectAppointment);


router.get("/pending-appointments/:id",verifyJWT,getAllpendingAppointments);

// todo :  get all the appointemnt of today
// todo :last all the appointment with user details 
// todo : all the Appoint ment of the that where applied 




// todo :user 
router.post("/book-appointment/:id",verifyJWT,BookAppointMent);
router.post("/cancel-appointment",verifyJWT,cancelAppointment);

// todo : get all the appointmen with the doctor



export default router

