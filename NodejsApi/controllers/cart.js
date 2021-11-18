/**
 * We can interact with mongoose in three diffirent ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */

 const Cart = require('../models/Cart')
 const User = require('../models/User')
 const Cartitem = require('../models/CartItem')



const getCart = async (req, res, next) => {
    const cart = await Cart.findById(req.value.params.cartID)

    return res.status(200).json({cart})
}

const newCartitem = async (req, res, next) => {
    // Find cart
    const cart = await Category.findById(req.value.body.cart)
 
    // Create a new cartitem
     const cartitem = req.value.body
     delete cartitem.cart
 
     cartitem.cart = cart._id
     const newCartitem = new Cartitem(cartitem)
     await newCartitem.save()
 
     // Add newly created cartitem to the actual cartitems
     cart.cartitem.push(newCartitem._id)

     

     await cart.save()
 
     return res.status(201).json({cartitem: newCartitem})
 }

const index = async (req, res, next) => {
    const cart = await Cart.find({})

    return res.status(200).json({cart})
}




module.exports = {
    getCart,
    index,
}