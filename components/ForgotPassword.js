import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import * as AuthSession from "expo-auth-session";
import Location from "./Location";
import {render} from "react-native-web";
import {Container, Item, Form, Input, Button, Label, Text} from "native-base";
import * as firebase from "firebase";
import 'firebase/auth';

const ForgotPassword = ({navigation, props}) => {
    const [userEmail, setStateForgotData] = useState({});

    async function restorePassword() {
        await firebase.auth().sendPasswordResetEmail(userEmail.toString())
            .then(function (user) {
                alert('Мы выслали Вам информацию для входа на email:' + userEmail)
                navigation.navigate('EmailAuthorize')
            }).catch(function (error) {
                console.log(error.code)
                switch (error.code) {
                    case 'auth/user-not-found': {
                        alert('Пользователь с таким адресом электронной почты не зарегистрирован')
                        break
                    }
                }
            })
    }
    return (
        <Container>
            <Form>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input autoCapitalize="none"
                           autoCorrect={false}
                           onChangeText={setStateForgotData}
                    />
                </Item>
                <Button full rounded success style={{marginTop: 20}}
                        onPress={restorePassword}>
                    <Text>Отправить пароль на почту</Text>
                </Button>
            </Form>
        </Container>
    );
}

export default ForgotPassword