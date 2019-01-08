import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {
  productsList: [
    {
      model: 'the morgan',
      color: 'rainbow',
      brand: 'offwhite',
      price: 120
    }
  ],
  currentProduct: {}
  //?? isAdmin: false
}

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})
const setProducts = products => ({type: SET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const editProduct = product => ({type: EDIT_PRODUCT, product})
const removeProduct = productID => ({type: REMOVE_PRODUCT, productID})

/**
 * THUNK CREATORS
 */
export const selectProduct = productID => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productID}`)
    const product = res.data
    dispatch(getProduct(product))
  } catch (err) {
    console.log(err)
  }
}

export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    const products = res.data
    dispatch(setProducts(products))
  } catch (err) {
    console.error(err)
  }
}

export const postProduct = newProduct => async dispatch => {
  try {
    const res = await axios.post('/api/products', newProduct)
    const product = res.data
    dispatch(addProduct(product))
  } catch (err) {
    console.log(err)
  }
}

export const putProduct = (productID, changes) => async dispatch => {
  try {
    const res = await axios.put(`/api/products/${productID}`, changes)
    const product = res.data
    dispatch(editProduct(product))
  } catch (err) {
    console.log(err)
  }
}

export const deleteProduct = productID => async dispatch => {
  try {
    await axios.delete(`/api/products/${productID}`)
    dispatch(removeProduct(productID))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {...state, currentProduct: action.product}
    case SET_PRODUCTS:
      return {...state, productsList: action.products}
    case EDIT_PRODUCT:
      return {
        ...state,
        productsList: state.productsList.map(
          product =>
            product.id === action.product.id ? action.product : product
        )
      }
    case ADD_PRODUCT:
      return {...state, productsList: action.products}
    case REMOVE_PRODUCT:
      return {
        ...state,
        productsList: state.productsList.filter(
          product => product.id !== action.productID
        )
      }
    default:
      return state
  }
}
