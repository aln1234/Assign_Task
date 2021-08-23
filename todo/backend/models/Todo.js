const mongoose = require('mongoose');


const TodoSchema = new mongoose.Schema({

    title: {
        type:String,
        required:[true,"Please add a title to TODO"],
        trim:true,
        unique:true,
        maxLength:[100,'Title cannot be more than 100 characters'],
    },
    
   done:{
       type:Boolean,
       unique:false
   },
   user: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        
       required:true
   }
});


module.exports = mongoose.model("TODO", TodoSchema);