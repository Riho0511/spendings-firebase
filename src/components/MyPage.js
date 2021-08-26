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
      <h2>マイページ</h2>
      {edit && (
        <div>
          <p className='zero'>※メールアドレスまたはパスワードを変更する場合は、現在のパスワードを入力してから変更してください。</p>
          <div className='reset'>
            <p onClick={() => dispatch(push('/reset'))}>パスワードを忘れた方はこちら</p>
          </div>
        </div>
      )}
      <TextField
        className={classes.field}
        disabled={edit ? false : true}
        fullWidth={true}
        label={edit ? '新しいユーザー名' : 'ユーザー名'}
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
        label={'ユーザーID'}
        type={'text'}
        value={userId}
      />
      <TextField
        className={classes.field}
        disabled={edit && newValues.password.length <= 0 ? false : true}
        fullWidth={true}
        label={edit ? '新しいメールアドレス' : 'メールアドレス'}
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
          label={'認証方法'}
          type={'text'}
          value={auth}
        />
      )}
      {edit && (
        <>
          <PasswordFormNonvalidation
            id={'currentPassword'}
            label={'現在のパスワード'}
            setValues={setCurrentValues}
            values={currentValues}
          />
          <PasswordFormNonvalidation
            id={'newPassword'}
            label={'新しいパスワード'}
            length={email.length}
            setValues={setNewValues}
            values={newValues}
          />
          <PasswordFormNonvalidation
            id={'confirm-newPassword'}
            label={'パスワード(再確認)'}
            length={email.length}
            setValues={setConfirmValues}
            values={confirmValues}
          />
        </>
      )}
      {auth === 'password' && (
        !edit ? 
          <PrimaryButton label={'編集する'} onClick={toggleEdit} />
        :  
          <PrimaryButton label={'戻る'} onClick={toggleEdit} />
      )}
      {!edit ? 
        <>
          <PrimaryButton label={'ホームに戻る'} onClick={() => dispatch(push('/'))} />
          {auth === 'password' && (
            <Modal label={'ユーザー情報を削除する'} />
          )}
        </>
      :
        <PrimaryButton label={'変更を保存'} onClick={handleChanege} /> 
      }
    </div>
  );
};

export default MyPage;