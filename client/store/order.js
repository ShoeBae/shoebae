import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_ORDERS = 'SET_ORDERS'

const UPDATE_ORDER = 'UPDATE_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrder = []

/**
 * ACTION CREATORS
 */
const setOrders = orders => ({type: SET_ORDERS, orders})
const updateOrder = orderId => ({type: UPDATE_ORDER, orderId})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => async dispatch => {
  try {
    const res = await axios.get(`/api/orders`)
    const orders = res.data
    return dispatch(setOrders(orders))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrder, action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders

    default:
      return state
  }
}
