import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const providerSchema = mongoose.Schema(
    {
      providerType : {type : String ,required: [true, 'provider type is required'], enum : ["GOVERNMENT" , "NONPROFIT ORG" , "PRIVATE ACADEMY"]},
      OrganizationName: { type: String, unique: [true, 'Organization Name is unique'], required: [true, 'Organization Name is required'] },      
      webSite: { type: String, unique: true, required: [true, 'Website is required'] },
      email: { type: String, required: [true, 'Email is required'], unique: [true, 'Email is unique'] },
      password: { type: String, required: [true, 'Password is required'], minlength: [10, 'password must be at least 10 characters'] , select : false },
      phoneNumber: { type: String, minlength: [5, 'Phone number must be at least 5 characters'], maxlength: [30, 'Phone number cannot exceed 30 characters'], required: [true, 'Phone number is required'] },
      country: { type: String, required: [true, 'Country is required'] },
      logo: String,

      city: { type: String,  },
      address: { type: String },
      POBox: { type: String,  },
      isEmailVerified: { type: Boolean, default: false },
      verificationCodeExpires : {type : Date},
      status: { type: String, default: 'pending' , enum : ['approved' , 'pending' , 'suspended'] },
      role: { type: String, enum: ['provider'] , default : 'provider'},
      verificatinCode:{type : String , length : [6,'verification code is 6 character']  ,},
      passwordResetCode: {type : String , length : [6,'reset password code is 6 character']},
      bio : {type : String ,  minlength: [5, 'bio must be at least 5 characters']},
      passwordResetExpires: Date,
      passwordChangedAt: Date,
      isDeleted : {type : Boolean , default : false},
      providerAdminInfo : {
        firstName : {type: String } ,
        middleName : {type: String } ,
        familyName : {type: String } ,
        adminGender : {type : String },
        DOBirth : {type :Date },
        adminRole : {type : String },
        adminPhoneNumber : {type : String },
        adminAddress: { type: String },
        adminCountry: { type: String },
        adminPOBox: { type: String},
        adminCity: { type: String },
        adminPassportNumber : {type : String },
        adminPassportPhoto :{type : String },
        adminVerificationPhoto : {type : String},
        adminProfilePhoto : {type : String },
      }
    },
    {
      timestamps: true,
    }
  );
  
  providerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    this.password =await bcrypt.hash(this.password, 5);
    this.passwordConfirm = undefined;
    this.emailConfirm = undefined;
    next();
  });
  const providerModel = mongoose.model('Provider', providerSchema);
  
  export default providerModel;
  