const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        firstName: {
            type: String,
            require:true,
        },
        lastName:{
            type:String,
        }
    },
    email: {
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    password: {
        type: String,
    },
    gender:{
        type: String,
        enum:['Male','Femail',"Other"],
        default:'Male'
    },
    clientType:{
        type:String,
        enum:['Provider','Customer','Friend'],
        default:"Customer"
    },
    role:{
        type:String,
        enum:['Admin','Customer','Manager'],
        default:"Customer"
    }
},{timestamps:true});

const User = model("User",userSchema);
module.exports  = User;