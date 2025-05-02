import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from "./screens/ManageExpense"
import RecentExpenses from "./screens/RecentExpenses"
import AllExpenses from "./screens/AllExpenses"
import { GlobalStyles } from './constants/styles';

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

const ExpensesOverview = () => {
  return(
    <BottomTabs.Navigator screenOptions={{
      headerStyle:{backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor:"white",
      tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
      tabBarActiveTintColor:GlobalStyles.colors.accent500
    }}>
      <BottomTabs.Screen
        name='RecentExpenses'
        component={RecentExpenses}
      />
      <BottomTabs.Screen
        name='AllExpenses'
        component={AllExpenses}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
      <>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name='ExpensesOverview'
              component={ExpensesOverview}
              options={{
                headerShown:false
              }}
            />
            <Stack.Screen name='ManageExpense' component={ManageExpense}/>
          </Stack.Navigator>
        </NavigationContainer>
      </>
  );
}