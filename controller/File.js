const File = require('../model/file');
exports.localFileUpload = async (req,res) => {
    try{
        const file = req.files.file;
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        file.mv(path, (err) => {
            console.error(err);
        });
        res.status(200).json({
            success: true,
            message: "File Successfully Uploaded...",
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}