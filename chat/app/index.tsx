import { useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { io } from "socket.io-client";
import { SocketContext } from "./SocketContect";
// import { SocketContext } from "./SocketContect";



export default function Index() {
  // const SOCKET_SERVER_URL = "http://localhost:8000";

  const [message, setMessage] = useState("");


  const [inputValue, setInputValue] = useState('');
  const [inputCode, setInputCode] = useState('');
  const navigation = useNavigation();
  // Handle submit button press
  const handleSubmit = () => {
    // if (inputValue.trim() === '') {
    //   Alert.alert('Input is empty', 'Please enter some text before submitting.');
    // } else {
    //   Alert.alert('Submitted', `You entered: ${inputValue}`);
    //   setInputValue('');
    

    navigation.navigate('login/index', { code: inputCode })
  };

  // useEffect(() => {
  //   setSocket(io("http://localhost:8000"));
  // }, []);

  // useEffect(() => {
  //    socket?.("newUser", 5);
  // }, [socket]);



  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your code:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        value={inputCode}
        onChangeText={(text) => setInputCode(text)}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20, // Space between input and button
  },
  button: {
    backgroundColor: '#6200EE', // Button color
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
