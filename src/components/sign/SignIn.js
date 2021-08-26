import React, { useState, useCallback } from 'react';
import { Facebook, PasswordForm, PrimaryButton, Twitter } from '../parts/index';
import { Divider, makeStyles, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { facebookSignIn, signIn } from '../../redux/users/operations';
import { push } from 'connected-react-router';

const useStyles = makeStyles({
  field: {
    width: 300,
    marginTop: 10,
    marginBottom: 10
  },
});

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [validationEmailText, setValidationEmailText] = useState('');
  const [validationEmailCheck, setValidationEmailCheck] = useState(false);

  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });
  const [validationPasswordText, setValidationPasswordText] = useState('');
  const [validationPasswordCheck, setValidationPasswordCheck] = useState(false);

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
      <h2>サインイン</h2>
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
      <PasswordForm
        id={'signin-password'}
        error={validationPasswordCheck}
        helperText={validationPasswordText}
        label={'パスワード'}
        labelWidth={80}
        setValidationPasswordCheck={setValidationPasswordCheck}
        setValidationPasswordText={setValidationPasswordText}
        setValues={setValues}
        values={values}
      />
      <PrimaryButton 
        label={'サインイン'} 
        onClick={() => dispatch(signIn(email, values.password))} 
      />
      <div className='sign-section'>
        <p onClick={() => dispatch(push('/reset'))}>
          パスワードを忘れた方はこちら
        </p>
        <p onClick={() => dispatch(push('/signup'))}>
          アカウント登録をする
        </p>
      </div>
      <Divider />
      <div className='another-account'>
        <h2>他のアカウントでサインイン</h2>
        <Facebook 
          label={'Facebookアカウントでログイン'} 
          onClick={() => dispatch(facebookSignIn())} 
        />
        <Twitter label={'Twitterアカウントでログイン'}/>
      </div>
    </div>
  )
};

export default SignIn;