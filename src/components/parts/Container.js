import React, { useState, useEffect } from 'react';
import PieCharts from './PieCharts';
import { db } from '../../firebase/index';

const Container = (props) => {
  const total = (spending) => {
    let total = 0;
    spending.forEach(s => {
      total += s.money;
    });
    return total;
  };

  const initial = (categories) => {
    let array = [];
    categories.forEach(category => {
      array.push({
        name: '',
        value: 0,
      })
    })
    return array;
  }

  const createSpendings = (categories, data) => {
    let array = initial(categories);
    let sum=0;
    for (let i=0; i < data.length; i++) {
      for (let j=0; j < categories.length; j++) {
        if (categories[j].id === data[i].category) {
          sum = array[j].value + data[i].money;
          array.splice(j, 0, {
            name: categories[j].name,
            value: sum
          }) ;
          sum=0;
        }
      }
    }
    return array;
  };

  const createArray = (names, ...d) => {
    let array = [];
    for (let i=0; i < d.length; i++) {
      array.push({
        name: names[i],
        value: d[i]
      });
    }
    return array;
  }

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
      setCategoriesExpense(list);
    })

    db.collection('categoriesIncome')
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
      setCategoriesIncome(list);
    })
  }, []);

  const expense = props.expense;
  const income = props.income;
  const totalIncome = total(income);
  const totalExpense = total(expense);
  const spendings = totalIncome - totalExpense;
  const colorTotal = ['#0000ff', '#FF3300'];
  const colorExpense = ['#66CC00', '#FFFF66', '#770000', '#55FFFF', '#FF3333', '#005FFF', '#CCCCCC'];
  const colorIncome = ['#FFFF66', '#D0FF43', '#FFBEDA', '#77F9C3', '#CCCCCC'];
  const namesTotal = ['収入', '支出'];
  const [categoriesExpense, setCategoriesExpense] = useState([]);
  const [categoriesIncome, setCategoriesIncome] = useState([]);
  const dataTotal = createArray(namesTotal, totalIncome, totalExpense);
  const dataExpense = createSpendings(categoriesExpense, expense);
  const dataIncome = createSpendings(categoriesIncome, income);

  return ( 
    <div className='container none'>
      <div className='data'>
        <h2>合計 ¥<span className={spendings >= 0 ? 'plus' : 'minus'}>{spendings}</span></h2>
        {totalIncome === 0 && totalExpense === 0 ?
          <p>登録されているデータがありません。</p>
        :
          <PieCharts colors={colorTotal} data={dataTotal} />
        }
      </div>
      <div className='total'>
        <div className='data'>
          <h2>収入 ¥{totalIncome}</h2>
          {totalIncome !== 0 ? 
            <PieCharts colors={colorIncome} data={dataIncome} />
          :
            <p>登録されているデータがありません。</p>
          }
        </div>
        <div className='data'>
          <h2>支出 ¥{totalExpense}</h2>
          {totalExpense !== 0 ?
            <PieCharts colors={colorExpense} data={dataExpense} />
          :
            <p>登録されているデータがありません。</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Container;