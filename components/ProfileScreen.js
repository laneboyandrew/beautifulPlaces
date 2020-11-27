import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, View, ActivityIndicator, StatusBar, SafeAreaView, Share} from "react-native";
import * as AuthSession from "expo-auth-session";
import Location from "./Location";
import {useTheme} from "@react-navigation/native";
import {Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfileScreen = (navigation) => {
    const share = async () => {
        try {
            const ShareResponse = await Share.share({
                message: 'Не знаешь куда поехать и что посмотреть? Самые красивые места твоего региона уже собраны в этом приложении с подробным описанием',
            })
            console.log(ShareResponse)
        } catch (error) {
            console.log('error', error)
        }
    }
    const {colors} = useTheme();
    const theme = useTheme();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image
                        source={{
                            uri: 'https://sun9-32.userapi.com/impf/kTk9E0vGbLjtK4O1ZUSdyhZub821cNjWyZhFEA/PXRqPu6eO84.jpg?size=960x960&quality=96&proxy=1&sign=860c5fa26d4feda51ec0fd9276bfd7b6'
                        }}
                        size={80}/>

                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {marginTop: 15, marginBottom: 5}]}>
                            Andrey Grach
                        </Title>
                        <Caption style={styles.caption}>
                            @laneboyandrew
                        </Caption>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20}/>
                    <Text style={{color: "#777777", marginLeft: 20}}>Moscow, Russia</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20}/>
                    <Text style={{color: "#777777", marginLeft: 20}}> 7 977 799 79 82 </Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20}/>
                    <Text style={{color: "#777777", marginLeft: 20}}>andrejgrach@icloud.com</Text>
                </View>

                <View style={styles.infoBoxWrapper}>
                    <View style={[styles.infoBox, {borderRightColor: '#dddddd', borderRightWidth: 1}]}>
                        <Title> 0 </Title>
                        <Caption> Мест в избранных </Caption>
                    </View>
                    <View style={styles.infoBox}>
                        <Title> 0 </Title>
                        <Caption> Отзывов о местах </Caption>
                    </View>
                </View>
            </View>
            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => {
                }}>
                    <View style={styles.menuItem}>
                        <Icon name="map-marker-plus" color="red" size={25}/>
                        <Text style={[styles.menuItemText, {color: 'red'}]}>Предложить место</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {
                }}>
                    <View style={styles.menuItem}>
                        <Icon name="map-marker-distance" color="#777777" size={25}/>
                        <Text style={styles.menuItemText}>Сменить регион</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={share}>
                    <View style={styles.menuItem}>
                        <Icon name="share-outline" color="#777777" size={25}/>
                        <Text style={styles.menuItemText}>Рассказать друзьям</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {
                }}>
                    <View style={styles.menuItem}>
                        <Icon name="account-check-outline" color="#777777" size={25}/>
                        <Text style={styles.menuItemText}>Поддержка</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {
                }}>
                    <View style={styles.menuItem}>
                        <Icon name="settings-outline" color="#777777" size={25}/>
                        <Text style={styles.menuItemText}>Настройки</Text>
                    </View>
                </TouchableRipple>
            </View>
            {/*<StatusBar barStyle={"light-content" }/>*/}
            {/*<Text style={{color: colors.text}}> Here we go to Profile </Text>*/}
        </SafeAreaView>
    )
}
export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
