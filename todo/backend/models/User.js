const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please add a name"],
       
        unique:true,
          },
    email: {
        type:String,
        required:[true,"Please add a email"],
        mathc:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email"],
       
        unique:true,
      
    },
    password:{
        type:String,
        required:[true,"Please add a password"],
        minLength:8,
        select:false

    }
    

});

//Encrpyt password using bcryptjs

UserSchema.pre("save",async function(next) {

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
}
);


//Sign JWT and return

UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

// Match user enter password to hashpassword

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


module.exports = mongoose.model("User", UserSchema);