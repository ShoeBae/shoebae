import axios from 'axios'

const initialState = {
  items: [],
  adding: false,
  done: false,
  total: 0
}

// action type
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const ADDING = 'ADDING'
const GET_CART = 'GET_CART'
const EMPTY_CART = 'EMPTY_CART'
const DONE = 'DONE'
const SET_TOTAL = 'SET_TOTAL'

// action creator
const addToCart = product => ({type: ADD_TO_CART, product})
const removeFromCart = cartItemId => ({type: REMOVE_FROM_CART, cartItemId})
const getCart = cart => ({type: GET_CART, cart})
const adding = () => ({type: ADDING})
const emptyCart = () => ({type: EMPTY_CART})
const done = () => ({type: DONE})
const setTotal = () => ({type: SET_TOTAL})

// thunk creator
export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(getCart(data))
    dispatch(setTotal())
  } catch (err) {
    console.error(err)
  }
}

export const removeAllFromCart = cartId => async dispatch => {
  try {
    await axios.delete('/api/cart/all', {data: {cartId}})
    dispatch(emptyCart())
    dispatch(done())
  } catch (err) {
    console.log(err)
  }
}

export const getToCart = product => async dispatch => {
  try {
    const {product: {id}, selectedSize} = product
    dispatch(adding())
    const {data} = await axios.post('/api/cart', {id, selectedSize})
    dispatch(addToCart({product: product.product, ...data}))
    dispatch(adding())
    dispatch(done())
    dispatch(setTotal())
  } catch (err) {
    console.error(err)
  }
}

export const deleteFromCart = cartItemId => async dispatch => {
  try {
    await axios.delete('/api/cart', {data: {cartItemId}})
    dispatch(removeFromCart(cartItemId))
    dispatch(setTotal())
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TOTAL:
      return {
        ...state,
        total: state.items.reduce((total, item) => {
          return total + Number(item.product.price)
        }, 0)
      }
    case ADDING:
      return {...state, adding: !state.adding}
    case DONE:
      return {...state, done: !state.done}
    case GET_CART:
      return {...state, items: action.cart}
    case EMPTY_CART:
      return {...state, items: []}
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(product => product.id !== action.cartItemId)
      }
    case ADD_TO_CART:
      return {...state, items: [...state.items, action.product]}
    default:
      return state
  }
}
