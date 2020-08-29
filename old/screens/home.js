import React from 'react';
import { StyleSheet, Platform, Image,Button, Text, View, FlatList } from 'react-native';
import firebase from 'react-native-firebase';



export default class Home extends React.Component {
  state = { todos : [], currentUser: null }

componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    
    firebase.firestore()
      .collection('user1')
      .get()
      .then((snapshot) => {
        const userTodos = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          console.log(data.todos);
        })
      })
}

signOutUser = async () => {
  try {
      const {currentUser} = await firebase.auth().signOut();
      this.setState({currentUser});
      this.props.navigation.navigate('SignUp');
  } catch (e) {
      console.log(e);
  }
}

render() {
    const { currentUser } = this.state
  return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}> Hi <Text style={{color:'#e93766', fontSize: 20}}> 
          {currentUser && currentUser.email}!
        </Text></Text>
        
        <Button title="Logout" onPress={this.signOutUser}>Logout</Button></View>
        //onPress={this.setState({currentUser: null})}
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})