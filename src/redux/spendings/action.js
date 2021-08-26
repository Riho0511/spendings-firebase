export const deleteExpenseAction = (expense) => {
  return {
    type: "DELETE_EXPENSE",
    payload: expense
  }
}

export const deleteIncomeAction = (income) => {
  return {
    type: "DELETE_INCOME",
    payload: income
  }
}

export const fetchExpenseAction = (expense) => {
  return {
    type: "FETCH_EXPENSE",
    payload: expense
  }
}

export const fetchIncomeAction = (income) => {
  return {
    type: "FETCH_INCOME",
    payload: income
  }
}