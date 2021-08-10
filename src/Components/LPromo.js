import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native'
import { SText } from './CustomText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AirbnbRating } from 'react-native-ratings';
import { LButton } from './CustomButton';

const styles = StyleSheet.create({
    button1: {
        height: hp('6%'),
        borderWidth: 1,
        borderColor: "#2096f3",
        backgroundColor: "#fff",
        borderRadius: 5,
        width: wp('30%'),
        marginRight: wp('1.5%')
    },
    textButton1: {
        height: hp('5.5%'),
        fontSize: 14,
        color: "#2096f3",
        textAlign: "center",
        textAlignVertical: "center"
    },
    button2: {
        height: hp('6%'),
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#2096f3",
        borderRadius: 5,
        width: wp('30%'),
        marginHorizontal: wp('1.5%')
    },
    textButton2: {
        height: hp('5.5%'),
        fontSize: 14,
        color: '#fff',
        textAlign: "center",
        textAlignVertical: "center"
    },
})

export const LPromo = (props) => (
    <View style={{
        marginHorizontal: wp('4%'),
        height: hp('20%'),
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        margin: 7
    }}>
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={props.onPress }
        >
            <View style={{ flexDirection: 'row', marginTop: hp('1.5%'), marginHorizontal: wp('3%') }}>
                <View>
                    <Image
                        source={props.img}
                        style={{ width: wp('34.5%'), height: hp('17%'), borderRadius: 3 }}>
                    </Image>
                </View>
                <View
                    style={{ marginLeft: wp('4%'), flex: 1 }}>
                    <SText style={{ fontSize: 18 }}>{props.merchantName}</SText>
                    <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                        <SText style={{ fontSize: 10 }}>Valid from</SText>
                        <SText style={{ marginHorizontal: wp('0.5%'), fontSize: 10, fontWeight: 'bold' }}>{props.validFrom}</SText>
                        <SText style={{ fontSize: 10 }}>to</SText>
                        <SText style={{ marginHorizontal: wp('0.5%'), fontSize: 10, fontWeight: 'bold' }}>{props.validUntil}</SText>
                    </View>
                    <AirbnbRating
                        count={5}
                        defaultRating={0}
                        size={12}
                        showRating={false}
                        isDisabled={true}
                        selectedColor='#505050'
                        starContainerStyle={{ alignSelf: 'flex-start', marginTop: hp('1%') }}
                    />
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <LButton
                            style={{ backgroundColor: '#2096f3', width: wp('25%'), borderRadius: 5 }}
                            text="JOIN PROMO"
                            textStyle={{ fontSize: 12, color: '#fff', alignSelf: 'center', paddingVertical: hp('1%') }}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    </View>
)

export const LStoreLocation = (props) => (
    <View style={{
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%'),
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5
    }}>
        <SText>{props.merchantName}</SText>
        <SText>{props.address}</SText>
        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
            <SText>Phone</SText>
            <SText style={{ marginLeft: wp('20%') }}>: {props.phone}</SText>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <SText>Operation Hours</SText>
            <SText style={{ marginLeft: wp('2%') }}>: {props.hours}</SText>
        </View>
        <View style={{ flexDirection: 'row', marginTop: hp('2%') }}>
            <Image
                source={require('../Assets/drawable-xhdpi/pin.png')}
                style={{ height: 18, width: 12, marginRight: wp('3%') }}
            ></Image>
            <SText>{props.distance} KM</SText>
        </View>
        <View style={{ flexDirection: 'row', marginTop: hp('2%') }}>
            <LButton
                style={styles.button1}
                textStyle={styles.textButton1}
                // text={props.button1text}
                text="VIEW MAPS"
                onPress={props.button1press}>
            </LButton>
            <LButton
                style={styles.button2}
                textStyle={styles.textButton2}
                // text={props.button2text}
                text="CALL"
                onPress={props.button2press}
            />
        </View>
    </View>
)