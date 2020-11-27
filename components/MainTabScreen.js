import React, {useState, useEffect} from 'react';
import Map from "./Map";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileScreen from "./ProfileScreen";
import {createStackNavigator} from "@react-navigation/stack";

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ChatScreen from "./ChatScreen";
import TuroperatorsScreen from "./TuropeartorsScreen";
import EditProfileScreen from "./EditProfileScreen";

import {useTheme} from 'react-native-paper'

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Map"
        activeColor="#fff"
        style={{backgroundColor: '#009387'}}
    >
        <Tab.Screen
            name="Map"
            component={Map}
            options={{
                tabBarLabel: 'Карта',
                tabBarColor: 'black',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-map" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
                tabBarLabel: 'Профиль',
                tabBarColor: 'black',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-person" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{
                tabBarLabel: 'Чат',
                tabBarColor: 'black',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-keypad" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="Turoperators"
            component={TuroperatorsScreen}
            options={{
                tabBarLabel: 'Туроператоры',
                tabBarColor: 'black',

                tabBarIcon: ({color}) => (
                    <Icon name="ios-aperture" color={color} size={26}/>
                ),
            }}
        />
    </Tab.Navigator>
);

export default MainTabScreen;
// const HomeStackScreen = ({navigation}) => (
//     <HomeStack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: 'black',
//         },
//         headerTintColor: "#fff",
//         headerTitleStyle: {
//             fontWeight: 'bold'
//         }
//     }}>
//         <HomeStack.Screen
//             name="Map"
//             component={Map}
//             options={{
//                 title: "Карта",
//                 headerTransparent: true,
//                 headerLeft: () => (
//                     <Icon.Button name="ios-menu" size={25} backgroundColor="black" onPress={() => {navigation.openDrawer()}}>
//
//                     </Icon.Button>
//                 )
//             }}
//         />
//     </HomeStack.Navigator>
// );
// Если хотим юзать с верхней шторкой - создаём тут компоненту и потом юзаем её в там навигаторе
const ProfileStackScreen = ({navigation}) => {
    const {colors} = useTheme();

    return (
        <ProfileStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.background,
                shadowColor: colors.background,
                elevation: 0
            },
            headerTintColor: colors.text,
        }}>
            <ProfileStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: "",
                    headerLeft: () => (
                        <Icon.Button name="ios-menu"
                                     size={25}
                                     backgroundColor={colors.background}
                                     color={colors.text}
                                     onPress={() => {
                                         navigation.openDrawer()
                                     }}
                        />
                    ),
                    headerRight: () => (
                        <MaterialCommunityIcons.Button
                            name="account-edit"
                            size={25}
                            backgroundColor={colors.background}
                            color={colors.text}
                            onPress={() => {
                                navigation.navigate('EditProfile')
                            }}
                        />
                    )
                }}
            />
            <ProfileStack.Screen name="EditProfile"
                                 options={{
                                     title: 'Edit Profile'
                                 }}
                                 component={EditProfileScreen}
            />
        </ProfileStack.Navigator>
    )
}