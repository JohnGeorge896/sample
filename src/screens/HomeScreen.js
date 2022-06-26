import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import CustomerDetails from '../components/CustomerDetails'
import { Ionicons } from '@expo/vector-icons'; 
import * as SecureStore from 'expo-secure-store'
import Axios from 'axios'


const HomeScreen = () => {
  let response=[];
  const[arr,setArr]= useState([])
  const[refresh,setRefresh]=useState('')
  const navigation = useNavigation()
  const reload=()=>{
    setRefresh(' ')
  }
  useEffect(()=>{
    getData();
},[refresh])

const getData = async()=>{
  response = await Axios.get('http://192.168.1.6:4545/cus');
  setArr(response.data)
  
}

  const handleSignout=async()=>{
    try{  
      await SecureStore.deleteItemAsync('email')
      await SecureStore.deleteItemAsync('password')
      navigation.replace("Log")
    }catch(error){
      console.log(error.message)
    }
  }
  
  return (
    <>
      <TouchableOpacity style={{alignSelf:'center',backgroundColor:'grey'}} onPress={handleSignout}>
        <Text style={{fontSize:20,margin:10}}>Sign out</Text>
      </TouchableOpacity>  
      <ScrollView>
      { 
      arr.map((val)=>{
        return ( <CustomerDetails data={val} reload={reload} key={val.id} />)
      })
    }
     </ScrollView> 

      <TouchableOpacity 
        style={styles.addButton}
        onPress={()=>navigation.navigate("Add")}>
       <Ionicons name="add-circle" size={65} color="#a1aaea" />
      </TouchableOpacity>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  addButton:{
    //opacity:0.5,
    position:'absolute',
    bottom:20,
    paddingHorizontal:0,
    borderRadius:50,
    alignSelf:'center'
  },
  addText:{
    fontSize:50,
    color:'white',
    fontWeight:'bold'
  }
})