import React, {useState, useEffect} from 'react';
import {Container, Item, Form, Input, Button, Label, Text} from "native-base";
import * as firebase from "firebase";
import 'firebase/auth';

const CreateAccount = ({navigation, props}) => {
    const [userEmail, setStateEmail] = useState({});
    const [userPassword, setStatePassword] = useState({});

    async function signUp() {
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(userEmail.toString(), userPassword.toString())
                .then();
            const user = firebase.auth().currentUser;
            await user.sendEmailVerification();
            alert("Мы отправили письмо с подтверждением Вам на электронную почту:" + userEmail)
            navigation.navigate('EmailAuthorize')
        } catch (error) {
            console.log(error.toString());
            switch (error.code) {
                case 'auth/email-already-in-use': {
                    alert('Пользователь уже зарегистрирован')
                    break
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
                <Button full rounded success style={{marginTop: 20}}
                        onPress={() => signUp(setStateEmail, setStatePassword)}>
                    <Text>Создать аккаунт</Text>
                </Button>
            </Form>
        </Container>
    );
}

export default CreateAccount