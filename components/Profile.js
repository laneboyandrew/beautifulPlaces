import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, View, Text, ActivityIndicator, StatusBar} from "react-native";
import * as AuthSession from "expo-auth-session";
import Location from "./Location";
import {useTheme} from "@react-navigation/native";


const Profile = (navigation) => {
    const {colors} = useTheme();
    const theme = useTheme();
    return (
        <View>
            <StatusBar barStyle={"light-content" }/>
            <Text style={{color: colors.text}}> Here we go to Profile </Text>
        </View>
    )
}
export default Profile
