import React, { useContext, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import IconButton from '../components/UI/IconButton'
import Button from '../components/UI/Button'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expenses-context'

function ManageExpense ({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext)

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack()
  }
  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: 'Test!!!',
        amount: 69.42,
        date: new Date('2023-07-11')
      })
    } else {
      expensesCtx.addExpense({
        description: 'Test',
        amount: 69.69,
        date: new Date('2023-07-12')
      })
    }
    navigation.goBack()
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button style={styles.button} mode="flat" onPress={cancelHandler}>
            Cancel
          </Button>

          <Button style={styles.button} onPress={confirmHandler}>
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </View>
        {isEditing
          ? (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={deleteExpenseHandler}
            />
          </View>
            )
          : null}
      </View>
    </>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  }
})
