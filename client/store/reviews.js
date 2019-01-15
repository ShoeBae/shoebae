import axios from 'axios'

//ACTION TYPES
const SET_REVIEWS = 'SET_REVIEWS'
const EDIT_REVIEW = 'EDIT_REVIEW'
const REMOVE_REVIEW = 'REMOVE_REVIEW'

//INITIAL STATE
const initialState = []

//ACTION CREATORS

const setReviews = reviews => ({type: SET_REVIEWS, reviews})
const editReview = review => ({type: EDIT_REVIEW, review})
// const addReview = reviewID => ({type: ADD_REVIEW, reviewID})
const removeReview = reviewID => ({type: REMOVE_REVIEW, reviewID})

//THUNK CREATORS

export const fetchReviews = () => async dispatch => {
  try {
    const res = await axios.get('/api/reviews')
    const reviews = res.data
    dispatch(setReviews(reviews))
  } catch (error) {
    console.error(error)
  }
}

export const putReview = (reviewID, productID, changes) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/reviews/${productID}/${reviewID}`,
      changes
    )
    const review = res.data
    dispatch(editReview(review))
  } catch (err) {
    console.log(err)
  }
}

export const postReview = (productID, newReview) => async dispatch => {
  try {
    const res = await axios.post(`/api/reviews/${productID}`, newReview)
    const review = res.data
    dispatch(setReviews(review))
  } catch (err) {
    console.log(err)
  }
}

export const deleteReview = reviewID => async dispatch => {
  try {
    await axios.delete(`/api/reviews/${reviewID}`)
    dispatch(removeReview(reviewID))
  } catch (err) {
    console.log(err)
  }
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return [...state, ...action.reviews]
    case EDIT_REVIEW:
      return state.map(
        review => (review.id === action.review.id ? action.review : review)
      )
    // case ADD_REVIEW:
    //   return [...state, action.review]
    case REMOVE_REVIEW:
      return state.filter(review => review.id !== action.reviewID)
    default:
      return state
  }
}
