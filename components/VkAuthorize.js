import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { ScrollView, useWindowDimensions } from "react-native";
import HTML from "react-native-render-html";
import WebView from "react-native-webview";
import Profile from "./Profile";
import {NavigationContainer} from "@react-navigation/native";


export default VkAuthorize = ({navigation, props}) => {
    const contentWidth = useWindowDimensions().width;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [token, setToken] = useState([]);

    useEffect(() => {
        fetch('http://vseklushki.ru/api/v2/users/auth_vk')
            .then((response) => response.json())
            .then((json) => setData(json))
            .finally(() => setLoading(false));
    }, []);

    console.log(data)
    // if (data){
    //      navigation.navigate('Profile')
    // }

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <ActivityIndicator/> : (
                <WebView source={{uri: 'http://vseklushki.ru/api/v2/users/auth_vk'}}/>
            )}
        </View>
    );
};