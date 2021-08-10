import React from 'react'
import { Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const TabIcon = (props) => (
    <Image
        style={{
            tintColor: props.tintcolor,
            width: wp(7.2),
            height: wp(7.2),
        }}
        source={props.icon}
    />
)

export const DrawerIcon = (props) => (
    <Image
          style={{ width: 20, height: 16 }}
          source={props.icon}
        />
)