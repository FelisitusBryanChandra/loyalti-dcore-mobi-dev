import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BaseComponent from '../../Components/BaseComponent';
import { STextSemiBold, SText, STextLightItalic } from '../../Components/CustomText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as CONST from '../../Config/Constants';
import loyaltiLogo from '../../Assets/drawable-xhdpi/logo_loyalti_color.png'


function ItemReward({ item }) {
    return (
        <View style={{
            flex: 3,
            flexDirection: 'row',
            borderColor: CONST.COMMON_BLUE,
            borderWidth: 0.5,
            borderRadius: 5,
            marginBottom: wp(4)
        }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                <Image source={item.image} style={{ width: wp(21.06), height: wp(21.06) }} resizeMode="contain" />
            </View>
            <View style={{ borderColor: CONST.COMMON_BLUE, borderWidth: 1, borderStyle: 'dotted', borderRadius: 1 }} />
            <View style={{ flex: 2, marginVertical: wp(2.67), marginHorizontal: wp(2.97) }}>
                <STextSemiBold style={{ fontSize: 16 }}>{item.title}</STextSemiBold>
                <SText style={{ fontSize: 12 }}>{item.merchant}</SText>
                <STextLightItalic style={{ fontSize: 12 }}>{item.date}</STextLightItalic>
                <TouchableOpacity
                    style={{
                        backgroundColor: CONST.COMMON_BLUE,
                        width: wp(24),
                        height: wp(8),
                        borderRadius: 5,
                        marginTop: wp(1.87),
                        marginLeft: wp(33.5),
                        justifyContent: 'center'
                    }}>
                    <STextSemiBold style={{ fontSize: 12, alignSelf: 'center', color: '#fff' }}>USE NOW</STextSemiBold>
                </TouchableOpacity>
            </View>
        </View>
    )
}
class MyReward extends BaseComponent {

    render() {

        const data = [
            { title: 'Diskon 10% All Item', merchant: 'Shilin', date: 'Valid until 20/03/2020', image: loyaltiLogo },
            { title: 'Diskon 10% All Item', merchant: 'Shilin', date: 'Valid until 20/03/2020', image: loyaltiLogo },
            { title: 'Diskon 10% All Item', merchant: 'Shilin', date: 'Valid until 20/03/2020', image: loyaltiLogo },
            { title: 'Diskon 10% All Item', merchant: 'Shilin', date: 'Valid until 20/03/2020', image: loyaltiLogo },
            { title: 'Diskon 10% All Item', merchant: 'Shilin', date: 'Valid until 20/03/2020', image: loyaltiLogo }
        ]
        return (
            <View
                style={{ marginTop: wp(4.8), marginHorizontal: wp(4) }}>
                <this.form.SearchInput
                    extraInputStyle={{ width: wp(80) }} />
                <FlatList
                    data={data}
                    style={{ marginTop: wp(6.4),marginBottom:wp(13) }}
                    renderItem={({ item }) => <ItemReward item={item} />}
                />
            </View>
        )
    }
}

export default MyReward