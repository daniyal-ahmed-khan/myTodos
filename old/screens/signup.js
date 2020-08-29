import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase';
import styles from '../assets/style';

export default class SignUp extends Component {
  state = { email: '', password: '', errorMessage: null }
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#e93766', fontSize: 40 }}>Sign Up</Text>

        {this.state.errorMessage && <Text style={{ color: 'red' }}> {this.state.errorMessage} </Text>}

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={this.state.email}
          style={styles.textInput}
          onChangeText={(email) => this.setState({ email })}
        />

        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password} 
          style={styles.textInput} 
        />

        <Button title="Sign Up" color="#e93766" onPress={this.handleSignUp} />
        <View>
          <Text> Already have an account? <Text onPress={() => this.props.navigation.navigate('Login')} style={{ color: '#e93766', fontSize: 18 }}> Login </Text></Text>
        </View>
      </View>
    )
  }
}