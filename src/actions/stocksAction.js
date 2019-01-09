/* ---------- ACTION CREATORS ------------- */
export const buyStock = (stock_id) => ({type: "BUY_STOCK", payload: stock_id})

/* ---------- THUNK CREATORS ------------- */

export const loadStocks = () => {
  return (dispatch) => {
    return fetch(`https://localhost3000/stocks`)
    .then(res => res.json())
    .then(res => dispatch(/*action*/))
    .catch(console.error)
  }
}
