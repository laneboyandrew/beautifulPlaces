import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import * as AuthSession from "expo-auth-session";
import Location from "./Location";
import {render} from "react-native-web";
import {Container, Item, Form, Input, Button, Label, Text} from "native-base";
import * as firebase from "firebase";
import 'firebase/auth';


const UserInformation = (props) => {
    return (
        <View>
            <Text> UserInfo Page </Text>
        </View>
    )
}

export default UserInformation