import { Router } from 'express';
import { registerUser, loginUser, logOutUser } from '../controllers/user.controller.js'; // Importing the register controller
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const userRouter = Router();

userRouter.route('/register').post(
    upload.fields([
        {
            name: "profilePic",
            maxCount: 1,
        }
    ]),
    registerUser
);

userRouter.route('/login').post(loginUser);

//secured routes
userRouter.route("/logout").post(verifyJWT, logOutUser);

export default userRouter;