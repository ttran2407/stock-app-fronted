/* ---------- ACTION CREATORS ------------- */
// export const buyStock = (stock_id) => ({type: "BUY_STOCK", payload: stock_id})
// const getStocks = (stocks) => ({type: "GET_STOCKS", payload:stocks})
const getSingleStock = (stock) => ({type: "GET_SINGLE_STOCK", payload: stock})
const getCompanyInfo = (company) => ({type: "GET_COMPANY_INFO", payload: company})
const getStockData = (data) => ({type: "GET_STOCK_DATA", payload: data})
const getOwnedStocks = (ownedstocks) => ({type: "GET_OWNED_STOCKS", payload: ownedstocks})
const getWatchlist = (watchlist) => ({type: "GET_WATCH_LIST", payload: watchlist})
const getUser = (user) => ({type: "GET_USER", payload: user})
const getStockChange = (stock) => ({type: "GET_STOCK_CHANGE", payload: stock})
const getOwnedStockQuote = (stock) => ({type: "GET_OWNED_STOCK_QUOTE", payload: stock})
const getTransactions = (transactions) => ({type: "GET_TRANSACTIONS", payload: transactions})

// const updateStockBalance = (stockbalance) => ({type: "UPDATE_STOCK_BALANCE", payload: stockbalance})

/* ---------- THUNK CREATORS ------------- */


const fetchSingleStock = (symbol) => {
  return (dispatch) => {
    return fetch(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
    .then(res => res.json())
    .then(stock => dispatch(getSingleStock(stock)))
  }
}
const fetchCompanyInfo = (symbol) => {
  return (dispatch) => {
    return fetch(`https://api.iextrading.com/1.0/stock/${symbol}/company`)
    .then(res => res.json())
    .then(company => dispatch(getCompanyInfo(company)))
  }
}

const fetchStockChart = (symbol) => {
  return (dispatch) => {
    return fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart`)
    .then(res => res.json())
    .then(data => dispatch(getStockData(data)))
  }
}

const fetchWatchlist = (user_id) => {
  let token = localStorage.getItem("token")
  return dispatch => {
    return fetch(`http://localhost:3000/users/${user_id}/watchlists`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Action": "application/json",
        "Authorization": `${token}`
      }
    })
    .then(res => res.json())
    .then(watchlist => {
       dispatch(getWatchlist(watchlist))
          watchlist.forEach(stock => updateWatchlistChange(stock.stock_symbol, dispatch))
        })
  }
}

const updateWatchlistChange = (symbol, dispatch) => {
    fetch(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
    .then(res => res.json())
    .then(stock => {
      dispatch(getStockChange(stock))
    })
}


// const fetchUser = (user_id) => {
//   return dispatch => {
//     return fetch(`http://localhost:3000/users/${user_id}`)
//     .then(res => res.json())
//     .then(console.log)
//     .then(user => dispatch(getUser(user.user)))
//   }
// }

const updateOwnedStockPrice = (symbol,dispatch) => {
   fetch(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
    .then(res => res.json())
    .then(stock =>{
        dispatch(getOwnedStockQuote(stock))
    })
}


const fetchOwnedstocks = (user_id) => {
  let token = localStorage.getItem("token")
  return dispatch => {
    return fetch(`http://localhost:3000/users/${user_id}/ownedstocks`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Action": "application/json",
        "Authorization": `${token}`
      }
    })
    .then(res => res.json())
    .then(ownedstocks => {
      dispatch(getOwnedStocks(ownedstocks))
      ownedstocks.forEach(stock => updateOwnedStockPrice(stock.stock_symbol, dispatch))})
  }
}

const fetchTransactions = (user_id) => {
  let token = localStorage.getItem("token")
  return dispatch => {
    return fetch(`http://localhost:3000/users/${user_id}/transactions`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Action": "application/json",
        "Authorization": `${token}`
      }
    })
    .then(res => res.json())
    .then(transactions => dispatch(getTransactions(transactions)))
  }
}

const createBuyTransaction = (transaction, user_id, stock) => {
  let token = localStorage.getItem("token")
  return dispatch => {
    return fetch(`http://localhost:3000/users/${user_id}/transactions`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Action": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify({
        user_id: parseInt(user_id),
        stock_id: stock.id,
        status_id: 2,
        quantity: parseInt(transaction.quantity),
        price: parseFloat(transaction.price),
        stock_symbol: transaction.symbol.toUpperCase(),
        transaction_type: transaction.transaction_type
      })
    })
    .then(res => res.json())
    .then(object => {
      return object.transaction.status_id === 2 ?
      (createOwnedStock(object.transaction, dispatch),
      dispatch(getTransactions(object.transactions))):
      (null)
    })
  }
}

