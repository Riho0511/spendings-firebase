import React, { useState, useCallback } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import { PrimaryButton } from '../parts/index';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/users/operations';
import { push } from 'connected-react-router';

const useStyles = makeStyles({
  field: {
    width: 300,
    marginTop: 10,
    marginBottom: 10
  },
});

const Reset = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [validationEmailText, setValidationEmailText] = useState('');
  const [validationEmailCheck, setValidationEmailCheck] = useState(false);

  const inputEmail = useCallback((event) => {
    let error = '';
    if (event.target.value === '') {
      error = 'メールアドレスを入力してください';
      setValidationEmailCheck(true);
    } else {
      error = '';
      setValidationEmailCheck(false);
    }
    setValidationEmailText(error);
    setEmail(event.target.value); 
  }, [setEmail, setValidationEmailText, setValidationEmailCheck]);

  return (
    <div className='form'>
      <h2>パスワードを忘れた方</h2>
      <TextField
        className={classes.field}
        autoComplete='off'
        autoFocus={true}
        error={validationEmailCheck}
        fullWidth={true}
        helperText={validationEmailText}
        label='メールアドレス'
        margin="dense"
        onChange={inputEmail}
        required={true}
        type='email'
        value={email}
      />
      <PrimaryButton 
        label={'メールを送信する'} 
        onClick={() => dispatch(resetPassword(email))} 
      />
      <div className='sign-section'>
        <p onClick={() => dispatch(push('/signin'))}>
          サインイン画面に戻る
        </p>
      </div>
    </div>
  )
};

export default Reset;