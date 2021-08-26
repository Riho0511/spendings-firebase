import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listenAuthState } from '../../redux/users/operations';
import { getisSignedIn } from '../../redux/users/selector';

const Auth = ({children}) => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const isSignedIn = getisSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, [dispatch, isSignedIn]);

  if (!isSignedIn) {
    return <></>
  } else {
    return children;
  }
};

export default Auth;