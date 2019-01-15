import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectProduct} from '../store/products'
import {getToCart} from '../store/cart'

class SingleProduct extends Component {
  state = {
    selectedSize: '',
    flag: ''
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.selectProduct(id)
  }

  handleChange = event => {
    if (event.target.value.length === 1) {
      this.setState({
        selectedSize: event.target.value
      })
    } else {
      this.setState({
        selectedSize: ''
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const {selectedSize} = this.state
    const {currentProduct: product} = this.props
    if (selectedSize === '') {
      this.setState({flag: 'Please select a size'})
    } else {
      this.setState({
        flag: ''
      })
      this.props.addToCart({product, selectedSize})
    }
  }
  render() {
    const {currentProduct, cart} = this.props
    if (!currentProduct.model) return <div>Loading...</div>
    return (
      <div className="single-product">
        <div className="images">
          <img src={currentProduct.imageUrl} />
        </div>
        <div className="content">
          <span>{currentProduct.brand}</span>
          <span>{currentProduct.model}</span>
          <span>${currentProduct.price}</span>
          {currentProduct.sizes[0] ? (
            <form onSubmit={this.handleSubmit} className="add-to-cart">
              <select onChange={this.handleChange}>
                <option>Select A Size</option>
                {currentProduct.sizes
                  .map(size => size.length)
                  .map(size => {
                    return (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    )
                  })
                  .sort()}
              </select>
              {cart.find(item => item.productId === currentProduct.id) ? (
                <button type="button" disabled>
                  item currently in cart
                </button>
              ) : (
                <button type="submit">Add To Cart</button>
              )
              // size select also needs to get disabled
              /* note stating product limited to one */
              // maybe add user ability to change size in cart
              }
              {this.state.flag && (
                <div className="select-flag">{this.state.flag}</div>
              )}
            </form>
          ) : (
            <div>No sizes currently available</div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = ({products: {currentProduct}, user, cart}) => ({
  currentProduct,
  user,
  cart
})

const mapDispatch = dispatch => ({
  selectProduct: id => {
    dispatch(selectProduct(id))
  },
  addToCart: product => {
    dispatch(getToCart(product))
  }
})

export default connect(mapState, mapDispatch)(SingleProduct)
