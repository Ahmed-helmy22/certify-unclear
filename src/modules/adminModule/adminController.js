import mongoose from "mongoose";
import candidateBadgeModel from "../../../database/models/candidateBadgeModel.js";
import providerModel from "../../../database/models/providerModel.js";
import AppErr from "../../utils/appErr.js";
import catchAsync from "../../utils/catchAsync.js";
import examinerModel from "../../../database/models/examinerModel.js";
import candidateModel from "../../../database/models/candidateModel.js";
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import { formatImage } from "../../utils/formatImage.js";



const approveUserFactory = (model, userType) => {
  return catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const user = await model.findById(userId);
    if (!user) return next(new AppErr('No user found', 404));
    if (user.status === 'approved') return next(new AppErr(`the ${userType} is approved already`, 404));
    if (user.role === 'admin') return next(new AppErr(`no user found`, 404));
    user.status = 'approved';
    await user.save();
    return res.status(200).json({ status: 'success', message: `this ${userType} is approved successfully` });
  });
};

export const approveProvider = approveUserFactory(providerModel, 'provider')
export const approveExaminer = approveUserFactory(examinerModel, 'examiner')
export const approveCandidate = approveUserFactory(candidateModel, 'candidate')



const suspendUserFactory = (model, userType) => {
  return catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const user = await model.findById(userId);
    if (!user) return next(new AppErr(`No ${userType} found`, 404));
    if (user.status !== 'approved') return next(new AppErr(`the account is ${user.status} `, 404));
    if (user.role === 'admin') return next(new AppErr(`no user found`, 404));
    user.status = 'suspended';
    await user.save();
    return res.status(200).json({ status: 'success', message: `this ${userType} is suspended successfully` });
  });
};

export const suspendProvider = suspendUserFactory(providerModel, 'provider')
export const suspendExaminer = suspendUserFactory(examinerModel, 'examiner')
export const suspendCandidate = suspendUserFactory(candidateModel, 'candidate')



// status = pending || published || declined , sort = asc , desc , search = /title of the badge/
export const getAllCandidateBadges = catchAsync(async (req, res, next) => {
  const { status, search, sort } = req.query;

  // Define match conditions based on status

  const matchConditions = status ? { status } : {};
  if (status && matchConditions.status === 'All') matchConditions.status = undefined
  // Define search criteria for badge title, candidate names, and provider's organization name
  const searchCriteria = search ? {
    $or: [
      { 'badge.title': { $regex: search, $options: 'i' } }, // Search by badge title
      { 'candidate.firstName': { $regex: search, $options: 'i' } }, // Search by candidate's first name
      { 'candidate.middleName': { $regex: search, $options: 'i' } }, // Search by candidate's middle name
      { 'candidate.familyName': { $regex: search, $options: 'i' } }, // Search by candidate's family name
      { 'provider.OrganizationName': { $regex: search, $options: 'i' } }, // Search by provider's organization name
    ]
  } : {};

  // Define aggregation pipeline stages
  const pipeline = [];

  // Add $match stage for status
  pipeline.push({
    $match: matchConditions,
  });

  // Add $lookup stages
  pipeline.push(
    {
      $lookup: {
        from: 'badges',
        localField: 'badgeId',
        foreignField: '_id',
        as: 'badge',
      },
    },
    {
      $unwind: '$badge'
    },
    {
      $match: {
        'badge.isDeleted': { $ne: true },
      }
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
        'candidate.isDeleted': { $ne: true },
        'candidate.role': 'candidate'
      }
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
      $match: {
        'provider.isDeleted': { $ne: true },
      }
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
      $match: {
        'examiner.isDeleted': { $ne: true },
      }
    },

  );

  // Add $match stage for search criteria
  if (search) {
    pipeline.push({
      $match: searchCriteria,
    });
  }

  // Add $project stage
  pipeline.push({
    $project: {
      _id: 1,
      internalBadgeNum: 1,
      grade: 1,
      issueDate: 1,
      dueDate: 1,
      note: 1,
      status: 1,
      candidateFirstName: '$candidate.firstName',
      candidateMiddleName: '$candidate.middleName',
      candidateFamilyName: '$candidate.familyName',
      providerOrganizationName: '$provider.OrganizationName',
      examinerFirstName: '$examiner.firstName',
      examinerMiddleName: '$examiner.middleName',
      examinerFamilyName: '$examiner.familyName',
      badgeTitle: '$badge.title', // Include badge title
    },
  });

  // Add $sort stage for sorting
  if (sort) {
    const sortOrder = sort === 'Ascending' ? 1 : -1;
    pipeline.push({
      $sort: { 'issueDate': sortOrder }, // Sort by issueDate field in ascending or descending order
    });
  }
  if (!sort) {
    pipeline.push({
      $sort: { 'issueDate': -1 },
    });
  }

  // Execute aggregation pipeline
  const CandidateBadges = await candidateBadgeModel.aggregate(pipeline);

  // Check if any badges were found
  if (!CandidateBadges.length) {
    return next(new AppErr('No badges found', 404));
  }

  // Return the result
  return res.status(200).json({ status: 'success', data: CandidateBadges });
});



