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

export function ProductForm(props) {
  const {classes} = props
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <InputLabel required htmlFor="model">
            Model
          </InputLabel>
          <Input
            type="text"
            name="model"
            value={props.model}
            onChange={props.handleChange}
          />
          <br />
          <br />
          <InputLabel required htmlFor="brand">
            Brand
          </InputLabel>
          <Input
            type="text"
            name="brand"
            value={props.brand}
            onChange={props.handleChange}
          />
          <br />
          <br />
          <FormControl
            required
            component="fieldset"
            className={classes.formControl}
          >
            <FormLabel component="legend">Category </FormLabel>
            <RadioGroup
              aria-label="Category"
              name="category"
              className={classes.group}
              onChange={props.handleChange}
            >
              <FormControlLabel
                value="boot"
                control={<Radio />}
                label="Boots"
              />
              <FormControlLabel
                value="dress"
                control={<Radio />}
                label="Dress"
              />
              <FormControlLabel
                value="sneaker"
                control={<Radio />}
                label="Sneakers"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <br />
          <InputLabel required htmlFor="size">
            Size
          </InputLabel>
          <Input
            type="text"
            name="size"
            // value={props.state.size}???
            onChange={props.handleChange}
          />
          <br />
          <br />
          <InputLabel required htmlFor="color">
            Color
          </InputLabel>
          <Input
            type="text"
            name="color"
            value={props.color}
            onChange={props.handleChange}
          />
          <br />
          <br />
          <InputLabel required htmlFor="price">
            Price
          </InputLabel>
          <Input
            type="text"
            name="price"
            value={props.price}
            onChange={props.handleChange}
          />
          <br />
          <br />
          <InputLabel required htmlFor="image">
            Image
          </InputLabel>
          <Input
            type="text"
            name="image"
            value={props.imageUrl}
            onChange={props.handleChange}
          />
          <br />
          <br />
          <Button
            type="submit"
            disabled={
              props.model === '' ||
              props.brand === '' ||
              props.category === '' ||
              props.size === '' ||
              props.color === '' ||
              props.price === ''
            }
            onClick={props.handleSubmit}
          >
            Submit
          </Button>
        </Paper>
      </main>
    </React.Fragment>
  )
}

ProductForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductForm)
