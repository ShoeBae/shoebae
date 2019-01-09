import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectProduct} from '../store/products'

class SingleProduct extends Component {
  componentDidMount() {
    const {id} = this.props.match.params
    this.props.selectProduct(id)
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('ADDED TO CART')
  }
  render() {
    const {products: {currentProduct}} = this.props
    if (!currentProduct.model) return <div>Loading...</div>
    console.log(currentProduct.sizes.length)
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
            <select>
              {currentProduct.sizes.map(size => (
                <option key={size.length}>{size.length}</option>
              ))}
            </select>
            <button type="submit">Add To Cart</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = ({products, user}) => ({products, user})

const mapDispatch = dispatch => ({
  selectProduct: id => {
    dispatch(selectProduct(id))
  }
})

export default connect(mapState, mapDispatch)(SingleProduct)
