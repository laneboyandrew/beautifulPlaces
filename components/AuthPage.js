import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, View} from "react-native";
import * as AuthSession from "expo-auth-session";
import Location from "./Location";
import EmailAuthorize from "./EmailAuthorize";
import Profile from "./Profile";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

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
                async function fetchData(e) {
                    e.preventDefault()

                    let redirectUrl = AuthSession.getRedirectUrl(); //https://auth.expo.io/@laneboyandrew/beautifulPlaces
                    let result = await AuthSession.startAsync({
                        authUrl: 'https://oauth.vk.com/authorize?client_id=7563861&display=mobile&redirect_uri=' + redirectUrl + '&response_type=token&v=5.92',
                    });
                    console.log(result)
                    if (result.type === 'success') {
                        const res = await fetch('https://api.vk.com/method/users.get?v=5.92&access_token=' + result.params.access_token);
                        res
                            .json()
                            .then(res => props.setState(res))
                            .catch(err => props.setErrors(err));
                    }
                    if(result.type === 'success') {
                        navigation.navigate('Location')
                    }
                }
            }
                    title='Войти с помощью ВКонтакте'/>
            <Button onPress={() => navigation.navigate('EmailAuthorize')} title='Войти с помощью Email'/>
        </View>
    )
}
export default AuthPage