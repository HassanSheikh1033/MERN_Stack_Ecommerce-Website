const User = require("../models/userModel")
const HttpError = require("../models/errorModel");
const jwt = require("jsonwebtoken")


// Creating jsonwebtoken method
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}




// ================= Register a New User
// POST : api/users/registerz
// UnProtected : 
const registerUser = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    // let cart = {};
    // for (let i = 0; i < 300; i++) {
    //     cart[i] = 0;
    // }

    try {
        const user = await User.signup(name, email, password, confirmPassword, {})

        const token = createToken(user._id)

        if (user) {
            res.status(201).json({ user, token })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
        // return next(new HttpError("User Registration failed", 422))
    }
}







// ================== Login a Register User 
// POST : api/users/:id
// Protected : 
const loginUser = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)

        if (user) {
            res.status(201).json({ user, token })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}










// =================== User-Profile 
// POST : api/users/:id
// Protected : 
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password")
        if (!user) {
            return next(new HttpError("User not found", 422))
        }
        res.status(201).json(user)
    }
    catch (err) {
        return next(new HttpError(err))
    }
}








// ================= Get Authors:
// POST : api/users/edit-user
// UnProtected : 
const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select("-password")
        res.status(201).json(authors)
    }
    catch (err) {
        return next(new HttpError(err))
    }
}



module.exports = { registerUser, loginUser, getUser, getAuthors }

