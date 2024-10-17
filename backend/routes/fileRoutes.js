const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodsOverride = require('method-override');

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        const {orgId} = req.params; const dir = path.join(__dirname, '../data-sources', orgId);

        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, dir); 
        });
    },
    filename: function(req, file, callback){
        const uniqueSuffix = Date.now();
        callback(null, file.originalname+'-'+uniqueSuffix);
    }
})

const upload = multer({storage: storage});


router.post('/:orgId', upload.single('file'), (req, res, next)=>{

    if(req.file){
        res.status(200).json({"message": "File uploaded Successfully", "file": req.file});
    }
    else{
        res.status(400).send("No file sent!!!");
    }
    
});

router.get('/', (req, res)=>{
    res.send("You can post files!!!");
})

module.exports = router;