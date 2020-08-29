import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button,TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import IonIcons from 'react-native-vector-icons/Ionicons';


export default function AddTodo({submitHandler}) {
    const [text,setText] = useState('');

    const changeHandler = (val) => {
        setText(val);
    }
    const [isModalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        
    };
    const closeModal = () => {
        setModalVisible(!isModalVisible);
    }
    return (
        <View>
        
            <Modal isVisible={isModalVisible}>
    
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ backgroundColor: 'white', width: 350, height: 180, borderRadius: 20}}>
                        <Text style={{fontSize:25,fontStyle: 'italic', fontWeight:'bold', paddingLeft: 120, paddingTop: 10}}>New Todo</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder='Type here...'
                            onChangeText={changeHandler} // same as (val) => changeHandler(val)
                        />
                        <Button style={{width: 100}} onPress={() =>submitHandler(text) } title='Add Todo' color='skyblue'/>
                    </View>  
                
                     <Button title="Hide modal" onPress={closeModal} />  
                </View>
           
            </Modal> 
      
            <IonIcons name='add-circle' size={70} color='green' style={{position:'absolute', right: 20, }} onPress={toggleModal }/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    input : {
        marginBottom : 20,
        paddingHorizontal: 150,
        borderRadius: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
    }
});