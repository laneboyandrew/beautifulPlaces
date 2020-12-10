import React, {useState, useEffect} from 'react';

import MapView, {Marker, Callout} from 'react-native-maps';
import {
    ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View, Image, TextInput, Animated, TouchableOpacity,
    Platform, StatusBar, Button
} from 'react-native';

import TabView from "teaset/components/TabView/TabView";
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import {ScrollView, useWindowDimensions} from "react-native";
import HTML from "react-native-render-html";
import WebView from "react-native-webview";
import ProfileScreen from "./ProfileScreen";
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import {createStackNavigator} from "@react-navigation/stack";
import {markers, mapNightStyle, mapStandardStyle} from "./mapData";
import {PROVIDER_GOOGLE} from 'react-native-maps';
import {useTheme} from '@react-navigation/native';
import StarRating from './StarRating'
import BottomSheet from "reanimated-bottom-sheet";
import { SliderBox } from "react-native-image-slider-box";
// import StarRating from '/components/StarRating'
import {Animated as ReanimatedAnimated} from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from "react-native-paper/src/components/Modal";
import RCTInputAccessoryViewNativeComponent
    from "react-native/Libraries/Components/TextInput/RCTInputAccessoryViewNativeComponent";

const {width, height} = Dimensions.get("window")
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const IMAGE_SIZE = 200
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
            // paddingHorizontal: 50,
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
            paddingBottom: Platform.OS === 'android' ? 20 : 10
        },
        cardtitle: {
            fontSize: 12,
            marginTop: 5,
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
        },
        search: {
            borderColor: 'gray',
            borderWidth: StyleSheet.hairlineWidth,
            height: 40,
            borderRadius: 10,
            paddingHorizontal: 15,
        },
        containerBS: {
            flex: 1,
            backgroundColor: '#F5FCFF',
        },
        box: {
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
        },
        panelContainer: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
        panel: {
            height: 600,
            padding: 20,
            backgroundColor: '#f7f5eee8',
        },
        header: {
            backgroundColor: '#f7f5eee8',
            shadowColor: '#000000',
            paddingTop: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        },
        panelHeader: {
            alignItems: 'center',
        },
        panelHandle: {
            width: 40,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#00000040',
            marginBottom: 10,
        },
        panelTitle: {
            fontSize: 27,
            height: 35,
        },
        panelSubtitle: {
            fontSize: 14,
            color: 'gray',
            height: 30,
            marginBottom: 10,
        },
        panelButton: {
            padding: 20,
            borderRadius: 10,
            backgroundColor: '#318bfb',
            alignItems: 'center',
            marginVertical: 10,
        },
        panelButtonTitle: {
            fontSize: 17,
            fontWeight: 'bold',
            color: 'white',
        },
        photo: {
            width: '100%',
            height: 225,
            marginTop: 30,
        },
        map: {
            height: '100%',
            width: '100%',
        },
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
            latitude: 45.957813,
            longitude: 34.5,
            latitudeDelta: 1,
            longitudeDelta: 4.5
        }
    }

    const [state, setState] = React.useState(initialMapState);
    const [currentMarker, setCurrentMarker] = React.useState(initialMapState.markers[0])

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    )

    const renderInner = () => (
                <View style={styles.panel}>
                    <Text style={styles.panelTitle}>{currentMarker.title}</Text>
                    {/*<Text style={styles.panelSubtitle}>{currentMarker.description}</Text>*/}
                    <View style={{
                        marginBottom: 10,
                        marginLeft: -15,
                    }}>
                    <SliderBox
                        images={currentMarker.images}
                        useScrollView
                        sliderBoxHeight={400}
                        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                        dotColor="#FFEE58"
                        inactiveDotColor="#90A4AE"
                        dotStyle={{
                            width: 15,
                            height: 15,
                            borderRadius: 15,
                            marginHorizontal: 10,
                            padding: 0,
                            margin: 0,
                        }}
                        resizeMode={'contain'}
                        ImageComponentStyle={{borderRadius: 15, width: '100%'}}
                        underlayColor="transparent"
                        imageLoadingColor='blue'
                    />

                    </View>
                    <View style={{marginTop: 10}}>
                        <Text> <Icon name='map-marker'/>{currentMarker.coordinate.latitude}, {currentMarker.coordinate.longitude}</Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <StarRating ratings={currentMarker.rating} reviews={currentMarker.reviews}/>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('DetailsScreen', {currentMarker: currentMarker})
                            }}
                            style={[styles.signIn, {
                                borderColor: '#FF6347',
                                borderWidth: 1
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#FF6347'
                            }]}>Подробнее</Text>
                        </TouchableOpacity>
                    </View>
                </View>
    )

    const func1 = () => {bs.current.snapTo(0)}
    const func2 = (markerData) => {setCurrentMarker(markerData)}
    const onMarkerPress = (markerData) => {func1(); func2(markerData)}

    const _map = React.useRef(null);
    const bs = React.createRef();
    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                initialRegion={state.region}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
                customMapStyle={theme.dark ? mapNightStyle : mapStandardStyle}
            >
                {state.markers.map((marker, index) => {

                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={marker.coordinate}
                            onPress={
                                () => onMarkerPress(marker)
                            }>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../assets/markers/marker.jpeg')}
                                    style={[styles.marker]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </MapView.Marker>
                    );
                })}
            </MapView>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{flex: 1, padding: 0}}
                />
                <IonIcons name="ios-search" size={20}/>
            </View>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}
                contentInset={{ // iOS only
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

            <BottomSheet ref={bs}
                         snapPoints={[500, 250, 0]}
                         enabledContentGestureInteraction={false}
                         // borderRadius={10}
                         renderContent={renderInner}
                         renderHeader={renderHeader}
                         initialSnap={2}
            />

        </View>
    );
};

export default Map;

