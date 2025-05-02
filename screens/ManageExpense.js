import { useContext, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import IconButton from "../components/UI/IconButton"
import { GlobalStyles } from "../constants/styles"
import Button from "../components/UI/Button"
import { ExpensesContext } from "../store/expenses-context"

const ManageExpense = ({route, navigation}) => {
  const expensesCtx = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  useEffect(()=> {
    navigation.setOptions({
      title:isEditing?"Edit Expense" : "Add New Expense"
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
    if(isEditing) {
      expensesCtx.updateExpense(
        editedExpenseId,
        {
        description:"Test!!!",
        amount:19.99,
        date:new Date('2023-05-19')
      })
    } else {
      expensesCtx.addExpense({
        description:"Test",
        amount:19.99,
        date:new Date('2023-05-19')
      })
    }
    navigation.goBack()
  }
  
  return(
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" style={styles.button} onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.button} onPress={confirmHandler}>{isEditing?"Update":"Add"}</Button>
      </View>
      {isEditing && 
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
        </View>
      }
    </View>
  )
}

export default ManageExpense;

const styles =StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor:GlobalStyles.colors.primary800
  },
  button:{
    minWidth:120,
    marginHorizontal:8
  },
  buttons:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  deleteContainer:{
    marginTop:16,
    paddingTop:8,
    borderTopWidth:2,
    borderTopColor:GlobalStyles.colors.primary200,
    alignItems:"center"
  }
})
