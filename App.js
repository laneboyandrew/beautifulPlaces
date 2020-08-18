import React, {useEffect, useState} from 'react';
import * as AuthSession from 'expo-auth-session';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

function App() {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = AuthSession.startAsync({
        authUrl: 'https://oauth.vk.com/authorize?client_id=7563861&display=mobile&redirect_uri=https://auth.expo.io/@laneboyandrew/mapsApplication&response_type=token&v=5.92',
    });
    // RESULT TYPE SUCCESS!!! NO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (result.type === 'success') {
        const response = fetch('https://api.vk.com/method/users.get?v=5.92&access_token=' + result.params.access_token);
        const user = response.json();

        this.setState({
            url: 'https://vk.com/id' + user.response[0].id,
            name: user.response[0].first_name + ' ' + user.response[0].last_name,
            avatar: user.response[0].photo_100
        });
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
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.loginBtn} onPress={App}>
                <Text style={{color: "#fff"}}>Login with Facebook</Text>
            </TouchableOpacity>
        </View>
    );
}

export default App;