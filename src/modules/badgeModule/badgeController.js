
import examinerModel from '../../../database/models/examinerModel.js';
import candidateModel from '../../../database/models/candidateModel.js';
import badgeModel from '../../../database/models/badgeModel.js';
import AppErr from '../../utils/appErr.js';
import catchAsync from '../../utils/catchAsync.js';
import candidateBadgeModel from '../../../database/models/candidateBadgeModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import { formatImage } from '../../utils/formatImage.js';



export const addBage = catchAsync(async (req, res, next) => {
        const { title, department } = req.body

        if(!req.file) return next(new AppErr('no badge photo uploaded', 400))

        const file = formatImage(req.file)
        const response = await cloudinary.v2.uploader.upload(file);

        const badgePhoto = response.secure_url;

        const providerId = req.user._id
        const isExist = await badgeModel.findOne({title})
        if (isExist) {
                return next(new AppErr('there is already badge withe the same title', 400)) 
        }
        const newBadge = await badgeModel.create({ title, department, badgePhoto, providerId })
        if (!newBadge)
                return next(new AppErr('fail to create new badge', 400))
        return res.status(201).json({ status: 'success', data: newBadge })
})

export const addBadgeTocandidate = catchAsync(async (req, res, next) => {

        const { candidateId, badgeId, grade, issueDate, dueDate, examinerId, internalBadgeNum, note } = req.body;
        const providerId = req.user?._id
         const isCandidateBadgeIxists = await candidateBadgeModel.findOne({candidateId , examinerId , providerId, badgeId})

        if(isCandidateBadgeIxists) return next(new AppErr('this candidate have already this badge', 400));
                       
        const candidateExists = await candidateModel.findOne({ _id:candidateId ,  status : 'approved' , isDeleted : {$ne : true} , role : "candidate"});
        if (!candidateExists)
                return next(new AppErr('candidate is not found , not approved or deleted', 400));


        const badgeExists = await badgeModel.findOne({_id:badgeId , isDeleted : {$ne : true}});
        if (!badgeExists)
                return next(new AppErr('badge  is not found  or deleted', 400));


        const examinerExists = await examinerModel.findOne({_id:examinerId ,  status : 'approved' , isDeleted : {$ne : true}});
        if (!examinerExists)
                return next(new AppErr('the examiner is not found  or not approved or deleted', 400));

        const newCandidateBadge = await candidateBadgeModel.create({ candidateId, badgeId, providerId, grade, issueDate, dueDate, examinerId, internalBadgeNum, note });
        if (!newCandidateBadge)
                return next(new AppErr('fail to award badge to candidate', 400))
        return res.status(201).json({ status: 'success', data: newCandidateBadge })
})



// export const getAllBadgesForProvider = catchAsync(async (req, res, next) => {
//         const allBadges = await badgeModel.aggregate([
//                 {
//                         $match: { providerId: req.user?._id  , isDeleted : {$ne : true}}
//                 },
//                 {
//                         $addFields: {
//                                 year: { $year: "$createdAt" }
//                         }
//                 },
//                 {
//                         $project :{
//                                 isDeleted : 0
//                         }
//                 },
//                 {
//                         $sort: { "year": 1 }
//                 },
//                 {
//                         $group: {
//                                 _id: "$year", // Group by year
//                                 documents: { $push: "$$ROOT" } // Push documents into an array
//                         }
//                 },

//         ])
//         if (!allBadges.length) return next(new AppErr('no badges yet', 404))

//         return res.status(200).json({ status: 'success', data: allBadges })
// })

export const getAllBadgesForProvider = catchAsync(async (req, res, next) => {

        const{ search , sort} = req.query
        const pipeline = [ {
                $match: { providerId: req.user?._id  , isDeleted : {$ne : true}}
        },
        {
                $addFields: {
                        year: { $year: "$createdAt" }
                }
        },
        {
                $project :{
                        isDeleted : 0
                }
        },
        {
                $sort: { "year": 1 }
        },
        {
                $group: {
                        _id: "$year", // Group by year
                        documents: { $push: "$$ROOT" } // Push documents into an array
                }
        },
        ]
            // Add $match stage for search criteria
    if (search) {
        pipeline.push({
          $match: {
            $or: [
              { 'badge.department': { $regex: search, $options: 'i' } },
              { 'badge.title': { $regex: search, $options: 'i' } },
            ],
          },
        });
      }
      if (sort) {
        pipeline.push({
          $sort: { year: sort === 'Ascending' ? 1 : -1 },
        }); }
        const allBadges = await badgeModel.aggregate(pipeline)

        if (!allBadges.length) return next(new AppErr('no badges yet', 404))

        return res.status(200).json({ status: 'success', data: allBadges })
})
export const getAllBadgesForProviderInList = catchAsync(async (req, res, next) => {
        const allBadges = await badgeModel.find({providerId : req.user?._id })
        if (!allBadges.length) return next(new AppErr('no badges yet', 404))
        return res.status(200).json({ status: 'success', data: allBadges })
})




// Update Badge
export const updateBadge = catchAsync(async (req, res, next) => {
        const { title, department } = req.body;
        const badgeId = req.params.badgeId;
        const badge = await badgeModel.findById(badgeId);

        if (!badge) {
                return next(new AppErr('Badge not found', 404));
        }

        badge.title = title || badge.title;
        badge.department = department || badge.department;

        const updatedBadge = await badge.save();

        return res.status(200).json({ status: 'success', updatedBadge });
});



// Delete Badge
export const deleteBadge = catchAsync(async (req, res, next) => {
        const badgeId = req.params.badgeId;
        const badge = await badgeModel.findById(badgeId);

        if (!badge) {
                return next(new AppErr('Badge not found', 404));
        }
        badge.isDeleted = true;
        await badge.save()
        return res.status(204).json({ status: 'success', message: "badge is deleted successflly" });
});

// View Badge
export const viewBadge = catchAsync(async (req, res, next) => {
        const badgeId = req.params.badgeId;
        const badge = await badgeModel.findById(badgeId).select('-isDeleted');

        if (!badge) {
                return next(new AppErr('Badge not found', 404));
        }

        return res.status(200).json({ status: 'success', badge });
});



export const updateBadgePhoto = catchAsync(async (req, res, next) => {
        const badgeId = req.params.badgeId
        const badge = await badgeModel.findById(badgeId);
        if (!badge) {
                return next(new AppErr('Badge not found', 404));
        }
        //const newBadgePhoto = req.file?.filename;
        if(!req?.file) return next(new AppErr('no badge photo uploaded', 400)) 
        const file = formatImage(req.file)
        const response = await cloudinary.v2.uploader.upload(file);
        const newBadgePhoto = response.secure_url;

        // Update the badge with the new photo
        badge.badgePhoto = newBadgePhoto;

        const updatedBadge = await badge.save();

        return res.status(200).json({ status: 'success', updatedBadge });
});



