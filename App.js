import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";

import {View, Text} from 'react-native'
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDd3a1mhtAvqGHUtfPrPRU_QkipXyGCJkQ",
  authDomain: "test-dav-6733f.firebaseapp.com",
  projectId: "test-dav-6733f",
  storageBucket: "test-dav-6733f.appspot.com",
  messagingSenderId: "813721804490",
  appId: "1:813721804490:web:d769731abff4f92cbe1e33",
  measurementId: "G-SJ8Q9S4YCP"
};

if(firebase.apps.length == 0 ){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./Components/auth/Landing";
import RegisterScreen from "./Components/auth/Register";

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount(){
  firebase.auth().onAuthStateChanged((user) => {
    if(!user){
      this.setState({
        loggedIn: false,
        loaded: true,
      })
    }else {
      this.setState({
        loggedIn: true,
        loaded: true,
      })
    }
  })
  }
  render() {
    const {loaded, loggedIn} = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>로딩중</Text>
        </View>
      )
    }
    if(!loggedIn){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
        
        </Stack.Navigator>
      </NavigationContainer>
    );
    }

    return(
      <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>이미 로그인 되어있습니다.</Text>
        </View>
    )
  }
}
export default App
