const initialState = []

// action type
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

// action creator
const addToCart = product => ({type: ADD_TO_CART, product})
const removeFromCart = product => ({type: REMOVE_FROM_CART, product})

// thunk creator
export const getToCart = product => dispatch => {
  dispatch(addToCart(product))
}

export const deleteFromCart = product => dispatch => {
  dispatch(removeFromCart(product))
}

export default function(state = initialState, action) {
  switch (action.type) {
    case REMOVE_FROM_CART:
      return state.filter(({product}) => product.id !== action.product.id)
    case ADD_TO_CART:
      return [...state, action.product]
    default:
      return [...state]
  }
}