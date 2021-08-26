import React, { useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/users/operations';

const useStyles = makeStyles({
  button: {
    backgroundColor: "red",
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    height: 48,
    width: 230,
    marginTop: 30,
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    '&:hover': {
      backgroundColor: "rgb(253, 82, 82)"
    }
  }
}) 

const Modal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');

  const deleteAccount = (password) => {
    handleClose();
    dispatch(deleteUser(password));
  };

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button 
        className={classes.button} 
        variant='contained'
        onClick={handleClickOpen}
      >
        アカウント削除
      </Button>
      <Dialog 
        aria-labelledby="form-dialog-title"
        open={open} 
        onClose={handleClose}
      >
        <DialogTitle id="form-dialog-title">
          アカウントを削除しますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            アカウントを削除すると、アカウント情報から登録したデータまですべて削除されます。よろしいですか？<br/><br/>
            削除する場合は、現在のパスワードを入力してください。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="現在のパスワード"
            type="password"
            fullWidth
            onChange={inputPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button value={password} onClick={() => deleteAccount(password)} color="primary">
            送信
          </Button>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;