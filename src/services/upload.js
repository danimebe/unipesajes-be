const AWS = require('aws-sdk');
const multer = require('multer');
const config = require('../config/config');

const BUCKET_NAME = 'unipesajes-files';
const IAM_USER_KEY = config.awsPublicKey;
const IAM_USER_SECRET = config.awsSecretKey;

const storage = multer.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, '');
    }
})

const multipleUpload = multer({ storage: storage }).array('file', 6);

const uploadFile = (req, res, next) => {

    const files = req.files;

    const s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    })

    s3bucket.createBucket(() => {

        let responseData = [];
        let imagesNames = [];

        files.map((item) => {
            if (item.mimetype !== 'image/jpeg' && item.mimetype !== 'image/png') {
                res.status(400).json({
                    ok: false,
                    message: `Format ${item.mimetype} not allowed`
                })
            }
            let fileNameArr = item.originalname.split('.');
            let ext = fileNameArr[fileNameArr.length - 1];
            let fileName = fileNameArr[0] + Date.now() + '.' + ext;

            const params = {
                Bucket: BUCKET_NAME + '/images',
                Key: fileName,
                Body: item.buffer
            };

            s3bucket.upload(params, (err, data) => {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        err
                    })
                } else {
                    responseData.push(data);
                    imagesNames.push(data.key);
                    if (responseData.length == file.length) {
                        body = {
                            name: req.body.name,
                            description: req.body.description,
                            categories: req.body.categories,
                            images: imagesNames
                        }
                        next(req, res, body);
                    }
                }
            })
        })
    })
}

const getFile = (req, res) => {

    const s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    })
    s3bucket.createBucket(() => {
        const params = {
            Bucket: BUCKET_NAME + '/images',
            Key: req.params.productKey,
        };
        s3bucket.getObject(params, (err, data) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.setHeader('Content-disposition', `attachment; filename=${params.Key}`);
            res.setHeader('Content-length', data.ContentLength);
            res.end(data.Body);
        })
    })
}



module.exports = {
    multipleUpload,
    uploadFile,
    getFile
}