// to get all providers with the number of badges 
// export const getAllProvidersInfo = catchAsync(async (req, res, next) => {
//   const { status, search, sort } = req.query;
//   console.log(req.query);
//    try {
//     // Define match conditions based on status
//     const matchConditions = {isDeleted:{$ne : true}};
//     if (status) matchConditions.status = status;

//     // Define aggregation pipeline stages
//     const pipeline = [];

//     // Add $match stage for status
//     pipeline.push({
//       $match: matchConditions,
//     });

//     // Add $lookup stage for badges
//     pipeline.push(    {
//       $lookup: {
//         from: 'badges',
//         localField: 'badgeId',
//         foreignField: '_id',
//         as: 'badge',
//       },
//     },
//     {
//       $unwind : '$badge'
//     },
//     {
//       $match : {
//       '$badge.isDeleted' : {$ne : true},
//     }
//     },
//     );

//     // Add $project stage to shape the output
//     pipeline.push({
//       $project: {
//         _id: 1,
//         OrganizationName: 1,
//         Logo: 1,
//         country: 1,
//         status: 1,
//         numIssuedBadges: { $size: '$badges' },
//       },
//     });

//     // Add $match stage for search by OrganizationName or country
//     if (search) {
//       pipeline.push({
//         $match: {
//           $or: [
//             { OrganizationName: { $regex: search, $options: 'i' } },
//             { country: { $regex: search, $options: 'i' } },
//           ],
//         },
//       });
//     }

//     // Add $sort stage for sorting by createdAt field
//     if (sort) {
//       const sortOrder = sort === 'Ascending' ? 1 : -1;
//       pipeline.push({
//         $sort: { 'createdAt': sortOrder },
//       });
//     }

//     // Execute aggregation pipeline
//     const providersInfo = await providerModel.aggregate(pipeline);
//      // Check if any providers were found
//     if (!providersInfo.length) {
//       return next(new AppErr('No providers found', 404));
//     }

//     // Return the result
//      return res.status(200).json({ status: 'success', data: providersInfo });
//   } catch (error) {
//     return next(new AppErr('Internal server error', 500));
//   }
// });
// 

export const getAllProvidersInfo = catchAsync(async (req, res, next) => {
  const { status, search, sort } = req.query;
  // Define match conditions based on status
  const matchConditions = { isDeleted: { $ne: true }, role: 'provider' };
  if (status) matchConditions.status = status;
  if (status && matchConditions.status === 'All') matchConditions.status = undefined

  // Define aggregation pipeline stages
  const pipeline = [];

  // Add $match stage for status
  pipeline.push({
    $match: matchConditions,
  });

  // Add $lookup stage for badges
  pipeline.push({
    $lookup: {
      from: 'candidatebadges',
      localField: '_id',
      foreignField: 'providerId',
      as: 'candidateBadges',
    },
  });

  // pipeline.push({
  //   $match: {
  //     'candidateBadges.status': 'published',
  //   },
  // });

  pipeline.push({
    $project: {
      _id: 1, // Group by provider ID
      OrganizationName: 1,
      Logo: 1,
      country: 1,
      status: 1,
      createdAt: 1,
      numProviderBadges: {
        $size: {
          $filter: {
            input: '$candidateBadges',
            as: 'badge',
            cond: { $eq: ['$$badge.status', 'published'] }
          }
        }
      }
    }
  });
  // Add $match stage for search by OrganizationName or country
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { OrganizationName: { $regex: search, $options: 'i' } },
          { country: { $regex: search, $options: 'i' } },
        ],
      },
    });
  }

  // Add $sort stage for sorting by createdAt field
  if (sort) {
    const sortOrder = sort === 'Ascending' ? 1 : -1;
    pipeline.push({
      $sort: { createdAt: sortOrder },
    });
  }
  if (!sort) {
    pipeline.push({
      $sort: { createdAt: -1 },
    });
  }



  // Execute aggregation pipeline
  const providersInfo = await providerModel.aggregate(pipeline);

  // Check if any providers were found
  if (!providersInfo.length) {
    return next(new AppErr('No providers found', 404));
  }

  // Return the result
  return res.status(200).json({ status: 'success', data: providersInfo });
}
);



