import Express from 'express';
import { getAllCandidateBadges, getAllProvidersInfo, getAllExaminersInfo,
       getAllCandidatesInfo, deleteProvider, editProvider, viewProvider, deleteExaminer, 
       editExaminer, viewExaminer, deleteCandidate, editCandidate,
       viewCandidate, suspendExaminer, approveExaminer, suspendCandidate,
      approveCandidate, suspendProvider, approveProvider ,updateMyPhoto} from './adminController.js';

import { fileUpload } from '../../middelwares/fileUpload.js';
import candidateModel from '../../../database/models/candidateModel.js';
import { createProtectMiddleware, restrictTo } from '../../middelwares/authMiddleware.js';
import validate from '../../middelwares/joiValidation.js';
import  {getAllCandidateBadgesSchema, approveUserSchema, deleteUserSchema, editCandidateSchema, editExaminerSchema, editProviderSchema, getAllCandidatesInfoSchema, getAllProvidersInfoSchema, suspendUserSchema, viewUserSchema } from './adminValidation.js'
import upload from '../../utils/formatImage.js';


const adminRouter = Express.Router();


// Routes for badge management
// ,validate(getAllCandidateBadgesSchema) cancel validation and it work
adminRouter.get('/getAllCandidateBadges',createProtectMiddleware(candidateModel),restrictTo('admin') , getAllCandidateBadges);

// Routes for provider management
// , validate(getAllProvidersInfoSchema)
adminRouter.get('/getAllProvidersInfo',createProtectMiddleware(candidateModel),restrictTo('admin') ,getAllProvidersInfo);
adminRouter.delete('/deleteProvider/:userId', createProtectMiddleware(candidateModel),restrictTo('admin') ,validate(deleteUserSchema),deleteProvider);
adminRouter.get('/viewProvider/:userId',createProtectMiddleware(candidateModel),restrictTo('admin') ,validate(viewUserSchema) ,  viewProvider);
adminRouter.patch('/editProvider/:userId',createProtectMiddleware(candidateModel),restrictTo('admin') , upload.single('logo'),validate(editProviderSchema), editProvider);
adminRouter.patch('/suspendProvider/:userId',createProtectMiddleware(candidateModel),restrictTo('admin') ,validate(suspendUserSchema), suspendProvider);
adminRouter.patch('/approveProvider/:userId',createProtectMiddleware(candidateModel),restrictTo('admin') ,validate(approveUserSchema), approveProvider);

// Routes for examiner management
// , validate(getAllProvidersInfoSchema)
adminRouter.get('/getAllExaminersInfo',createProtectMiddleware(candidateModel),restrictTo('admin')  , getAllExaminersInfo);
adminRouter.delete('/deleteExaminer/:userId',createProtectMiddleware(candidateModel),restrictTo('admin') ,validate(deleteUserSchema), deleteExaminer);
adminRouter.get('/viewExaminer/:userId', createProtectMiddleware(candidateModel),restrictTo('admin') ,validate(viewUserSchema) ,viewExaminer);

// ,validate(editExaminerSchema)
adminRouter.patch('/editExaminer/:userId', createProtectMiddleware(candidateModel),restrictTo('admin') ,upload.single('examinerProfilePhoto'),  editExaminer);
adminRouter.patch('/suspendExaminer/:userId', createProtectMiddleware(candidateModel),restrictTo('admin') ,validate(suspendUserSchema),suspendExaminer);
adminRouter.patch('/approveExaminer/:userId',createProtectMiddleware(candidateModel),restrictTo('admin') , validate(approveUserSchema),approveExaminer);
adminRouter.patch('/editExaminer/:userId',createProtectMiddleware(candidateModel),restrictTo('admin') , upload.single('examinerProfilePhoto'),validate(editExaminerSchema), editExaminer);
// Routes for candidate management
// ,validate(getAllCandidatesInfoSchema)
adminRouter.get('/getAllCandidatesInfo',createProtectMiddleware(candidateModel),restrictTo('admin') , getAllCandidatesInfo);
adminRouter.delete('/deleteCandidate/:userId', createProtectMiddleware(candidateModel),restrictTo('admin') ,validate(deleteUserSchema),deleteCandidate);
adminRouter.get('/viewCandidate/:userId', createProtectMiddleware(candidateModel),restrictTo('admin') ,validate(viewUserSchema),viewCandidate);
adminRouter.patch('/editCandidate/:userId',createProtectMiddleware(candidateModel),restrictTo('admin') , upload.single('candidateProfilePhoto'),validate(editCandidateSchema), editCandidate);
adminRouter.patch('/suspendCandidate/:userId', createProtectMiddleware(candidateModel),restrictTo('admin') ,validate(suspendUserSchema),suspendCandidate);
adminRouter.patch('/approveCandidate/:userId',createProtectMiddleware(candidateModel),restrictTo('admin') ,  validate(approveUserSchema),approveCandidate);

adminRouter.post('/updateMyPhoto', createProtectMiddleware(candidateModel), restrictTo('admin'), 
  upload.single('candidateProfilePhoto') , 
  updateMyPhoto)

export default adminRouter;
