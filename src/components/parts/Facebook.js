import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  button: {
    backgroundColor: "rgb(0, 72, 167)",
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    height: 48,
    width: 300,
    '&:hover': {
      backgroundColor: "rgb(53, 103, 168);"
    }
  }
})

const Facebook = (props) => {
  const classes = useStyles();

  return (
    <Button 
      className={classes.button} variant='contained' 
      onClick={() => {props.onClick()}}
    >
      {props.label}
    </Button>
  )
}

export default Facebook;