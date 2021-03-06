import React, {Component} from 'react'
import {connect} from 'react-redux'
import ProductForm from './productForm'
import {putProduct} from '../store/products'
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

class EditProduct extends Component {
  constructor() {
    super()
    this.state = {
      currentProduct: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.putProduct(this.props.currentProduct.id, this.state)
    this.props.history.push('/products')
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.layout}>
        <h2>Edit Product</h2>
        <ProductForm
          props={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentProduct: state.products.currentProduct
  }
}

const mapDispatch = dispatch => {
  return {
    putProduct: (productID, changes) => dispatch(putProduct(productID, changes))
  }
}

export default connect(mapStateToProps, mapDispatch)(
  withStyles(styles)(EditProduct)
)
