import React, {useState, useEffect} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    StyleSheet,
    View,
    Image,
    TextInput,
    Animated,
    TouchableOpacity,
    Platform,

} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DrawerSection from "react-native-paper/src/components/Drawer/DrawerSection";
import {AuthContext} from "./context";

export function DrawerContent(props) {

    const paperTheme = useTheme()
    const { signOut, toggleTheme } = React.useContext(AuthContext)

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView{...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://sun1-28.userapi.com/impg/kTk9E0vGbLjtK4O1ZUSdyhZub821cNjWyZhFEA/PXRqPu6eO84.jpg?size=400x0&quality=90&crop=160,92,628,868&sign=98e44ed7ad064b4758c6ac0e953052ea&c_uniq_tag=Q0yxgpK23UzdIYs6ieCwCS2eWhrdTQilSv9gKHi5Lh4&ava=1'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}> Andrey Grach </Title>
                                <Caption style={styles.caption}> @laneboyandrew </Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        {/*<DrawerItem*/}
                        {/*    icon={({color, size}) => (*/}
                        {/*        <Icon*/}
                        {/*            name="login"*/}
                        {/*            color={color}*/}
                        {/*            size={size}*/}
                        {/*        />*/}
                        {/*    )}*/}
                        {/*    label="Войти"*/}

                        {/*    onPress={() => {}}*/}
                        {/*/>*/}
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="message-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Мессенджер"
                            onPress={() => {props.navigation.navigate('ChatScreen')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="bookmark-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Избранное"
                            onPress={() => {props.navigation.navigate('FavouritesScreen')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="settings-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Настройки"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="account-check-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Поддержка"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Дополнительно">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                               <Text>Тёмная тема</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="logout"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Выйти"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})