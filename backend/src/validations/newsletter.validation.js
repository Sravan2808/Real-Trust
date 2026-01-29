const validator = require('validator');

const validateNewsletterSubscription = (req) => {
    const { email } = req.body;

    if(!email){
        throw new Error("Email is required");
    }
    if(!validator.isEmail(email)){
        throw new Error("Please provide a valid email");
    }
}

const validateNewsletterId = (req)=>{
    const { id } = req.params;

    if(!validator.isMongoId(id)){
        throw new Error("Invalid newsletter ID");
    }
}

module.exports = {
  validateNewsletterSubscription,
  validateNewsletterId,
};