import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteFromCart} from '../store/cart'

class CartItem extends Component {
  handleClick = () => {
    const {product: {id}, removeFromCart} = this.props
    removeFromCart({id})
    // REVIEW, compare and contrast:
    // this.props.removeFromCart({
    //   id: this.props.product.id
    // })
  }

  render() {
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
  removeFromCart: product => {
    dispatch(deleteFromCart(product))
  }
})

export default connect(null, mapProps)(CartItem)
