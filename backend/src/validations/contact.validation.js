const validator = require('validator');

const validateCreateContactData = (req)=>{
    const {fullName,email,mobileNumber,city} = req.body;

    if(!fullName || fullName.trim().length < 2){
        throw new Error("Full name is required and should be at least 2 characters long");
    }

    if(!email || !validator.isEmail(email)){
        throw new Error("A valid email is required");
    }

    if(!mobileNumber || !validator.isMobilePhone(mobileNumber,"en-IN")){
        throw new Error("A valid mobile number is required");
    }

    if(!city || city.trim().length < 2){
        throw new Error("City is required and should be at least 2 characters long");   
    }
}

module.exports = {
    validateCreateContactData
}