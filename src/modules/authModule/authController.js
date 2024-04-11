import { sendEmail } from '../../utils/email.js';
import { resetPsswordTemplate } from '../../utils/resetPasswordHtml.js';
import AppErr from '../../utils/appErr.js';
import catchAsync from '../../utils/catchAsync.js';
import bcrypt from 'bcrypt';
import { createSendToken } from '../../utils/createSendToken.js';
import { decodeToken } from '../../utils/createToken.js';
import candidateModel from '../../../database/models/candidateModel.js';
import providerModel from '../../../database/models/providerModel.js';
import examinerModel from '../../../database/models/examinerModel.js';
import { generateAuthCode } from '../../utils/generateAuthCode.js';



export const forgetPassword = (model) => {

 return catchAsync(async (req, res, next) => {
  const user = await model.findOne({ email: req.body.email , isDeleted : {$ne : true}});
 
  if (!user) {
    return next(
      new AppErr('no user with this email, please enter right email', 404)
    );
  }
 const authCode = generateAuthCode()
     user.passwordResetCode = authCode
     user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({ email: req.body.email, template: resetPsswordTemplate(authCode) });
    res.status(200).json({
      status: 'success',
      message: 'code is sent to the email of the user ',
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppErr('failed to send email , try again later', 500));
  }
})};



export const verifyEmail= (model) => {
    return catchAsync(async (req, res, next) => {
      const { verificationCode , email} = req.body;
       if(!email || !verificationCode){
        return next(new AppErr('please enter your email and verifiction code ', 400));
      }
      const user = await model.findOne({ verificationCode ,email , isDeleted : {$ne : true}});

      // Check if the user and the verification code are valid
      if (!user || !user.verificationCodeExpires || Date.now() > user.verificationCodeExpires) {
        return next(new AppErr('user not exist or Invalid or expired verification code', 400));
      }

      user.isEmailVerified = true;
      user.verificatinCode = undefined;
      user.verificationCodeExpires = undefined;
      await user.save();
      createSendToken(user, 200, res);
    });
  };
  


export const resetPassword =(model) => {
    return catchAsync(async (req, res, next) => {
      const { passwordResetCode , email  , password , passwordConfirm} = req.body;
        const user = await model.findOne({
          email,
          passwordResetCode ,
          passwordResetExpires: { $gt: Date.now() },
          isDeleted : {$ne : true}
        });
        if (!user) {
          return next(new AppErr('code is wrong or not valid , only valid for 10 minutes', 404));
        }
        user.password = password;
        user.passwordConfirm = passwordConfirm;
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        user.passwordChangedAt = Date.now() - 3000
        await user.save({ validateBeforeSave: false });
        createSendToken(user, 200, res);
})};

export const updatePassword =(model) => { 
    return catchAsync(async (req, res, next) => {
      const {oldPassword ,newPassword ,  passwordConfirm} = req.body
      const user = await model.findById(req.user._id).select('+password');
      if (!user || !(await bcrypt.compare(oldPassword, user.password)))
           return  next(new AppErr('invalid password', 400));
      user.password = newPassword
      user.passwordConfirm = passwordConfirm;
      user.passwordChangedAt = Date.now() - 3000
      await user.save({ validateBeforeSave: false });
      res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true 
      });
      res.status(200).json({ status: 'success' });
})};


export const login = (model) => { 
  return catchAsync(async (req, res, next) => {

  const { email, password  } = req.body;
  const user = await model.findOne({ email  , isDeleted : {$ne : true}}).select('+password');
 
  if(!user) 
        return  next(new AppErr('no user found with this email', 404));

  if (!(await bcrypt.compare(password, user.password)))
       return  next(new AppErr('invalid email or password', 400));

  if(!user.isEmailVerified)
       return next(new AppErr('the email is not verified , please verify your email', 401))

  if(user.status === 'pending')
      return next(new AppErr('your account is still pending', 401))
  if(user.status === 'suspended')
  return next(new AppErr('your account is suspended now ', 401))
    
    createSendToken(user , 200 , res);
})};



export const getCurrentUser = catchAsync(async (req, res, next) => {
  
  let token;
  if (
    req.headers.cookie &&
    req.headers.cookie.startsWith('jwt')
  ) {
    token = req.headers.cookie.split('=')[1];
  }
  if (!token) {
    return next(new AppErr('you have no token , please log in', 401));
  }
  const decoded = decodeToken(token);
  if (!decoded)return next(new AppErr('your token is expired , please login again ', 401));
  let user;

  if(decoded.role === 'candidate'|| decoded.role === 'admin'){ user = await candidateModel.findOne({ _id: decoded._id , isDeleted : {$ne : true} })}
  else if(decoded.role === 'provider'){ user = await providerModel.findOne({ _id: decoded._id  , isDeleted : {$ne : true}})}
  else if(decoded.role === 'examiner' ) {user =await examinerModel.findOne({ _id: decoded._id  , isDeleted : {$ne : true}})};

  if (!user) return next(new AppErr('the user of this token is no longer exist', 401));
  if (!user.isEmailVerified) return next(new AppErr('your email is not verified, please verify your email', 401));

  if (user.status === 'pending') 
  return next(new AppErr('yor account is pending', 401))

  if (user.status === 'suspended') 
  return next(new AppErr('yor account is suspended', 401))
  
  if (user.passwordChangedAt) {
   const changePassTime = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
    if(decoded.iat < changePassTime)return next(new AppErr('your password is changed please login', 401))
  }

  return res.status(200).json({ status: 'success', user })
 
}) 



export const logout = catchAsync(async (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true 
    });
  
    // Respond with a JSON object indicating the success of the operation
    res.status(200).json({ status: 'success' });
})
