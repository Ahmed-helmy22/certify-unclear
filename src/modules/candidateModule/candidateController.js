import { sendEmail } from '../../utils/email.js';
import { emailTemplate } from '../../utils/emailHtml.js';
import AppErr from '../../utils/appErr.js';

import catchAsync from '../../utils/catchAsync.js';
import { generateAuthCode } from '../../utils/generateAuthCode.js';
import { deleteMultipleFiles } from '../../utils/deletePhotos.js';

import candidateModel from '../../../database/models/candidateModel.js';
import candidateBadgeModel from '../../../database/models/candidateBadgeModel.js';
import mongoose from 'mongoose';
import { runScrapingandPushTodb } from '../../utils/scrapping/scrapper.js';
import externalBadgesModel from '../../../database/models/externalCandidateBadgesModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import { formatImage } from '../../utils/formatImage.js';




export const signup = catchAsync(async (req, res, next) => {
  const { userAgreement } = req.body;
  console.log(req.body);
  if (!userAgreement) {
    return next(new AppErr('Please mark user agreement button if you agree to our terms', 400));
  }

  const candidate = await candidateModel.findOne({ email: req.body.email });
  if (candidate) {
    return next(new AppErr('your email is already exist', 400))
  }

  const authCode = generateAuthCode();
  console.log(req.files);
  const file = formatImage(req.files?.candidatePassportPhoto[0])
  const response = await cloudinary.v2.uploader.upload(file);
  const candidatePassportPhoto = response.secure_url;


  const file2 = formatImage(req.files?.candidateVerificationPhoto[0])
  const response2 = await cloudinary.v2.uploader.upload(file2);
  const candidateVerificationPhoto = response2.secure_url;


  // const file3 = formatImage(req.files?.candidateProfilePhoto[0])
  // const response3 = await cloudinary.v2.uploader.upload(file3);
  // const candidateProfilePhoto = response3.secure_url;

  if (req.files?.candidatePassportPhoto) req.body.candidatePassportPhoto = candidatePassportPhoto
  if (req.files?.candidateVerificationPhoto) req.body.candidateVerificationPhoto = candidateVerificationPhoto
  // if (req.files?.candidateProfilePhoto) req.body.candidateProfilePhoto = candidateProfilePhoto
  req.body.verificatinCode = authCode;
  req.body.verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)

  const newcandidate = await candidateModel.create(req.body);

  if (!newcandidate)
    return next(new AppErr('fail to signup try again later', 400));
  try {


    const { leeWebsiteId, leeCompany, leeRegNumber, itraWebsiteId, itraRegNumber, itraName, mycertWebsiteId, myCertRegNumber } = req.body
    const scrappingObj = {}
    if (leeWebsiteId) {
      scrappingObj.leeWebsiteId = leeWebsiteId;
      scrappingObj.leeCompany = leeCompany;
      scrappingObj.leeRegNumber = leeRegNumber
    }
    if (itraWebsiteId) {
      scrappingObj.itraWebsiteId = itraWebsiteId;
      scrappingObj.itraRegNumber = itraRegNumber;
      scrappingObj.itraName = itraName
    }
    if (mycertWebsiteId) {
      scrappingObj.mycertWebsiteId = mycertWebsiteId;
      scrappingObj.myCertRegNumber = myCertRegNumber;
    }

    await runScrapingandPushTodb(newcandidate._id, scrappingObj)



    await sendEmail({ email: req.body.email, template: emailTemplate(authCode) });
  } catch (err) {
    console.log(err);
    await candidateModel.findByIdAndDelete(newcandidate._id)
    return next(new AppErr('Sorry, there is a problem with sending the verification email', 400));
  }

  return res.status(201).json({
    status: 'success',
    message: 'you are signed up successfully , please verify your email'
  });
});





export const getCandidateProfile = catchAsync(async (req, res, next) => {
  // const candidateId =new mongoose.Types.ObjectId(req.body.candidateId);

  const { candidateId, email } = req.body

  if (!candidateId && !email)
    return next(new AppErr('please enter email or registration number', 400))
  if (candidateId && email)
    return next(new AppErr('please search by one field', 400));
  const candidateFilter = (!email && candidateId)
    ? { _id: candidateId }
    : (email && !candidateId)
      ? { email }
      : null;

  if (!candidateFilter) {
    return next(new AppErr('Invalid parameters for candidate lookup', 400));
  }

  const candidate = await candidateModel.findOne({
    $and: [
      candidateFilter,
      { status: 'approved' },
      { isDeleted: { $ne: true } },
      { role: 'candidate' }
    ]
  }).select('_id firstName middleName familyName DOBirth gender phoneNumber occupation email address qualification city country POBox candidateProfilePhoto');

  if (!candidate) {
    return next(new AppErr('This candidate does not exist or is not activated', 400));
  }
  return res.status(200).json({
    status: 'success',
    candidate
  });

})


