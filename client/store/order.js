import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_ORDERS = 'SET_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const PROCESSING = 'PROCESSING'

/**
 * INITIAL STATE
 */
const defaultOrder = {
  orders: [],
  processing: false
}

// fetch orders based on admin, or userId, if logged in

/**
 * ACTION CREATORS
 */
const setOrders = orders => ({type: SET_ORDERS, orders})
const updateOrder = orderId => ({type: UPDATE_ORDER, orderId})
const createOrder = order => ({type: CREATE_ORDER, order})
const processing = () => ({type: PROCESSING})

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

export const placeOrder = order => async dispatch => {
  try {
    dispatch(processing())
    const {data} = await axios.post('/api/orders', order)
    dispatch(createOrder(data))
    dispatch(processing())
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
      return {...state, orders: action.orders}
    case CREATE_ORDER:
      return {...state, orders: [...state.orders, action]}
    case PROCESSING:
      return {...state, processing: !state.processing}
    default:
      return state
  }
}
