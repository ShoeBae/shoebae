import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectProduct} from '../store/products'

class SingleProduct extends Component {
  componentDidMount() {
    const {id} = this.props.match.params
    this.props.selectProduct(id)
  }
  render() {
    const {products: {currentProduct}} = this.props
    if (!currentProduct.model) return <div>Loading...</div>
    console.log(currentProduct.sizes.length)
    return (
      <div className="single-product">
        <img src={`/${currentProduct.imageUrl}`} />
        <div>
          {currentProduct.brand}
          {currentProduct.model}
        </div>
        <div>
          Sizes:{' '}
          {currentProduct.sizes.map(size => {
            return <div key={size.length}>{size.length}</div>
          })}
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