export const getCandidateProfileById = catchAsync(async (req, res, next) => {
  const { candidateId } = req.params
  if (!candidateId)
    return next(new AppErr('please enter candidate id ', 400))
  const candidate = await candidateModel.findOne({
    $and: [
      { _id: candidateId },
      { status: 'approved' },
      { isDeleted: { $ne: true } },
      { role: 'candidate' }
    ]
  }).select('_id firstName middleName familyName DOBirth gender phoneNumber occupation email address qualification city country POBox candidateProfilePhoto');

  if (!candidate) {
    return next(new AppErr('This candidate does not exist or is not activated', 400));
  }
  return res.status(200).json({
    status: 'success',
    candidate
  });

})


export const getMyProfile = catchAsync(async (req, res, next) => {
  if (!req?.user || req?.user.status !== 'approved')
    return next(new AppErr('you are no logged in or your email is not activated, please login or wait your account to be activated', 401))
  const candidate = await candidateModel.findById(req.user._id).select('_id firstName middleName familyName DOBirth gender phoneNumber occupation email address qualification city country POBox candidateProfilePhoto');
  return res.status(200).json({
    status: 'success',
    candidate
  });
});



export const getMyValidBadges = catchAsync(async (req, res, next) => {
  const currentDate = new Date()
  const allValidBadges = await candidateBadgeModel.aggregate([
    {
      $match: {
        status: 'published',
        candidateId: req.user?._id,
        dueDate: { $gte: currentDate }
      },
    },
    {
      $addFields: {
        year: { $year: '$createdAt' },
      },
    },
    {
      $sort: { year: 1 },
    },
    {
      $group: {
        _id: '$year',
        documents: { $push: '$$ROOT' },
      },
    },
  ]);

  if (!allValidBadges.length) {
    return next(new AppErr('No valid badges found', 404));
  }

  return res.status(200).json({ status: 'success', allValidBadges });
});


export const getCandidateValidBadges = catchAsync(async (req, res, next) => {
  const candidateId = new mongoose.Types.ObjectId(req.params.candidateId);
  if (!candidateId) return next(new AppErr("please send the id of the candidate to get it's invalid Badges", 400));;
  const currentDate = new Date();
  const allValidBadges = await candidateBadgeModel.aggregate([
    {
      $match: {
        status: 'published',
        candidateId: candidateId,
        $or: [
          { dueDate: null },
          { dueDate: { $gte: currentDate } },
        ],
      },
    },
    {
      $addFields: {
        year: { $year: '$createdAt' },
      },
    },
    {
      $sort: { year: 1 },
    },
    {
      $group: {
        _id: '$year',
        documents: { $push: '$$ROOT' },
      },
    },
  ]);
  if (!allValidBadges.length) {
    return next(new AppErr('No valid badges found', 404));
  }

  return res.status(200).json({ status: 'success', data: allValidBadges });
});


