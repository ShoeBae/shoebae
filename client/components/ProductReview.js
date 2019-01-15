import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  withStyles,
  Typography,
  Card,
  CardContent,
  Button
} from '@material-ui/core/styles'
import StarRatings from 'react-star-ratings'

const styles = {
  card: {
    minWidth: 275,
    margin: '10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 22
  }
}

class ProductReview extends Component {
  render() {
    const {classes, userId, comment} = this.props
    return (
      <Card className={classes.card}>
        <CardContent>
          <StarRatings
            rating={Number(this.props.rating)}
            starRatedColor="blue"
            starDimension="40px"
            starSpacing="15px"
          />
          <Typography component="p">COMMENT</Typography>
        </CardContent>
        {/* {userId ? (
          <Button
            size="small"
            color="secondary"
            className={classes.button}
            // onClick={() =>
            //   history.push(`/products/${reviews.productId}/review/${reviews.id}`)
            // }
          >
            Edit Review
          </Button>
        ) : (
          <div />
        )} */}
      </Card>
    )
  }
}

ProductReview.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductReview)
