import React, {Component, Fragment} from 'react'
import {Link, NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'
import SearchContainer from './SearchContainer'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
}

/**
 * COMPONENT
 */
class AdminHome extends Component {
  constructor() {
    super()
    this.state = {
      status: ''
    }
    this.onChange = this.onChange.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchAllOrders()
  }

  onChange(event) {
    this.setState({status: event.target.value})
  }
  render() {
    const {email, userId, orders: {orders}, classes} = this.props

    return (
      <Fragment>
        <div>Welcome, {email}</div>
        <br />
        <h3>ADD NEW PRODUCT</h3>
        <button type="button">
          <Link to="/admin/add">Add Product</Link>
        </button>

        <h3>ORDER HISTORY</h3>
        <div className="orderFilter">
          <select name="sortBy" onChange={this.onChange}>
            <option value="">ALL ORDERS </option>
            <option value="created">CREATED</option>
            <option value="processing">PROCESSING</option>
            <option value="completed">COMPLETED</option>
            <option value="canceled">CANCELED</option>
          </select>
        </div>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>ORDER ID</TableCell>
                <TableCell align="right">USER ID</TableCell>
                <TableCell align="right">STATUS</TableCell>
                <TableCell align="right">PRICE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell align="right">{order.userId}</TableCell>
                  <TableCell align="right">{order.status}</TableCell>
                  <TableCell align="right">{order.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    )
  }
}

AdminHome.propTypes = {
  classes: PropTypes.object.isRequired
}

/**
 * CONTAINER
 */
const mapState = ({user, orders}) => {
  return {
    userId: user.id,
    userInfo: user,
    email: user.email,
    orders: orders
  }
}

const dispatchProps = dispatch => {
  return {
    fetchAllOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapState, dispatchProps)(withStyles(styles)(AdminHome))

/**
 * PROP TYPES
 */
