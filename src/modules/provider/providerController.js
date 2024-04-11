
import { sendEmail } from '../../utils/email.js';
import { emailTemplate } from '../../utils/emailHtml.js';
 import providerModel from '../../../database/models/providerModel.js';
import catchAsync from '../../utils/catchAsync.js';
import { generateAuthCode } from '../../utils/generateAuthCode.js';
import { deleteMultipleFiles } from '../../utils/deletePhotos.js';
import candidateBadgeModel from '../../../database/models/candidateBadgeModel.js';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import AppErr from '../../utils/appErr.js';
import { formatImage } from '../../utils/formatImage.js';




export const signup = catchAsync(async (req, res, next) => {

  const { userAgreement } = req.body;
  if (!userAgreement) {
    return next(new AppErr('Please mark user agreement button if you agree to our terms', 400));
  }

  const provider = await providerModel.findOne({email : req.body.email});
  if (provider) {
   return next(new AppErr('your email is already exist', 400)) 
  }

  const authCode = generateAuthCode();

  // const file = formatImage(req.files?.adminPassportPhoto[0])
  // const response = await cloudinary.v2.uploader.upload(file);
  // const adminPassportPhoto = response.secure_url;


  // const file2 = formatImage(req.files?.adminVerificationPhoto[0])
  // const response2 = await cloudinary.v2.uploader.upload(file2);
  // const adminVerificationPhoto = response2.secure_url;


  // const file3 = formatImage(req.files?.adminProfilePhoto[0])
  // const response3 = await cloudinary.v2.uploader.upload(file3);
  // const adminProfilePhoto = response3.secure_url;

  // const file4 = formatImage(req.files?.logo[0])
  // const response4 = await cloudinary.v2.uploader.upload(file4);
  // const logo = response4.secure_url;
  console.log(req.file?.logo);
  const file  = formatImage(req.file)
  const response = await cloudinary.v2.uploader.upload(file);
  //  await fs.unlink(req.file?.path);
   const logo = response.secure_url;

  if(req.files?.logo)req.body.logo = logo
  // if(req.files?.adminPassportPhoto)req.body.adminPassportPhoto = adminPassportPhoto
  // if(req.files?.adminVerificationPhoto)req.body.adminVerificationPhoto = adminVerificationPhoto
  // if(req.files?.adminProfilePhoto)req.body.adminProfilePhoto = adminProfilePhoto
   
  req.body.verificatinCode = authCode;
  req.body.verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // Set expiration to 24 hours from now

  // req.body.providerAdminInfo = {
  //   firstName: req.body.firstName,
  //   middleName: req.body.middleName,
  //   familyName: req.body.familyName,
  //   adminGender: req.body.adminGender,
  //   DOBirth: req.body.DOBirth,
  //   adminRole: req.body.adminRole,
  //   adminPhoneNumber: req.body.adminPhoneNumber,
  //   adminAddress: req.body.adminAddress,
  //   adminCountry: req.body.adminCountry,
  //   adminPOBox: req.body.adminPOBox,
  //   adminCity: req.body.adminCity,
  //   adminPassportNumber: req.body.adminPassportNumber,
  //   adminPassportPhoto: req.body.adminPassportPhoto,
  //   adminVerificationPhoto: req.body.adminVerificationPhoto,
  //   adminProfilePhoto: req.body.adminProfilePhoto,
  // };

  //  req.body.firstName = undefined;
  //  req.body.middleName= undefined;
  //  req.body.familyName= undefined;
  //  req.body.adminGender= undefined;
  //  req.body.DOBirth= undefined;
  //  req.body.adminRole= undefined;
  //  req.body.adminPhoneNumber= undefined;
  //  req.body.adminAddress= undefined;
  //  req.body.adminCountry= undefined;
  //  req.body.adminPOBox= undefined;
  //  req.body.adminCity= undefined;
  //  req.body.adminPassportNumber= undefined;
  //  req.body.adminPassportPhoto= undefined;
  //  req.body.adminVerificationPhoto= undefined;
  //  req.body.adminProfilePhoto= undefined;

  const newProvider= await providerModel.create(req.body);
  if(!newProvider)
      return next(new AppErr('fail to signup try again later', 400));

 
  try {
    await sendEmail({ email: req.body.email, template: emailTemplate(authCode) });

  } catch (err) {
     await deleteMultipleFiles('provider' ,
      [req.body.logo])
      await providerModel.findByIdAndDelete(newProvider._id)
        return next(new AppErr('Sorry, there is a problem with sending the verification email', 400));
  }


  return res.status(201).json({
    status: 'success',
    message : 'you are signed up successfully , please verify your email',
  });
});


