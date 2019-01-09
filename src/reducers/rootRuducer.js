
const rootReducer = (state = [], action ) => {
  switch(action.type){
    case('FETCH_ALL_STOCKS'): {
      return {...state, action.payload}
    }
  }
  default:
    return state
}


export default rootReducer
