import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen';
import AddCustomer from './src/screens/AddCustomer';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen options={{headerShown:false}} name="Log" component={LogScreen} />
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Add" component={AddCustomer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
