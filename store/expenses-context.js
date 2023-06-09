import React, { createContext, useReducer } from 'react'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-07-11')
  },
  {
    id: 'e2',
    description: 'A pair of shoes',
    amount: 89.99,
    date: new Date('2023-07-10')
  },
  {
    id: 'e3',
    description: 'A pair of shoes',
    amount: 159.99,
    date: new Date('2023-07-9')
  },
  {
    id: 'e4',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-07-12')
  },
  {
    id: 'e5',
    description: 'Shoes',
    amount: 1059.99,
    date: new Date('2023-01-05')
  }
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {}
})

function expensesReducer (state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{ ...action.payload, id }, ...state]
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      )

      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state
  }
}

function ExpensesContextProvider ({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

  function addExpense (expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function deleteExpense (id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense (id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider
