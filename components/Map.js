import React, {useState, useEffect} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import {
    ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View, Image, TextInput, Animated, TouchableOpacity,
    Platform, StatusBar
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import {ScrollView, useWindowDimensions} from "react-native";
import HTML from "react-native-render-html";
import WebView from "react-native-webview";
import Profile from "./Profile";
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import {createStackNavigator} from "@react-navigation/stack";
import {markers, mapNightStyle, mapStandardStyle} from "./mapData";
import {PROVIDER_GOOGLE} from 'react-native-maps';
import {useTheme} from '@react-navigation/native';
// import StarRating from '/components/StarRating'


const {width, height} = Dimensions.get("window")
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * -0.1 - 10;
const Map = ({navigation, props}) => {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        searchBox: {
            position: 'absolute',
            marginTop: Platform.OS === 'ios' ? 40 : 20,
            flexDirection: "row",
            backgroundColor: '#fff',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 5,
            padding: 10,
            shadowColor: '#ccc',
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 10,
        },
        chipsScrollView: {
            position: 'absolute',
            top: Platform.OS === 'ios' ? 90 : 80,
            paddingHorizontal: 10
        },
        chipsIcon: {
            marginRight: 5,
        },
        chipsItem: {
            flexDirection: "row",
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: 8,
            paddingHorizontal: 20,
            marginHorizontal: 10,
            height: 35,
            shadowColor: '#ccc',
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 10,
        },
        scrollView: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingVertical: 10,
        },
        endPadding: {
            paddingRight: width - CARD_WIDTH,
        },
        card: {
            // padding: 10,
            elevation: 2,
            backgroundColor: "#FFF",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            marginHorizontal: 10,
            shadowColor: "#000",
            shadowRadius: 5,
            shadowOpacity: 0.3,
            shadowOffset: {x: 2, y: -2},
            height: CARD_HEIGHT,
            width: CARD_WIDTH,
            overflow: "hidden",
        },
        cardImage: {
            flex: 3,
            width: "100%",
            height: "100%",
            alignSelf: "center",
        },
        textContent: {
            flex: 2,
            padding: 10,
        },
        cardtitle: {
            fontSize: 12,
            // marginTop: 5,
            fontWeight: "bold",
        },
        cardDescription: {
            fontSize: 12,
            color: "#444",
        },
        markerWrap: {
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
        },
        marker: {
            width: 30,
            height: 30,
        },
        button: {
            alignItems: 'center',
            marginTop: 5
        },
        signIn: {
            width: '100%',
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3
        },
        textSign: {
            fontSize: 14,
            fontWeight: 'bold'
        }
    });

    const {colors} = useTheme();
    const theme = useTheme();
    const initialMapState = {
        markers,
        categories: [
            {
                name: 'Горы',
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food" size={18}/>
            },
            {
                name: 'Горы',
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food" size={18}/>
            },
            {
                name: 'Горы',
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food" size={18}/>
            },
            {
                name: 'Горы',
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food" size={18}/>
            },
            {
                name: 'Горы',
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food" size={18}/>
            },
            {
                name: 'Горы',
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food" size={18}/>
            },
        ],
        region: {
            latitude: 22.62938671242907,
            longitude: 88.4354486029795,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068
        }
    }

    const [state, setState] = React.useState(initialMapState)

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);

    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"}/>
            <MapView
                ref={_map}
                initialRegion={state.region}
                provider={PROVIDER_GOOGLE}
                style={styles.container}
                customMapStyle={theme.dark ? mapNightStyle : mapStandardStyle}
            >
                {state.markers.map((marker, index) => {
                    return (
                        <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../assets/markers/marker.jpeg')}
                                    style={[styles.marker]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </MapView.Marker>
                            )
                            })}
                            {/*<Marker*/}
                            {/*    coordinate={{*/}
                            {/*        latitude: 37.78825,*/}
                            {/*        longitude: -122.4324,*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <Callout tooltip>*/}
                            {/*        <View>*/}
                            {/*            <View style={styles.bubble}>*/}
                            {/*                <Text style={styles.name}> Beautiful place </Text>*/}
                            {/*                <Text> A short description for some place </Text>*/}
                            {/*                <Text> <Image style={styles.image}*/}
                            {/*                              source={require('../assets/images/zvezdopad.jpg')}/>*/}
                            {/*                </Text>*/}
                            {/*            </View>*/}
                            {/*            <View style={styles.arrowBorder}/>*/}
                            {/*            <View style={styles.arrow}/>*/}
                            {/*        </View>*/}
                            {/*    </Callout>*/}
                            {/*</Marker>*/}
                        </MapView>
                    <View style={styles.searchBox}>
                        <TextInput
                            placeholder="Найти место"
                            placeholderTextColor="#000"
                            autoCapitalize="none"
                            style={{flex: 1, padding: 0}}
                        />
                        <IonIcons name="ios-search" size={20} />
                    </View>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}
                contentInset={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                }}
            >
                {state.categories.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.chipsItem}>
                        {category.icon}
                        <Text>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {/*<Animated.ScrollView*/}
            {/*    horizontal*/}
            {/*    scrollEventThrottle={1}*/}
            {/*    showHorizontalScrollIndicator={false}*/}
            {/*>*/}
            {/*    {state.markers.map((marker, index) => (*/}
            {/*        <View style={styles.card} key={index}>*/}
            {/*            <Image*/}
            {/*                source={marker.image}*/}
            {/*                style={styles.cardImage}*/}
            {/*                resizeMode="cover"*/}
            {/*            />*/}
            {/*            <View style={styles.textContent}>*/}
            {/*                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>*/}
            {/*                <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    ))}*/}
            {/*</Animated.ScrollView>*/}
                </View>
                )
                }
                export default Map