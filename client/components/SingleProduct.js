import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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

  async componentDidMount() {
    const {id} = this.props.match.params
    await this.props.selectProduct(id)
    await this.props.setReviews()
  }

  handleChange = event => {
    if (event.target.value.length >= 1) {
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

    if (!currentProduct.model) return <div>Loading...</div>
    return (
      <div className="single-product-container">
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
                  <button className="button-default" disabled type="button">
                    ADDED
                  </button>
                ) : (
                  <button className="button-default active" type="submit">
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
        </div>
        <button
          type="button"
          onClick={() => {
            this.props.history.push(`/products/${currentProduct.id}/reviewform`)
          }}
        >
          ADD REVIEW
        </button>

        <div>
          <table>
            <tbody>
              <tr>
                <td className="ratingHeader">rating</td>
                <td />
                <td className="ratingHeader">review</td>
              </tr>
              {reviews ? (
                reviews
                  .filter(review => review.productId === currentProduct.id)
                  .map(review => {
                    return (
                      <tr key={review.id}>
                        <td>{review.rating} </td>
                        <td />
                        <td>{review.comment}</td>
                      </tr>
                    )
                  })
              ) : (
                <div>No Reviews</div>
              )}
            </tbody>
          </table>
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
