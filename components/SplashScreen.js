import React from 'react';
import {LinearGradient} from "expo-linear-gradient/build/LinearGradient";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground,
    Animated
} from 'react-native';
import {useTheme} from "@react-navigation/native";
import CachedImage from "react-native-expo-cached-image";


const {height} = Dimensions.get("screen");


const height_logo = height * 0.28

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo,


    },
    image: {
        flex: 1,
        position: 'absolute',
        resizeMode: "cover",
        justifyContent: "center",
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,



    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row',
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
})

const SplashScreen = ({navigation, props}) => {

    const { colors } = useTheme()
    return (
        <View style={styles.container}>
            <Animated.View style={styles.header}>
                <CachedImage
                    isBackground
                    source={{uri : "https://formedfromlight.com/wp-content/uploads/2019/06/pexels-photo-691668-1920x1280.jpeg"}} style={styles.image}/>
            <Animatable.Image
                animation="bounceIn"
                duration={1500}
                delay={0}
                source={require('../assets/images/Vector46.png')}
                style={styles.logo}
                resizeMode="stretch"
            />

            </Animated.View>
            <View style={styles.footer}>
            <Animatable.Text  style={styles.text}>️Добавляйте в избранное места, которые Вам понравились!️{"\n"}</Animatable.Text>

            <Text style={styles.text}>Общайтесь с другими путешественниками и посещайте красивые места вместе!{"\n"}</Text>
                <View style={styles.button}>
                <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                    <LinearGradient colors={['gray', 'black']}
                    style={styles.signIn}>
                        <Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.textSign}> Начать </Text>
                        <MaterialIcons
                            name="navigate-next"
                            color="#fff"
                            size={20}
                        />
                    </LinearGradient>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default SplashScreen;

