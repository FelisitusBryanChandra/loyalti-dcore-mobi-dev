import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const SliderImage = (props) => (
    <SliderBox
        style={{ margin: '0.5%' }}
        images={props.states}
        sliderBoxHeight={hp('27%')}
        // onCurrentImagePressed={index =>
        //     console.warn(`image ${index} pressed`)
        // }
        dotColor="#fff"
        inactiveDotColor="#90A4AE"
        dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 10,
            marginHorizontal: 0,
        }}
        paginationBoxVerticalPadding={hp('3%')}
        circleLoop
    />
)