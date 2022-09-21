const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');


    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
              cb(null, 'images');
        },
        filename: function(req, file, cb) {   
              cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
        }
    });
    
    
    /// xét xem ảnh có thuộc 3 loại này ko
    const fileFilter = (req, file, cb) => {
        const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if(allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
             cb(null, false);
        }
    }
    
    const upload = multer({ storage, fileFilter });

module.exports = upload