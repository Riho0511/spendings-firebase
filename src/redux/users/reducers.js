import * as Type from './actionType';
import { initialState } from '../store/initialState';

export const usersReducers = (state = initialState.users, action) => {
  switch (action.type) {
    case Type.SIGN_IN:
      return {
        ...state,
        ...action.payload
      }
    case Type.SIGN_OUT:
      return {
        ...action.payload
      }
    case Type.UPDATE_USER_STATE:
      return {
          ...state,
          ...action.payload
      };
    default:
      return state;
  }
};