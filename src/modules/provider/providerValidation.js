import Joi from 'joi';


export const deleteSchema = Joi.object({
  candidateBadgeId: Joi.string().required().hex().length(24),
});


export const editSchema = Joi.object({
    candidateBadgeId: Joi.string().hex().length(24).required(), // MongoDB ObjectID
    note: Joi.string().min(2).max(255),
    issueDate: Joi.date(),
    dueDate: Joi.date(),
    grade: Joi.string(),
    internalBadgeNum: Joi.string(),
    examinerId: Joi.string().hex().length(24), // MongoDB ObjectID
  }).min(1); // At least one field is required for an update

  export const viewSchema = Joi.object({
    candidateBadgeId: Joi.string().hex().length(24).required(), // MongoDB ObjectID
  });

// Define validation schema for updateMyProfile handler
export const updateMyProfileSchema = Joi.object({
  providerType:Joi.string().min(2).max(255),
  bio : Joi.string().min(5),
  OrganizationName: Joi.string().min(2).max(255),
  address: Joi.string().min(2).max(255),
  city: Joi.string().min(2).max(255).required(),
  country: Joi.string().min(2).max(255).required(),
  POBox: Joi.string().min(2).max(255).required(),
  phoneNumber: Joi.string().min(5).max(30).required(),
  providerType: Joi.string().valid('GOVERNMENT', 'NONPROFIT ORG', 'PRIVATE ACADEMY').required(),
  webSite: Joi.string().uri().required(), 
  
  
  
    firstName :Joi.string().min(2).max(255),
    middleName :Joi.string().min(2).max(255),
    adminRole :Joi.string().min(2).max(255),
    familyName: Joi.string().min(2).max(255),
    adminGender: Joi.string(),
    DOBirth: Joi.date(),
    adminPhoneNumber : Joi.string().min(2).max(255),
    adminAddress: Joi.string().min(2).max(255),
    adminCountry: Joi.string().min(2).max(255),
    adminPOBox: Joi.string().min(2).max(255),
    adminCity: Joi.string().min(2).max(255),
    adminPassportNumber :Joi.string().min(2).max(255),
  

}).min(1); // At least one field is required for an update


// Define validation schema for providerSchema
export const providerSchemaValidation = Joi.object({
  providerType: Joi.string().required().valid('GOVERNMENT', 'NONPROFIT ORG', 'PRIVATE ACADEMY'),
  OrganizationName: Joi.string().min(2).max(255).required(),
  address: Joi.string().allow('').min(2),
  city: Joi.string().min(2).max(255),
  country: Joi.string().min(2).max(255).required(),
  webSite: Joi.string().uri().required(),
  POBox: Joi.string().min(2).max(255),
  email: Joi.string().email().required(),
  // confirmEmail: Joi.string().email().valid(Joi.ref('email')).required(),
  password: Joi.string().required().min(10),
  confirmPassword: Joi.string().min(10).valid(Joi.ref('password')).required(),
  phoneNumber: Joi.string().min(5).max(30).required(),
    firstName: Joi.string().min(2).max(255),
    middleName: Joi.string().min(2).max(255),
    familyName: Joi.string().min(2).max(255),
    adminGender: Joi.string(),
    DOBirth: Joi.date(),
    adminRole: Joi.string(),
    adminPhoneNumber: Joi.string(),
    adminphoneCode: Joi.string(),
    adminAddress: Joi.string(),
    adminCountry: Joi.string().min(2).max(255),
    adminPOBox: Joi.string().min(2).max(255),
    adminCity: Joi.string().min(2).max(255),
    adminPassportNumber: Joi.string(),
    userAgreement: Joi.boolean().valid(true),
}).options({ abortEarly: true }); 

// Abort validation on first error
