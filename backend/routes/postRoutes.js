const express = require("express");
const router = express.Router();

const FilesModel = require("../db/Files");
const multer = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Images/')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },

});
router.post('/allfiles', upload.single('selectfile'), (req, res) => {
    console.log(req.file)
    const url = req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename

    let ins = new FilesModel({ file: url, filename: req.file.filename });
    ins.save((err) => {
        if (err) {
            console.log(err)
        }
        else {

            res.json({ "err": 0, "msg": "File Uploaded" })
        }
    })
})

router.get("/getfiles", (req, res) => {
    FilesModel.find({}, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});
router.get("/downloadfiles/:filename", (req, res) => {
    res.download('./Images/' + req.params.filename)
    // console.log(req.params);
});



module.exports = router;
