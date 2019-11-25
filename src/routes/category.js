const router = require('express').Router();
const Category = require('../models/Category');

const postCategory = (req, res) => {
    let body = req.body

    let category = new Category(body)

    category.save((err, categoryDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            categoryDB
        })
    })
}

const getCategory = (req, res) => {
    let id = req.params.id;

    Category.findOne({ _id: id })
        .populate('subcategories')
        .exec((err, categoryDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: `category with id ${id} not founded`
                })
            }

            res.status(200).json({
                ok: true,
                categoryDB
            })
        })
}

const updateCategory = (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Category.findOneAndUpdate({_id: id}, body, { new: true }, (err, categoryDB) => {
        if(err){
            return res.status.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoriaDB
        })
    })
}

const getCategories = (req, res) => {
    Category.find((err, categoriesDB) => {
        if (err) {
            res.json({
                ok: false,
                error: err
            })
        }

        res.json({
            ok: true,
            categoriesDB
        })
    })
}


router.route('/api/category')
    .post(postCategory)
    .get(getCategories)

router.get('/api/category/:id', getCategory)
router.put('/api/category/:id', updateCategory)


module.exports = router;
