import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/products'

class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      currentView: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }
  handleChange(event) {
    console.log(event.target.value)
  }

  render() {
    return (
      <div className="productsList">
        <form>
          SORT{' '}
          <select
            name="sortBy"
            onChange={event => {
              console.log('lets sort this real soon!')
            }}
          >
            <option value="brand">Brand</option>
            <option value="model">Name</option>
            <option value="price">Price</option>
          </select>
        </form>
        {this.props.products.map(product => (
          <div key={product.id}>
            <Link className="linkText" to={`/products/${product.id}`}>
              <img src={product.imageUrl} /> {product.model}
              <br />
              {'$' + product.price}
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.productsList
  }
}

const dispatchToProps = dispatch => {
  return {
    fetchProducts: sortBy => dispatch(fetchProducts(sortBy)),
    deleteProduct: productID => dispatch(deleteProduct(productID))
  }
}

export default connect(mapStateToProps, dispatchToProps)(AllProducts)
