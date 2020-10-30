import React, {useState, useEffect} from 'react';
import Map from "./Map";
import Icon from "react-native-vector-icons/Ionicons";
import Profile from "./Profile";
import {createStackNavigator} from "@react-navigation/stack";
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ChatScreen from "./ChatScreen";
import TuroperatorsScreen from "./TuropeartorsScreen";

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Map"
        activeColor="#fff"
        style={{ backgroundColor: '#009387' }}
    >
        <Tab.Screen
            name="Map"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Карта',
                tabBarColor: 'black',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-map" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
                tabBarLabel: 'Профиль',
                tabBarColor: 'black',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-person" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{
                tabBarLabel: 'Чат',
                tabBarColor: 'black',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-keypad" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Turoperators"
            component={TuroperatorsScreen}
            options={{
                tabBarLabel: 'Туроператоры',
                tabBarColor: 'black',

                tabBarIcon: ({ color }) => (
                    <Icon name="ios-aperture" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default MainTabScreen;
const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'black',
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen
            name="Map"
            component={Map}
            options={{
                title: "Карта",
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor="black" onPress={() => {navigation.openDrawer()}}>

                    </Icon.Button>
                )
            }}
        />
    </HomeStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'black',
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ProfileStack.Screen
            name="Profile"
            component={Profile}
            options={{
                title: "Профиль",
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor="black" onPress={() => {navigation.openDrawer()}}>

                    </Icon.Button>
                )
            }}
        />
    </ProfileStack.Navigator>
);