// export const getAllCandidateBadges = catchAsync(async (req, res, next) => {
//   const { status, search, sort } = req.query;

//   // Define match conditions based on status
//   const matchConditions = status ? { status } : {};

//   // Define search criteria for badge title, candidate names, and provider's organization name
//   const searchCriteria = search ? {
//     $or: [
//       { 'badge.title': { $regex: search, $options: 'i' } }, // Search by badge title
//       { 'candidate.firstName': { $regex: search, $options: 'i' } }, // Search by candidate's first name
//       { 'candidate.middleName': { $regex: search, $options: 'i' } }, // Search by candidate's middle name
//       { 'candidate.familyName': { $regex: search, $options: 'i' } }, // Search by candidate's family name
//       { 'provider.OrganizationName': { $regex: search, $options: 'i' } }, // Search by provider's organization name
//     ]
//   } : {};

//   // Define aggregation pipeline stages
//   const pipeline = [];

//   // Add $match stage for status
//   pipeline.push({
//     $match: matchConditions,
//   });

//   // Add $lookup stages
//   pipeline.push(
//     {
//       $lookup: {
//         from: 'badges',
//         localField: 'badgeId',
//         foreignField: '_id',
//         as: 'badge',
//       },
//     },
//     {
//       $lookup: {
//         from: 'candidates',
//         localField: 'candidateId',
//         foreignField: '_id',
//         as: 'candidate',
//       },
//     },
//     {
//       $unwind: '$candidate',
//     },
//     {
//       $lookup: {
//         from: 'providers',
//         localField: 'providerId',
//         foreignField: '_id',
//         as: 'provider',
//       },
//     },
//     {
//       $unwind: '$provider',
//     },
//     {
//       $lookup: {
//         from: 'examiners',
//         localField: 'examinerId',
//         foreignField: '_id',
//         as: 'examiner',
//       },
//     },
//     {
//       $unwind: '$examiner',
//     }
//   );

//   // Add $match stage for search criteria
//   if (search) {
//     pipeline.push({
//       $match: searchCriteria,
//     });
//   }

//   // Add $project stage
//   pipeline.push({
//     $project: {
//       _id: 1,
//       internalBadgeNum: 1,
//       grade: 1,
//       issueDate: 1,
//       dueDate: 1,
//       note: 1,
//       status: 1,
//       candidateFirstName: '$candidate.firstName',
//       candidateMiddleName: '$candidate.middleName',
//       candidateFamilyName: '$candidate.familyName',
//       providerOrganizationName: '$provider.OrganizationName',
//       examinerFirstName: '$examiner.firstName',
//       examinerMiddleName: '$examiner.middleName',
//       examinerFamilyName: '$examiner.familyName',
//       badgeTitle: '$badge.title', // Include badge title
//     },
//   });

//   // Add $sort stage for sorting
//   if (sort) {
//     const sortOrder = sort === 'asc' ? 1 : -1;
//     pipeline.push({
//       $sort: { 'issueDate': sortOrder }, // Sort by issueDate field in ascending or descending order
//     });
//   }

//   // Execute aggregation pipeline
//   const CandidateBadges = await candidateBadgeModel.aggregate(pipeline);

//   // Check if any badges were found
//   if (!CandidateBadges.length) {
//     return next(new AppErr('No badges found', 404));
//   }

//   // Return the result
//   return res.status(200).json({ status: 'success', data: CandidateBadges });
// });

