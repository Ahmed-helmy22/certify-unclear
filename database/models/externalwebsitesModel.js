import mongoose from 'mongoose';
const externalwebsiteSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, 'website title is required'] ,  unique: [true, 'website title is unique']  },
    photo : {type : String , required: [true, 'website photo is required']} ,
    photoId: String,
  }, 
  {
    timestamps: true,
  }
);

const externalwebsiteModel = mongoose.model('ExternalWebsites', externalwebsiteSchema);

export default externalwebsiteModel;