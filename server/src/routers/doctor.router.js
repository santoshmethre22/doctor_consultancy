import express from 'express';
import {  editDoctorProfile, 
    getAllDoctors,
    getDoctorHistroy} from '../controllers/doctor.controller.js';

    import { verifyJWT } from "../middleware/auth.middleware.js";
    import { upload } from "../middleware/multer.middleware.js";





const router = express.Router();
router.get('/getAllDoctors', getAllDoctors);
router.post('/editProfile',verifyJWT, editDoctorProfile);
router.get('/getDoctorHistroy',verifyJWT, getDoctorHistroy);

export default router;



