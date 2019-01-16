import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteFromCart} from '../store/cart'
import {Link} from 'react-router-dom'

class CartItem extends Component {
  handleClick = () => {
    const {id, removeFromCart} = this.props
    removeFromCart(id)
  }

  render() {
    const {product, selectedSize} = this.props
    return (
      <div className="cart-item">
        <Link to={`/products/${product.id}`}>
          <img src={product.imageUrl} className="cart-item--img" />
        </Link>
        <div className="cart-item--info">
          <Link to={`/products/${product.id}`}>
            <span>{product.brand}</span>
            <span>{product.model}</span>
          </Link>
          <span>Color: {product.color}</span>
          <span>Size: {selectedSize}</span>
        </div>
        <div className="cart-item--remove-container flex-center">
          <span className="cart-item--remove" onClick={this.handleClick}>
            remove
          </span>
        </div>
        <div className="cart-item--price flex-center">${product.price}</div>
      </div>
    )
  }
}

const mapProps = dispatch => ({
  removeFromCart(cartItemId) {
    dispatch(deleteFromCart(cartItemId))
  }
})

export default connect(null, mapProps)(CartItem)