export const getAllCandidatesInfo = catchAsync(async (req, res, next) => {
  try {
    const { status, sort, search } = req.query;

    // Define match conditions based on status
    const matchConditions = { isDeleted: { $ne: true }, role: 'candidate' };
    if (status) matchConditions.status = status;
    if (status && matchConditions.status === 'All') matchConditions.status = undefined

    // Define aggregation pipeline stages
    const pipeline = [];

    // Add $match stage for status
    pipeline.push({
      $match: matchConditions,
    });

    // Add $lookup stage for candidate badges
    pipeline.push({
      $lookup: {
        from: 'candidatebadges',
        localField: '_id',
        foreignField: 'candidateId',
        as: 'candidateBadges',
      },
    });


    // Add $project stage to shape the output
    pipeline.push({
      $project: {
        _id: 1,
        firstName: 1,
        middleName: 1,
        familyName: 1,
        candidateProfilePhoto: 1,
        country: 1,
        status: 1,
        numCandidateBadges: { $size: {
          $filter: {
            input: '$candidateBadges',
            as: 'badge',
            cond: { $eq: ['$$badge.status', 'published'] }
          }
        } },
      },
    });

    // Add $match stage for search by candidate name, country, and qualification
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { firstName: { $regex: search, $options: 'i' } },
            { middleName: { $regex: search, $options: 'i' } },
            { familyName: { $regex: search, $options: 'i' } },
            { country: { $regex: search, $options: 'i' } },
            { qualification: { $regex: search, $options: 'i' } },

          ],
        },
      });
    }

    // Add $sort stage for sorting
    if (sort) {
      const sortOrder = sort === 'Ascending' ? 1 : -1;
      pipeline.push({
        $sort: { 'createdAt': sortOrder },
      });
    }
    if (!sort) {
      pipeline.push({
        $sort: { 'createdAt': -1 },
      });
    }


    // Execute aggregation pipeline
    const candidatesInfo = await candidateModel.aggregate(pipeline);

    // Check if any candidates were found
    if (!candidatesInfo.length) {
      return next(new AppErr('No candidates found.', 404));
    }

    // Return the result
    return res.status(200).json({ status: 'success', data: candidatesInfo });
  } catch (error) {
    return next(new AppErr('Internal server error', 500));
  }
});




export const getAllExaminersInfo = catchAsync(async (req, res, next) => {
  try {
    const { status, sort, search } = req.query;

    // Define match conditions based on status
    const matchConditions = { isDeleted: { $ne: true } };
    if (status) matchConditions.status = status;
    if (status && matchConditions.status === 'All') matchConditions.status = undefined

    // Define aggregation pipeline stages
    const pipeline = [];

    // Add $match stage for status
    pipeline.push({
      $match: matchConditions,
    });

    // Add $lookup stage for candidateBadges
    pipeline.push({
      $lookup: {
        from: 'candidatebadges',
        localField: '_id',
        foreignField: 'examinerId',
        as: 'candidateBadges',
      },
    });

    // Add $project stage to shape the output
    pipeline.push({
      $project: {
        _id: 1,
        firstName: 1,
        middleName: 1,
        familyName: 1,
        candidateProfilePhoto: 1,
        country: 1,
        status: 1,
        examinerProfilePhoto: 1,
        numCandidateBadges: {
          $size: {
            $filter: {
              input: '$candidateBadges',
              as: 'badge',
              cond: { $eq: ['$$badge.status', 'published'] }
            }
          }
        },

      },
    });

    // Add $match stage for search by firstName, middleName, and familyName
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { firstName: { $regex: search, $options: 'i' } },
            { middleName: { $regex: search, $options: 'i' } },
            { familyName: { $regex: search, $options: 'i' } },
          ],
        },
      });
    }

    // Add $sort stage for sorting based on createdAt
    if (sort) {
      const sortOrder = sort === 'Ascending' ? 1 : -1;
      pipeline.push({
        $sort: { 'createdAt': sortOrder },
      });
    }
    if (!sort) {
      pipeline.push({
        $sort: { 'createdAt': -1 },
      });
    }

    // Execute aggregation pipeline
    const examinerInfo = await examinerModel.aggregate(pipeline);

    // Check if any examiners were found
    if (!examinerInfo.length)
      return next(new AppErr('No examiners found.', 404));

    // Return the result
    return res.status(200).json({ status: 'success', data: examinerInfo });
  } catch (error) {
    return next(new AppErr('Internal server error', 500));
  }
});





