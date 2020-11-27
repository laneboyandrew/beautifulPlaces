import React, {useState, useEffect} from 'react'
import {View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import {useTheme} from 'react-native-paper'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import * as ImagePicker from 'expo-image-picker';




const EditProfileScreen = () => {

    const [image, setImage] = useState('https://sun1-28.userapi.com/impg/kTk9E0vGbLjtK4O1ZUSdyhZub821cNjWyZhFEA/PXRqPu6eO84.jpg?size=200x0&quality=96&crop=160,92,628,868&sign=34493b61a3b05688f9bec573de48ae87&ava=1')
    const {colors} = useTheme()
    const getPhotoFromCameraRoll = async () => {
        let status = await ImagePicker.requestCameraRollPermissionsAsync()
        if (status.status !== 'granted') {
            alert('Grant permissons')
            return
        } else {
            let photo = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            })

            if (!photo.cancelled) {
                setImage(photo.uri)
                bs.current.snapTo(1)
            }
        }
    }

    const takePhoto = async () => {
        let status = await ImagePicker.requestCameraPermissionsAsync()
        console.log(status)
        if (status.status !== 'granted') {
            alert('Grant permissons')
            return
        }
            let photo = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 6],
                quality: 1
            })
            if (!photo.cancelled) {
                setImage(photo.uri)
        }
    }

    const renderInner = () => (
        <View style={[styles.panel, {color: colors}]}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}> Загрузить фотографию </Text>
                <Text style={styles.panelSubtitle}> Выберите фотографию для своего профиля </Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={takePhoto}>
                <Text style={styles.panelButtonTitle}> Сделать фотографию </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={getPhotoFromCameraRoll}>
                <Text style={styles.panelButtonTitle}> Выбрать из галлереи </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}> Готово </Text>
            </TouchableOpacity>
        </View>

    )

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}/>
            </View>
        </View>
    )

    const bs = React.createRef();
    const fall = new Animated.Value(1);
    return (
        <View style={styles.container}>
            <BottomSheet ref={bs} snapPoints={[330, 0]} renderContent={renderInner} renderHeader={renderHeader}
                         initialSnap={1} callbackNode={fall} enabledFestureInteracraction={true}
                         enabledContentTapInteraction={false}/>
            <Animated.View style={{margin: 20, opacity: Animated.add(0.3, Animated.multiply(fall, 1.0))}}>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {
                        bs.current.snapTo(0)
                    }}>
                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ImageBackground
                                source={{
                                    uri: image
                                }}
                                style={{height: 100, width: 100}}
                                imageStyle={{borderRadius: 15}}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name="camera" size={35} color="white" style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: "#fff",
                                        borderRadius: 10
                                    }}>

                                    </Icon>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={[{marginTop: 10, fontSize: 18, fontWeight: 'bold'}, {color: colors.text}]}>
                        Andrey Grach
                    </Text>
                </View>

                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20}/>
                    <TextInput placeholder="Имя"
                               placeholderTextColor={colors.text}
                               autoCorrect={false}
                               style={[styles.textInput, {
                                   color: colors.text
                               }]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20}/>
                    <TextInput placeholder="Фамилия"
                               placeholderTextColor={colors.text}
                               autoCorrect={false}
                               style={[styles.textInput, {
                                   color: colors.text
                               }]
                               }
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="phone" color={colors.text} size={20}/>
                    <TextInput placeholder="Телефон"
                               placeholderTextColor={colors.text}
                               keyboardType='number-pad'
                               autoCorrect={false}
                               style={[styles.textInput, {
                                   color: colors.text
                               }]
                               }
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="envelope-o" color={colors.text} size={20}/>
                    <TextInput placeholder="Email"
                               placeholderTextColor={colors.text}
                               keyboardType='email-address'
                               autoCorrect={false}
                               style={[styles.textInput, {
                                   color: colors.text
                               }]
                               }
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="map-marker" color={colors.text} size={20}/>
                    <TextInput placeholder="Город"
                               placeholderTextColor={colors.text}
                               autoCorrect={false}
                               style={[styles.textInput, {
                                   color: colors.text
                               }]
                               }
                    />
                </View>
                <TouchableOpacity style={styles.commandButton} onPress={() => {
                }}>
                    <Text style={styles.panelButtonTitle}> Подтвердить </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}
export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
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
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
});
