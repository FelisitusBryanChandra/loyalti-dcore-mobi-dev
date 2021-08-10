import React from 'react';
import { ImageBackground, Image, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SText, STextBold } from './CustomText'

import loyaltiLogo from '../Assets/drawable-xhdpi/loyalti_logo.jpg';
import imageEdit from '../Assets/drawable-xhdpi/icon_edit.png';
import camera from '../Assets/drawable-xhdpi/take_photo_camera.png';
import editBackground from '../Assets/drawable-xhdpi/edit_background.png';
import backgroundLoyalti from '../Assets/drawable-xhdpi/defaultBackground_loyalti.png';
import PhotoUpload from 'react-native-photo-upload';

export const BackgroundAndImages = ({ name, phone, editProfile, onEditPress, onSelectPhoto, onselectBackground, profile, background }) => {
    return (
        <ImageBackground
            source={background == null ? backgroundLoyalti : background}
            style={styles.backgroundStyle}>
            <View>
                <Image
                    style={styles.imageContainerStyle}
                    resizeMode='cover'
                    source={profile == null ? loyaltiLogo : profile} />
                {!editProfile ? null :
                    <TouchableOpacity
                        style={styles.imageCameraContainerStyle}
                        onPress={onSelectPhoto}>
                        <Image
                            style={styles.imageCameraStyle}
                            resizeMode='cover'
                            source={camera} />
                    </TouchableOpacity>
                }
            </View>
            {!editProfile ? <View style={styles.containerTextStyle}>
                <STextBold style={[styles.textStyle, { marginLeft: 20 }]}>{name}</STextBold>
                <TouchableWithoutFeedback onPress={onEditPress}>
                    <Image style={styles.imageEditStyle} source={imageEdit} />
                </TouchableWithoutFeedback>

            </View> : null}
            {!editProfile ? <SText style={[styles.textStyle]}>{phone}</SText> : null}
            {!editProfile ? null : <TouchableOpacity style={styles.imageEditBackgroundContainerStyle}
                onPress={onselectBackground}>
                <Image style={styles.imageEditBackgroundStyle} source={editBackground} />
            </TouchableOpacity>}
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    textStyle: {
        color: "white",
        fontSize: 16
    },
    containerTextStyle: {
        flexDirection: "row",
        marginTop: hp(2),
    },
    imageEditStyle: {
        marginLeft: 15,
        marginTop: 5,
        width: 15,
        height: 15
    },
    imageContainerStyle: {
        width: hp(12.5),
        height: hp(12.5),
        borderRadius: 75,
    },
    imageCameraContainerStyle: {
        borderRadius: 75,
        position: 'absolute',
        marginLeft: hp(8.5),
        marginTop: hp(9)
    },
    imageCameraStyle: {
        width: hp(4),
        height: hp(4)
    },
    imageEditBackgroundStyle: {
        width: hp(2),
        height: hp(2)
    },
    imageEditBackgroundContainerStyle: {
        position: 'absolute',
        bottom: hp(1.5),
        right: hp(1.5),
    },
    backgroundStyle: {
        width: wp('100%'),
        height: hp('25%'),
        justifyContent: 'center',
        alignItems: 'center'
    }
})