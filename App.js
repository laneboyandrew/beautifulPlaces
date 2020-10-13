import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";

import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import Location from "./components/Location";
import AuthPage from "./components/AuthPage";
import Profile from "./components/Profile";
import EmailAuthorize from "./components/EmailAuthorize";
import UserInformation from "./components/UserInformation";
import {createStackNavigator} from "@react-navigation/stack";
import ForgotPassword from "./components/ForgotPassword";
import CreateAccount from "./components/CreateAccount";


const Stack = createStackNavigator();

const App = () => {
    const [hasError, setErrors] = useState(false);
    const [userData, setState] = useState({});
    if (userData !== {}) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="AuthPage"
                        component={AuthPage}
                        options={{setState, setErrors}}
                    />
                    <Stack.Screen
                        name="Location"
                        component={Location}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                    />
                    <Stack.Screen
                        name="EmailAuthorize"
                        component={EmailAuthorize}
                    />
                    <Stack.Screen
                        name="UserInformation"
                        component={UserInformation}
                    />
                    <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPassword}
                    />
                    <Stack.Screen
                        name="CreateAccount"
                        component={CreateAccount}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
};
export default App;