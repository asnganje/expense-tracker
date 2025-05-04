import { Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";

const ErrorOverlay = ({message, onConfirm}) => {
  const navigation = useNavigation()

  return(
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  )
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    padding:24,
    backgroundColor:GlobalStyles.colors.primary700
  },
  text:{
    textAlign:"center",
    marginBottom:8,
    color:"white"
  },
  title:{
    fontSize:20,
    fontWeight:"bold"
  },
})