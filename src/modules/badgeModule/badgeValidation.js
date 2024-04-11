import Joi from 'joi';

// Define validation schema for addBadge
export const addBadgeSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  department: Joi.string().min(2).max(255).required(),
});


export const addBadgeToSchema = Joi.object({
    // internalBadgeNum: Joi.string().max(255),
    grade: Joi.string().required().max(255),
    issueDate: Joi.date().required(),
    dueDate: Joi.date(),
    note: Joi.string().max(255),
    candidateId: Joi.string().required().hex().length(24), // MongoDB ObjectID
    badgeId: Joi.string().required().hex().length(24), // MongoDB ObjectID
    examinerId: Joi.string().required().hex().length(24), // MongoDB ObjectID
  });



// Define validation schema for updateBadge
export const updateBadgeSchema = Joi.object({
  title: Joi.string().max(255),
  department: Joi.string().max(255),
  badgeId: Joi.string().hex().required() // MongoDB ObjectId
})



// Define validation schema for deleteBadge
export const deleteBadgeSchema = Joi.object({
  badgeId: Joi.string().hex().required() // MongoDB ObjectId
});


// Define validation schema for deleteBadge
export const viewBadgeSchema = Joi.object({
    badgeId: Joi.string().hex().required() // MongoDB ObjectId
  });
  
  export const updateBadgePhotoSchema = Joi.object({
    badgeId: Joi.string().hex().required() // MongoDB ObjectId
  });
  