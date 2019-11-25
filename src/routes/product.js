const app = require('express')();
const Product = require('../models/Product');
const upload = require('../services/upload');

app.post('/api/product', upload.multipleUpload, (req, res) => {
    upload.uploadFile(req, res, (req, res, body) => {
        let product = new Product(body);

        product.save((err, productDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                productDB
            })

        })
    })
})

app.get('/api/product', (req, res) => {
    Product.find()
        .populate('categories', 'name')
        .exec((err, productDB) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    message: err
                })
            }
            res.status(200).json({
                ok: true,
                productDB
            })
        })
})

app.get('/api/product/:id', (req, res) => {
    const id = req.params.id;

    Product.findOne({ _id: id })
        .populate('categories', 'name')
        .exec((err, productDB) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.status(200).json({
                ok: true,
                productDB
            })
        })
})

app.get('/api/product/images/:productKey',upload.getFile);



module.exports = app;