const viewUserFactory = (model, userType) => {
  return catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new AppErr(`Invalid ${userType} ID`, 400));
    }
    const user = await model.findById(userId);

    if (!user) {
      return next(new AppErr(`${userType} not found`, 404));
    }
    if (user.role === 'admin') return next(new AppErr(`no user found`, 404));

    return res.status(200).json({ status: 'success', data: user });
  })
};


export const viewProvider = viewUserFactory(providerModel, 'provider')
export const viewExaminer = viewUserFactory(examinerModel, 'examiner')
export const viewCandidate = viewUserFactory(candidateModel, 'candidate')




export const deleteUserFactory = (model, userType) => {
  return catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new AppErr(`Invalid ${userType} ID`, 400));
    }
    const user = await model.findById(userId);

    if (!user) {
      return next(new AppErr(`${userType} not found`, 404));
    }
    if (user.role === 'admin') return next(new AppErr(`no user found`, 404));
    user.isDeleted = true;
    await user.save()
    return res.status(200).json({ status: 'success', message: `${userType} deleted succefully` });
  })
};

export const deleteProvider = deleteUserFactory(providerModel, 'provider')
export const deleteExaminer = deleteUserFactory(examinerModel, 'examiner')
export const deleteCandidate = deleteUserFactory(candidateModel, 'candidate')




const editUserFactory = (model, userType) => {
  return catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    console.log(userId);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new AppErr(`Invalid ${userType} ID`, 400));
    }

    console.log(req.body);
    let photo;
    console.log(req?.file);
    if (req?.file) {
      const file = formatImage(req.file)
      const response = await cloudinary.v2.uploader.upload(file);
      photo = response.secure_url;
    }
    req.body.providerAdminInfo = {}
    if (userType == 'provider') {
      req.body.providerAdminInfo.firstName = req.body.firstName ? req.body.firstName : undefined
      req.body.providerAdminInfo.middleName = req.body.middleName ? req.body.middleName : undefined
      req.body.providerAdminInfo.familyName = req.body.familyName ? req.body.familyName : undefined
      req.body.providerAdminInfo.adminGender = req.body.adminGender ? req.body.adminGender : undefined
      req.body.providerAdminInfo.DOBirth = req.body.DOBirth ? req.body.DOBirth : undefined
      req.body.providerAdminInfo.adminRole = req.body.adminRole ? req.body.adminRole : undefined
      req.body.providerAdminInfo.adminPhoneNumber = req.body.adminPhoneNumber ? req.body.adminPhoneNumber : undefined
      req.body.providerAdminInfo.adminAddress = req.body.adminAddress ? req.body.adminAddress : undefined
      req.body.providerAdminInfo.adminCountry = req.body.adminCountry ? req.body.adminCountry : undefined
      req.body.providerAdminInfo.adminPOBox = req.body.adminPOBox ? req.body.adminPOBox : undefined
      req.body.providerAdminInfo.adminCity = req.body.adminCity ? req.body.adminCity : undefined
      req.body.providerAdminInfo.adminPassportNumber = req.body.adminPassportNumber ? req.body.adminPassportNumber : undefined
    }
    if (req.file && userType == 'examiner') req.body.examinerProfilePhoto = photo
    if (req.file && userType == 'provider') req.body.logo = photo
    if (req.file && userType == 'candidate') req.body.candidateProfilePhoto = photo
    const user = await model.findById(userId)
    if (!user || user.role === 'admin') return next(new AppErr(`no user found`, 404));
    const updatedUser = await model.findByIdAndUpdate(userId, req.body, { new: true, runValidators: false }
    );

    if (!updatedUser) {
      return next(new AppErr(`the ${userType} is not exist , or cannot update it`, 404));
    }

    return res.status(200).json({ status: 'success', data: updatedUser });
  })
};


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



export const editProvider = editUserFactory(providerModel, 'provider')
export const editExaminer = editUserFactory(examinerModel, 'examiner')
export const editCandidate = editUserFactory(candidateModel, 'candidate')







