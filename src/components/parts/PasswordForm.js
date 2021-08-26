import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textField: {
    width: 300,
  },
  margin: {
    marginTop: 8,
    marginBottom: 8
  }
});

const PasswordForm = (props) => {
  const classes = useStyles();
  const values = props.values;
  const error = props.error;

  const inputPassword = (prop) => (event) => {
    let error = ''
    if (event.target.value === '') {
      error = 'パスワードを入力してください';
      props.setValidationPasswordCheck(true);
    } else {
      error = '';
      props.setValidationPasswordCheck(false);
    }
    props.setValidationPasswordText(error);
    props.setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    props.setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      variant='outlined'
      className={clsx(classes.textField, classes.margin)}>
      <InputLabel 
        htmlFor={props.id}
        error={error}
      >
        {props.label}
      </InputLabel>
      <OutlinedInput
        id={props.id}
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        error={error}
        onChange={inputPassword('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={props.labelWidth}
      />
      <FormHelperText error={error}>
        {props.helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default PasswordForm;
