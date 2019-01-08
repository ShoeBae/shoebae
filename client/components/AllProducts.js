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
          FILTER{' '}
          <select
            name="filterBy"
            onChange={event => {
              this.props.fetchProducts(event.target.value)
            }}
          >
            <option value="boots">Boots</option>
            <option value="dress">Dress</option>
            <option value="sneakers">Sneakers</option>
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
    fetchProducts: filterBy => dispatch(fetchProducts(filterBy)),
    deleteProduct: productID => dispatch(deleteProduct(productID))
  }
}

export default connect(mapStateToProps, dispatchToProps)(AllProducts)
