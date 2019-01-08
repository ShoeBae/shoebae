import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/products'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    return (
      <div className="productsList">
        <form>
          SORT BY{' '}
          <select
            name="sortBy"
            onChange={event => {
              this.props.fetchProducts(event.target.value)
            }}
          >
            <option value="brand">Brand</option>
            <option value="model">Name</option>
            <option value="price">Price</option>
          </select>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.productsList
  }
}

const dispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    deleteProduct: productID => dispatch(deleteProduct(productID))
  }
}

export default connect(mapStateToProps, dispatchToProps)(AllProducts)
