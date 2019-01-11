import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectProduct} from '../store/products'
import {getToCart} from '../store/cart'

class SingleProduct extends Component {
  state = {
    selectedSize: '',
    qtyAddedToCart: 0,
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
    const {selectedSize, qtyAddedToCart} = this.state
    const {currentProduct: product} = this.props
    if (selectedSize === '' && qtyAddedToCart === 0) {
      this.setState({flag: 'Please select a size'})
    } else if (qtyAddedToCart > 0) {
      this.setState({
        flag: 'This product is limited to one'
      })
    } else {
      this.setState({
        qtyAddedToCart: 1,
        flag: ''
      })
      this.props.addToCart({product, selectedSize})
    }
  }
  render() {
    const {currentProduct} = this.props
    if (!currentProduct.model) return <div>Loading...</div>
    return (
      <div className="single-product">
        <div className="images">
          <img src={`/${currentProduct.imageUrl}`} />
        </div>
        <div className="content">
          <span>{currentProduct.brand}</span>
          <span>{currentProduct.model}</span>
          <span>${currentProduct.price}</span>
          {currentProduct.sizes[0] ? (
            <form onSubmit={this.handleSubmit} className="add-to-cart">
              <select onChange={this.handleChange}>
                <option>Select A Size</option>
                {currentProduct.sizes.map(size => size.length).map(size => {
                  return (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  )
                })}
              </select>
              <button type="submit">Add To Cart</button>
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

const mapState = ({products: {currentProduct}, user}) => ({
  currentProduct,
  user
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
