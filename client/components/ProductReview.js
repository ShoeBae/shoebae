import React from 'react'
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

export function ProductReview(props) {
  const {classes, review, userId, history} = props

  return (
    <Card className={classes.card}>
      <CardContent>
        <StarRatings
          rating={Number(review.rating)}
          starRatedColor="blue"
          starDimension="40px"
          starSpacing="15px"
        />
        <Typography component="p">{review.comment}</Typography>
      </CardContent>
      {userId === review.userId ? (
        <Button
          size="small"
          color="secondary"
          className={classes.button}
          onClick={() =>
            history.push(`/products/${review.productId}/review/${review.id}`)
          }
        >
          Edit Review
        </Button>
      ) : (
        <div />
      )}
    </Card>
  )
}

ProductReview.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductReview)
