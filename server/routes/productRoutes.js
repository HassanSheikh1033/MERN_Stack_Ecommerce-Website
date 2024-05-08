const express = require('express');
const Products = require('../models/productModel');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');


const router = express.Router();


router.get('/getAllProducts', async (req, res) => {
    try {
        let products = await Products.find({});
        console.log("All Products Fetched")
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})






const storage = multer.diskStorage({
    destination: './uploads/images'
    , filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer({ storage: storage })

router.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })
})





router.post('/addproduct', async (req, res) => {
    let products = await Products.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1); //last 1 element
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Products({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })
    await product.save();
    res.json({
        success: true,
        name: req.body.name,
    })
})







router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Products.findOneAndDelete({ _id: id });
        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        console.log('Product removed:', deletedProduct.name);
        res.status(200).json({ success: true, name: deletedProduct.name });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});






router.get('/newCollection', async (req, res) => {
    try {
        let products = await Products.find({});
        let newcollection = products.slice(1).slice(-8);
        res.status(200).json(newcollection);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})







router.get('/popularinwomen', async (req, res) => {
    try {
        let products = await Products.find({ category: "women" });
        let popular_in_women = products.slice(0, 4);
        res.status(200).json(popular_in_women);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})








router.post('/addtocart', authMiddleware ,async (req, res) => {
    try {
        let userData = await Products.findOne({ _id: req.user.id });
        userData.cartData[req.body.item] += 1;
        await User.findOneAndUpdate({ _id: req.user.id }, {cartData:userData});
        res.status(200).json("added");
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})









router.post('/removefromcart', authMiddleware ,async (req, res) => {
    try {
        let userData = await Products.findOne({ _id: req.user.id });
        if(userData.cartData[req.body.item] > 0)
        userData.cartData[req.body.item] -= 1;
        await User.findOneAndUpdate({ _id: req.user.id }, {cartData:userData});
        res.status(200).json("removed");
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})







router.post('/getcart', authMiddleware ,async (req, res) => {
    try {
       let userData = await User.findOne({ _id: req.user.id });
       res.status(200).json(userData.cartData);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})




module.exports = router;