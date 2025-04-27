import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const authHandler = async () => {
    try {
      const url = `http://your-api-url/api/auth/${isLogin ? 'login' : 'register'}`;
      const response = await axios.post(url, {
        email,
        password
      });

      await SecureStore.setItemAsync('token', response.data.token);
      navigation.replace('Home');
    } catch (err) {
      console.log(err);
      alert('Authentication failed!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={isLogin ? 'Login' : 'Sign Up'}
        onPress={authHandler}
      />
      <TouchableOpacity onPress={() => setIsLogin(prevState => !prevState)}>
        <Text style={styles.switchText}>
          {isLogin ? 'New user? Sign up instead' : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  switchText: {
    color: 'blue',
    marginTop: 15,
    textAlign: 'center'
  }
});

export default AuthScreen;
