import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, TextField } from '@material-ui/core'; 
import { Modal, PasswordFormNonvalidation, PrimaryButton } from './parts';
import { push } from 'connected-react-router';
import { changeEmailorPassword, changeUsername } from '../redux/users/operations';
import { getUserId } from '../redux/users/selector';
import { db } from '../firebase';

const useStyles = makeStyles({
  field: {
    width: 300,
    marginTop: 10,
    marginBottom: 10
  },
});

const MyPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);

  const [edit, setEdit] = useState(false);
  const [auth, setAuth] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [email, setEmail] = useState('');
  const [currentValues, setCurrentValues] = useState({
    password: '',
    showPassword: false
  });
  const [newValues, setNewValues] = useState({
    password: '',
    showPassword: false
  });
  const [confirmValues, setConfirmValues] = useState({
    password: '',
    showPassword: false
  });
  const currentPassword = currentValues.password;
  const newPassword = newValues.password;
  const confirmPassword = confirmValues.password;

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const inputUsername = useCallback(event => {
    setUsername(event.target.value); 
  }, [setUsername]);

  const inputEmail = useCallback(event => {
    setEmail(event.target.value); 
  }, [setEmail]);

  const handleChanege = useCallback(() => {
    if (username !== '') {
      dispatch(changeUsername(username, email, currentPassword, newPassword,));
    } 

    dispatch(changeEmailorPassword(email, currentPassword, newPassword, confirmPassword));
  }, [dispatch, username, email, currentPassword, newPassword, confirmPassword]);

  useEffect(() => {
    db.collection('users').doc(uid).get()
    .then(snapshot => {
      const data = snapshot.data();
      setAuth(data.auth);
      setCurrentName(data.username);
      setUserId(uid);
      setCurrentEmail(data.means);
    })
  }, [uid]);

  return (
    <div className="form">
      <h2>???????????????</h2>
      {edit && (
        <div>
          <p className='zero'>???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</p>
          <div className='reset'>
            <p onClick={() => dispatch(push('/reset'))}>??????????????????????????????????????????</p>
          </div>
        </div>
      )}
      <TextField
        className={classes.field}
        disabled={edit ? false : true}
        fullWidth={true}
        label={edit ? '????????????????????????' : '???????????????'}
        margin="dense"
        onChange={inputUsername}
        placeholder={currentName}
        type='text'
        value={edit ? username : currentName}
      />
      <TextField
        className={classes.field}
        disabled={true}
        fullWidth={true}
        label={'????????????ID'}
        type={'text'}
        value={userId}
      />
      <TextField
        className={classes.field}
        disabled={edit && newValues.password.length <= 0 ? false : true}
        fullWidth={true}
        label={edit ? '??????????????????????????????' : '?????????????????????'}
        margin="dense"
        onChange={inputEmail}
        placeholder={currentEmail}
        type='email'
        value={edit ? email : currentEmail}
      />
      {!edit && (
        <TextField
          className={classes.field}
          disabled={true}
          fullWidth={true}
          label={'????????????'}
          type={'text'}
          value={auth}
        />
      )}
      {edit && (
        <>
          <PasswordFormNonvalidation
            id={'currentPassword'}
            label={'????????????????????????'}
            setValues={setCurrentValues}
            values={currentValues}
          />
          <PasswordFormNonvalidation
            id={'newPassword'}
            label={'????????????????????????'}
            length={email.length}
            setValues={setNewValues}
            values={newValues}
          />
          <PasswordFormNonvalidation
            id={'confirm-newPassword'}
            label={'???????????????(?????????)'}
            length={email.length}
            setValues={setConfirmValues}
            values={confirmValues}
          />
        </>
      )}
      {auth === 'password' && (
        !edit ? 
          <PrimaryButton label={'????????????'} onClick={toggleEdit} />
        :  
          <PrimaryButton label={'??????'} onClick={toggleEdit} />
      )}
      {!edit ? 
        <>
          <PrimaryButton label={'??????????????????'} onClick={() => dispatch(push('/'))} />
          {auth === 'password' && (
            <Modal label={'?????????????????????????????????'} />
          )}
        </>
      :
        <PrimaryButton label={'???????????????'} onClick={handleChanege} /> 
      }
    </div>
  );
};

export default MyPage;