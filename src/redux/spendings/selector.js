import { createSelector } from 'reselect';

const spendingsSelector = (state) => state.spendings;

export const getExpense = createSelector(
  [spendingsSelector],
  state => state.expense
);

export const getIncome = createSelector(
  [spendingsSelector],
  state => state.income
);