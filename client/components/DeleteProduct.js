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
  const {classes} = props

  return (
    <React.Fragment>
      <div className={classes.layout}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={props.imageUrl}
            title={props.model}
          />
          <CardContent className={classes.cardContent}>
            <Typography>Confirm Delete?</Typography>
            <CardActions>
              <Button size="small" color="primary">
                DELETE
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = ({products}) => {
  return {
    product: products
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
