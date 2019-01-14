import axios from 'axios'

const initialState = []

// action type
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

const GET_CART = 'GET_CART'

// action creator
const addToCart = product => ({type: ADD_TO_CART, product})
const removeFromCart = cartItemId => ({type: REMOVE_FROM_CART, cartItemId})
const getCart = cart => ({type: GET_CART, cart})

// thunk creator
export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const getToCart = product => async dispatch => {
  try {
    const {product: {id}, selectedSize} = product
    const {data} = await axios.post('/api/cart', {id, selectedSize})
    dispatch(addToCart({product: product.product, ...data}))
  } catch (err) {
    console.error(err)
  }
}

export const deleteFromCart = cartItemId => async dispatch => {
  try {
    await axios.delete('/api/cart', {data: {cartItemId}})
    dispatch(removeFromCart(cartItemId))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return [...action.cart]
    case REMOVE_FROM_CART:
      return state.filter(product => product.id !== action.cartItemId)
    case ADD_TO_CART:
      return [...state, action.product]
    default:
      return [...state]
  }
}
