import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function TodoItem({item, pressHandler}) {
    return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => pressHandler(item.key)} >
        <View  style={styles.item}>
            <MaterialIcons name='delete' size={25} color='white' style={styles.bin}/>
            <Text style={styles.itemText}>{item.text}</Text>
        </View>
    </TouchableOpacity>
    ) 
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
    },

    itemText: {
        marginLeft: 10,
        fontSize: 20,
        padding: 16,
        paddingRight: 100,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
    },

    bin: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        backgroundColor: 'red',
        borderStyle: 'dashed',
        borderRadius: 10,
        flexDirection: 'row',
    }
});




















/*

export default function TodoItem({item, pressHandler}) {
    return (
    <TouchableOpacity onPress={() => pressHandler(item.key)} >
        <View  style={styles.item}>
            <MaterialIcons name='delete' size={25} color='#333' style={styles.bin}/>
            <Text style={styles.itemText}>{item.text}</Text>
        </View>
    </TouchableOpacity>
    ) 
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
    },

    itemText: {
        marginLeft: 10,
        fontSize: 20,
        
    },

    bin: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flexDirection: 'row',
    }
});



*/