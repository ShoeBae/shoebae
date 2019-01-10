import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectProduct} from '../store/products'
import {getToCart} from '../store/cart'

class SingleProduct extends Component {
  state = {
    selectedSize: '',
    mustSelect: false
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
    const {currentProduct} = this.props
    if (selectedSize === '') {
      this.setState({mustSelect: true})
    } else {
      this.setState({
        mustSelect: false
      })
      this.props.addToCart({currentProduct, selectedSize})
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
            {this.state.mustSelect && (
              <div className="select-flag">Please select a size</div>
            )}
          </form>
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
