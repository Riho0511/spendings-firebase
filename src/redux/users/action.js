export const updateUserStateAction = (userState) => {
  return {
      type: "UPDATE_USER_STATE",
      payload: userState
  }
};

export const signInAction = (userState) => {
  return {
    type: 'SIGN_IN',
    payload: {
      auth: userState.auth,
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username
    }
  }
};

export const signOutAction = () => {
  return {
    type: 'SIGN_OUT',
    payload: {
      auth: '',
      isSignedIn: false,
      uid: '',
      username: ''
    }
  }
};