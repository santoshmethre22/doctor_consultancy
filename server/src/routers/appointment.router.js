

import express, { Router } from "express"

import {
  BookAppointMent,
   acceptAppointment,
   rejectAppointment,
   cancelAppointment
   


} from "../controllers/appointment.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";




const router =Router();
// router.post("/book-appointment/:doctorId", verifyJWT, BookAppointMent)
// router.post("./cancel-appointment/:id",verifyJWT,cancelAppointment)





// todo :doctor 

router.post("",verifyJWT,acceptAppointment);
router.post("",verifyJWT,rejectAppointment);


// todo :  get all the appointemnt of today
// todo :last all the appointment with user details 
// todo : all the Appoint ment of the that where applied 




// todo :user 

router.post("ghjkl",verifyJWT,BookAppointMent);

router.post("",verifyJWT,cancelAppointment);

// todo : get all the appointmen with the doctor 



export default router

