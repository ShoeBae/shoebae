import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  withStyles
} from '@material-ui/core'
import {deleteProduct} from '../store/products'

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
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain'
  },
  cardContent: {
    flexGrow: 1,
    align: 'center'
  }
})

export function DeleteProduct(props) {
  const {classes, currentProduct} = props

  console.log(props)
  return (
    <React.Fragment>
      <div className={classes.layout}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={currentProduct.imageUrl}
            title={currentProduct.model}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {currentProduct.model}
            </Typography>
            <Typography>Confirm Delete?</Typography>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={async () => {
                  await props.deleteProduct(currentProduct.id)
                  props.history.push('/products')
                }}
              >
                DELETE
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = ({products}, {history}) => {
  return {
    currentProduct: products.currentProduct,
    history
  }
}

const dispatchToProps = dispatch => {
  return {
    deleteProduct: productID => dispatch(deleteProduct(productID))
  }
}

export default connect(mapStateToProps, dispatchToProps)(
  withStyles(styles)(DeleteProduct)
)
