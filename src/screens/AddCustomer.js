import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import Axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native'
const reducer=(details,action)=>{
    switch(action.type){
        case 'change_name':
            return {...details,name:action.payload1}
        case 'change_city':
            return {...details,city:action.payload1}
        case 'change_state':
            return {...details,state:action.payload1}
        case 'change_phoneno':
            return {...details,phoneno:action.payload1}
        case 'change_all':
            return{...details,name:action.payload1,city:action.payload2,state:action.payload3,phoneno:action.payload4}
        default:
            return details
    }
}
const AddCustomer = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const[details,dispatch] = useReducer(reducer,{name:'',city:'',state:'',phoneno:''})
  const {name,city,state,phoneno} = details

 useEffect(()=>{

    if(route.params==null){
  
    }
    else{  
    dispatch({type:'change_all', payload1:route.params.name,payload2:route.params.city,payload3:route.params.state, payload4:route.params.phoneno})
      console.log("chumma")
    }
 },[])

  async function writeUserData()
  {
    if(route.params==null){
      await Axios.post('http://192.168.1.6:4545/api/createcustomers',{
          name:name,city:city,state:state,phoneno:phoneno
      });
    }
    else{
      await Axios.post('http://192.168.1.6:4545/api/update',{
        id: route.params.key, name:name, city:city,state:state, phoneno:phoneno
    });
    }
    navigation.replace('Home')
  }
 
  return (
    <View style={styles.pageStyle}>
      <View style={{flexDirection:'row'}}> 
      <Text style={styles.textStyle}>Customer Name: </Text>
      <TextInput 
        style={styles.inputStyle}
        value={name}
        onChangeText={(text)=>dispatch({type:'change_name',payload1:text,payload2:'',payload3:'',payload4:''})}
        />
      </View >
      <View style={{flexDirection:'row'}}> 
      <Text style={styles.textStyle}>City: </Text>
      <TextInput 
        style={styles.inputStyle}
        value={city}
        onChangeText={(text)=>dispatch({type:'change_city',payload1:text,payload2:'',payload3:'',payload4:''})}
        />
      </View >
      <View style={{flexDirection:'row'}}> 
      <Text style={styles.textStyle}>State: </Text>
      <TextInput 
        style={styles.inputStyle}
        value={state}
        onChangeText={(text)=>dispatch({type:'change_state',payload1:text,payload2:'',payload3:'',payload4:''})}
        />
      </View >
      <View style={{flexDirection:'row'}}> 
      <Text style={styles.textStyle}>Phone number: </Text>
      <TextInput
        style={styles.inputStyle}
        value={phoneno}
        onChangeText={(text)=>dispatch({type:'change_phoneno',payload1:text,payload2:'',payload3:'',payload4:''})}
         />
      </View >
      <Button title="Submit" onPress={()=>writeUserData()} ></Button>
    </View>
    
  )
}

export default AddCustomer

const styles = StyleSheet.create({
    pageStyle:{
        margin:10,
        borderWidth:1,
        borderColor:'blue',
        borderRadius:20,
        padding:10
    },
    inputStyle:{
        position:'absolute',
        marginVertical:10,
        left:130,
        marginHorizontal:10,
        backgroundColor:'white',
        width:215,
        height:40,
        borderColor:'blue',
        borderWidth:1,
        padding:10
    },
    textStyle:{
        marginVertical:20,
        fontSize:16,
        alignSelf:'center',
        fontWeight:'bold'
    }
})