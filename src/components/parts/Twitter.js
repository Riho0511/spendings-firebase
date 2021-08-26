import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  button: {
    backgroundColor: "rgb(29, 155, 240)",
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    height: 48,
    width: 300,
    marginTop: 20,
    '&:hover': {
      backgroundColor: "rgb(81, 175, 238);"
    }
  }
})

const Twitter = (props) => {
  const classes = useStyles();

  return (
    <Button 
      className={classes.button} variant='contained'
    >
      {props.label}
    </Button>
  )
}

export default Twitter;