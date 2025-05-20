import express from 'express';
import {  editDoctorDetails, 
    getAllDoctors,
    getDoctorHistroy,
    getCurrentDoctor,

} from '../controllers/doctor.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js";
   // import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();
router.put('/edit-doctor-details',verifyJWT, editDoctorDetails);
router.get('/getDoctorHistroy',verifyJWT, getDoctorHistroy);
router.get('/get-doctor-info',verifyJWT, getCurrentDoctor);
router.get('/get-all-doctor', getAllDoctors);




export default router;



