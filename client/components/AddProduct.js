import React, {Component} from 'react'
import {connect} from 'react-redux'
import ProductForm from './productForm'
import {postProduct} from '../store/products'
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

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
    console.log(this.state)
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.postProduct(this.state)
    this.props.history.push('/admin')
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.layout}>
        <h2>Add Product</h2>
        <ProductForm
          props={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    postProduct: product => dispatch(postProduct(product))
  }
}

export default connect(null, mapDispatch)(withStyles(styles)(AddProduct))
