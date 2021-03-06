const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Size = require('./size')
const ProductSize = require('./productsize')
const Cart = require('./cart')
const CartItem = require('./cartitem')
const Order = require('./order')
const OrderItem = require('./orderitem')

Review.belongsTo(Product)
Product.hasMany(Review)

Product.belongsToMany(Size, {through: ProductSize})
Size.belongsToMany(Product, {through: ProductSize})

Cart.hasOne(User)
User.belongsTo(Cart)

CartItem.belongsTo(Cart)
CartItem.belongsTo(Product)

Cart.hasMany(CartItem)

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Product, {through: OrderItem})
Product.belongsToMany(Order, {through: OrderItem})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Review,
  Size,
  ProductSize,
  CartItem,
  Cart,
  Order,
  OrderItem
}
