import multer  from 'multer';
import util from 'util';
import fs from 'fs';
import server from '../index.js';

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        let dir = './media/';
        // const dir = "./media/uploads/chat/"+req.query.chatId+"/";
        if(req.headers.dirPath){
            dir += req.headers.dirPath;
        }
        let paths = dir.replace("./media","").split("/")

        let fullpath = "./media"
        for(let each of paths){
            fullpath +="/"+ each
            if (!fs.existsSync(fullpath)){
                fs.mkdirSync(fullpath);
            }
        }
        callback(null, dir);
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.trim());
    }
});

let imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/svg+xml" ||
        file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error('Only Images'), false);
    }
};
const upload = multer({storage: Storage,fileFilter: imageFilter}).single("file");
export default upload;
// var Storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         let dir = './media/';
//         // const dir = "./media/uploads/chat/"+req.query.chatId+"/";
//         if(req.query.chatId){
//             dir += "uploads/chat/"+req.query.chatId+"/"
//         }
//         if(req.headers.dirPath){
//             dir += req.headers.dirPath;
//         }
//         let paths = dir.replace("./media","").split("/")

//         let fullpath = "./media"
//         for(let each of paths){
//             fullpath +="/"+ each
//             if (!fs.existsSync(fullpath)){
//                 fs.mkdirSync(fullpath);
//             }
//         }
//         callback(null, dir);
//     },
//     filename: function(req, file, callback) {
//         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.trim());
//     }
// });

// let imageFilter = (req, file, cb) => {
//     if (file.mimetype === "image/jpg" ||
//         file.mimetype === "image/jpeg" ||
//         file.mimetype === "image/svg+xml" ||
//         file.mimetype === "image/png") {
//         cb(null, true);
//     } else {
//         cb(new Error('Only Images'), false);
//     }
// };
// const multerData = multer({
//     storage: Storage,
//     limits: {
//         fileSize: 1024 * 1024 * 2
//     },
//     fileFilter: imageFilter,
// });

// const multipleUpload =multerData.array("file", 10);

// const singleUpload = multerData.single("file");



// const uploadSingleFile = (req,res, isFromInside = false) => {
//     singleUpload(req, res, function(err) {
//         console.log('file : ', req.file);
//         if (err) {
//             //if called from inside the api
//             if(isFromInside){
//                 return {
//                     imageUploadError: err,
//                 };
//             }
//             return res.send("Something went wrong!");
//         }
//         const fullUrl = req.protocol + '://' + req.get('host');
//         let response = {...req.file};
//         response['path'] = fullUrl + req.file['destination'].replace("./media","")+ req.file['filename'];
//         response['file_extension'] = req.headers['file_extension'];

//         //if called from inside the api
//         if(isFromInside){
//             return response;
//         }
//         return res.send(response);
//     })
// };

// const uploadMultiFile = (req,res) => {
//     multipleUpload(req, res, function(err) {
//         console.log('call back: ' + util.inspect(req.query));
//         if (err) {
//             console.log(`error here: ${err}`);
//             return res.send("Something went wrong!");
//         }
//         return res.send(req.files);
//     });
// };

// const deleteSingleFile = (req,res, isFromInside = false) => {
//     if(req.headers['file_path']){
//         fs.unlink(req.headers['file_path'], (err)=>{
//             if (err) {
//                 console.log("unlink failed", err);
//                 if(isFromInside){
//                     return 'Delete failed !';
//                 }
//                 return res.send("Delete Failed!");
//             } else {
//                 console.log("file deleted");
//                 if(isFromInside){
//                     return 'Uploaded image deleted.';
//                 }
//                 return res.send("Image deleted successfully.");
//             }
//         });
//     }
// };

// export {uploadSingleFile, uploadMultiFile, deleteSingleFile};
// export default multerData;