import Joi from "joi";



export const signupSchema = Joi.object({
  userAgreement: Joi.boolean().valid(true).required(),
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    familyName: Joi.string().required(),
    DOBirth: Joi.date(),
    gender: Joi.string().valid('male', 'female'),
    phoneCode: Joi.string().min(1).max(5),
    phoneNumber: Joi.string().min(5).max(30).required(),
    profession: Joi.string(),
    asntRegNumber: Joi.string(),
    occupation: Joi.string(),
    email: Joi.string().email().required(),
    // confirmEmail: Joi.string().email().valid(Joi.ref('email')),
    address: Joi.string().allow(''),
    city: Joi.string(),
    country: Joi.string(),
    POBox: Joi.string(),
    password: Joi.string().min(10).required(),
    confirmPassword: Joi.string().min(10).valid(Joi.ref('password')).required(),
    PassportNumber: Joi.string(),
    asntRegNumber : Joi.string(),
  });



export const updateSchema = Joi.object({
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

  
  export const approveSchema = Joi.object({
    candidateBadgeId: Joi.string().required().hex().length(24),
  });
  export const viewSchema = Joi.object({
    candidateBadgeId: Joi.string().required().hex().length(24),
  });
  export const declineSchema = Joi.object({
    candidateBadgeId: Joi.string().required().hex().length(24),
    declineReason : Joi.string()
  });

  
  