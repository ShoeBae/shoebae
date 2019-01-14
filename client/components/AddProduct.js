import React, {Component} from 'react'
import {connect} from 'react-redux'
import ProductForm from './productForm'
import {postProduct} from '../store'
import {withStyles} from '@material-ui/core'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
})

class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      model: '',
      imageUrl: '',
      color: '',
      brand: '',
      category: '',
      price: 0
    }

    this.updateHandler = this.updateHandler.bind(this)
  }

  updateHandler(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.layout}>
        <h2>Add Product</h2>
        <ProductForm props={this.state} updateHandler={this.updateHandler} />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  postProduct: product => dispatch(postProduct(product))
})

export default connect(null, mapDispatch)(withStyles(styles)(AddProduct))
