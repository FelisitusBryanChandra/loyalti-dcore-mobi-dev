import React from 'react'
import { View } from 'react-native'
import { SText } from './CustomText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AirbnbRating } from 'react-native-ratings';

export const LReview = (props) => (
    <View style={{ marginTop: hp('2%') }}>
        <SText style={{ paddingBottom: hp('1%') }}>{props.custName}</SText>
        <AirbnbRating
            count={5}
            defaultRating={props.rate}
            size={8}
            showRating={false}
            isDisabled={true}
            selectedColor='#505050'
            starContainerStyle={{ alignSelf: 'flex-start', marginBottom: hp('1.5%')  }}
        />
        <SText style={{ fontSize: 12, paddingBottom: hp('1%'), fontStyle: 'italic', color: '#d3d3d3'}}>{props.content}</SText>
        <SText style={{ fontSize: 12 }}>{props.date}</SText>
    </View>
)