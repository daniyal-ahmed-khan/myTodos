import React from 'react';
import { StyleSheet, ActionButton, TouchableWithoutFeedback, Alert, Keyboard, Button, Text, View, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';

export default class Home extends React.Component {

  state = {
    todos: [
      { text: '', key: '' },
      // {text: 'repair system', key:'1'},
      // {text: 'install updates', key:'2'},
      // {text: 'start working', key:'3'},
      // {text: 'Update System', key:'4'},
      // {text: 'Send Report', key:'5'},
      // {text: 'Record Response', key:'6'},
      // {text: 'Record Response', key:'7'},
      // {text: 'Record Response', key:'8'},
      // {text: 'Record Response', key:'9'},
      // {text: 'Record Response', key:'10'},
    ],
    currentUser: null,
    userEmail: '',
  }

  async componentDidMount() {
    const { currentUser } = await firebase.auth();
    const email = currentUser.email;

    this.setState({ currentUser });
    this.setState({ userEmail: email });
   
    //firebase.firestore().create().doc('VneX9amb5beQXOYer0KD6MSwst62');

    firebase.firestore()
      .collection('user1')
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        const data = doc.data().todos;
        const newArray = [];
        data.map((item) => {
          newArray.push({ text: item, key: Math.random().toString() });
        })
        this.setState({ todos: newArray })
      })

  }

  signOutUser = async () => {
    try {
      const { currentUser } = await firebase.auth().signOut();
      this.setState({ currentUser });
      this.props.navigation.navigate('SignUp');
    } catch (e) {
      console.log(e);
    }
  }
  pressHandler = (key) => {
    
    const prevTodos = this.state.todos;

    const newList = prevTodos.filter(todo => todo.key != key);

    this.setState({ todos: newList });

    const todoText = [];
      newList.map((item) => {
        todoText.push(item.text);
      });
    
   

    firebase.firestore().
    collection("user1").
    doc(this.state.currentUser.uid).
    update({
      todos: todoText
    })


  }

  submitHandler = (text) => {
    if (text.length > 3) {

      const prevTodos = this.state.todos;
      const newList = [
        { text: text, key: Math.random().toString() },
        ...prevTodos
      ];
      this.setState({ todos: newList });

      const todoText = [];
      newList.map((item) => {
        todoText.push(item.text);
      });
      console.log(todoText);
      
      if (this.state.todos[0].text == ''){
        firebase.firestore().
        collection("user1").
        doc(this.state.currentUser.uid).
        set({
          todos: todoText
        })
      }
      else {
        firebase.firestore().
        collection("user1").
        doc(this.state.currentUser.uid).
        update({
          todos: todoText
        })
      }
      

      // firebase.database().ref("user1/").
      // set({
      //   todos: todoText,
      // }).then(() => console.log('Data set.'));;
    }
    else {
      Alert.alert('Naah!!', 'Todos Length Over 3 Chars.', [
        { text: 'Got it!', onPress: () => { } },
      ])
    }
  }

  render() {
    const { currentUser } = this.state;

    return (

      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
        <View style={styles.container}>

          <View style={styles.content}>
            <Text style={{fontSize: 18 }}>logged in as, {this.state.userEmail}</Text>
            <Button style={styles.logout} title="Logout" onPress={this.signOutUser}>Logout</Button> 

            <Text style={{
              borderBottomWidth: 2,
              borderBottomColor: '#ddd',
              fontSize: 40,
              paddingTop: 10,
              paddingLeft: 80,
              fontWeight: 'bold',
            }}>
              My Todos
            </Text>

            <View style={styles.list}>
              <FlatList data={this.state.todos} renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={this.pressHandler} />
              )}>
              </FlatList>
            </View>
            <AddTodo submitHandler={this.submitHandler} />
            
          </View>

        </View>
      </TouchableWithoutFeedback>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 20,
    paddingTop: 40,
    paddingBottom: 90
  },
  list: {
    flex: 1,
    marginTop: 20,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15
  },
  logout: {
    width: 70,
    height: 20,
    backgroundColor: 'red'
  }
});