export const getAllBadgesForCandidateById = catchAsync(async (req, res, next) => {
  let { candidateId } = req.params;
  // Convert candidateId to ObjectId
  candidateId = new mongoose.Types.ObjectId(candidateId);

  const pipeline = [
    {
      $match: { candidateId, status: 'published' },
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
  ];

  pipeline.push(
    {
      $addFields: {
        year: { $year: '$issueDate' },
        source: 'internal',
       },
    },
    {
      $project: {
        _id: 1,
        grade: 1,
        issueDate: 1,
        dueDate: 1,
        year: 1,
        candidateId: 1,
        title: '$badge.title',
        photo: '$badge.photo',
        badgeDepartment: '$badge.department',
        source: 1,
      },
    }
  );

  const allBadges = await candidateBadgeModel.aggregate(pipeline);

  const externalPipeline = [
    {
      $match: { candidateId },
    },
    {
      $addFields: {
        year: { $year: '$issueDate' },
        source: 'external',
      },
    },
    {
      $lookup: {
        from: 'externalwebsites',
        localField: 'websiteId',
        foreignField: '_id',
        as: 'website',
      },
    },
    {
      $unwind: '$website',
    },
    {
      $project: {
        _id: 1,
        title: 1,
        issueDate: 1,
        dueDate: 1,
        year: 1,
        candidateId: 1,
        badgeDepartment: '$website.title',
        photo: '$website.photo',
        source: 1,
      },
    },
  ];

  const externalBadges = await externalBadgesModel.aggregate(externalPipeline);

  if (!externalBadges.length && !allBadges.length) {
    return next(new AppErr('No badges found for the candidate', 404));
  }

  // Combine internal and external badges into one array
  const allBadgesCombined = [...allBadges, ...externalBadges];

  // Group badges by year
  const badgesByYear = {};
  allBadgesCombined.forEach(badge => {
    const year = badge.year;
    if (!badgesByYear[year]) {
      badgesByYear[year] = [];
    }
    badgesByYear[year].push(badge);
  });

  // Format the result array with year and badges
  const result = Object.keys(badgesByYear).map(year => ({
    year: parseInt(year),
    badges: badgesByYear[year],
  }));

  return res.status(200).json({ status: 'success', data: result });
});




export const getMyAllBadges = catchAsync(async (req, res, next) => {
  let candidateId = req.user?._id;

  // Convert candidateId to ObjectId
  candidateId = new mongoose.Types.ObjectId(candidateId);

  // const { search, sort } = req.query;

  const pipeline = [
    {
      $match: { candidateId, status: 'published' },
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
  ];

  pipeline.push(
    {
      $addFields: {
        year: { $year: '$issueDate' },
        source: 'internal',
      },
    },
    {
      $project: {
        _id: 1,
        grade: 1,
        issueDate: 1,
        dueDate: 1,
        year: 1,
        candidateId: 1,
        title: '$badge.title',
        photo: '$badge.badgePhoto',
        badgeDepartment: '$badge.department',
        source: 1,
      },
    }
  );

  const allBadges = await candidateBadgeModel.aggregate(pipeline);

  const externalPipeline = [
    {
      $match: { candidateId },
    },
    {
      $addFields: {
        year: { $year: '$issueDate' },
        source: 'external',
      },
    },
    {
      $lookup: {
        from: 'externalwebsites',
        localField: 'websiteId',
        foreignField: '_id',
        as: 'website',
      },
    },
    {
      $unwind: '$website',
    },
    {
      $project: {
        _id: 1,
        title: 1,
        issueDate: 1,
        dueDate: 1,
        year: 1,
        candidateId: 1,
        badgeDepartment: '$website.title',
        photo: '$website.photo',
        source: 1,
      },
    },
  ];

  const externalBadges = await externalBadgesModel.aggregate(externalPipeline);

  if (!externalBadges.length && !allBadges.length) {
    return next(new AppErr('No badges found for the candidate', 404));
  }

  // Combine internal and external badges into one array
  const allBadgesCombined = [...allBadges, ...externalBadges];

  // Group badges by year
  const badgesByYear = {};
  allBadgesCombined.forEach(badge => {
    const year = badge.year;
    if (!badgesByYear[year]) {
      badgesByYear[year] = [];
    }
    badgesByYear[year].push(badge);
  });

  // Format the result array with year and badges
  const result = Object.keys(badgesByYear).map(year => ({
    year: parseInt(year),
    badges: badgesByYear[year],
  }));

  return res.status(200).json({ status: 'success', data: result });
});





export const updateMyProfile = catchAsync(async (req, res, next) => {
  const profile = await candidateModel.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: false,
  });
  if (!profile) return next(new AppErr('cannot update your profile'), 400)

  return res.status(200).json({
    status: 'success',
    message: 'your profile updated successfully ',
  });

});


export const updateMyPhoto = catchAsync(async (req, res, next) => {

  if (!req?.file) return next(new AppErr('error uploading profile photo , try again'), 400);
  const file = formatImage(req.file)
  const response = await cloudinary.v2.uploader.upload(file);
  const candidateProfilePhoto = response.secure_url;

  const profile = await candidateModel.findByIdAndUpdate(req.user._id, { candidateProfilePhoto })

  if (!profile) return next(new AppErr('cannot update your profile photo'), 400)


  return res.status(200).json({
    status: 'success',
    message: 'your profile photo updated successfully ',
  });

})


export const getSingleCandidateBadge = catchAsync(async (req, res, next) => {

  const _id = new mongoose.Types.ObjectId(req.body.candidateBadgeId);

  const result = await candidateBadgeModel
    .findOne({ _id, isDeleted: { $ne: true } })
    .populate({ path: 'candidateId', select: 'firstName familyName DOBirth email phoneNumber country candidateProfilePhoto' })
    .populate({ path: 'badgeId', select: 'department badgePhoto title' })
    .populate({ path: 'examinerId', select: 'firstName middleName familyName phoneNumber' })
    .populate({ path: 'providerId', select: 'OrganizationName providerType phoneNumber webSite logo' })

  if (!result) return next(new AppErr('no candidate is found'), 400);
  if (result.status !== "published") return next(new AppErr('this certificate is not published'), 400);
  res.status(200).json({ result })
})


export const getSingleCandidateBadgebyBadgeId = catchAsync(async (req, res, next) => {
  const _id = new mongoose.Types.ObjectId(req.params.candidateBadgeId);
  console.log(_id);
  const result = await candidateBadgeModel
    .findOne({ _id, isDeleted: { $ne: true } })
    .populate({ path: 'candidateId', select: 'firstName familyName DOBirth email phoneNumber country candidateProfilePhoto' })
    .populate({ path: 'badgeId', select: 'department badgePhoto title' })
    .populate({ path: 'examinerId', select: 'firstName middleName familyName phoneNumber' })
    .populate({ path: 'providerId', select: 'OrganizationName providerType phoneNumber webSite logo' })

  if (!result) return next(new AppErr('no candidate is found'), 400);
  if (result.status !== "published") return next(new AppErr('this certificate is not published'), 400);
  res.status(200).json({ result })
})
