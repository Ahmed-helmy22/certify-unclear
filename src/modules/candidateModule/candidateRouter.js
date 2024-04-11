import express from 'express';
import * as candidateController from './candidateController.js';
import * as authController from '../authModule/authController.js';
import candidateModel from '../../../database/models/candidateModel.js';
import { createProtectMiddleware, restrictTo } from '../../middelwares/authMiddleware.js';
import validate from '../../middelwares/joiValidation.js';
import { getAllBadgesForCandidateSchema, getCandidateProfileSchema, getSingleCandidateBadgeSchema, signupSchema, updateMyProfileSchema, } from './candidateValidation.js';
import { forgetPasswordValidationSchema, loginValidationSchema, resetPasswordValidationSchema, updatePasswordValidationSchema, verifyEmailValidationSchema } from '../authModule/authValidation.js';
import upload from '../../utils/formatImage.js';


const candidateRouter = express.Router();

candidateRouter.post('/signup', upload.fields(
    [
      { name: 'candidatePassportPhoto', maxCount: 1 },
      { name: 'candidateVerificationPhoto', maxCount: 1 },
    ]), validate(signupSchema), candidateController.signup);

  candidateRouter.post('/verifyEmail', validate(verifyEmailValidationSchema),authController.verifyEmail(candidateModel))
  candidateRouter.post('/login', validate(loginValidationSchema),authController.login(candidateModel));
  candidateRouter.get('/logout', createProtectMiddleware(candidateModel) , restrictTo('candidate' , 'admin') , authController.logout);
  
  candidateRouter.post('/forgetPassword', validate(forgetPasswordValidationSchema),authController.forgetPassword(candidateModel) );
  candidateRouter.patch('/resetPassword',validate(resetPasswordValidationSchema),authController.resetPassword(candidateModel)
  
  );
  candidateRouter.patch( '/updatePassword', createProtectMiddleware(candidateModel) ,restrictTo('candidate' , 'admin'),validate(updatePasswordValidationSchema), authController.updatePassword(candidateModel));


 
  candidateRouter.get('/getMyProfile', createProtectMiddleware(candidateModel),restrictTo('candidate', 'admin'),candidateController.getMyProfile);


  candidateRouter.post('/getCandidateProfile',candidateController.getCandidateProfile);

  // needto be added
  candidateRouter.get('/getCandidateProfile/:candidateId',candidateController.getCandidateProfileById); 


   // needto be added
   candidateRouter.get('/getsingleCandidateBadge/:candidateBadgeId',candidateController.getSingleCandidateBadgebyBadgeId);

  candidateRouter.get('/getAllBadges/:candidateId' , candidateController.getAllBadgesForCandidateById);

 
  candidateRouter.post('/getsingleCandidateBadge',validate(getSingleCandidateBadgeSchema),candidateController.getSingleCandidateBadge);

  // candidateRouter.get('/getAllBadges' , validate(getAllBadgesForCandidateSchema),candidateController.getAllBadgesForCandidate);
  candidateRouter.get('/getMyAllBadges' , createProtectMiddleware(candidateModel),restrictTo('candidate') ,candidateController.getMyAllBadges);


  candidateRouter.post('/updateMyProfile', createProtectMiddleware(candidateModel), restrictTo('candidate'), validate(updateMyProfileSchema),
  candidateController.updateMyProfile)


  candidateRouter.post('/updateMyPhoto', createProtectMiddleware(candidateModel), restrictTo('candidate'), 
  upload.single('candidateProfilePhoto') , 
  candidateController.updateMyPhoto)


export default candidateRouter;