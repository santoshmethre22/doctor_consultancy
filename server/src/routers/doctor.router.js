import express from 'express';
import {  editDoctorDetails, 
    getAllDoctors,
    getDoctorHistroy,
    getCurrentDoctor
} from '../controllers/doctor.controller.js';

    import { verifyJWT } from "../middleware/auth.middleware.js";
   // import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();
router.get('/getAllDoctors', getAllDoctors);
router.post('/editDoctorDetails',verifyJWT, editDoctorDetails);
router.get('/getDoctorHistroy',verifyJWT, getDoctorHistroy);
router.get('/getCurrentDoctor',verifyJWT, getCurrentDoctor);




export default router;



