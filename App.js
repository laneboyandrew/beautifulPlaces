import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, DarkTheme} from "@react-navigation/native";

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
import VkAuthorize from "./components/VkAuthorize";
import Map from "./components/Map";
import DrawerNavigator from "@react-navigation/drawer/src/navigators/createDrawerNavigator";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/Ionicons';
import MainTabScreen from "./components/MainTabScreen";
import { DrawerContent } from "./components/DrawerContent";
import {Provider as PaperProvider, DarkTheme as PaperDarkTheme } from "react-native-paper";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DarkThemeConfiguration = {

}
const App = ({navigation, props}) => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const [hasError, setErrors] = useState(false);
    const [userData, setState] = useState({});

    if (userData !== {}) {
        return (
            <PaperProvider theme={PaperDarkTheme}>
            <NavigationContainer theme={DarkTheme}>
                <Drawer.Navigator drawerContent={props => <DrawerContent{...props}/>}>
                    <Drawer.Screen name="Map" component={MainTabScreen} />
                    {/*<Drawer.Screen name="Profile" component={ProfileStackScreen} />*/}
                </Drawer.Navigator>

                    <Stack.Screen
                        name="Location"
                        component={Location}
                    />
                    <Stack.Screen
                        name="VkAuthorize"
                        component={VkAuthorize}
                    />
                    <Stack.Screen
                        name="AuthPage"
                        component={AuthPage}
                        options={{setState, setErrors}}
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
            </NavigationContainer>
                </PaperProvider>
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