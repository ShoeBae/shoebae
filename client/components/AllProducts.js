import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Typography
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
// import { Delete } from '@material-ui/icons'
import classNames from 'classnames'
import {fetchProducts, deleteProduct, selectProduct} from '../store/products'

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
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: 'none',
    boxShadow: 'none',
    borderRadius: '0px'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain'
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  productBrand: {
    color: '#b0b0b0'
  }
})

class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      currentView: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchProducts()
    this.setState({currentView: this.props.products})
  }

  handleChange(event) {
    if (event.target.value === 'all') {
      this.setState({currentView: this.props.products.sort()})
    } else {
      this.setState({
        currentView: this.props.products.filter(product => {
          return product.category === event.target.value
        })
      })
    }
  }

  render() {
    if (!this.props.products[0]) {
      return <div>...loading</div>
    }
    const {classes} = this.props
    return (
      <React.Fragment>
        <div className="productsList">
          <div className="productFilter">
            <select name="sortBy" onChange={this.handleChange}>
              <option value="all">All Categories</option>
              <option value="boot">Boots</option>
              <option value="dress">Dress</option>
              <option value="sneaker">Sneakers</option>
            </select>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}>
              {this.state.currentView.map(product => (
                <Grid item key={product.id} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <Link
                      to={`/products/${product.id}`}
                      onClick={() => {
                        this.props.selectProduct(product.id)
                      }}
                    >
                      <CardMedia
                        className={classes.cardMedia}
                        image={product.imageUrl}
                        title={product.model}
                      />

                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.model}
                        </Typography>
                        <Typography>
                          {product.brand}
                          <br />
                          ${product.price}
                        </Typography>
                      </CardContent>
                    </Link>
                    <CardActions>
                      {this.props.user.isAdmin ? (
                        <React.Fragment>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => {
                              this.props.selectProduct(product.id)
                              this.props.history.push('/admin/edit')
                            }}
                          >
                            EDIT
                          </Button>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => {
                              this.props.selectProduct(product.id)
                              this.props.history.push('/admin/delete')
                            }}
                          >
                            DELETE
                          </Button>
                        </React.Fragment>
                      ) : (
                        <div />
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({products, user}, {history}) => ({
  products: products.productsList,
  user,
  history
})

const dispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    deleteProduct: productID => dispatch(deleteProduct(productID)),
    selectProduct: productID => dispatch(selectProduct(productID))
  }
}

export default connect(mapStateToProps, dispatchToProps)(
  withStyles(styles)(AllProducts)
)
