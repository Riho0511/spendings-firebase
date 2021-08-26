import React from 'react';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
  formControl: {
    textAlign: 'left',
    width: '100%'
  }
});

const Selected = (props) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required}
        value={props.value}
        onChange={(e) => {props.select(e.target.value)}}
      >
        {props.options.map((option) => {
          return <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}

export default Selected;