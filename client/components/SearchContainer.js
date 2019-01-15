import React from 'react'
import {me} from '../store'

import {connect} from 'react-redux'

class SearchContainer extends React.Component {
  // search params === { page: 2, category: 'boots', year: 2016 }
  // search url /product-search?page=2&category=boots&year=2016&color=blue
  componentDidMount() {
    console.log(this.props.location)
  }

  componentDidUpdate() {
    console.log('component did update')
  }
  makeSearchPath() {
    let path = '/'
    Object.entries(this.searchParams).forEach(([key, value]) => {
      path += `&${key}=${value}`
    })``
    return path
  }
  sortOrdersByStatus(event) {
    this.props.location.push(this.makeSearchPath())
  }
  render() {
    return (
      <div className="orderFilter">
        {this.props.orders.map(order => <li key={order.id}>{order.id}</li>)}
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  let status = ownProps.status
  return {
    orders: state.orders.filter(order => order.status === status)
  }
}

export default connect(mapState)(SearchContainer)
