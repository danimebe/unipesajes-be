const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: [ true, 'The name is necesary' ]},
    description: { type: String, required: true },
    categories: [{type: Schema.Types.ObjectId, ref: 'category'}],
    images: [{ type: String, required: true}],
    manual: {type: String},
    catalogue: {type: String}
});

module.exports = mongoose.model('product', productSchema);