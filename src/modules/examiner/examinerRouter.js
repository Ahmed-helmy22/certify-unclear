import express from 'express';
import * as examinerController from './examinerController.js';
import * as authController from '../authModule/authController.js';
import { fileUpload, multiFileUpload } from '../../middelwares/fileUpload.js'
import { createProtectMiddleware, restrictTo } from '../../middelwares/authMiddleware.js';
import examinerModel from '../../../database/models/examinerModel.js';
import validate from '../../middelwares/joiValidation.js';
import { approveSchema, declineSchema, signupSchema, updateSchema, viewSchema } from './examinerValidation.js';
import { forgetPasswordValidationSchema, loginValidationSchema, resetPasswordValidationSchema, updatePasswordValidationSchema, verifyEmailValidationSchema } from '../authModule/authValidation.js';
import upload from '../../utils/formatImage.js';


const examinerRouter = express.Router();

examinerRouter.post('/signup', upload.fields(
  [
    { name: 'examinerPassportPhoto', maxCount: 1 },
    { name: 'examinerVerificationPhoto', maxCount: 1 },
  ]
),validate(signupSchema) , examinerController.signup);


examinerRouter.post('/verifyEmail', validate(verifyEmailValidationSchema),authController.verifyEmail(examinerModel))
examinerRouter.post('/login',validate(loginValidationSchema), authController.login(examinerModel));
examinerRouter.get('/logout', createProtectMiddleware(examinerModel) , restrictTo('examiner') , authController.logout);
examinerRouter.post('/forgetPassword', validate(forgetPasswordValidationSchema),authController.forgetPassword(examinerModel));
examinerRouter.patch('/resetPassword', validate(resetPasswordValidationSchema),authController.resetPassword(examinerModel));
examinerRouter.patch('/updatePassword', createProtectMiddleware(examinerModel), validate(updatePasswordValidationSchema),authController.updatePassword(examinerModel));


examinerRouter.get('/candidateBadges', createProtectMiddleware(examinerModel), restrictTo('examiner'),
  examinerController.getAllExaminerCandidateBadges);


 // no need for this now
examinerRouter.get('/publishedCandidateBadges', createProtectMiddleware(examinerModel), restrictTo('examiner'),
  examinerController.getAllExaminerPublishedCandidateBadges);


  examinerRouter.get('/pendingCandidateBadges', createProtectMiddleware(examinerModel), restrictTo('examiner'),
  examinerController.getAllExaminerPendingCandidateBadges);


examinerRouter.get('/approveCandidateBadge/:candidateBadgeId', createProtectMiddleware(examinerModel), restrictTo('examiner'),
  validate(approveSchema),examinerController.ExaminerApproveCandidateBadge)

examinerRouter.post('/declineCandidateBadge/:candidateBadgeId', createProtectMiddleware(examinerModel), restrictTo('examiner'),
  validate(declineSchema),examinerController.ExaminerDeclineCandidateBadge);

examinerRouter.get('/viewCandidateBadge/:candidateBadgeId', createProtectMiddleware(examinerModel), restrictTo('examiner'),
  validate(viewSchema),examinerController.examinerViewCandidateBadge)

  // validate(updateSchema),
  examinerRouter.post('/updateMyProfile', createProtectMiddleware(examinerModel), restrictTo('examiner'), validate(updateSchema),
  examinerController.updateMyProfile)
  
  examinerRouter.post('/updateMyPhoto', createProtectMiddleware(examinerModel), restrictTo('examiner'), 
  upload.single('examinerProfilePhoto') ,
  examinerController.updateMyPhoto)


export default examinerRouter;