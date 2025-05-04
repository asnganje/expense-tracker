import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()
  
  useEffect(()=> {
    const getExpenses = async() => {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
      } catch (error) {
        setError('Could not fetch expenses!')
      }
      setIsFetching(false)
    }

    getExpenses()
  },[])

  const errorHandler = () => {
    setError(null)
  }
  
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>    
  }
  const recentExpenses = expensesCtx.expenses.filter((expense)=>{
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7)
    return expense.date > date7daysAgo
  })
  if (isFetching) {
    return <LoadingOverlay />
  }
  return(
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallBackText="No expenses registered for the last 7 days!"/>
  )
}

export default RecentExpenses;