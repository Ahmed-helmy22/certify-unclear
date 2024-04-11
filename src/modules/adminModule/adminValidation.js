import Joi from 'joi';

export const approveUserSchema = Joi.object({
  userId: Joi.string().hex().length(24).required()
});


export const suspendUserSchema = Joi.object({
  userId: Joi.string().hex().length(24).required()
});

export const getAllCandidateBadgesSchema = Joi.object({
  status: Joi.string().valid('pending', 'published', 'declined'),
  search: Joi.string(),
  sort: Joi.string().valid('asc', 'desc')
});



export const getAllProvidersInfoSchema = Joi.object({
  status: Joi.string().valid('pending', 'approved', 'suspended'),
  search: Joi.string(),
  sort: Joi.string().valid('asc', 'desc')
});




export const getAllCandidatesInfoSchema = Joi.object({
  status: Joi.string().valid('approved', 'pending', 'suspended'),
  sort: Joi.string().valid('asc', 'desc'),
  search: Joi.string(),
});



export const getAllExaminersInfoSchema = Joi.object({
  status: Joi.string().valid('approved', 'pending', 'suspended'),
  sort: Joi.string().valid('asc', 'desc'),
  search: Joi.string(),
});




export const viewUserSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
});


export const deleteUserSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
});




export const editExaminerSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  firstName: Joi.string(),
  middleName: Joi.string(),
  familyName: Joi.string(),
   gender:Joi.string(),
   PassportNumber : Joi.string(),
  DOBirth: Joi.date(),
  phoneNumber: Joi.string().min(5).max(30),
  profession: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
  POBox: Joi.string(),
  examinerType: Joi.string().valid('GOVERNMENT', 'NONPROFIT ORG', 'PRIVATE ACADEMY'),
});





export const editProviderSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  bio : Joi.string().min(5),
  OrganizationName: Joi.string().min(2).max(255),
  address: Joi.string().min(2).max(255),
  city: Joi.string().min(2).max(255),
  country: Joi.string().min(2).max(255),
  POBox: Joi.string().min(2).max(255),
  phoneNumber: Joi.string().min(5).max(30),
  providerType: Joi.string().valid('GOVERNMENT', 'NONPROFIT ORG', 'PRIVATE ACADEMY'),
  webSite: Joi.string().uri(),
  firstName :Joi.string().min(2).max(255),
  middleName :Joi.string().min(2).max(255),
  familyName :Joi.string().min(2).max(255),
  gender: Joi.string().valid('male', 'female'),
  DOBirth: Joi.date(),
  adminRole :Joi.string().min(2).max(255),
  adminPhoneNumber : Joi.string().min(2).max(255),
  adminAddress: Joi.string().min(2).max(255),
  adminCountry: Joi.string().min(2).max(255),
  adminPOBox: Joi.string().min(2).max(255),
  adminCity: Joi.string().min(2).max(255),
  adminPassportNumber :Joi.string().min(2).max(255),
}).min(1); // At least one field is required for an update


export const editCandidateSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  firstName: Joi.string(),
  middleName: Joi.string(),
  familyName: Joi.string(),
  occupation: Joi.string(),
  qualification: Joi.string(),
  address: Joi.string(),
  country: Joi.string(),
  city: Joi.string(),
  POBox : Joi.string(),
  phoneNumber: Joi.string().min(5).max(30),
  DOBirth: Joi.date(),
  gender: Joi.string().valid('male', 'female'),
  // isEmailVerified: Joi.boolean(),
  PassportNumber : Joi.string(),
}).min(1);