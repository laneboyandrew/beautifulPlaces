import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, DarkTheme} from "@react-navigation/native";

import {StyleSheet, Text, View, TouchableOpacity, Button, ActivityIndicator} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import Location from "./components/Location";
import AuthPage from "./components/AuthPage";
import Profile from "./components/Profile";
import EmailAuthorize from "./components/EmailAuthorize";
import UserInformation from "./components/UserInformation";
import {createStackNavigator} from "@react-navigation/stack";
import ForgotPassword from "./components/ForgotPassword";
import CreateAccount from "./components/CreateAccount";
import VkAuthorize from "./components/VkAuthorize";
import Map from "./components/Map";
import DrawerNavigator from "@react-navigation/drawer/src/navigators/createDrawerNavigator";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/Ionicons';
import MainTabScreen from "./components/MainTabScreen";
import {DrawerContent} from "./components/DrawerContent";
import {Provider as PaperProvider, DarkTheme as PaperDarkTheme} from "react-native-paper";
import {AuthContext} from './components/context'
import ChatScreen from "./components/ChatScreen";
import Favourites from "./components/Favourites";
import Settings from "./components/Settings";
import Support from "./components/Support";
import RootStackScreen from "./components/RootStackScreen";
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DarkThemeConfiguration = {}
const App = ({navigation, props}) => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const [hasError, setErrors] = useState(false);
    const [userData, setState] = useState({});
    // const [isLoading, setIsLoading] = React.useState(true);
    // const [userToken, setUserToken] = React.useState(false);

    const initialLoginState = {
        isLoading: true,
        username: null,
        userToken: null
    }

    const loginReducer = (prevState, action) => {

        switch (action.type) {
            case "RETRIEVE_TOKEN":
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false
                };
            case "LOGIN":
                return {
                    ...prevState,
                    username: action.id,
                    userToken: action.token,
                    isLoading: false
                };
            case "LOGOUT":
                return {
                    ...prevState,
                    username: null,
                    userToken: null,
                    isLoading: false
                };
            case "REGISTER":
                return {
                    ...prevState,
                    username: action.id,
                    userToken: action.token,
                    isLoading: false
                };
        }
    }

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async(username, password) => {
            let userToken;
            userToken = null;

            if (username == 'user' && password == 'pass'){
                userToken = 'fsdfsdfsfsd'
                try {
                    await AsyncStorage.setItem('userToken', userToken)
                } catch(e) {
                    console.log(e)
                }
            }
            dispatch({type: 'LOGIN', id: username, token: userToken})
            console.log(userToken)
        },
        signOut: async() => {
            try {
                await AsyncStorage.removeItem('userToken')
            } catch(e) {
                console.log(e)
            }
            dispatch({type: 'LOGOUT'})
        },
        signUp: () => {
            // setUserToken('sometoken');
            // setIsLoading(false)
        }
    }), []);
    useEffect(() => {
        setTimeout(async() => {
            let userToken;
            userToken = null
            console.log(userToken)
            try {
               userToken = await AsyncStorage.getItem('userToken')
            } catch(e) {
                console.log(e)
            }
            // setIsLoading(false);
            dispatch({type: "RETRIEVE_TOKEN", token: 'userToken'})
        }, 1000)
    }, []);
    if (loginState.isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }

        return (
            <AuthContext.Provider value={authContext}>
                <PaperProvider theme={PaperDarkTheme}>
                    <NavigationContainer theme={DarkTheme}>
                        {loginState.userToken !== null ? (
                            <Drawer.Navigator drawerContent={props => <DrawerContent{...props}/>}>
                                <Drawer.Screen name="Map" component={MainTabScreen}/>
                                <Drawer.Screen name="ChatScreen" component={ChatScreen}/>
                                <Drawer.Screen name="FavouritesScreen" component={Favourites}/>
                                <Drawer.Screen name="SettingsScreen" component={Settings}/>
                                <Drawer.Screen name="SupportScreen" component={Support}/>
                            </Drawer.Navigator>) : <RootStackScreen/>
                            //     <Drawer.Navigator drawerContent={props => <DrawerContent{...props}/>}>
                            //     <Drawer.Screen name="Map" component={MainTabScreen} />
                            //     <Drawer.Screen name="SettingsScreen" component={Settings} />
                            //     <Drawer.Screen name="SupportScreen" component={Support} />
                            // </Drawer.Navigator>
                        }
                        <Stack.Screen
                            name="Location"
                            component={Location}
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
                        <AuthContext.Provider value={authContext}>
                            <Stack.Screen
                                name="Profile"
                                component={Profile}
                            />
                        </AuthContext.Provider>
                    </NavigationContainer>
                </PaperProvider>
            </AuthContext.Provider>
        )
};
export default App;