import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { captionController, reCaptionController, summaryController, reSummaryController } from '../controllers/generate.controller.js';

const aiApiRouter = Router();

aiApiRouter.route('/caption').post(
    upload.single('image'),
    captionController
)


aiApiRouter.route('/re-caption').post(
    upload.single('image'),
    reCaptionController
)

aiApiRouter.route('/summary').post(summaryController)

aiApiRouter.route('/re-summary').post(reSummaryController)



export default aiApiRouter;