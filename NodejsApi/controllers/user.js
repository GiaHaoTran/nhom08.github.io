/**
 * We can interact with mongoose in three diffirent ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */

 const User = require('../models/User')
 const Cart = require('../models/Cart')

 const getUser = async (req, res, next) => {
    const { userID } = req.value.params

    const user = await User.findById(userID)

    return res.status(200).json({user})
 }

 const getUserCart = async (req, res, next) => {
    const { userID } = req.value.params

    // Get user
    const user = await user.findById(categoryID).populate('cart')

    return res.status(200).json({cart: user.cart})
 }


const index = async (req, res, next) => {
    const users = await User.find({})

    return res.status(200).json({users})
}

const newUser = async (req, res, next) => {
    // Create User
    const newUser = new User(req.value.body)
    // Create Cart
    const newCart = new Cart({
        "user_id": newUser._id
    })
    // Save cart
    await newCart.save()
    newUser.cart = newCart._id
    // Save user
    await newUser.save()
    return res.status(201).json({ success: true })
}

const deleteUser = async (req, res, next) => {
    const { userID } = req.value.params
 
     // Get a user
     const user = await User.findById(userID)

     // Get a cart

     const cart = await Cart.findById(user.cart)

     // Remove the user, cart
     await user.remove()
     await cart.remove()

     return res.status(200).json({ success: true })
}


const replaceUser = async (req, res, next) => {
    // enforce new user to old user
    const { userID } = req.value.params

    const newUser = req.value.body

    const result = await User.findByIdAndUpdate(userID, newUser)

    return res.status(200).json({success: true})
}

const updateUser = async (req, res, next) => {
    // number of fields
    const { userID } = req.value.params

    const newUser = req.value.body

    const result = await User.findByIdAndUpdate(userID, newUser)

    return res.status(200).json({success: true})
}

module.exports = {
    getUser,
    index,
    newUser,
    replaceUser,
    updateUser,
    deleteUser,
    getUserCart
}