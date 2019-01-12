import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDER'

const UPDATE_ORDER = 'UPDATE_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrder = []

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})
const updateOrder = orderId => ({type: UPDATE_ORDER, orderId})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => async dispatch => {
  try {
    const res = await axios.get('/orders')
    const orders = res.data
    return dispatch(getOrders(orders))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return [...state, action.orders]

    default:
      return state
  }
}
