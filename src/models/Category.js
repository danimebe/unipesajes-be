const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: [ true, 'The name is necesary' ]},
    main: { type: Boolean, required: [ true, 'main is required for kwoun if the category is a main category'] },
    subcategories: [{type: Schema.Types.ObjectId, ref: 'category'}]
});

module.exports = mongoose.model('category', categorySchema);