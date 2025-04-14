import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { generateController } from '../controllers/generate.controller.js';

const aiApiRouter = Router();

aiApiRouter.route('/caption').post(
    upload.single('image'),
    generateController
)

export default aiApiRouter;