const multer = require("multer");

// configure store-->
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null,`${Date.now()}-${file.originalname}`);
  },
});


// file filter-->
const filefilter=(req,file,cb)=>{
    const allowedTypes=['image/jpg','image/jpeg','image/png'];
    if(allowedTypes.includes(file.minetype)){
        cb(null,true);
    }
    else{
        cb(new Error("Only .jpeg, .jpg, .png formates are allowed"));
    }
};

const upload=multer({storage,filefilter});
module.exports=upload;