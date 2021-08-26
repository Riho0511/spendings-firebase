import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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

const PasswordFormNonvalidation = (props) => {
  const classes = useStyles();
  const values = props.values;

  const inputPassword = (prop) => (event) => {
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
      className={clsx(classes.textField, classes.margin)}>
      <InputLabel htmlFor={props.id}>
        {props.label}
      </InputLabel>
      <Input
        disabled={props.length > 0 ? true : false}
        id={props.id}
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={inputPassword('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordFormNonvalidation;
