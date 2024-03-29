// Validation 
const joi = require("joi");

// Register Validation 
const registerValidation =(data)=>{
    const schema = {
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    };
   return joi.validate(data, schema);
}
// login Validation 
const loginValidation =(data)=>{
    const schema = {
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    };
   return joi.validate(data, schema);
}


module .exports ={
    registerValidation,
    loginValidation

} 