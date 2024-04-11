import Joi from 'joi';

// Define validation schema for signup
export const signupSchema = Joi.object({
  userAgreement: Joi.boolean().valid(true).required(),
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  familyName: Joi.string().required(),
  DOBirth: Joi.date(),
  gender: Joi.string().valid('male', 'female'),
  phoneNumber: Joi.string().min(5).max(30).required(),
  occupation: Joi.string(),
  email: Joi.string().email().required(),
  // confirmEmail: Joi.string().email().valid(Joi.ref('email')).required(),
  // leeWebsiteId, leeCompany, leeRegNumber, itraWebsiteId, itraRegNumber, itraName, mycertWebsiteId, myCertRegNumber
  
  leeWebsiteId: Joi.string().hex(),
  leeCompany: Joi.string(),
  leeRegNumber:Joi.string(),

  itraWebsiteId: Joi.string().hex(),
  itraRegNumber:Joi.string(),
  itraName:Joi.string(),
  
  mycertWebsiteId: Joi.string().hex(),
  myCertRegNumber:Joi.string(),

  address: Joi.string(),
  qualification: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
  POBox: Joi.string(),
  password: Joi.string().min(10).required(),
  confirmPassword: Joi.string().min(10).valid(Joi.ref('password')).required(),
  PassportNumber: Joi.string(),
});




// Define validation schema for getCandidateProfile
export const getCandidateProfileSchema = Joi.object({
  candidateId: Joi.string().hex(),
  email: Joi.string().email()
});


export const getCandidateValidBadgesSchema = Joi.object({
    candidateId: Joi.string().hex().required()
  });


// Define  schema for getAllBadgesForCandidate
export const getAllBadgesForCandidateSchema = Joi.object({
  candidateId: Joi.string().hex(),
  email: Joi.string().email()
})



export const updateMyProfileSchema = Joi.object({
  firstName: Joi.string(),
  middleName: Joi.string(),
  familyName: Joi.string(),
  DOBirth: Joi.string(),
  gender: Joi.string().valid('male', 'female'),
  phoneNumber: Joi.string().min(5).max(30),
  occupation: Joi.string(),
  address: Joi.string(),
  qualification: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
  POBox : Joi.string(),
  // isEmailVerified: Joi.boolean(),
  PassportNumber : Joi.string(),
}).min(1);

export const getSingleCandidateBadgeSchema = Joi.object({
    candidateBadgeId: Joi.string().hex().required()
  });