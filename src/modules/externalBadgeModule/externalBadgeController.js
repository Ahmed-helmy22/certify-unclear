
import examinerModel from '../../../database/models/examinerModel.js';
import candidateModel from '../../../database/models/candidateModel.js';
import badgeModel from '../../../database/models/badgeModel.js';
import AppErr from '../../utils/appErr.js';
import catchAsync from '../../utils/catchAsync.js';
import candidateBadgeModel from '../../../database/models/candidateBadgeModel.js';
import externalwebsiteModel from '../../../database/models/externalwebsitesModel.js';
import externalBadgesModel from '../../../database/models/externalCandidateBadgesModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import { formatImage } from '../../utils/formatImage.js';


export const addExternalWebsite = catchAsync(async (req, res, next) => {
        const { title } = req.body
         if (!req.file?.filename) return next(new AppErr('no website photo uploaded', 400))
        const file = formatImage(req.file)
        const response = await cloudinary.v2.uploader.upload(file);
        const websitePhoto = response.secure_url;

        const newWebsite = await externalwebsiteModel.create({ title, photo: websitePhoto })
        if (!newWebsite)
                return next(new AppErr('fail to create external website entity', 400))
        return res.status(201).json({ status: 'success', data: newWebsite })
})

export const getExternalWebsites = catchAsync(async (req, res, next) => {
        const externalWebsites = await externalwebsiteModel.find({});
        if (!externalWebsites)
                return next(new AppErr('no external websites yet', 404));
        return res.status(200).json({ status: 'success', externalWebsites })
})

export const getExternalBadgesforCandidate = catchAsync(async (req, res, next) => {
        const { candidateId } = req.params;
        if (!candidateId) return next(new AppErr('please provide a candidate id', 400));
        const externalBadges = await externalBadgesModel.findOne({ candidateId })
                .populate({ path: 'leeaint.ExternalWebsiteId', select: 'title photo' })
                .populate({ path: 'itra.ExternalWebsiteId', select: 'title photo' })
                .populate({ path: 'myCert.ExternalWebsiteId', select: 'title photo' })

        if (!externalBadges) return next(new AppErr('no external badges for this candidate', 400));
        return res.status(200).json({ status: 'success', externalBadges })
})


export const getExternalBadgesforCandidateWithLogging = catchAsync(async (req, res, next) => {
        let candidateId = req.user?._id;
        console.log(candidateId);
        // Convert candidateId to ObjectId
        candidateId = new mongoose.Types.ObjectId(candidateId)
        if (!candidateId) return next(new AppErr('please provide a candidate id', 400));
        const externalBadges = await externalBadgesModel.findOne({ candidateId })
                .populate({ path: 'leeaint.ExternalWebsiteId', select: 'title photo' })
                .populate({ path: 'itra.ExternalWebsiteId', select: 'title photo' })
                .populate({ path: 'myCert.ExternalWebsiteId', select: 'title photo' })

        if (!externalBadges) return next(new AppErr('no external badges for this candidate', 400));
        return res.status(200).json({ status: 'success', externalBadges })
})

export const editWebsite = catchAsync(async (req, res, next) => {
        const { websiteId } = req.params
        console.log(websiteId, 'ididididi');
        const { title } = req.body
        console.log(title , 'ssssssssss');
        console.log(req.file);
        if (!req.file) return next(new AppErr('error uploading website photo , try again'), 400);
        const file = formatImage(req.file)
        const response = await cloudinary.v2.uploader.upload(file);
        const newWebsitePhoto = response.secure_url;

        //const newWebsitePhoto = req.file?.filename
        if (!websiteId) return next(new AppErr('please provide the websiteId', 400));
        const updatedWebsite = await externalwebsiteModel.findByIdAndUpdate(websiteId, { title, photo: newWebsitePhoto }, { new: true });
        if (!updatedWebsite) return next(new AppErr('error update website data', 400));
        return res.status(200).json({ status: 'success', updatedWebsite })
})

export const getWebsite = catchAsync(async (req, res, next) => {
        const { websiteId } = req.params
        if (!websiteId) return next(new AppErr('please provide the websiteId', 400));

        const externalWebsite = await externalwebsiteModel.findOne({ _id: websiteId });
        if (!externalWebsite)
                return next(new AppErr('no external websites yet', 404));
        return res.status(200).json({ status: 'success', externalWebsite })
})


export const deleteWebsite = catchAsync(async (req, res, next) => {
        const { websiteId } = req.params
        if (!websiteId) return next(new AppErr('please provide the websiteId', 400));
        console.log(websiteId);
        const deleteWebsite = await externalwebsiteModel.findByIdAndDelete(websiteId);
        if (!deleteWebsite) return next(new AppErr('error delete website', 400));
        return res.status(200).json({ status: 'success', message: "website deleted successfully" })
})

export const deleteWebsiteDeleteMethod = catchAsync(async (req, res, next) => {
        const { websiteId } = req.params
        console.log(req.params);
        console.log(websiteId, 'sssssssssssssssssss');
        if (!websiteId) return next(new AppErr('please provide the websiteId', 400));
        const deleteWebsite = await externalwebsiteModel.findByIdAndDelete(websiteId);
        if (!deleteWebsite) return next(new AppErr('error delete website', 400));
        return res.status(200).json({ status: 'success', message: "website deleted successfully" })
})