const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user",required:true },
    products:[
      {
        product:{
type:mongoose.Schema.Types.ObjectId,
ref:"product",
required:true},
quantity:{ type: Number, required:true,default:1 },
        }
    ],
    totalPrice:{type:Number,required:true},
    status:{
      type:String,
      enum:["pending","completed","cancelled"],
        default:"pending"
    }
    
},
{
    timestamps: true,
  })
const order=mongoose.model("order",orderSchema);
module.exports=order;