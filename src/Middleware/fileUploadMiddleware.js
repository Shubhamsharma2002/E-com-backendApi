import multer from "multer";


const storageAdd = multer.diskStorage({
    destination:(req,file, cb) =>{
        cb(null,'./Uploads/');
    },
    filename:(req, file, cb)=>{
        const name = Date.now() + '-' + file.originalname;
        cb(null,name);
    },
});
  
  export  const  uploadfile = multer({ storage: storageAdd });