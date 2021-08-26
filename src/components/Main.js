import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { getExpense, getIncome } from '../redux/spendings/selector';
import { fetchExpense, fetchIncome } from '../redux/spendings/operations';
import { Container, PagenationTableExpense, PagenationTableIncome } from './parts/index';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { datetimeToString } from '../components/parts/common';

const useStyles = makeStyles({
  iconLeft: {
    paddingTop: '1rem',
    flexGrow: 3,
    cursor: 'pointer'
  },
  iconRight: {
    paddingTop: '1rem',
    flexGrow: 3,
    cursor: 'pointer'
  }
})

const Main = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const expense = getExpense(selector);
  const income = getIncome(selector);
  const today = new Date();
  today.setDate(today.getDate());
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth()+1;

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const selectIncome = income.filter(inc => {
    const cyear = parseInt(datetimeToString(inc.date.toDate()).split('-')[0], 10);
    const cmonth = parseInt(datetimeToString(inc.date.toDate()).split('-')[1], 10);
    return cyear === year && cmonth === month;
  });

  const selectExpense = expense.filter(exp => {
    const cyear = parseInt(datetimeToString(exp.date.toDate()).split('-')[0], 10);
    const cmonth = parseInt(datetimeToString(exp.date.toDate()).split('-')[1], 10);
    return cyear === year && cmonth === month;
  });

  const decreaseMonth = (month, year) => {
    let newMonth = month;
    let newYear = year;
    newMonth -= 1;
    if (newMonth < 1) {
      newYear -= 1;
      newMonth = 12;
    }
    setMonth(newMonth);
    setYear(newYear);
  }

  const increaseMonth = (month, year) => {
    let newMonth = month;
    let newYear = year;
    newMonth += 1;
    if (newMonth > 12) {
      newYear += 1;
      newMonth = 1;
    }
    setMonth(newMonth);
    setYear(newYear);
  }

  useEffect(() => {
    dispatch(fetchExpense());
    dispatch(fetchIncome());
  }, [dispatch]);

  return (
    <>
      <div className='container'>
        <div className='page'>
          <KeyboardArrowLeftIcon className={classes.iconLeft} onClick={() => decreaseMonth(month, year)} />
          <h1>{year}年 {month}月分</h1>
          <KeyboardArrowRightIcon className={classes.iconRight} onClick={() => increaseMonth(month, year)} />
        </div>
      </div>
      <Container income={selectIncome} expense={selectExpense} />
      <div className='spendings'>
        <div className='flex-left'>
          <h2>収入</h2>
          <PagenationTableIncome income={selectIncome} />
        </div>
        <div className='flex-right'>
          <h2>支出</h2>
          <PagenationTableExpense expense={selectExpense} />
        </div>
      </div>
    </>
  );
};

export default Main;