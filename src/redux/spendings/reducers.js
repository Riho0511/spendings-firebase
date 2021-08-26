import * as Type from './actionType';
import { initialState } from '../store/initialState';

export const spendingsReducers = (state = initialState.spendings, action) => {
  switch (action.type) {
    case Type.DELETE_EXPENSE:
      return {
        ...state,
        expense: action.payload
      }
    case Type.DELETE_INCOME:
      return {
        ...state,
        income: action.payload
      }
    case Type.FETCH_EXPENSE:
      return {
        ...state,
        expense: action.payload
      }
    case Type.FETCH_INCOME:
      return {
        ...state,
        income: action.payload
      }
    default:
      return state;
  }
};