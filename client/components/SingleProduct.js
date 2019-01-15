import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {selectProduct} from '../store/products'
import {getToCart} from '../store/cart'
import {fetchReviews} from '../store/reviews'

import {
  withStyles,
  Typography,
  Card,
  CardContent,
  Button
} from '@material-ui/core/styles'
import StarRatings from 'react-star-ratings'

const styles = {
  card: {
    minWidth: 275,
    margin: '10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 22
  }
}

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      selectedSize: '',
      flag: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.selectProduct(id)
    this.props.setReviews()
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
    const {currentProduct, cart: {adding, items}, reviews, classes} = this.props

    console.log('CURRENT PRODUCT', currentProduct.id)

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
          <div>*Limited to 1 per order</div>

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
              {items.find(item => item.productId === currentProduct.id) ? (
                <button disabled type="button">
                  ADDED
                </button>
              ) : (
                <button className="active" type="submit">
                  {adding ? 'ADDING...' : 'ADD TO CART'}
                </button>
              )}
              {this.state.flag && (
                <div className="select-flag">{this.state.flag}</div>
              )}
            </form>
          ) : (
            <div>No sizes currently available</div>
          )}
        </div>

        <div>
          {reviews.filter(review => review.productId === currentProduct.id) ? (
            reviews
              .filter(review => review.productId === currentProduct.id)
              .map(review => {
                return (
                  <div key={review.id}>
                    <h3>{review.rating}</h3>
                    <h3>{review.comment}</h3>
                  </div>
                )
              })
          ) : (
            <div>No Reviews</div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = ({products: {currentProduct}, user, cart, reviews}) => ({
  currentProduct,
  user,
  cart,
  reviews
})

const mapDispatch = dispatch => ({
  selectProduct: id => {
    dispatch(selectProduct(id))
  },
  addToCart: product => {
    dispatch(getToCart(product))
  },
  setReviews: () => {
    dispatch(fetchReviews())
  }
})

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleProduct))

// size select also needs to get disabled
/* note stating product limited to one */
// maybe add user ability to change size in cart
