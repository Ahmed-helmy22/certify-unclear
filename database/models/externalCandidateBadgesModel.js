import mongoose from 'mongoose';
const externalBadgesSchema = mongoose.Schema(
  {
    websiteId : {type: mongoose.Types.ObjectId,ref: 'ExternalWebsites'},
    candidateId : { type: mongoose.Types.ObjectId,ref: 'Candidate' },
    title :{type :  String , required : true},
    issueDate : {type :  Date , required : true},
    dueDate : {type :  Date , required : true},
  },


  {
    timestamps: true,
  }
);


const externalBadgesModel = mongoose.model('ExternalBadges', externalBadgesSchema);

export default externalBadgesModel;