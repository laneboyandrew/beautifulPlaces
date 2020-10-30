import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {ScrollView, useWindowDimensions} from "react-native";
import HTML from "react-native-render-html";
import WebView from "react-native-webview";
import Profile from "./Profile";
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default VkAuthorize = ({navigation, props}) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [token, setToken] = useState([]);

    useEffect(() => {
        fetch('http://vseklushki.ru/api/v2/users/auth_vk')
            .then((response) => response.json())
            .then((json) => setData(json))
            .finally(() => setLoading(false));
    }, []);

        if (data !== null) {
            const jsonValue = JSON.stringify(data)
            AsyncStorage.setItem('@token', jsonValue)
            navigation.navigate('Profile')
        }
        // let value = AsyncStorage.getItem('@token');
    return (
        <View style={{flex: 1}}>
            {isLoading ? <ActivityIndicator/> : (
                <WebView source={{uri: 'http://vseklushki.ru/api/v2/users/auth_vk'}}/>
            )}
        </View>
    );
};