import React from 'react';
import LinearGradient from "expo-linear-gradient/build/LinearGradient";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

import {
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    Button,
    StyleSheet,
    Platform,
    TextInput,
    StatusBar
} from 'react-native';

const SignUpScreen = ({navigation}) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirmSecureTextEntry: true
    })

    const textInputChange = (val) => {
        if (val.includes('@')) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            })
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            })
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        })
    }
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirmPassword: val
        })
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirmSecureTextEntry: !data.confirmSecureTextEntry
        })
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>
                    Регистрация
                </Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.text_footer}>
                    Email
                </Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Ваш Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.Text animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            /> </Animatable.Text> : null}
                </View>
                <Text style={[styles.text_footer, {marginTop: 35}]}>Пароль</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput placeholder="Ваш пароль"
                               secureTextEntry={data.secureTextEntry ? true : false}
                               style={styles.textInput}
                               autoCapitalize="none"
                               onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <Text style={[styles.text_footer, {marginTop: 35}]}>Подтвердите пароль</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput placeholder="Введите пароль ещё раз"
                               secureTextEntry={data.secureTextEntry ? true : false}
                               style={styles.textInput}
                               autoCapitalize="none"
                               onChangeText={(val) => handleConfirmPasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <LinearGradient colors={['black', 'grey']} style={styles.signIn}>
                        <Text style={[styles.textSign, {color: '#fff'}]}> Зарегистрироваться </Text>
                    </LinearGradient>

                    <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}
                                      style={[styles.signIn, {borderColor: 'grey', borderWidth: 1, marginTop: 15}]}>
                        <Text style={[styles.textSign, {
                            color: 'grey'
                        }]} > Войти </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});