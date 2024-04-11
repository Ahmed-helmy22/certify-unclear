import Express from 'express';

import {fileUpload } from '../../middelwares/fileUpload.js'
import { createProtectMiddleware, restrictTo } from '../../middelwares/authMiddleware.js';
import candidateModel from '../../../database/models/candidateModel.js';
import { addExternalWebsite, getWebsite, deleteWebsiteDeleteMethod ,deleteWebsite, editWebsite, getExternalBadgesforCandidate, getExternalWebsites , getExternalBadgesforCandidateWithLogging } from './externalBadgeController.js';
import upload from '../../utils/formatImage.js';

const externalBadgeRouter = Express.Router();

externalBadgeRouter.post('/addWebsite',createProtectMiddleware(candidateModel),restrictTo('admin'),upload.single('websitePhoto') , addExternalWebsite);
externalBadgeRouter.get('/allWebsites',getExternalWebsites);
externalBadgeRouter.get('/website/:websiteId',getWebsite);

externalBadgeRouter.post('/editWebsite/:websiteId',createProtectMiddleware(candidateModel),restrictTo('admin'),upload.single('newWebsitePhoto'), editWebsite);


externalBadgeRouter.get('/:candidateId',getExternalBadgesforCandidate);
externalBadgeRouter.get('/getExternalBadges',createProtectMiddleware(candidateModel),restrictTo('candidate'),getExternalBadgesforCandidateWithLogging);

externalBadgeRouter.delete('/deleteWebsite/:websiteId',createProtectMiddleware(candidateModel),restrictTo('admin'),deleteWebsite);

// new one
externalBadgeRouter.delete('/website/:websiteId',createProtectMiddleware(candidateModel),restrictTo('admin'),deleteWebsiteDeleteMethod);


export default externalBadgeRouter;