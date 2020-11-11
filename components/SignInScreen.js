import React from 'react';
import LinearGradient from "expo-linear-gradient/build/LinearGradient";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import {AuthContext} from "./context";

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

const SignInScreen = ({navigation}) => {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true
    })

    const {signIn} = React.useContext(AuthContext)

    const textInputChange = (val) => {
        if (val.includes('@')) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            })
        } else {
            setData({
                ...data,
                username: val,
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

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const handleValidUser = (val) => {
        if (val.includes('@')) {
            setData({
                ...data,
                isValidUser: true
            })
        } else {
            setData({
                ...data,
                isValidUser: false
            })
        }
    }

    const loginHandle = (username, password) => {
        signIn(username, password);
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>
                    Добро пожаловать!
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
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.Text animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            /> </Animatable.Text> : null}
                </View>

                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}> Пожалуйста, введите корректный Email</Text>
                    </Animatable.View>
                }

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

                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}> Пароль введён неверно</Text>
                    </Animatable.View>
                }

                <TouchableOpacity>
                    <Text style={{color: 'grey', marginTop: 15}}> Забыли пароль? </Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={() => {
                        loginHandle(data.username, data.password)
                    }}>
                        <LinearGradient colors={['black', 'grey']} style={styles.signIn}>
                            <Text style={[styles.textSign, {color: '#fff'}]}> Войти </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}
                                      style={[styles.signIn, {borderColor: 'grey', borderWidth: 1, marginTop: 15}]}>
                        <Text style={[styles.textSign, {
                            color: 'grey'
                        }]}> Зарегистрироваться </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

export default SignInScreen;

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