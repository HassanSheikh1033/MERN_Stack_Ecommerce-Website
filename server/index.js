const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { connect, default: mongoose } = require('mongoose')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
// const Products = require('../models/productModel');



// MiddleWares:
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method, req.body)

    next()
})
// app.use(express.urlencoded({extended: true}));


// Creating Upload Endpoint for Images:
app.use('/images', express.static('uploads/images'))

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// ErrorHandler_Middlewares:
app.use(notFound);
app.use(errorHandler);



// Image Storage Engine:
// const storage = multer.diskStorage({
//     destination: './uploads/images'
//     , filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({ storage: storage })



// app.post('/upload', upload.single('product'), (req, res) => {
//     res.json({
//         success: 1,
//         image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
//     })
// })




// Connecting to DATABASE:
connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}).catch(err => {
    console.log(err)
})




