import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// going to need a cart item component

class Cart extends Component {
  render() {
    const {cart} = this.props
    console.log(cart, '<<<CART')
    return (
      <div className="cart">
        {!cart[0] ? (
          <div className="empty">
            <div>Shopping cart is empty</div>
            <div>You have no items in your cart</div>
            <div>
              Click <Link to="/products">here</Link> to continue shopping
            </div>
          </div>
        ) : (
          <div className="nonempty">
            <div>My Cart</div>
            <div>You have {cart.length} item in your cart</div>
            <div className="products">
              {cart.map(product => <div key={product.id}>ITEM GOES HERE</div>)}
            </div>
          </div>
        )}
      </div>
    )
  }
}

// my cart or your shopping cart is empty

const mapState = ({cart}) => ({cart})

const mapProps = () => ({})

export default connect(mapState, mapProps)(Cart)