export const getAllCandidatesWithBadgesForProvider = catchAsync(async (req, res, next) => {
    const { search, sort } = req.query;

    const pipeline = [
      {
        $match: {
          providerId: req.user?._id,
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
        $match: {
          'candidate.status': { $in: ['approved', 'suspended'] },
          'candidate.role': { $ne: 'admin' },
        },
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
        $group: {
          _id: {
            candidateId: '$candidateId',
            firstName: '$candidate.firstName',
            middleName: '$candidate.middleName',
            familyName: '$candidate.familyName',
            country: '$candidate.country',
            dateOfBirth: '$candidate.DOBirth',
            status: '$candidate.status',
          },
          pendingCount: {
            $sum: {
              $cond: {
                if: { $eq: ['$status', 'pending'] },
                then: 1,
                else: 0,
              },
            },
          },
          publishedCount: {
            $sum: {
              $cond: {
                if: { $eq: ['$status', 'published'] },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          candidateId: '$_id.candidateId',
          firstName: '$_id.firstName',
          middleName: '$_id.middleName',
          familyName: '$_id.familyName',
          country: '$_id.country',
          dateOfBirth: '$_id.dateOfBirth',
          pendingCount: '$pendingCount',
          publishedCount: '$publishedCount',
          candidateStatus: '$_id.status',
        },
      },
    ];

    // Add $match stage for search criteria
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { 'firstName': { $regex: search, $options: 'i' } },
            { 'middleName': { $regex: search, $options: 'i' } },
            { 'familyName': { $regex: search, $options: 'i' } },
          ],
        },
      });
    }

    // Add $sort stage for sorting by name
    if (sort) {
      pipeline.push({
        $sort: { 'firstName': sort === 'Ascending' ? 1 : -1 },
      });
    }
    if (!sort) {
      pipeline.push({
        $sort: { 'firstName':  -1 },
      });
    }

    const allBadgeHolders = await candidateBadgeModel.aggregate(pipeline);

    if (!allBadgeHolders.length) {
      return next(new AppErr('No candidates hold badges yet', 404));
    }

    return res.status(200).json({ status: 'success', allBadgeHolders });
});





