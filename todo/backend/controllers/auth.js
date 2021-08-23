const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');




//@desc Register
//@route GET/api//v1/auth/register
//@access Public


exports.register = async  (req,res,next) => {

    try{
        const {name,email,password} = req.body;


    //create username

    const user = await User.create({
        name,
        email,
        password

    });

    sendTokenResponse(user,200,res);

}

   

    catch (err) {
        res.status(400).json({success:false})


    }
}
    



//@desc login
//@route GET/api//v1/auth/login
//@access Public


exports.login = async  (req,res,next) => {

    try{
        const {email,password} = req.body;


   //Validate User email and password
   if(!email || !password){
       return next(new ErrorResponse("Invalid Credentials ",401))
   }

   // Check for user
   const user = await User.findOne({email}).select('+password');
if (!user) {
    return next(new ErrorResponse("Invalid Credentials ",401))

} 

// CHeck is password matches

 const isMatch = await user.matchPassword(password);

 if(!isMatch) {
    return next(new ErrorResponse("Invalid Credentials ",401))

 }


  sendTokenResponse(user,200,res);

}

   

    catch (err) {
        res.status(400).json({success:false})


    }
}
    

// Get token from model, create cookie and send repsones

const sendTokenResponse = (user,statusCode,res) => {

    //Create Token

    const token = user.getSignedJwtToken();


    const options ={
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*21*60*60*1000),
        httpOnly:true,
    }





    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        token
    })



};

//@desc Get current user information
//@route POST/api/v1/auth/me

//@ access Private methods


exports.getMe= asyncHandler(async (req,res,next) => {
    const user=await  User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data:user
    })

})