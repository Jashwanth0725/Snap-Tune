import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // cb(null, uniqueSuffix + '-' + file.originalname);
        cb(null, file.originalname);
    }
});
export const upload = multer({ storage: storage });