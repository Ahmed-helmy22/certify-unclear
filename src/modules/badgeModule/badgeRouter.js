import Express from 'express';
import * as badgeController from './badgeController.js';
import {fileUpload , multiFileUpload} from '../../middelwares/fileUpload.js'
import { createProtectMiddleware, restrictTo } from '../../middelwares/authMiddleware.js';
import providerModel from '../../../database/models/providerModel.js';
import validate from '../../middelwares/joiValidation.js';
import { addBadgeSchema, addBadgeToSchema, deleteBadgeSchema, updateBadgePhotoSchema, updateBadgeSchema, viewBadgeSchema } from './badgeValidation.js';
import upload from '../../utils/formatImage.js';

const badgeRouter = Express.Router();

// { name: 'badgePhoto', maxCount: 1 },
badgeRouter.post('/addBadge', createProtectMiddleware(providerModel),upload.single('badgePhoto'),restrictTo('provider') , badgeController.addBage);
badgeRouter.post('/addBadgeToCandidate', createProtectMiddleware(providerModel) ,restrictTo('provider'),badgeController.addBadgeTocandidate);
badgeRouter.get('/getMyBadges',createProtectMiddleware(providerModel) , restrictTo('provider') , badgeController.getAllBadgesForProvider);
badgeRouter.get('/getMyBadgesInList',createProtectMiddleware(providerModel) , restrictTo('provider') , badgeController.getAllBadgesForProviderInList);

badgeRouter.patch('/updateBadge/:badgeId',createProtectMiddleware(providerModel) , restrictTo('provider') ,validate(updateBadgeSchema), badgeController.updateBadge);
badgeRouter.delete('/deleteBadge/:badgeId',createProtectMiddleware(providerModel) ,restrictTo('provider') , validate(deleteBadgeSchema) , badgeController.deleteBadge);
badgeRouter.get('/viewBadge/:badgeId',createProtectMiddleware(providerModel) ,restrictTo('provider') ,  validate(viewBadgeSchema),badgeController.viewBadge);
badgeRouter.patch('/updateBadgePhoto/:badgeId',createProtectMiddleware(providerModel)  ,restrictTo('provider') , upload.single('newBadgePhoto'),  validate(updateBadgePhotoSchema),badgeController.updateBadgePhoto);



export default badgeRouter;