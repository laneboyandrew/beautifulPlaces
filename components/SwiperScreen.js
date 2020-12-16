import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Dimensions,
    Animated,
    Image,
    PanResponder,
    Platform
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import {markers, mapNightStyle, mapStandardStyle} from "./mapData";
import {SliderBox} from "react-native-image-slider-box";

const initialSwiperState = {markers}

export default class Swiper extends React.Component {

    constructor() {
        super()

        this.position = new Animated.ValueXY()
        this.state = {
            currentIndex: 0
        }

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
            transform: [{
                rotate: this.rotate
            },
                ...this.position.getTranslateTransform()
            ]
        }

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })

        this.dislikeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })

        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp'
        })
    }

    UNSAFE_componentWillMount() {
        this.PanResponder = PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                this.position.setValue({x: gestureState.dx, y: gestureState.dy})
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 120) {
                    Animated.spring(this.position, {
                        useNativeDriver: true,
                        toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy},
                    }).start(() => {
                        this.setState({currentIndex: this.state.currentIndex + 1}, () => {
                            this.position.setValue({x: 0, y: 0})
                        })
                    })
                } else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                        useNativeDriver: true,
                        toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
                    }).start(() => {
                        this.setState({currentIndex: this.state.currentIndex + 1}, () => {
                            this.position.setValue({x: 0, y: 0})
                        })
                    })
                } else {
                    Animated.spring(this.position, {
                        useNativeDriver: true,
                        toValue: {x: 0, y: 0},
                        friction: 4
                    }).start()
                }
            }
        })
    }

    renderUsers = () => {

        return markers.map((marker, index) => {
            if (index < this.state.currentIndex || index - this.state.currentIndex > 1) {
                return null
            }
            if (index < this.state.currentIndex) {
                return null
            } else if (index == this.state.currentIndex) {
                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={index} style={[this.rotateAndTranslate, {
                        height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH,
                        padding: 10, position: 'absolute'
                    }]}>
                        <Animated.View style={{
                            opacity: this.likeOpacity,
                            transform: [{rotate: '-30deg'}],
                            position: 'absolute',
                            top: 50,
                            left: 40,
                            zIndex: 1000
                        }}>
                            <Text style={{
                                borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800',
                                padding: 10
                            }}>
                                LIKE
                            </Text>
                        </Animated.View>

                        <Animated.View style={{
                            opacity: this.dislikeOpacity,
                            transform: [{rotate: '30deg'}],
                            position: 'absolute',
                            top: 50,
                            right: 40,
                            zIndex: 1000
                        }}>
                            <Text style={{
                                borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800',
                                padding: 10
                            }}>
                                NOPE
                            </Text>
                        </Animated.View>
                        <SliderBox
                            images={marker.images}
                            useScrollView
                            sliderBoxHeight={400}
                            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                            dotColor="#FFEE58"
                            inactiveDotColor="#90A4AE"
                            dotStyle={{
                                width: 54,
                                height: 6,
                                // borderRadius: 15,
                                marginHorizontal: -5,
                                position: 'relative',
                                marginLeft: 7,
                                marginBottom: -3,
                                padding: 0

                            }}
                            resizeMode={'contain'}
                            ImageComponentStyle={{borderRadius: 15, width: '100%', height: '100%'}}
                            // underlayColor="transparent"
                            imageLoadingColor='blue'
                            disableOnPress={true}
                        />

                    </Animated.View>
                )
            } else {
                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={index} style={[{
                        opacity: this.nextCardOpacity,
                        transform: [{scale: this.nextCardScale}],
                        height: SCREEN_HEIGHT - 120,
                        width: SCREEN_WIDTH,
                        padding: 10,
                        position: 'absolute'
                    }]}>

                        <SliderBox
                            images={marker.images[0]}
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

                    </Animated.View>
                )
            }
        }).reverse()
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{height: 30}}>

                </View>
                <View style={{flex: 1}}>
                    {this.renderUsers()}
                </View>
                <View style={{height: 60}}>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});