import { Router } from 'express';
// import { registerUser, loginUser, logOutUser, refreshAccessToken } from '../controllers/user.controller.js'; // Importing the register controller
import { upload } from '../middlewares/multer.middleware.js';
// import { verifyJWT } from '../middlewares/auth.middleware.js';
import { captionSaveDatabase, summarySaveDatabase, userSaveDatabase, userPayment } from '../controllers/database.controller.js';
import { userHistory } from '../controllers/history.controller.js'

const userRouter = Router();

// userRouter.route('/register').post(
//     upload.fields([
//         {
//             name: "profilePic",
//             maxCount: 1,
//         }
//     ]),
//     registerUser
// );

// userRouter.route('/login').post(upload.none()
//     , loginUser);

// //secured routes
// userRouter.route("/logout").post(verifyJWT, logOutUser);

// userRouter.route("/refresh-token").post(refreshAccessToken);


userRouter.route("/userdetails").post(userSaveDatabase);

userRouter.route("/caption").post(upload.single('image'), captionSaveDatabase);

userRouter.route("/summary").post(summarySaveDatabase);

userRouter.route("/payment").post(userPayment);

userRouter.route("/history/:userId").get(userHistory);

export default userRouter; ``