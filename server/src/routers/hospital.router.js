import express, { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware.js";

import
{

addHospital,
verifyHospital
}

from "../controllers/hospital.controller.js"


const router =Router();

router.post("/add-hospital",verifyJWT,addHospital)
router.post("/verify",verifyJWT,verifyHospital);


export default router;



