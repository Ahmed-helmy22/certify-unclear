import mongoose from 'mongoose';
const badgeSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, 'badge title is required'] ,  unique: [true, 'bage title is unique']  },
    department : {type : String} , 
    badgePhoto : {type : String , required: [true, 'badgePhoto is required']},
    providerId : {
        type : mongoose.Types.ObjectId,
        ref : 'Provider',
        required: [true, 'academy of the badge is required']
    },
    isDeleted : {type : Boolean , default : false},
  },
  {
    timestamps: true,
  }
);

// tourSchema.pre('find', function(next) {
  badgeSchema.pre(/^find/, function(next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
const badgeModel = mongoose.model('Badge', badgeSchema);

export default badgeModel;