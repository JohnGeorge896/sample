// editing to test pull request

import { StyleSheet, Text, View, KeyboardAvoidingView,TextInput, TouchableOpacity,ActivityIndicator, Alert, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import {auth} from '../api/firebase'
import { useNavigation } from '@react-navigation/native'

import Axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const color1 = 'white'
const color2 = 'blue'
let count =0
const LogScreen = () => {
      
    const navigation = useNavigation()
    const[email,setEmail] = useState('')
    const[k,setK]=useState(0)
    const[password,setPassword] =useState('')
    const[copassword,setCoPassword] =useState('')
    const[isRegister,setRegister] = useState(false)

    useEffect(()=>{
        async function initialize(){
            let em = await SecureStore.getItemAsync('email');
            let pass = await SecureStore.getItemAsync('password');
            console.log(em)
            console.log(pass)
            if(em && pass){
                count++
                if(count==1){
                    setEmail(em)
                }
                if(count==2){
                    setPassword(pass)
                }
                if(count==3){
                    handleLogin()
                }
            }
            else{
                setK(1)
                console.log(k)    
            }   
    }
    if (count<=3 && k==0)
    {
        initialize()
    }   
    })
    
    const apiKey = '?api_key=4c8a85f6af0a46cea518a8b6da648862';
    const apiURL = 'https://emailvalidation.abstractapi.com/v1/' + apiKey;

    const handleSignUp = async () => {
        try {
            // const response = await axios.get(apiURL + '&email=' + email);
            // if (response.data.deliverability=='DELIVERABLE'){

                if(password===copassword){
                    if (email.includes('@') && email.includes('.com')){
                        const response = await Axios.post('http://192.168.1.6:4545/api/createusers/',{email:email,password:password});
                        console.log(response.data)
                        setRegister(false)
                        setEmail('')
                        setCoPassword('')
                        setPassword('')
                        Keyboard.dismiss()
                    }
                    else{
                        alert('invalid email')
                    }
                }else{
                    Alert.alert("Password Mismatch", "password and confirm password does not match")
                }
            }
                // }
            // else{
            //     alert('The given email address is invalid')
            // }
         catch (error) {
            alert(error.message)
        }
    }

    const handleLogin= async ()=>{
        const response = await Axios.post('http://192.168.1.6:4545/checkuser',{
            email:email,password:password
        });
        if(response.data==true){
            saveCredentials(email,password);
            navigation.replace("Home");
        }
        else{
            alert(response.data)
        }
    }

    async function saveCredentials(email,password){
        await SecureStore.setItemAsync('email',email)
        await SecureStore.setItemAsync('password',password)
    }
    if (count<=3 & k==0)
    {   
        return(
            <View style={styles.loading}>
            <ActivityIndicator size='large' color='black'/>
            </View>
        )

    }
    else{
        return (
            <KeyboardAvoidingView 
            style={styles.container}
            behavior="height">
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity 
                style ={isRegister?styles.buttonStyle2:styles.buttonStyle1}
                onPress= {()=>{
                    setRegister(false)
                    setEmail('')
                    setCoPassword('')
                    setPassword('')
                    }}>
                <Text style={isRegister?styles.text2:styles.text1}>Sign In</Text>
            </TouchableOpacity>    
            <TouchableOpacity 
                style ={isRegister?styles.buttonStyle1:styles.buttonStyle2}
                onPress= {()=>{
                    setRegister(true)
                    setEmail('')
                    setPassword('')
                    }}>
                <Text style={isRegister?styles.text1:styles.text2}>Sign Up</Text> 
            </TouchableOpacity>
            </View>    
            <View style={styles.inputContainer}>
                <TextInput 
                    value ={email}
                    //defaultValue={''}
                    onChangeText={(text)=>setEmail(text)}
                    style = {styles.input}
                    placeholder="Email"
                />
                <TextInput
                    value ={password}
                   // defaultValue={''}
                    onChangeText={(text)=>setPassword(text) }
                    style = {styles.input}
                    placeholder="Password"
                    secureTextEntry
                />
                {   isRegister
                    ?<TextInput
                        value ={copassword}
                        defaultValue={''}
                        onChangeText={(text)=>setCoPassword(text) }
                        style = {styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                    />
                    :null
                }
            </View>
            <View style={styles.buttonContainer}>
        
            {   
                isRegister
                ?<TouchableOpacity
                    onPress={handleSignUp}        
                    style = {styles.registerButton}
                >
                    <Text style = {styles.buttonText}>Register</Text>    
                
                </TouchableOpacity>
                :
                <TouchableOpacity
                    onPress={handleLogin}
                    style = {styles.loginButton}
                >
                    <Text style= {styles.buttonText}>Log in</Text>    
                </TouchableOpacity>
            }
            </View>
            </KeyboardAvoidingView>
          )

    }

}

export default LogScreen

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text1:{
        fontSize:18,
        fontWeight:'bold',
        color:'white'
    },
    buttonStyle1:{ 
        backgroundColor:'#7e8ae1',
        paddingHorizontal:30, 
        paddingVertical:10,
        borderWidth:1,
        borderColor:'black',
        borderRadius:20, 
        margin:10,
    },
    text2:{
        fontSize:18,
        fontWeight:'bold',
        color:'#7e8ae1'
    },
    buttonStyle2:{ 
        backgroundColor:'white',
        paddingHorizontal:30, 
        paddingVertical:10,
        borderWidth:1,
        borderColor:'black',
        borderRadius:20, 
        margin:10,
    },
    input:{
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:1,
        paddingHorizontal:10,
        paddingVertical:5,
        margin:5,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    inputContainer:{
        width:'75%',
        marginTop:25   
    },
    buttonContainer:{
        width:'100%',  
        alignItems:'center'
    },
    loginButton:{
        borderRadius:10,
        width:'50%',
        backgroundColor:'#7e8ae1',
        padding:10,
        alignItems:'center',
        borderWidth:1,
        marginTop:30
    },  
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:16
    },
    registerButton:{
        borderRadius:10,
        backgroundColor:'#7e8ae1',
        width:'50%',
        padding:10,
        alignItems:'center',
        borderWidth:1,
        marginTop:30
    },
})
