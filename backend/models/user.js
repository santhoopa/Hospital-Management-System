const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const userSchema=mongoose.Schema({
  username: {type: String, required:true, unique:true},
  role: {type: String, required:true},
  registrationNumber:{type: Number},
  password: {type: String, required:true}
});

userSchema.plugin(uniqueValidator);
module.exports=mongoose.model("User", userSchema);
