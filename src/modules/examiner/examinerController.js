import { sendEmail } from '../../utils/email.js';
import { emailTemplate } from '../../utils/emailHtml.js';
import AppErr from '../../utils/appErr.js';
import catchAsync from '../../utils/catchAsync.js';
import { generateAuthCode } from '../../utils/generateAuthCode.js';
import { deleteMultipleFiles } from '../../utils/deletePhotos.js';
import examinerModel from '../../../database/models/examinerModel.js';
import candidateBadgeModel from '../../../database/models/candidateBadgeModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

import mongoose from 'mongoose';
import { formatImage } from '../../utils/formatImage.js';




export const signup = catchAsync(async (req, res, next) => {
  const { userAgreement } = req.body;
  if (!userAgreement) {
    return next(new AppErr('Please mark user agreement button if you agree  our terms', 400));
  }

  const examiner = await examinerModel.findOne({email : req.body.email});
  if (examiner) {
   return next(new AppErr('your email is already exist', 400)) 
  }


  const file = formatImage(req.files?.examinerPassportPhoto[0])
  const response = await cloudinary.v2.uploader.upload(file);
  const examinerPassportPhoto = response.secure_url;


  const file2 = formatImage(req.files?.examinerVerificationPhoto[0])
  const response2 = await cloudinary.v2.uploader.upload(file2);
  const examinerVerificationPhoto = response2.secure_url;


  // const file3 = formatImage(req.files?.examinerProfilePhoto[0])
  // const response3 = await cloudinary.v2.uploader.upload(file3);
  // const examinerProfilePhoto = response3.secure_url;

  const authCode = generateAuthCode();
  if(req.files?.examinerPassportPhoto)req.body.examinerPassportPhoto = examinerPassportPhoto
  if(req.files?.examinerVerificationPhoto)req.body.examinerVerificationPhoto = examinerVerificationPhoto
  // if(req.files?.examinerProfilePhoto)req.body.examinerProfilePhoto = examinerProfilePhoto
  req.body.verificatinCode = authCode;
  req.body.verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // Set expiration to 24 hours from now

  const newExaminer = await examinerModel.create(req.body);
  if(!newExaminer)
      return next(new AppErr('fail to signup try again later', 400));

  try {
    await sendEmail({ email: req.body.email, template: emailTemplate(authCode) });

  } catch (err) {
     await deleteMultipleFiles('examiner' ,
     [
      // req.body.examinerPassportNumber ,
        req.body.examinerPassportPhoto,
        req.body.examinerVerificationPhoto,
        ])
        return next(new AppErr('Sorry, there is a problem with sending the verification email', 400));
  }


  return res.status(201).json({
    status: 'success',
    message : 'you are signed up successfully , please verify your email',
  });
});




export const getAllExaminerPendingCandidateBadges = catchAsync(async (req, res, next) => {
  const ObjectId = mongoose.Types.ObjectId;
  const examinerId = new ObjectId(req.user?._id);

  const { search, sort } = req.query;

  const pipeline = [
    {
      $match: {
        examinerId,
        status: 'pending',
      },
    },
    {
      $lookup: {
        from: 'candidates',
        localField: 'candidateId',
        foreignField: '_id',
        as: 'candidate',
      },
    },
    {
      $unwind: '$candidate',
    },
    {
      $match: { 'candidate.role': { $ne: 'admin' } },
    },
    {
      $lookup: {
        from: 'providers',
        localField: 'providerId',
        foreignField: '_id',
        as: 'provider',
      },
    },
    {
      $unwind: '$provider',
    },
    {
      $lookup: {
        from: 'badges',
        localField: 'badgeId',
        foreignField: '_id',
        as: 'badge',
      },
    },
    {
      $unwind: '$badge',
    },
    {
      $project: {
        _id: 1,
        internalBadgeNum: 1,
        grade: 1,
        issueDate: 1,
        dueDate: 1,
        note: 1,
        status: 1,
        candidateId: 1,
        candidateFirstName: '$candidate.firstName',
        candidateMiddleName: '$candidate.middleName',
        candidateFamilyName: '$candidate.familyName',
        providerOrganizationName: '$provider.OrganizationName',
        badgeTitle: '$badge.title',
      },
    },
  ];

  // Add $match stage for search criteria
  if (search) {
    const searchCriteria = {
      $or: [
        { 'badge.title': { $regex: search, $options: 'i' } },
        { 'candidate.firstName': { $regex: search, $options: 'i' } },
        { 'candidate.middleName': { $regex: search, $options: 'i' } },
        { 'candidate.familyName': { $regex: search, $options: 'i' } },
        { 'provider.OrganizationName': { $regex: search, $options: 'i' } },
      ],
    };
    pipeline.push({
      $match: searchCriteria,
    });
  }

  // Add $sort stage for sorting
  if (sort) {
    const sortOrder = sort === 'Ascending' ? 1 : -1;
    pipeline.push({
      $sort: { 'issueDate': sortOrder },
    });
  }
  if (!sort) {
    pipeline.push({
      $sort: { 'issueDate': -1 },
    });
  }

  const pendingCandidateBadges = await candidateBadgeModel.aggregate(pipeline);

  if (!pendingCandidateBadges.length) {
    return next(new AppErr('No pending badges for the examiner', 404));
  }

  return res.status(200).json({ status: 'success', data: pendingCandidateBadges });
});


