import React, {Component} from 'react'
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

///map to state
//export connected state
