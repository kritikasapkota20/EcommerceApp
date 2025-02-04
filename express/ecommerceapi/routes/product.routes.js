const express=require("express");
const jwt=require("jsonwebtoken");
const  {checkAuth,checkAuthAdmin}  = require("../middleware/checkAuth.middleware");
const router=express.Router();
const {body,param,query}=require("express-validator");
const validation=require("../middleware/validation.middleware");
const multer=require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/");
    },
    filename:function(req,file,cb){
        const uniquesuffix=Date.now()+"-"+Math.round((Math.random()*1e9));
        const fileextension=file.mimetype.split("/")[1];
        cb(null,Date.now()+"."+fileextension);
    }
})
const upload=multer({storage:storage});


const { addproduct,
    getproduct,
    getfeaturedproduct,
    getlatestproduct,
    findproductbyid,
    createOrders,
    getorders,
    deleteProductById,
    updateProductById}=require("../controllers/product.controllers");
    const productvalidate=[
        body("name").notEmpty(),body("price").notEmpty(),validation
    ]
    const validateforupdate=[
        body("name").notEmpty().withMessage("please enter the product name that you want to change"),param("productid").notEmpty().withMessage("plz enter the product id for updation"),validation]
   
const validategetproducts=[query("page").optional().isInt({min:1}).withMessage("please enter the positive page no in numeric form")]
    // ,query("minprice").optional().isInt().withMessage("please give the numeric value"),query("maxprice").optional().isInt()]
   
   
router.get("/",validategetproducts, validation,getproduct);
router.post("/",checkAuth,upload.single('image'),addproduct);
router.get("/featured",getfeaturedproduct);
router.get("/latest",getlatestproduct);
router.post("/order",checkAuth,createOrders);
router.get("/getorder",checkAuth,getorders);


router.get("/:productid",findproductbyid);
router.patch("/:productid",checkAuthAdmin,
    upload.single("image"),updateProductById);
// router.patch("/:productid",checkAuth,updateProductById);

router.delete("/:productid",checkAuthAdmin,deleteProductById);
module.exports=router;