export const getAllExaminerCandidateBadges = catchAsync(async (req, res, next) => {
  const ObjectId = mongoose.Types.ObjectId;
  const examinerId = new ObjectId(req.user?._id);
  
  const { search, sort  , status} = req.query;
    const matchObj = {examinerId}
    if(status) matchObj.status = status
    if(status && matchObj.status ==='All') matchObj.status = undefined
  const pipeline = [
    {
      $match:matchObj,
    },
    {
      $lookup: {
        from: 'candidates',
        localField: 'candidateId',
        foreignField: '_id',
        as: 'candidate',
      },
    },
    {
      $unwind: '$candidate',
    },
    {
      $match: { 'candidate.role': { $ne: 'admin' } },
    },
    {
      $lookup: {
        from: 'providers',
        localField: 'providerId',
        foreignField: '_id',
        as: 'provider',
      },
    },
    {
      $unwind: '$provider',
    },
    {
      $lookup: {
        from: 'badges',
        localField: 'badgeId',
        foreignField: '_id',
        as: 'badge',
      },
    },
    {
      $unwind: '$badge',
    },
    {
      $project: {
        _id: 1,
        internalBadgeNum: 1,
        grade: 1,
        issueDate: 1,
        dueDate: 1,
        note: 1,
        status: 1,
        candidateId: 1,
        candidateFirstName: '$candidate.firstName',
        candidateMiddleName: '$candidate.middleName',
        candidateFamilyName: '$candidate.familyName',
        providerOrganizationName: '$provider.OrganizationName',
        badgeTitle: '$badge.title',
      },
    },
  ];

  // Add $match stage for search criteria
  if (search) {
    const searchCriteria = {
      $or: [
        { badgeTitle: { $regex: search, $options: 'i' } },
        { candidateFirstName: { $regex: search, $options: 'i' } },
        { candidateMiddleName: { $regex: search, $options: 'i' } },
        { candidateFamilyName: { $regex: search, $options: 'i' } },
        { providerOrganizationName: { $regex: search, $options: 'i' } },
      ],
    };
    pipeline.push({
      $match: searchCriteria,
    });
  }

  // Add $sort stage for sorting
  if (sort) {
    const sortOrder = sort === 'Ascending' ? 1 : -1;
    pipeline.push({
      $sort: { 'issueDate': sortOrder },
    });
  }
  if (!sort) {
    pipeline.push({
      $sort: { 'issueDate': -1 },
    });
  }
  const publishedCandidateBadges = await candidateBadgeModel.aggregate(pipeline);
console.log(publishedCandidateBadges);
  if (!publishedCandidateBadges.length) {
    return next(new AppErr('No published badges for the examiner', 404));
  }

  return res.status(200).json({ status: 'success', data: publishedCandidateBadges });
});


