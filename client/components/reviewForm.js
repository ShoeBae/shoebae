import React from 'react'
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

const styles = theme => ({
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

export function ReviewForm(props) {
  const {classes} = props
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
            value={props.email}
            onChange={props.handleChange}
          />
          <br />
          <br />
          <InputLabel required htmlFor="rating">
            Rating
          </InputLabel>
          <Input
            type="text"
            name="rating"
            value={props.rating}
            onChange={props.handleChange}
          />
          <br />
          <br />
          <InputLabel required htmlFor="comment">
            Comment
          </InputLabel>
          <Input type="text" name="comment" onChange={props.handleChange} />
          <br />
          <br />
          <Button type="submit" onClick={props.handleSubmit}>
            Submit
          </Button>
        </Paper>
      </main>
    </React.Fragment>
  )
}

ReviewForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReviewForm)
