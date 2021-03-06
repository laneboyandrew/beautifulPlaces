import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import * as AuthSession from "expo-auth-session";
import Location from "./Location";
import {render} from "react-native-web";
import {Container, Item, Form, Input, Button, Label, Text} from "native-base";
import * as firebase from "firebase";
import 'firebase/auth';
import UserInformation from "./UserInformation";


const EmailAuthorize = ({navigation, props}) => {
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

    async function LogIn() {
        await firebase.auth().currentUser.reload()
        if (!firebase.auth().currentUser.emailVerified) {
            alert('Вы не подтвердили email')
        } else {
            try {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(userEmail.toString(), userPassword.toString())
                    .then(() => navigation.navigate('UserInformation'))
            } catch (error) {
                switch (error.code) {
                    case 'auth/wrong-password': {
                        alert('Вы ввели неверный пароль')
                        break
                    }
                    case 'auth/invalid-email': {
                        alert('Вы ввели некорректный Email')
                        break
                    }
                    case 'auth/user-not-found': {
                        alert('Пользователь с таким адресом электронной почты не зарегистрирован')
                        break
                    }
                }
            }
        }
    }
    return (
        <Container>
            <Form>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input autoCapitalize="none"
                           autoCorrect={false}
                           onChangeText={userEmail => setStateEmail(userEmail)}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Пароль</Label>
                    <Input
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={userPassword => setStatePassword(userPassword)}
                    />
                </Item>
                <Button full rounded success onPress={() => LogIn(setStateEmail, setStatePassword)}>
                    <Text>Войти</Text>
                </Button>
                <Button full rounded success style={{marginTop: 20}}
                        onPress={() => navigation.navigate('CreateAccount')}>
                    <Text>Создать аккаунт</Text>
                </Button>
                <Button full rounded success style={{marginTop: 20}}
                        onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text>Забыли пароль?</Text>
                </Button>
            </Form>
        </Container>
    );
}

export default EmailAuthorize
