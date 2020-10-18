import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, View} from "react-native";
import * as AuthSession from "expo-auth-session";
import Location from "./Location";
import EmailAuthorize from "./EmailAuthorize";
import Profile from "./Profile";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import WebView from "react-native-webview";

const Stack = createStackNavigator();

const AuthPage = ({navigation, props}) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#e9ebee',
            alignItems: 'center',
            justifyContent: 'center',
        },
        loginBtn: {
            backgroundColor: '#4267b2',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20
        },
        logoutBtn: {
            backgroundColor: 'grey',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            position: "absolute",
            bottom: 0
        },
    });
    return (

        <View style={styles.container}>
            <Button style={styles.loginBtn} onPress={
                () => navigation.navigate('VkAuthorize')
            }
                    title='Войти с помощью ВКонтакте'/>

            <Button onPress={() => navigation.navigate('EmailAuthorize')} title='Войти с помощью Email'/>
        </View>
    )
}
export default AuthPage