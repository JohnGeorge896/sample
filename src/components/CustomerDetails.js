import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const CustomerDetails = ({data,reload}) => {
  const navigation = useNavigation()
  async function deleteCustomer(){
    const response = await Axios.delete(`http://192.168.1.6:4545/del/${data.id}`);
    navigation.replace('Home');
  }
  const nav=()=>{
    navigation.navigate("Add",{
      key:data.id,
      name:data.name,
      city:data.city,
      state:data.state,
      phoneno:data.phoneno,
    })

  }
  return (
    <>
    <View style={styles.bar}>
      <View>
      <Text style={styles.nameStyle}>{data.name}</Text>
      <Text>{data.city}</Text>
      <Text>Phone no: {data.phoneno}</Text>
      </View >
      <View style={{flexDirection:'row',justifyContent:'space-between',width:100}}>
      <TouchableOpacity onPress={()=>deleteCustomer()}>
      <MaterialCommunityIcons style={{flex:1,top:15}} name="delete-outline" size={30} color='#e8455e' />
      </TouchableOpacity>
      <TouchableOpacity onPress={nav}>
      <FontAwesome5 style={{flex:1,top:18}} name="edit" size={23} color='#7e8ae1' />
      </TouchableOpacity>
      </View>
    </View>
    <View
      style={{
      borderBottomColor: 'black',
      borderBottomWidth: 2,
    }}/>
    </>
  )
}

export default CustomerDetails

const styles = StyleSheet.create({
  bar:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:10,
    flex:1
  },
  nameStyle:{
    fontSize:20,
    fontWeight:'bold'
  }
})