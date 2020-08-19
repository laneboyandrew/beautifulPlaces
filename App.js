import React, {useEffect, useState} from 'react';
import * as AuthSession from 'expo-auth-session';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

async function App() {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
        authUrl: 'https://oauth.vk.com/authorize?client_id=7563861&display=mobile&redirect_uri=https://auth.expo.io/@laneboyandrew/beautifulPlaces&response_type=token&v=5.92',
    });
    console.log(result);
    console.log("After Result")

    // RESULT TYPE SUCCESS!!! NO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (result.type === 'success') {
        const response = await fetch('https://api.vk.com/method/users.get?v=5.92&access_token=' + result.params.access_token);
        const user = await response.json();
        console.log(user);

        this.setState({
            url: 'https://vk.com/id' + user.response[0].id,
            name: user.response[0].first_name + ' ' + user.response[0].last_name,
            avatar: user.response[0].photo_100
        });
    }
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
    render()
    {
        return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.loginBtn} onPress={App}>
                <Text style={{color: "#fff"}}>Войти с помощью ВКонтакте</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

export default App;