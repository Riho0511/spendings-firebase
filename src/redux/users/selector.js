import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getAuth = createSelector(
  [usersSelector],
  state => state.auth
);

export const getisSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
);

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
);

export const getUserName = createSelector(
  [usersSelector],
  state => state.username
);