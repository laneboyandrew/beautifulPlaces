import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { ScrollView, useWindowDimensions } from "react-native";
import HTML from "react-native-render-html";
import WebView from "react-native-webview";


export default VkAuthorize = () => {
    const contentWidth = useWindowDimensions().width;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://vseklushki.ru/api/v2/users/auth_vk')
            .then((response) => response.text())
            .then((text) => setData(text))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <ActivityIndicator/> : (
                <WebView source={{html: data}}/>
            )}
        </View>
    );
};