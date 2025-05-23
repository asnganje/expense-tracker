import { Alert, Keyboard, StyleSheet,Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({onCancel, onSubmit, submitButtonLabel, defaultValues}) => {
  const [inputs, setInputs] = useState({
    amount:{
      value: defaultValues? defaultValues.amount.toString():'', 
      isValid:true
    },
    description:{
      value: defaultValues? defaultValues.description:'', 
      isValid:true
    },
    date:{
      value:defaultValues? getFormattedDate(defaultValues.date) :'',
      isValid:true
    }
  })
  const inputChangedHandler = (inputIdentifier, enteredValue) =>{
    setInputs((currentInputs)=>{
      return {
        ...currentInputs, [inputIdentifier]:{value:enteredValue, isValid:true}
      }
    })
  }
  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs)=> {
        return {
          amount: {value: currentInputs.amount.value, isValid:amountIsValid},
          date: {value: currentInputs.date.value, isValid:dateIsValid},
          description: {value: currentInputs.description.value, isValid:descriptionIsValid}
        }
      })
      return;
    }
    onSubmit(expenseData)
  }

  const formIsInValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.amount.isValid
  
  return(
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
          <Input label="Amount"
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            KeyboardType:"decimal-pad",
            onChangeText:inputChangedHandler.bind(this, 'amount'),
            value:inputs.amount.value
          }}/>
          <Input label="Date"
            invalid={!inputs.date.isValid}
            style={styles.rowInput}
            textInputConfig={{
            placeholder:'YYYY-MM-DD',
            maxLength:10,
            onChangeText:inputChangedHandler.bind(this, 'date'),
            value:inputs.date.value
          }}/>
        </View>
        <Input label="Description"
          invalid={!inputs.description.isValid}
          textInputConfig={{
          multiline:true,
          onChangeText:inputChangedHandler.bind(this, 'description'),
          value:inputs.description.value
        }}/>
        {formIsInValid &&<Text style={styles.errorText}>Invalid Input Values - Please check your entered data</Text>}
      <View style={styles.buttons}>
        <Button mode="flat" style={styles.button} onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
    </View>
  )
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form:{
    marginTop:50
  },
  title:{
    fontSize:18,
    fontWeight:"bold",
    color:"white",
    marginVertical:24,
    textAlign:"center"
  },
  inputRow:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  rowInput:{
    flex:1
  },
  errorText:{
    textAlign:"center",
    color:GlobalStyles.colors.error500,
    margin:8
  },
  button:{
    minWidth:120,
    marginHorizontal:8
  },
  buttons:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  }
})