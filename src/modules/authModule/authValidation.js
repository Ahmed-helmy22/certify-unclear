import Joi from 'joi';

// Define validation schema for login
export const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  userType: Joi.string().valid('candidate', 'academy' , 'examiner').required(),
  password: Joi.string().min(10).required(),
});

// Define validation schema for forgetPassword
export const forgetPasswordValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  userType: Joi.string().valid('candidate', 'academy' , 'examiner').required(),
});


export const verifyEmailValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    userType: Joi.string().valid('candidate', 'academy' , 'examiner').required(),
    verificationCode: Joi.string().length(6).required(),
  });



// Define validation schema for resetPassword
export const resetPasswordValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  passwordResetCode: Joi.string().length(6).required(),
  password: Joi.string().min(10).required(),
  passwordConfirm: Joi.string().valid(Joi.ref('password')),
  userType: Joi.string().valid('candidate', 'academy' , 'examiner').required(),
});




// Define validation schema for updatePassword
export const updatePasswordValidationSchema = Joi.object({
    oldPassword: Joi.string().min(10).required(),
    newPassword: Joi.string().min(10).required(),
    passwordConfirm: Joi.string().valid(Joi.ref('newPassword'))
  });