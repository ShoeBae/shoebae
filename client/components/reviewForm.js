import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {
  Paper,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Input,
  InputLabel,
  withStyles,
  Button
} from '@material-ui/core'
import StarRatings from 'react-star-ratings'
import {postReview} from '../store/reviews'

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

  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  }
})

class ReviewForm extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      rating: '',
      comment: ''
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
    await this.props.postReview(this.props.currentProduct.id, this.state)
    this.props.history.push(`/products/${this.props.currentProduct.id}`)
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <InputLabel required htmlFor="email">
              Email
            </InputLabel>
            <Input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <br />
            <br />
            <InputLabel required htmlFor="rating">
              Rating
            </InputLabel>
            <Input
              type="text"
              name="rating"
              value={this.state.rating}
              onChange={this.handleChange}
            />
            <br />
            <br />
            <InputLabel required htmlFor="comment">
              Comment
            </InputLabel>
            <Input type="text" name="comment" onChange={this.handleChange} />
            <br />
            <br />
            <Button type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

const mapState = ({reviews, currentProduct}) => {
  return {
    reviews,
    currentProduct
  }
}

const mapDispatch = dispatch => {
  return {
    postReview: (productId, newReview) => {
      dispatch(postReview(productId, newReview))
    }
  }
}
ReviewForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(ReviewForm))