export const  getAllCandidatesWithpendingBadgesForProvider =  catchAsync(async (req, res, next) => {
  try {
    const declinedBadges = await candidateBadgeModel.aggregate([
      {
        $match: {
          providerId: req.user?._id,
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
        $match: {
          'candidate.status': { $in: ['approved', 'suspended']  }, 'candidate.role' : { $ne: 'admin' } 
        },
      },
      {
        $lookup: {
          from: 'examiners',
          localField: 'examinerId',
          foreignField: '_id',
          as: 'examiner',
        },
      },
      {
        $unwind: '$examiner',
      },
      {
        $project: {
          _id: 1,  // Include the _id of the CandidateBadge document
          candidateId: '$candidate._id',
          candidateFirstName: '$candidate.firstName',
          candidateMiddleName: '$candidate.middleName',
          candidateFamilyName: '$candidate.familyName',
          candidateCountry: '$candidate.country',
          candidateDateOfBirth: '$candidate.DOBirth',
          examinerId: '$examiner._id',
          examinerFirstName: '$examiner.firstName',
          examinerMiddleName: '$examiner.middleName',
          examinerLastName: '$examiner.familyName',
          internalBadgeNum: '$internalBadgeNum',
          candidateStatus: '$candidate.status' ,
          role : '$candidate.role',  // Include internalBadgeNum
          grade: '$grade',  // Include grade
          issueDate: '$issueDate',  // Include issueDate
          dueDate: '$dueDate',  // Include dueDate
          note: '$note',  // Include note
        },
      },
    ]);

    if (!declinedBadges.length) {
      return next(new AppErr('No pending badges found', 404));
    }
    
    return res.status(200).json({ status: 'success', data: declinedBadges });
  } catch (error) {
    return next(new AppErr('An error occurred while fetching pending badges', 500));
  }
});

export const getDeclinedBadgesForProvider = catchAsync(async (req, res, next) => {
  try {
    const declinedBadges = await candidateBadgeModel.aggregate([
      {
        $match: {
          providerId: req.user?._id,
          status: 'declined',
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
        $match: {
          'candidate.status': { $in: ['approved', 'suspended']   }, 'candidate.role' : { $ne: 'admin' } 
        },
      },
      {
        $lookup: {
          from: 'examiners',
          localField: 'examinerId',
          foreignField: '_id',
          as: 'examiner',
        },
      },
      {
        $unwind: '$examiner',
      },
      {
        $project: {
          _id: 1,  // Include the _id of the CandidateBadge document
          candidateId: '$candidate._id',
          candidateFirstName: '$candidate.firstName',
          candidateMiddleName: '$candidate.middleName',
          candidateFamilyName: '$candidate.familyName',
          candidateCountry: '$candidate.country',
          candidateDateOfBirth: '$candidate.DOBirth',
          examinerId: '$examiner._id',
          examinerFirstName: '$examiner.firstName',
          examinerMiddleName: '$examiner.middleName',
          examinerLastName: '$examiner.familyName',
          candidateStatus: '$candidate.status',
          internalBadgeNum: '$internalBadgeNum',  // Include internalBadgeNum
          grade: '$grade',  // Include grade
          issueDate: '$issueDate',  // Include issueDate
          dueDate: '$dueDate',  // Include dueDate
          note: '$note',  // Include note
        },
      },
    ]);

    if (!declinedBadges.length) {
      return next(new AppErr('No declined badges found', 404));
    }

    return res.status(200).json({ status: 'success', data: declinedBadges });
  } catch (error) {
    return next(new AppErr('An error occurred while fetching declined badges', 500));
  }
});

//new controller
export const viewCandidateBadges = catchAsync(async (req, res, next) => {
    const { search, sort, status } = req.query;
    const matchObject = {providerId: req.user?._id }
    if(status) matchObject.status = status
    if(status && matchObject.status ==='All') matchObject.status = undefined
    const pipeline = [
      {
        $match: matchObject
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
        $match: {
          'candidate.status': { $in: ['approved', 'suspended'] },
          'candidate.role': { $ne: 'admin' },
        },
      },
      {
        $lookup: {
          from: 'examiners',
          localField: 'examinerId',
          foreignField: '_id',
          as: 'examiner',
        },
      },
      {
        $unwind: '$examiner',
      },
      {
        $project: {
          _id: 1,
          candidateId: '$candidate._id',
          candidateFirstName: '$candidate.firstName',
          candidateMiddleName: '$candidate.middleName',
          candidateFamilyName: '$candidate.familyName',
          candidateCountry: '$candidate.country',
          candidateDateOfBirth: '$candidate.DOBirth',
          examinerId: '$examiner._id',
          examinerFirstName: '$examiner.firstName',
          examinerMiddleName: '$examiner.middleName',
          examinerLastName: '$examiner.familyName',
          internalBadgeNum: '$internalBadgeNum',
          candidateStatus: '$candidate.status',
          role: '$candidate.role',
          grade: '$grade',
          issueDate: '$issueDate',
          dueDate: '$dueDate',
          note: '$note',
        },
      },
    ];

    // Add $match stage for search criteria
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { 'candidateFirstName': { $regex: search, $options: 'i' } },
            { 'candidateMiddleName': { $regex: search, $options: 'i' } },
            { 'candidateFamilyName': { $regex: search, $options: 'i' } },
            { 'examinerFirstName': { $regex: search, $options: 'i' } },
            { 'examinerMiddleName': { $regex: search, $options: 'i' } },
            { 'examinerLastName': { $regex: search, $options: 'i' } },
          ],
        },
      });
    }

    // Add $sort stage for sorting by first name
    if (sort) {
      pipeline.push({
        $sort: { 'candidateFirstName': sort === 'Ascending' ? 1 : -1 },
      });
    }
    if (!sort) {
      pipeline.push({
        $sort: { 'candidateFirstName':  -1 },
      });
    }

    const candidatesWithBadges = await candidateBadgeModel.aggregate(pipeline);

    if (!candidatesWithBadges.length) {
      return next(new AppErr('No candidates with badges found', 404));
    }
    
    console.log(candidatesWithBadges);
    return res.status(200).json({ status: 'success', data: candidatesWithBadges });
});

