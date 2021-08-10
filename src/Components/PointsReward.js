import React from 'react'
import { View, Image, } from 'react-native'
import { SText } from './CustomText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LButton } from './CustomButton';
import URI from '../Network/Uri'

export const LInfoPoints = (props) => (
    <View style={{ borderBottomColor: '#979797', borderBottomWidth: 0.5, paddingHorizontal: wp('5%'), paddingVertical: hp('2.5%') }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <SText>{props.title}</SText>
            <SText style={{ fontSize: 16 }}>{props.points} Points</SText>
        </View>
        <SText style={{ fontSize: 12 }}>{props.date}, {props.timestamp}</SText>
    </View >
)

export const LYourReward = (props) => (
    <View style={{ borderColor: '#2096f3', borderWidth: 0.5, flexDirection: 'row', marginHorizontal: wp('5%'), borderRadius: 5, marginVertical: hp('1%') }}>
        <View style={{ borderRightWidth: 0.5, borderRightColor: '#2096f3', borderStyle: 'dashed', paddingVertical: hp('4%'), paddingHorizontal: wp('7%') }}>
            <Image
                source={props.uri}
                style={{ width: 60, height: 60 }}>
            </Image>
        </View>
        <View style={{ flex: 1, paddingVertical: hp('2%'), paddingHorizontal: wp('4%') }}>
            <SText style={{ fontSize: 16 }}>{props.title}</SText>
            <SText style={{ fontSize: 12 }}>Expired till {props.expiryDate}</SText>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <LButton
                    style={{ backgroundColor: '#2096f3', width: wp('25%'), borderRadius: 5 }}
                    text="USE NOW"
                    textStyle={{ fontSize: 12, color: '#fff', alignSelf: 'center', paddingVertical: hp('1%') }}
                    onPress={props.onPress}
                />
            </View>
        </View>
    </View>
)

export const LCatalog = (props) => (
    <View style={{ flexDirection: 'row', marginHorizontal: wp('5%'), marginVertical: hp('2%') }}>
        <View>
            <Image source={props.uri}
                style={{ width: 110, height: 110, borderRadius: 5 }}>
            </Image>
        </View>
        <View style={{ marginLeft: wp('5%') }}>
            <SText>{props.rewardTitle}</SText>
            <View style={{ paddingVertical: hp('1.5%') }}>
                <SText>{props.rewardPoint} Points</SText>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <LButton
                    style={{ backgroundColor: '#2096f3', width: wp('25%'), borderRadius: 5 }}
                    text="GET"
                    textStyle={{ fontSize: 12, color: '#fff', alignSelf: 'center', paddingVertical: hp('1%') }}
                    onPress={props.onPress}>
                    
                </LButton>
            </View>
        </View>
    </View>
)