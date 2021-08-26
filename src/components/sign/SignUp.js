import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, TextField } from '@material-ui/core';
import { PasswordForm, PrimaryButton } from '../parts/index';
import { signUp } from '../../redux/users/operations';
import { push } from 'connected-react-router';

const useStyles = makeStyles({
  field: {
    width: 300,
    marginTop: 10,
    marginBottom: 10
  },
});

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [validationUsernameText, setValidationUsernameText] = useState('');
  const [validationUsernameCheck, setValidationUsernameCheck] = useState(false);

  const [email, setEmail] = useState('');
  const [validationEmailText, setValidationEmailText] = useState('');
  const [validationEmailCheck, setValidationEmailCheck] = useState(false);

  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });
  const [validationPasswordText, setValidationPasswordText] = useState('');
  const [validationPasswordCheck, setValidationPasswordCheck] = useState(false);

  const [confirmValues, setConfirmValues] = useState({
    password: '',
    showPassword: false
  });
  const [validationConfirmPasswordText, setValidationConfirmPasswordText] = useState('');
  const [validationConfirmPasswordCheck, setValidationConfirmPasswordCheck] = useState(false);

  const inputUsername = useCallback((event) => {
    let error = '';
    if (event.target.value === '') {
      error = 'ユーザー名を入力してください';
      setValidationUsernameCheck(true);
    } else {
      error = '';
      setValidationUsernameCheck(false);
    }
    setValidationUsernameText(error);
    setUsername(event.target.value); 
  }, [setUsername, setValidationUsernameText, setValidationUsernameCheck]);

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
      <h2>アカウント登録</h2>
      <TextField
        className={classes.field}
        autoComplete='off'
        autoFocus={true}
        error={validationUsernameCheck}
        fullWidth={true}
        helperText={validationUsernameText}
        label='ユーザー名'
        margin="dense"
        onChange={inputUsername}
        required={true}
        type='text'
        value={username}
        variant='outlined'
      />
      <TextField
        className={classes.field}
        autoComplete='off'
        error={validationEmailCheck}
        fullWidth={true}
        helperText={validationEmailText}
        label='メールアドレス'
        margin="dense"
        onChange={inputEmail}
        required={true}
        type='email'
        value={email}
        variant='outlined'
      />
      <PasswordForm
        id={'signup-password'}
        error={validationPasswordCheck}
        helperText={validationPasswordText}
        label={'パスワード(半角英数6文字以上)'}
        labelWidth={230}
        setValidationPasswordCheck={setValidationPasswordCheck}
        setValidationPasswordText={setValidationPasswordText}
        setValues={setValues}
        values={values}
        variant={'outlined'}
      />
      <PasswordForm
        id={'confirm-password'}
        error={validationConfirmPasswordCheck}
        helperText={validationConfirmPasswordText}
        label={'パスワード(再確認用)'}
        labelWidth={160}
        setValidationPasswordCheck={setValidationConfirmPasswordCheck}
        setValidationPasswordText={setValidationConfirmPasswordText}
        setValues={setConfirmValues}
        values={confirmValues}
        variant={'outlined'}
      />
      <PrimaryButton 
        label={'アカウント登録'} 
        onClick={() => dispatch(signUp(username, email, values.password, confirmValues.password))} 
      />
      <div className='sign-section'>
        <p onClick={() => dispatch(push('/signin'))}>
          アカウントをお持ちの方はこちら
        </p>
      </div>
    </div>
  )
};

export default SignUp;