const createOwnedStock = (transaction, dispatch) => {
  let token = localStorage.getItem("token")
    console.log("sdfsdf")
    fetch(`http://localhost:3000/users/${transaction.user_id}/ownedstocks`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Action": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify({
        user_id: transaction.user_id,
        stock_id: transaction.stock_id,
        quantity: transaction.quantity,
        stock_symbol: transaction.stock_symbol,
        price: transaction.price
      })
    })
    .then(res => res.json())
    .then(object => {
      dispatch(getUser(object.user))
      dispatch(getOwnedStocks(object.ownedstocks))

    })
}

const createSellTransaction = (transaction, user_id, ownedstock) => {
  let token = localStorage.getItem("token")
  return dispatch => {
    return fetch(`http://localhost:3000/users/${user_id}/transactions`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Action": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify({
        user_id: parseInt(user_id),
        stock_id: ownedstock.stock_id,
        status_id: 2,
        quantity: parseInt(transaction.quantity),
        price: parseFloat(transaction.price),
        stock_symbol: transaction.symbol.toUpperCase(),
        transaction_type: transaction.transaction_type
      })
    })
    .then(res => res.json())
    .then(object => {
      return object.transaction.status_id === 2 ?
      (destroyOwnedStock(object.transaction, dispatch, ownedstock),
      dispatch(getTransactions(object.transactions))):
      (null)
    })
  }
}


const destroyOwnedStock = (transaction, dispatch, ownedstock) => {
  let token = localStorage.getItem("token")
    fetch(`http://localhost:3000/users/${transaction.user_id}/ownedstocks/${ownedstock.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Action": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify({
        user_id: transaction.user_id,
        stock_id: transaction.stock_id,
        quantity: transaction.quantity,
        stock_symbol: transaction.stock_symbol,
        price: transaction.price,
        id: ownedstock.id
      })
    })
    .then(res => res.json())
    .then(object => {
      dispatch(getUser(object.user))
      dispatch(getOwnedStocks(object.ownedstocks))
    })
}



const fetchUnWatchStock = (watchlist_id, user_id) => {
  let token = localStorage.getItem("token")
  return dispatch => {
    return fetch(`http://localhost:3000/users/${user_id}/watchlists/${watchlist_id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Action": "application/json",
        "Authorization": `${token}`
      }
    })
    .then(res => res.json())
    .then(watchlist => {
       dispatch(getWatchlist(watchlist))
          watchlist.forEach(stock => updateWatchlistChange(stock.stock_symbol, dispatch))
        })
  }
}

const fetchWatchStock = (stock, user_id) => {
  let token = localStorage.getItem("token")
  return dispatch => {
    return fetch(`http://localhost:3000/users/${user_id}/watchlists/`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Action": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify({
        user_id:  user_id,
        stock_id: stock.id,
        stock_symbol: stock.symbol,
      })
    })
    .then(res => res.json())
    .then(watchlist => {
       dispatch(getWatchlist(watchlist))
       watchlist.forEach(stock => updateWatchlistChange(stock.stock_symbol, dispatch))
        })
  }
}

// const getStockBalance =(ownedstocks) => {
//   return dispatch => {
//     let stockbalance =0
//     ownedstocks.forEach(stock => stockbalance += (stock.price * stock.quantity))
//     dispatch(updateStockBalance(stockbalance))
//   }
// }

const depositMoney = (user_id, cash) => {
  let token = localStorage.getItem("token")
  return dispatch => {
    return fetch(`http://localhost:3000/users/${user_id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Action": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify({
        user_id:  user_id,
        cash: cash
      })
    })
    .then(res => res.json())
    .then(user => dispatch(getUser(user)))
  }
}








export {fetchSingleStock, getUser,
        fetchStockChart, fetchWatchlist,
        updateWatchlistChange,
        updateOwnedStockPrice, fetchOwnedstocks,
        fetchTransactions, createBuyTransaction,
        createSellTransaction, fetchCompanyInfo,
        fetchUnWatchStock, fetchWatchStock,
        depositMoney
      }
