import AppErr from "../../utils/appErr.js";
import catchAsync from "../../utils/catchAsync.js";
import { generateAuthCode } from "../../utils/generateAuthCode.js";
import adminModel from "../../../database/models/adminModel.js";
import { emailTemplate } from "../../utils/emailHtml.js";
import { sendEmail } from "../../utils/email.js";
import { createSendToken } from "../../utils/createSendToken.js";
import bcrypt from 'bcrypt';
import { resetPsswordTemplate } from "../../utils/resetPasswordHtml.js";
 

  
  
  export const login = catchAsync(async (req, res, next) => {
  
    const { email, password } = req.body;
    const admin = await adminModel.findOne( {email} ).select('+password');
   
    if(!admin) 
          return  next(new AppErr('no admin found with this email', 404));
  
    if (!(await bcrypt.compare(password, admin.password)))
         return  next(new AppErr('invalid email or password', 400));
  
    if(!admin.isEmailVerified)
         return next(new AppErr('the email is not verified , please verify your email', 401)); 
      createSendToken(admin , 200 , res);
  });
  
  
  
  export const forgetPassword =  catchAsync(async (req, res, next) => {
     const admin = await adminModel.findOne({ email: req.body.email});
    
     if (!admin) {
       return next(
         new AppErr('no admin with this email, please enter right email', 404)
       );
     }
    const authCode = generateAuthCode()
        admin.passwordResetCode = authCode
        admin.passwordResetExpires = Date.now() + 10 * 60 * 1000;
   
     await admin.save({ validateBeforeSave: false });
   
     try {
       await sendEmail({ email: req.body.email, template: resetPsswordTemplate(authCode) });
       res.status(200).json({
         status: 'success',
         message: 'code is sent to the email of the admin ',
       });
     } catch (err) {
       admin.passwordResetCode = undefined;
       admin.passwordResetExpires = undefined;
       await admin.save({ validateBeforeSave: false });
       return next(new AppErr('failed to send email , try again later', 500));
     }
   })
  
  
   export const verifyEmail=catchAsync(async (req, res, next) => {
      const { verificationCode , email} = req.body;
      if(!email || !email){
        return next(new AppErr('please enter your email and verifiction code ', 400));
      }
      const admin = await adminModel.findOne({ verificationCode ,email});
  
      // Check if the admin and the verification code are valid
      if (!admin || !admin.verificationCodeExpires || Date.now() > admin.verificationCodeExpires) {
        return next(new AppErr('admin not exist or Invalid or expired verification code', 400));
      }
  
      admin.isEmailVerified = true;
      admin.verificatinCode = undefined;
      admin.verificationCodeExpires = undefined;
      await admin.save();
      createSendToken(admin, 200, res);
    });
  
  
    export const resetPassword = catchAsync(async (req, res, next) => {
        const { passwordResetCode , email  , password , passwordConfirm} = req.body;
          const admin = await adminModel.findOne({
            email,
            passwordResetCode ,
            passwordResetExpires: { $gt: Date.now() },
          });
          if (!admin) {
            return next(new AppErr('code is wrong or not valid , only valid for 10 minutes', 404));
          }
          admin.password = password;
          admin.passwordConfirm = passwordConfirm;
          admin.passwordResetCode = undefined;
          admin.passwordResetExpires = undefined;
          admin.passwordChangedAt = Date.now() - 3000
          await admin.save({ validateBeforeSave: false });
          createSendToken(admin, 200, res);
  })
  
  export const updatePassword = catchAsync(async (req, res, next) => {
        const {oldPassword ,newPassword ,  passwordConfirm} = req.body
        const user = await adminModel.findById(req.user._id).select('+password');
        if (!user || !(await bcrypt.compare(oldPassword, user.password)))
             return  next(new AppErr('invalid password', 400));
        user.password = newPassword
        user.passwordConfirm = passwordConfirm;
        user.passwordChangedAt = Date.now() - 3000
        await user.save({ validateBeforeSave: false });
        createSendToken(user, 200, res);
  })
  

  export const logout = catchAsync(async (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true 
    });
  
    // Respond with a JSON object indicating the success of the operation
    res.status(200).json({ status: 'success' });
})
