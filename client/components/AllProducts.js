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

  async componentDidMount() {
    await this.props.fetchProducts()
    this.setState({currentView: this.props.products})
  }

  handleChange(event) {
    if (event.target.value === 'all') {
      this.setState({currentView: this.props.products})
    } else {
      this.setState({
        currentView: this.props.products.filter(product => {
          return product.category === event.target.value
        })
      })
    }
  }

  render() {
    if (!this.props.products[0]) {
      return <div>...loading</div>
    }
    return (
      <div className="productsList">
        <form>
          {' '}
          <select name="sortBy" onChange={this.handleChange}>
            <option value="all">All Categories</option>
            <option value="boot">Boots</option>
            <option value="dress">Dress</option>
            <option value="sneaker">Sneakers</option>
          </select>
        </form>
        {this.state.currentView.map(product => (
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

const mapStateToProps = ({products}) => ({products: products.productsList})

const dispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    deleteProduct: productID => dispatch(deleteProduct(productID))
  }
}

export default connect(mapStateToProps, dispatchToProps)(AllProducts)
