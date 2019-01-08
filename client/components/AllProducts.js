import React, {Component} from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/products'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    return <h1>Hello World!</h1>
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.productsList
  }
}

const dispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    deleteProduct: productID => dispatch(deleteProduct(productID))
  }
}

export default connect(mapStateToProps, dispatchToProps)(AllProducts)
