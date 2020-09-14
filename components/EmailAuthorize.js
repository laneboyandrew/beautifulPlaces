import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import * as AuthSession from "expo-auth-session";
import Location from "./Location";
import {render} from "react-native-web";
import {Container, Item, Form, Input, Button, Label, Text} from "native-base";
import * as firebase from "firebase";
import 'firebase/auth';


const EmailAuthorize = (props) => {
    var config = {
        apiKey: "AIzaSyB3Iw7EdEKTaUneyZmyaYSjCdHr8uwDxng",
        authDomain: "beautifulplaces-c5df9.firebaseapp.com",
        databaseURL: "https://beautifulplaces-c5df9.firebaseio.com",
        projectId: "beautifulplaces-c5df9",
        storageBucket: "beautifulplaces-c5df9.appspot.com",
        messagingSenderId: "189960668368",
        appId: "1:189960668368:web:e3c7eb98d5cb70a3cecad5",
        measurementId: "G-GSS9R0MVJL"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    const [userEmail, setStateEmail] = useState({});
    const [userPassword, setStatePassword] = useState({});

    function signUp() {
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(userEmail.toString(), userPassword.toString())
                .then();
        } catch (error) {
            console.log(error.toString());
        }
        const user = firebase.auth().currentUser;
        const emailVerified = user.emailVerified;
        if (emailVerified === false) {
            firebase.auth().onAuthStateChanged(function (user) {
                user.sendEmailVerification();
            })
        }
    }

    function LogIn() {
        const user = firebase.auth().currentUser;
        const emailVerified = user.emailVerified;
        firebase.auth().currentUser.reload()
        // const newUser = firebase.user.reload()
        // console.log(newUser)
        if (emailVerified) {
            try {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(userEmail.toString(), userPassword.toString())
                    .then(res => {
                        console.log(res.user.email);
                    });
            } catch (error) {
                console.log(error.toString());
            }
        } else
        alert("Пожалуйста, подтвердите электронную почту, мы уже направаили Вам письмо на " + userEmail + "!:)")
            // .then(user.sendEmailVerification())
    }

    return (
        <Container>
            <Form>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input autoCapitalize="none"
                           autoCorrect={false}
                           onChangeText={email => setStateEmail(email)}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={password => setStatePassword(password)}
                    />
                </Item>
                <Button full rounded success onPress={() => LogIn(setStateEmail, setStatePassword)}>
                    <Text>Login</Text>
                </Button>
                <Button full rounded success style={{marginTop: 20}}
                        onPress={() => signUp(setStateEmail, setStatePassword)}>
                    <Text>Signup</Text>
                </Button>
            </Form>
        </Container>
    );
}
export default EmailAuthorize
