import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  button: {
    backgroundColor: "#304def",
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    height: 48,
    width: 230,
    marginTop: 20,
    '&:hover': {
      backgroundColor: "#647af6"
    }
  }
})

const PrimaryButton = (props) => {
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

export default PrimaryButton;