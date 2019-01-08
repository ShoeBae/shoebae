import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectProduct} from '../store/products'

class SingleProduct extends Component {
  componenetDidMount() {
    const {id} = this.props.match.params
    this.props.getProduct(id)
  }
  render() {
    console.log(this.props, '<<PROPS')
    return <div className="single-product">blah</div>
  }
}

const mapState = (state, ownProps) => ({
  state,
  ownProps
})

const mapDispatch = dispatch => ({
  getProduct: id => {
    dispatch(selectProduct(id))
  }
})

export default connect(mapState, mapDispatch)(SingleProduct)
