import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteFromCart} from '../store/cart'

class CartItem extends Component {
  handleClick = () => {
    const {id, removeFromCart} = this.props
    removeFromCart(id)
  }

  render() {
    console.log(this.props, '<<<PROPS')
    const {product, selectedSize} = this.props
    return (
      <div className="cart-item">
        <div className="cart-item--img" />
        <div className="cart-item--info">
          <span>{product.brand}</span>
          <span>{product.model}</span>
          <span>{product.color}</span>
          <span>Size: {selectedSize}</span>
        </div>
        <div className="flex-center">
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
