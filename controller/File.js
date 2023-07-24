const File = require('../model/file');
const Cloudinery = require('cloudinary').v2;
exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        file.mv(path, (err) => {
            console.error(err);
        });
        res.status(200).json({
            success: true,
            message: "File Successfully Uploaded...",
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
function checkFileType(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}
async function uploadInCloudinary(file, folder) {
    const options = { folder };
    options.resource_type = "auto";
    return await Cloudinery.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload = async (req, res) => {
    try {
        const { name, email, tags } = req.body;
        const file = req.files.imageUrl;
        const supportedType = ['png', "jpg", "jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if (!checkFileType(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: 'File Type not supported...',
            })
        }
        const response = await uploadInCloudinary(file, 'hanish');
        const fileData = await File.create({
            name,
            email,
            tags,
            imgaeUrl: response.secure_url,
        })
        return res.status(200).json({
            success: true,
            data: fileData,
            message: 'Successfully Uploaded Cloudinery...',
        })
    } catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            message: 'Something went wrong...',
        })
    }
}

exports.videoUpload = async (req,res) => {
    try{
        const {name,email,tags} = req.body;
        const file = req.files.videoFile;
        const supportType = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if (!checkFileType(fileType, supportType)) {
            return res.status(400).json({
                success: false,
                message: 'File Type not supported...',
            });
        }
        const response = await uploadInCloudinary(file, 'hanish');
        const fileData = await File.create({
            name,
            email,
            tags,
            imgaeUrl: response.secure_url,
        });
        return res.status(200).json({
            success: true,
            data: fileData,
            message: 'Successfully Vedio Uploaded Cloudinery...',
        });

    }catch(err){
        console.error(err);
        return res.status(400).json({
            success: false,
            message: 'Something went wrong...',
        });
    }
}