export const getAllExaminerPublishedCandidateBadges = catchAsync(async (req, res, next) => {
  const ObjectId = mongoose.Types.ObjectId;
  const examinerId = new ObjectId(req.user?._id);

  const publishedCandidateBadges = await candidateBadgeModel.aggregate([
    {
      $match: {
        examinerId,
        status: 'published',
      },
    },
    {
      $lookup: {
        from: 'candidates',
        localField: 'candidateId',
        foreignField: '_id',
        as: 'candidate',
      },
    },
    {
      $unwind: '$candidate',
    },
    {$match : {'candidate.role' : { $ne: 'admin' } }},
    {
      $lookup: {
        from: 'providers',
        localField: 'providerId',
        foreignField: '_id',
        as: 'provider',
      },
    },
    {
      $unwind: '$provider',
    },
    {
      $lookup: {
        from: 'badges',
        localField: 'badgeId',
        foreignField: '_id',
        as: 'badge',
      },
    },
    {
      $unwind: '$badge',
    },
    {
      $project: {
        _id: 1,
        internalBadgeNum: 1,
        grade: 1,
        issueDate: 1,
        dueDate: 1,
        note: 1,
        status: 1,
        candidateId: 1,
        candidateFirstName: '$candidate.firstName',
        candidateMiddleName: '$candidate.middleName',
        candidateFamilyName: '$candidate.familyName',
        providerOrganizationName: '$provider.OrganizationName',
        badgeTitle : "$badge.title"
      },
    },
  ]);

  if (!publishedCandidateBadges.length) {
    return next(new AppErr('No published badges for the examiner', 404));
  }

  return res.status(200).json({ status: 'success', data: publishedCandidateBadges });
});



export const ExaminerApproveCandidateBadge = catchAsync(async(req,res, next)=>{
  const {candidateBadgeId} = req.params
  const ObjectId = mongoose.Types.ObjectId
  const  examinerId= new ObjectId(req.user?._id) 
  const candidateBadge = await candidateBadgeModel.findOne({_id : candidateBadgeId ,examinerId  })
  if(!candidateBadge) return next(new AppErr('no badge for this candidate' , 404));
  if(candidateBadge.status !== 'pending')return next(new AppErr(`this badge candidate is ${candidateBadge.status}` , 404));
  candidateBadge.status = "published";
  await candidateBadge.save();
  return res.status(200).json({status : 'success' , message : 'badge approved successfully'})
});




export const ExaminerDeclineCandidateBadge = catchAsync(async(req,res, next)=>{
  const {candidateBadgeId} = req.params;
  const {declineReason} = req.body
  const ObjectId = mongoose.Types.ObjectId
  const  examinerId= new ObjectId(req.user?._id) 
  const candidateBadge = await candidateBadgeModel.findOne({_id : candidateBadgeId ,examinerId  })
  if(!candidateBadge) return next(new AppErr('no badge for this candidate' , 404));
  if(candidateBadge.status !== 'pending')return next(new AppErr(`this badge candidate is ${candidateBadge.status}` , 404));
  candidateBadge.status = "declined";
  candidateBadge.declineReason = declineReason
  await candidateBadge.save();
  return res.status(200).json({status : 'success' , message : 'badge declined successfully'})
});


export const examinerViewCandidateBadge = catchAsync(async (req, res, next) => {
  const { candidateBadgeId } = req.params;
  const ObjectId = mongoose.Types.ObjectId;
  const examinerId = new ObjectId(req.user?._id);
  const candidateBadge = await candidateBadgeModel.findOne({ _id: candidateBadgeId, examinerId })
    .populate('candidateId' , 'firstName middleName familyName email')
    .populate('badgeId' , 'title department badgePhoto');
  if (!candidateBadge) return next(new AppErr('no badge for this candidate', 404));
  //if (candidateBadge.status !== 'pending') return next(new AppErr(`this badge candidate is ${candidateBadge.status}`, 404));
  return res.status(200).json({ status: 'success', data: candidateBadge });
});



export const updateMyProfile = catchAsync(async (req, res, next) => {
    const profile = await examinerModel.findByIdAndUpdate(req.user._id , req.body,{
      new: true,   
    });
      if(!profile) return next(new AppErr('cannot update your profile') , 400)

    return res.status(200).json({
      status: 'success',
      message: 'your profile updated successfully ',
    });

});


export const updateMyPhoto   = catchAsync(async (req, res, next) => {

   if (!req?.file) return next(new AppErr('error uploading profile photo , try again') , 400);
   const file = formatImage(req.file)
   const response = await cloudinary.v2.uploader.upload(file);
   const examinerProfilePhoto = response.secure_url;
   //const examinerProfilePhoto = req.file?.filename
   const profile = await examinerModel.findByIdAndUpdate(req.user._id ,{examinerProfilePhoto})

   if(!profile) return next(new AppErr('cannot update your profile photo') , 400)
   return res.status(200).json({
    status: 'success',
    message: 'your profile photo updated successfully ',
  });

}) 