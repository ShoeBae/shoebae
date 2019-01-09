const initialState = []

// action type
const ADD_TO_CART = 'ADD_TO_CART'

// action creator
const addToCart = product => ({type: ADD_TO_CART, product})

// thunk creator
export const getToCart = product => dispatch => {
  dispatch(addToCart(product))
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product]
    default:
      return [...state]
  }
}
