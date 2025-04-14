import { Router } from 'express';
import { registerUser, loginUser, logOutUser, refreshAccessToken } from '../controllers/user.controller.js'; // Importing the register controller
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

userRouter.route('/login').post(upload.none()
    , loginUser);

//secured routes
userRouter.route("/logout").post(verifyJWT, logOutUser);

userRouter.route("/refresh-token").post(refreshAccessToken);

export default userRouter;