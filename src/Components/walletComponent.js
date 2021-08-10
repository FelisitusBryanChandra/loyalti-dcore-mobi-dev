import React, { Component } from 'react'
import { View, ImageBackground, StyleSheet, Image, FlatList } from 'react-native'
import { SText } from './CustomText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProgressBar from 'react-native-progress/Bar'

const styles = StyleSheet.create({
    card: {
        height: hp("35%"),
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 17,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    },
    logo: {
        width: 55,
        height: 30,
        borderRadius: 25,
        marginTop: hp('5%'),
        marginRight: wp('7%')
    },
    nameCard: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: wp('7%'),
        justifyContent: 'space-between'
    },
    stamp: {
        width: wp('14%'),
        height: hp('7%'),
        borderRadius: 75,
        marginTop: hp('1%'),
        marginRight: wp('1%')
    },
    voucherLogo: {
        width: wp('14%'),
        height: hp('7%'),
        borderRadius: 150,
        position: 'absolute',
        top: -hp('1%'),
        right: hp('4%')
    }
})

export const LMemberCard = (props) => (
    <View
        style={styles.card}>
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={props.imgBackground}
                style={{ width: wp('92%'), height: hp('35%') }}
                imageStyle={{ borderRadius: 10 }}>
                <View style={styles.nameCard}>
                    <View style={{ marginTop: hp('4%') }}>
                        <SText style={{ color: 'white' }}>MEMBERSHIP CARD</SText>
                        <SText style={{ color: 'white', fontSize: 12 }}>{props.title}</SText>
                    </View>
                    <Image source={props.logo}
                        style={styles.logo}
                        resizeMode="contain" />
                </View>
            </ImageBackground>
        </View>
        <View style={{ flex: 1, marginTop: hp('5%'), marginHorizontal: wp('7%') }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <SText style={{ fontSize: 28, color: 'white' }}>{props.tierStatus}</SText>
                <View style={{ flexDirection: 'row' }}>
                    <SText style={{ fontSize: 10, textAlignVertical: 'bottom', color: 'white' }}>Valid Until </SText>
                    <SText style={{ fontWeight: 'bold', fontSize: 10, textAlignVertical: 'bottom', color: 'white' }}>{props.validDate}</SText>
                </View>
            </View>
            <ProgressBar progress={props.pointProgress} width={wp('78%')} height={hp('2.7%')} unfilledColor={'#9f9f9f'} borderRadius={15} borderWidth={0} marginVertical={8} color={'white'} />
            <SText
                style={{ alignSelf: 'flex-end', fontSize: 10, color: '#ebebeb', color: 'white' }}>
                You need {props.pointsNeeded} points to reach {props.cardTier}
            </SText>
        </View>
    </View >
)

export const LPointCard = (props) => (
    <View
        style={styles.card}>
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={props.imgBackground}
                style={{ width: wp('92%'), height: hp('35%') }}
                imageStyle={{ borderRadius: 10 }}>
                <View style={styles.nameCard}>
                    <View style={{ marginTop: hp('4%') }}>
                        <SText style={{ color: 'white' }}>POINT CARD</SText>
                        <SText style={{ color: 'white', fontSize: 12 }}>{props.title}</SText>
                    </View>
                    <Image source={props.logo}
                        style={styles.logo}
                        resizeMode="contain" />
                </View>
            </ImageBackground>
        </View>
        <View style={{ flex: 1, marginTop: hp('1%'), marginHorizontal: wp('8%') }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <SText style={{ fontSize: 28, color: 'white' }}>{props.points} Points</SText>
                <View style={{ flexDirection: 'row', marginTop:hp('8%') }}>
                    <SText style={{ fontSize: 10, textAlignVertical: 'bottom', color: 'white' }}>Valid Until </SText>
                    <SText style={{ fontWeight: 'bold', fontSize: 10, textAlignVertical: 'bottom', color: 'white' }}>{props.validDate}</SText>
                </View>
            </View>
            {/* <ProgressBar
                progress={props.pointProgress}
                width={wp('78%')}
                height={hp('2.7%')}
                unfilledColor={'#9f9f9f'}
                borderRadius={15}
                borderWidth={0}
                marginVertical={8}
                color={'white'} /> */}
            <SText
                style={{ alignSelf: 'flex-end', fontSize: 10, color: '#ebebeb', color: 'white', marginTop:hp('0.5%')}}>
                You need {props.pointsNeeded} points to get a prize
            </SText>
        </View>
    </View >
)

export const LChopCard = (props) => (
    <View
        style={styles.card}>
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={props.imgBackground}
                style={{ width: wp('92%'), height: hp('35%') }}
                imageStyle={{ borderRadius: 10 }}>
                <View style={styles.nameCard}>
                    <View style={{ marginTop: hp('4%') }}>
                        <SText style={{ color: 'white' }}>CHOP CARD</SText>
                        <SText style={{ color: 'white', fontSize: 12 }}>{props.title}</SText>
                    </View>
                    <Image source={props.logo}
                        style={styles.logo}
                        resizeMode="contain" />
                </View>
                <View style={{ flex: 3, marginTop: hp('1%'), marginHorizontal: wp('7%') }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <SText style={{ fontSize: 28, color: 'white', textAlignVertical: 'bottom' }}>{props.chops}</SText>
                            <SText style={{ fontSize: 18, color: 'white', textAlignVertical: 'bottom' }}>/{props.chopsNeeded} STAMPS</SText>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <SText style={{ fontSize: 10, textAlignVertical: 'bottom', color: 'white' }}>Valid Until </SText>
                            <SText style={{ fontWeight: 'bold', fontSize: 10, textAlignVertical: 'bottom', color: 'white' }}>{props.validDate}</SText>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('3%'), alignItems:'center' }}>
                    <FlatList
                    data={props.data}
                    ListEmptyComponent={props.emptyComponent}
                    numColumns={props.numColumns}
                    renderItem={props.render}
                    /></View>                    
                </View>
            </ImageBackground>
        </View>
    </View >
)

export const LVoucherCard = (props) => (
    <View
        style={styles.card}>
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={props.imgBackground}
                style={{ width: wp('92%'), height: hp('35%') }}
                imageStyle={{ borderRadius: 10 }}>
                <View style={{ marginTop: hp('5%'), backgroundColor: 'red', height: hp('5%') }}>
                    <SText style={{ color: 'white', marginTop: hp('1%'), marginLeft: hp('4%') }}>GIFT VOUCHER</SText>
                    <Image source={props.logo}
                        style={styles.voucherLogo}
                        resizeMode="contain" />
                </View>
            </ImageBackground>
        </View>
        <View style={{ flex: 1.5, marginTop: hp('5%'), marginHorizontal: wp('7%') }}>
            <SText style={{ fontSize: 28, color: 'white' }}>{props.voucherName}</SText>
            <SText style={{ color: 'white', fontSize: 12 }}>{props.merchantName}</SText>
            <SText style={{ fontWeight: 'bold', color: 'white', fontSize: 12, marginTop: hp('2%') }}>Valid until {props.validDate}</SText>
        </View>
    </View >
)