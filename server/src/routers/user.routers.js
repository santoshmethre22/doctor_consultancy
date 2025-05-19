import { Router } from "express";
import { 
    login,  
    logout,  
    register,  
    uploadPhoto,
    getUser
    
    
} from "../controllers/user.controller.js";



import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";



const router = Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.post("/logout", verifyJWT, logout);

router.get("/get-user", verifyJWT, getUser);


// todo : here you need to add the upload method ----------------------------->

router.post("/upload/:userId",verifyJWT,upload.single('avatar'),uploadPhoto)



// Future secured routes
// router.patch("/update-account", verifyJWT, updateAccountDetails);
// router.post("/updatephoto", upload.single("file"), verifyJWT, updatePhoto);

export default router;