export const getAllBadgesForCandidateByIdPovider = catchAsync(async (req, res, next) => {
  let { candidateId } = req.params;
  // Convert candidateId to ObjectId
  candidateId = new mongoose.Types.ObjectId(candidateId);

  const pipeline = [
    {
      $match: { candidateId, status: 'published' , providerId : req.user?._id},
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
       },
    }
  );

  const allBadges = await candidateBadgeModel.aggregate(pipeline);
 
  if (!allBadges.length) {
    return next(new AppErr('No badges found for the candidate', 404));
  }


  return res.status(200).json({ status: 'success', data: allBadges });
});

  
  
  export const deleteCandidateBadgeForProvider = catchAsync(async(req, res, next)=> {
          const {candidateBadgeId} = req.params
          const candidateBadge = await candidateBadgeModel.findOne({_id : candidateBadgeId , providerId :req.user?._id})
          if(!candidateBadge) return next(new AppErr('no badge for this candidate' , 404))
          if(candidateBadge.status === 'published')return next(new AppErr('you have no permission to delete published badges' , 401))
          await candidateBadgeModel.findByIdAndDelete(candidateBadgeId);
          return res.status(200).json({status : 'success' , message : 'badge deleted successfully'})
  })
  

  
  export const editCandidateBadgeForProvider  = catchAsync(async(req, res, next)=>{
          const {candidateBadgeId} = req.params
          const candidateBadge = await candidateBadgeModel.findOne({_id : candidateBadgeId , providerId :req.user?._id})
          if(!candidateBadge) return next(new AppErr('no badge for this candidate' , 404))
          if(candidateBadge.status === 'published') return next(new AppErr('you have no permission to edit published badges' , 401));
          candidateBadge.note = req.body.note ? req.body.note : candidateBadge.note;
          candidateBadge.issueDate = req.body.issueDate ? req.body.issueDate : candidateBadge.issueDate;
          candidateBadge.dueDate = req.body.dueDate ? req.body.dueDate : candidateBadge.dueDate;
          candidateBadge.grade = req.body.grade ? req.body.grade : candidateBadge.grade ;
          candidateBadge.internalBadgeNum = req.body.internalBadgeNum ? req.body.internalBadgeNum : candidateBadge.internalBadgeNum;
          candidateBadge.examinerId = req.body.examinerId ? req.body.examinerId : candidateBadge.examinerId;
          candidateBadge.status = 'pending'
          await candidateBadge.save();
          return res.status(200).json({status : 'success' , message : 'badge updated successfully'})
  });


  export const viewCandidateBadgeForProvider  = catchAsync(async(req, res, next)=>{
    const {candidateBadgeId} = req.params;
    const candidateBadge = await candidateBadgeModel.findOne({_id : candidateBadgeId ,providerId :req.user?._id  })
    if(!candidateBadge) return next(new AppErr('no badge for this candidate' , 404));
    return res.status(200).json({status : 'success' , data : candidateBadge})
  })

  export const updateMyProfile = catchAsync(async (req, res, next) => {
  req.body.providerAdminInfo = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    familyName: req.body.familyName,
    adminGender: req.body.adminGender,
    DOBirth: req.body.DOBirth,
    adminRole: req.body.adminRole,
    adminPhoneNumber: req.body.adminPhoneNumber,
    adminAddress: req.body.adminAddress,
    adminCountry: req.body.adminCountry,
    adminPOBox: req.body.adminPOBox,
    adminCity: req.body.adminCity,
    adminPassportNumber: req.body.adminPassportNumber,
  };

   req.body.firstName = undefined;
   req.body.middleName= undefined;
   req.body.familyName= undefined;
   req.body.adminGender= undefined;
   req.body.DOBirth= undefined;
   req.body.adminRole= undefined;
   req.body.adminPhoneNumber= undefined;
   req.body.adminAddress= undefined;
   req.body.adminCountry= undefined;
   req.body.adminPOBox= undefined;
   req.body.adminCity= undefined;
   req.body.adminPassportNumber= undefined;

    const profile = await providerModel.findOne({_id:req.user._id , isDeleted : {$ne : true}})
      if(!profile) return next(new AppErr('cannot get your profile') , 400)
      await providerModel.findByIdAndUpdate(req.user._id , req.body)

    return res.status(200).json({
      status: 'success',
      message: 'your profile updated successfully ',
    });

});


export const updateMyPhoto= catchAsync(async (req, res, next) => {
   if (!req?.file) return next(new AppErr('error uploading logo , try again') , 400);

   //const logo = req.file?.filename


   const file = formatImage(req.file)
   const response = await cloudinary.v2.uploader.upload(file);
   const logo = response.secure_url;

   const profile = await providerModel.findByIdAndUpdate(req.user._id ,{logo : logo})

   if(!profile) return next(new AppErr('cannot update your logo') , 400)


   return res.status(200).json({
    status: 'success',
    message: 'your logo updated successfully ',
  });

}) 
