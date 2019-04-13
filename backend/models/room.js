const mongoose=require('mongoose');

const roomSchema=mongoose.Schema({
  roomNumber:Number,
  type:String,
  status:String
});


module.exports=mongoose.model("Room", roomSchema);

