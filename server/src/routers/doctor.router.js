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


/* 

        {
            "patientId": [],
            "_id": "681330faac7708ada9044da1",
            "userId": {
                "_id": "681330faac7708ada9044d9f",
                "name": "User531",
                "username": "user5301",
                "email": "user5301@example.com",
                "phone": "9000000513",
                "appointmentId": [],
                "role": "doctor",
                "bio": "No bio provided",
                "createdAt": "2025-05-01T08:29:46.261Z",
                "updatedAt": "2025-05-01T08:29:46.261Z"
            },
            "patients": [],
            "qualification": "",
            "speciality": "",
            "experience": "",
            "fee": "",
            "appointment": [],
            "createdAt": "2025-05-01T08:29:46.350Z",
            "updatedAt": "2025-05-01T08:29:46.350Z",
            "__v": 0
        },
*/





export default router;



