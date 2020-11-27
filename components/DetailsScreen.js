import React from 'react'
import {
    ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View, Image, TextInput, Animated, TouchableOpacity,
    Platform, StatusBar, Button
} from 'react-native';

const DetailsScreen = ({route, navigation}) => {
    const { currentMarker } = route.params
    console.log(currentMarker.coordinate.latitude)
    return (
        <Text>{currentMarker.coordinate.latitude}</Text>
    )
}
export default DetailsScreen