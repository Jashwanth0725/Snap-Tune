import express from 'express';

import cors from 'cors';                     // Importing cors to handle cross-origin requests
// import cookieParser from 'cookie-parser'; // Importing cookie-parser to parse cookies 

const app = express();                      // Creating an instance of express

app.use(cors({
    origin: `${process.env.CORS_ORIGIN}`, // Allowing requests from the specified origin
    credentials: true                      // Allowing credentials to be included in the requests
}))

app.use(express.json({ limit: '20kb' }));    // Parsing JSON requests with a limit of 20kb
app.use(express.urlencoded({ extended: true, limit: '20kb' })); // Parsing URL-encoded requests
app.use(express.static('public'));       // Serving static files from the 'public' directory

export default app; 