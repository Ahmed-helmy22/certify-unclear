import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const examinerSchema = mongoose.Schema(
  {
    firstName: { type: String, required: [true, 'first Name of examiner  is required'] },
    middleName: { type: String, },
    familyName: { type: String, required: [true, 'family Name of examiner  is required'] },
    DOBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female'] },
    phoneNumber: { type: String, minlength: [5, 'Phone number must be at least 5 characters'], maxlength: [30, 'Phone number cannot exceed 30 characters'], required: [true, 'Phone number is required'] },
    profession: { type: String },
    asntRegNumber: { type: String },
    email: { type: String, required: [true, 'Email is required'], unique: [true, 'Email is unique'] },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    POBox: { type: String },
    password: { type: String, required: [true, 'Password is required'], minlength: [10, 'password must be at least 10 characters'], select: false },
    isEmailVerified: { type: Boolean, default: false },
    verificationCodeExpires: { type: Date },
    verificatinCode: { type: String, length: [6, 'verification code is 6 character'] },
    status: { type: String, default: 'pending', enum: ['approved', 'pending', 'suspended'] },
    role: { type: String, enum: ['examiner'], default: 'examiner' },
    passwordResetCode: { type: String, length: [6, 'reset password code is 6 character'] },
    passwordResetExpires: Date,
    passwordChangedAt: Date,
    PassportNumber: { type: String },
    examinerPassportPhoto: { type: String, required: [true, 'passport photo of the examiner  is required'] },
    examinerVerificationPhoto: { type: String, required: [true, ' verification photo  the examiner  is required'] },
    examinerProfilePhoto: { type: String },
    examinerType: { type: String, enum: ["GOVERNMENT", "NONPROFIT ORG", "PRIVATE ACADEMY"] },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

examinerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 5);
  console.log(this.password);
  this.passwordConfirm = undefined;
  this.emailConfirm = undefined;
  next();
});
const examinerModel = mongoose.model('Examiner', examinerSchema);

export default examinerModel;













