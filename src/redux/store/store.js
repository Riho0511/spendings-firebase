import { createStore, combineReducers, applyMiddleware } from "redux";
import { usersReducers } from "../users/reducers";
import { spendingsReducers } from '../spendings/reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from "redux-thunk";

function storeCreate(history) {
  return createStore(
    combineReducers({
      router: connectRouter(history),
      spendings: spendingsReducers,
      users: usersReducers
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
}

export default storeCreate;