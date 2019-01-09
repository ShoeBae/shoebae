import React, {Component} from 'react'
import {connect} from 'react-redux'

// going to need a cart item component

class Cart extends Component {
  render() {
    return <div>CART</div>
  }
}

const mapState = () => ({})

const mapProps = () => ({})

export default connect(mapState, mapProps)(Cart)
