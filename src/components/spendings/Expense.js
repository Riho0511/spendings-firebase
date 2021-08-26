import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, TextField } from '@material-ui/core'; 
import { PrimaryButton, Selected } from '../parts';
import { saveExpense } from '../../redux/spendings/operations';
import { push } from 'connected-react-router';
import { db } from '../../firebase';
import { getUserId } from '../../redux/users/selector';
import { getDate } from '../parts/common';

const useStyles = makeStyles({
  field: {
    width: 300,
    marginTop: 10,
    marginBottom: 10
  },
});

const Expense = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  let id = window.location.pathname.split('/edit/expense')[1];

  if (id !== '') {
    if (id === undefined) {
      id = '';
    } else {
      id = id.split('/')[1];
    }
  };

  const [date, setDate] = useState(getDate());
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState('');
  const [money, setMoney] = useState('');
  const [memo, setMemo] = useState('');

  const inputDate = useCallback((event) => {
    setDate(event.target.value); 
  }, [setDate]);

  const inputContent = useCallback((event) => {
    setContent(event.target.value); 
  }, [setContent]);

  const inputMoney = useCallback((event) => {
    setMoney(event.target.value); 
  }, [setMoney]);

  const inputMemo = useCallback((event) => {
    setMemo(event.target.value); 
  }, [setMemo]);

  useEffect(() => {
    if (id !== '') {
      db.collection('users').doc(uid).collection('expense').doc(id).get()
      .then(snapshot => {
        const data = snapshot.data();
        const d = getDate(data.date);
        setDate(d);
        setCategory(data.category);
        setContent(data.content);
        setMoney(data.money);
        setMemo(data.memo);
      })
    }
  }, [uid, id]);

  useEffect(() => {
    db.collection('categoriesExpense')
    .orderBy('order', 'asc')
    .get()
    .then(snapshots => {
      const list = [];
      snapshots.forEach(snapshot => {
        const data = snapshot.data();
        list.push({
          id: data.id,
          name: data.name
        })
      })
      setCategories(list);
    })
  }, []);

  return (
    <div className="sign form">
      <h2>支出の登録</h2>
      <TextField
        className={classes.field}
        fullWidth={true}
        label={'日付'}
        margin="dense"
        onChange={inputDate}
        required={true}
        type='date'
        value={date}
      />
      <Selected
        label={'カテゴリー'}
        required={true}
        options={categories} 
        select={setCategory}
        value={category}
      />
      <TextField
        className={classes.field}
        fullWidth={true}
        label='内容'
        margin="dense"
        onChange={inputContent}
        required={true}
        type='text'
        value={content}
      />
      <TextField
        className={classes.field}
        fullWidth={true}
        label='金額'
        margin="dense"
        onChange={inputMoney}
        required={true}
        type='number'
        value={money}
      />
      <TextField
        className={classes.field}
        autoComplete='off'
        fullWidth={true}
        label='メモ'
        margin="dense"
        multiline={true}
        onChange={inputMemo}
        rows={5}
        type='text'
        value={memo}
        variant='outlined'
      />
      <PrimaryButton 
        label={'登録'} 
        onClick={() => dispatch(saveExpense(id, date, category, content, money, memo))} 
      />
      <PrimaryButton 
        label={'ホームに戻る'} 
        onClick={() => dispatch(push('/'))} 
      />
    </div>
  );
};

export default Expense;