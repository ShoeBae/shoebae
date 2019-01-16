import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartItem from './CartItem'

class Cart extends Component {
  render() {
    const {cart: {items}} = this.props
    return (
      <div className="cart flex-center">
        {!items[0] ? (
          <div className="empty">
            <div>Shopping cart is empty</div>
            <div>You have no items in your cart</div>
            <div>
              Click <Link to="/products">here</Link> to continue shopping
            </div>
          </div>
        ) : (
          <div className="nonempty">
            <div className="header">My Cart</div>
            <div className="cart-main flex-center">
              <main>
                <div className="products">
                  {items.map(product => (
                    <CartItem {...product} key={product.id} />
                  ))}
                </div>
              </main>
              <div className="summary">
                <div className="summary--header">
                  <span>SUMMARY</span>
                  <span>
                    {items.length} {items.length > 1 ? 'items' : 'item'}
                  </span>
                </div>
                <div className="summary--subtotal">
                  <span>SUBTOTAL</span>
                  <span>
                    {' '}
                    ${items.reduce(
                      (total, product) =>
                        total + parseFloat(product.product.price),
                      0
                    )}
                  </span>
                </div>
                <Link to="/checkout">
                  <button
                    onClick={this.handleClick}
                    type="button"
                    className="button-default active checkout-button"
                  >
                    CONTINUE TO CHECKOUT
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = ({cart}) => ({cart})

const mapProps = () => ({})

export default connect(mapState, mapProps)(Cart)
