import express from 'express';
import * as providerController from './providerController.js';
import * as authController from '../authModule/authController.js';
import {fileUpload, multiFileUpload} from '../../middelwares/fileUpload.js'
import { createProtectMiddleware, restrictTo } from '../../middelwares/authMiddleware.js';
import providerModel from '../../../database/models/providerModel.js';
import validate from '../../middelwares/joiValidation.js';
import { deleteSchema, editSchema, providerSchemaValidation, updateMyProfileSchema, viewSchema } from './providerValidation.js';
import { forgetPasswordValidationSchema, loginValidationSchema, resetPasswordValidationSchema, updatePasswordValidationSchema, verifyEmailValidationSchema } from '../authModule/authValidation.js';
import upload from '../../utils/formatImage.js';


const providerRouter = express.Router();

providerRouter.post('/signup',  upload.single('logo' , 'provider') ,validate(providerSchemaValidation)  , providerController.signup);
  
providerRouter.post('/verifyEmail',validate(verifyEmailValidationSchema) ,authController.verifyEmail(providerModel))
providerRouter.post('/login',validate(loginValidationSchema) ,  authController.login(providerModel));



providerRouter.post('/forgetPassword', validate(forgetPasswordValidationSchema),authController.forgetPassword(providerModel));
providerRouter.patch( '/resetPassword', validate(resetPasswordValidationSchema),authController.resetPassword(providerModel)
);


providerRouter.get('/logout', createProtectMiddleware(providerModel) , restrictTo('provider') , authController.logout);


providerRouter.patch( '/updatePassword', createProtectMiddleware(providerModel) , restrictTo('provider'), validate(updatePasswordValidationSchema)
  ,authController.updatePassword(providerModel)
);


providerRouter.get('/getCanandidatesBadges' , createProtectMiddleware(providerModel), restrictTo('provider'),
providerController.getAllCandidatesWithBadgesForProvider);


//new router
// providerRouter.get('/getCanandidatesBadges' , createProtectMiddleware(providerModel), restrictTo('provider'),
// providerController.viewCandidateBadges);
providerRouter.get('/getCanandidatesBadgesForProvider/:candidateId' , createProtectMiddleware(providerModel), restrictTo('provider'),
providerController.getAllBadgesForCandidateByIdPovider);
// getAllBadgesForCandidateByIdPovider
providerRouter.get('/getPendingBadges', createProtectMiddleware(providerModel),restrictTo('provider'),
providerController.getAllCandidatesWithpendingBadgesForProvider);


providerRouter.get('/getDeclinedBadges',createProtectMiddleware(providerModel),restrictTo('provider'),
 providerController.getDeclinedBadgesForProvider);


providerRouter.delete('/deleteDeclinedBadges/:candidateBadgeId',createProtectMiddleware(providerModel),restrictTo('provider'), validate(deleteSchema),
providerController.deleteCandidateBadgeForProvider);

//validate(editSchema),
providerRouter.patch('/updateDeclinedBadges/:candidateBadgeId', createProtectMiddleware(providerModel),restrictTo('provider'), 
providerController.editCandidateBadgeForProvider);

providerRouter.get('/viewCandidateBadge/:candidateBadgeId', createProtectMiddleware(providerModel),restrictTo('provider'),validate(viewSchema),
providerController.viewCandidateBadgeForProvider);

// validate(updateMyProfileSchema)  need to check validation
providerRouter.post('/updateMyProfile', createProtectMiddleware(providerModel),
 restrictTo('provider') ,providerController.updateMyProfile)


  providerRouter.post('/updateLogo', createProtectMiddleware(providerModel), 
  restrictTo('provider'), upload.single('logo') ,  providerController.updateMyPhoto)

export default providerRouter;