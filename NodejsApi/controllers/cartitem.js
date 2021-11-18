/**
 * We can interact with mongoose in three diffirent ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */

 const Product = require('../models/Product')
 const Cartitem = require('../models/Cartitem')
 const Cart = require('../models/Cart')

 const getCartitem = async (req, res, next) => {
    const { cartitemID } = req.value.params

    const cartitem = await Cartitem.findById(cartitemID).populate('product')

    return res.status(200).json({cartitem})
 }


const index = async (req, res, next) => {
    const categories = await Cartitem.find({})

    return res.status(200).json({categories})
}



const replaceCartitem = async (req, res, next) => {
    // enforce new cartitem to old cartitem
    const { cartitemID } = req.value.params

    const newCartitem = req.value.body

    const result = await Cartitem.findByIdAndUpdate(cartitemID, newCartitem)

    return res.status(200).json({success: true})
}

const updateCartitem = async (req, res, next) => {
    // number of fields
    const { cartitemID } = req.value.params

    const newCartitem = req.value.body

    total_old = newCartitem.total

    const result = await Cartitem.findByIdAndUpdate(cartitemID, newCartitem)

    const product = Product.findById(result.product)

    var total = result.quantity * product.price

    result.total = total

    result.save()

    cart = Cart.findById(result.cart)
    cart.total = cart.total - total_old + total
    cart.save()

    return res.status(200).json({success: true})
}

const deleteCartitem = async (req, res, next) => {
    const { cartitemID } = req.value.params
 
     // Get a cartitem, cart
     const cartitem = await Cartitem.findById(cartitemID)
     const cart = await Cart.findById(cartitem.cart)

     // Remove the cart, cart
     await cartitem.remove()
     await cart.remove()

     return res.status(200).json({ success: true })
}

module.exports = {
    getCartitem,
    index,
    replaceCartitem,
    updateCartitem,
    deleteCartitem
}