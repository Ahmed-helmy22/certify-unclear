import express from 'express';
// import rateLimit  from 'express-rate-limit';
const app = express();
import dotenv from'dotenv';
dotenv.config()
import helmet  from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss  from 'xss-clean';
import cloudinary from 'cloudinary';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import errorController from './src/utils/errorController.js';
import providerRouter from './src/modules/provider/providerRouter.js';
import badgeRouter from './src/modules/badgeModule/badgeRouter.js';
import examinerRouter from './src/modules/examiner/examinerRouter.js';
import candidateRouter from './src/modules/candidateModule/candidateRouter.js';
import adminRouter from './src/modules/adminModule/adminRouter.js';
import authRouter from './src/modules/authModule/authRouter.js';
import externalBadgeRouter from './src/modules/externalBadgeModule/externalBadgeRouter.js';
import AppErr from './src/utils/appErr.js';
 

// set security http Headers

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'https://res.cloudinary.com'],
      // Add other directives as needed
    },
  })
);

app.use(express.json());

// Data sanitization against no sql injection,,mongoSanitize() returns a middleware function
app.use(mongoSanitize());
app.use(xss()); 
app.use(express.static('public'));
const __dirname = dirname(fileURLToPath(import.meta.url));

//app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(express.urlencoded({ extended: false }));


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


app.use('/api/v1/provider',providerRouter);
app.use('/api/v1/badge',badgeRouter);
app.use('/api/v1/examiner',examinerRouter);
app.use('/api/v1/candidate',candidateRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/externalBadge',externalBadgeRouter);


// app.get('*', (req, res) => {
//    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
// });


app.all('*', (req, res, next) => {
  next(new AppErr(`cannot find this ${req.originalUrl} on the server`, 404));
});

app.use(errorController);


export default app;
