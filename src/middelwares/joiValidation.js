import AppErr from "../utils/appErr.js";

const validate = (Schema) => {
  return (req, res, next) => {
    
    let validationParams = {};
   
    Object.assign(validationParams, req.body, req.params, req.query);
    let { error } = Schema.validate(validationParams, {
      abortEarly: true,presence: 'optional',
    });
    console.log(error , 'kkkkkkkkkkkkkkkkkkkkkkkk');
     if (error) {
      error = error.details.map((details) => details.message);
       return next(new AppErr(error[0]))
    }

    next();
  };
};

export default validate