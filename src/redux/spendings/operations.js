import { db, FirebaseTimestamp } from '../../firebase/index';
import { deleteExpenseAction, deleteIncomeAction, fetchExpenseAction, fetchIncomeAction } from './action';
import { push } from 'connected-react-router';

export const deleteExpense = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    const check = window.confirm('削除しますか?');

    if (check) {
      userRef
      .collection('expense').doc(id)
      .delete()
      .then(() => {
        const prevExpense = getState().spendings.expense;
        const nextExpense = prevExpense.filter(expense => expense.expenseId !== id);
        dispatch(deleteExpenseAction(nextExpense));
      })
    }
  }
}

export const deleteIncome = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    const check = window.confirm('削除しますか?');

    if (check) {
      userRef
      .collection('income').doc(id)
      .delete()
      .then(() => {
        const prevIncome = getState().spendings.income;
        const nextIncome = prevIncome.filter(income => income.incomeId !== id);
        dispatch(deleteIncomeAction(nextIncome));
      })
    }
  }
}

export const fetchExpense = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    let query = userRef.collection('expense').orderBy('date', 'asc');

    query
    .get()
    .then(snapshots => {
      const expense = [];
      snapshots.forEach(snapshot => {
        const e = snapshot.data();
        expense.push(e);
      })
      dispatch(fetchExpenseAction(expense));
    })
  }
}

export const fetchIncome = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    let query = userRef.collection('income').orderBy('date', 'asc');

    query
    .get()
    .then(snapshots => {
      const income = [];
      snapshots.forEach(snapshot => {
        const i = snapshot.data();
        income.push(i);
      })
      dispatch(fetchIncomeAction(income));
    })
  }
}

export const saveExpense = (id, date, category, content, money, memo) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    const timestamp = FirebaseTimestamp.now();
    const d = new Date(date)
    const data = {
      category: category,
      content: content,
      date: d,
      memo: memo,
      money: parseInt(money, 10),
      updated_at: timestamp,
    }

    if (id === '') {
      const ref = userRef.collection('expense').doc();
      id = ref.id;
      data.expenseId = id;
      data.created_at = timestamp;
    }

    return userRef
    .collection('expense').doc(id)
    .set(data, {merge: true})
    .then(() => {
      alert('登録が完了しました。');
      dispatch(push('/'));
    })
    .catch(error => {
      alert('登録できませんでした。もう一度お試しください。');
      console.log(error);
    });
  }
}

export const saveIncome = (id, date, category, money, memo) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    const timestamp = FirebaseTimestamp.now();
    const d = new Date(date)
    const data = {
      category: category,
      date: d,
      memo: memo,
      money: parseInt(money, 10),
      updated_at: timestamp,
    }

    if (id === '') {
      const ref = userRef.collection('income').doc();
      id = ref.id;
      data.incomeId = id;
      data.created_at = timestamp;
    }

    return userRef
    .collection('income').doc(id)
    .set(data, {merge: true})
    .then(() => {
      alert('登録が完了しました。');
      dispatch(push('/'));
    })
    .catch(error => {
      alert('登録できませんでした。もう一度お試しください。');
      console.log(error);
    });
  }
}