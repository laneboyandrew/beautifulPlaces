import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme} from "@react-navigation/native";

import {StyleSheet, Text, View, TouchableOpacity, Button, ActivityIndicator} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import Location from "./components/Location";
import AuthPage from "./components/AuthPage";
import ProfileScreen from "./components/ProfileScreen";
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
import {Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme} from "react-native-paper";
import {AuthContext} from './components/context'
import ChatScreen from "./components/ChatScreen";
import Favourites from "./components/Favourites";
import Settings from "./components/Settings";
import Support from "./components/Support";
import RootStackScreen from "./components/RootStackScreen";
import AsyncStorage from "@react-native-community/async-storage";
import DetailsScreen from "./components/DetailsScreen";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DarkThemeConfiguration = {}
const App = ({navigation, props}) => {
    let [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const [hasError, setErrors] = useState(false);
    const [userData, setState] = useState({});
    // const [isLoading, setIsLoading] = React.useState(true);
    // const [userToken, setUserToken] = React.useState(false);

    const initialLoginState = {
        isLoading: true,
        username: null,
        userToken: null
    }

    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: '#ffffff',
            text: '#333333'
        }
    }

    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors:  {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: '#333333',
            text: '#ffffff'
        }
    }

    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme
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
        signIn: async (foundUser) => {
            const userToken = String(foundUser[0].userToken);
            const username = foundUser[0].username
            try {
                await AsyncStorage.setItem('userToken', userToken)
            } catch (e) {
                console.log(e)
            }
            dispatch({type: 'LOGIN', id: username, token: userToken})
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken')
            } catch (e) {
                console.log(e)
            }
            dispatch({type: 'LOGOUT'})
        },
        signUp: () => {
            // setUserToken('sometoken');
            // setIsLoading(false)
        },
        toggleTheme: () => {
            setIsDarkTheme( isDarkTheme = !isDarkTheme)
        }
    }), []);
    useEffect(() => {
        setTimeout(async () => {
            let userToken;
            userToken = null
            console.log(userToken)
            try {
                userToken = await AsyncStorage.getItem('userToken')
            } catch (e) {
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
        <PaperProvider theme={theme}>
            <AuthContext.Provider value={authContext}>
                <NavigationContainer theme={theme}>
                    {loginState.userToken !== null ? (
                        <Drawer.Navigator drawerContent={props => <DrawerContent{...props}/>}>
                            <Drawer.Screen name="Map" component={MainTabScreen}/>
                            <Drawer.Screen name="ChatScreen" component={ChatScreen}/>
                            <Drawer.Screen name="FavouritesScreen" component={Favourites}/>
                            <Drawer.Screen name="SettingsScreen" component={Settings}/>
                            <Drawer.Screen name="SupportScreen" component={Support}/>
                            <Drawer.Screen name="DetailsScreen" component={DetailsScreen} />
                        </Drawer.Navigator>) : <RootStackScreen/>
                        //     <Drawer.Navigator drawerContent={props => <DrawerContent{...props}/>}>
                        //     <Drawer.Screen name="Map" component={MainTabScreen} />
                        //     <Drawer.Screen name="SettingsScreen" component={Settings} />
                        //     <Drawer.Screen name="SupportScreen" component={Support} />
                        // </Drawer.Navigator>
                    }

                </NavigationContainer>
            </AuthContext.Provider>
        </PaperProvider>
    )
};
export default App;