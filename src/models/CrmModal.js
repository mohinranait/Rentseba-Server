const { Schema, model } = require("mongoose");

const crmSchema = new Schema({
    name:{type : String, required:true},
    phone:{type : String, required:true},
    category:{
        type : String, 
        default:'Ambulance',
        enum:['Ambulance','Pickup','Truck','Car']
    },
    clientType:{
        type : String, 
        default:'Customer',
        enum:['Provider','Customer','Relative','Friend']
    },
    district:{type : String, required:true},
},{timestamps:true});


const Crm = model("Crm", crmSchema);

module.exports = Crm;