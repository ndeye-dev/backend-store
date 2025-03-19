// const mongoose = require("mongoose");

// const productSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String },
//     price: { type: Number, required: true },
//     stock: { type: Number, default: 0 },
//     image: { type: String }, 
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String },
    rating: {
        rate: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
    }
});

module.exports = mongoose.model("Product", productSchema);
