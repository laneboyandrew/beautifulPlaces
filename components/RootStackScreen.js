import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import AuthPage from "./AuthPage";
import VkAuthorize from "./VkAuthorize";
import ProfileScreen from "./ProfileScreen";
import EmailAuthorize from "./EmailAuthorize";

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="AuthPage" component={AuthPage}/>
        <RootStack.Screen name="VkAuthorize" component={VkAuthorize}/>
        <RootStack.Screen name="Profile" component={ProfileScreen}/>
        <RootStack.Screen name="EmailAuthorize" component={EmailAuthorize}/>
    </RootStack.Navigator>
);

export default RootStackScreen;