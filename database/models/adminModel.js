import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = mongoose.Schema(
    {
        name : {type: String, required: [true, 'first Name of admin  is required'] } ,
        email: { type: String, required: [true, 'Email is required'], unique: [true, 'Email is unique'] },
        password: { type: String, required: [true, 'Password is required'], minlength: [10, 'password must be at least 10 characters'] , select : false },
        isEmailVerified: { type: Boolean, default: false },
        verificationCodeExpires : {type : Date},
        verificatinCode:{type : String , length : [6,'verification code is 6 character']},
        role: { type: String, enum: ['admin'],  default : 'admin' },
        passwordResetCode: {type : String , length : [6,'reset password code is 6 character']},
        passwordResetExpires: Date,
        passwordChangedAt: Date,
    },
    {
      timestamps: true,
    }
  );
  
  adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    this.password =await bcrypt.hash(this.password, 5);
    this.passwordConfirm = undefined;
    this.emailConfirm = undefined;
    next();
  });
  const adminModel = mongoose.model('admin', adminSchema);
  
  export default adminModel;
  












