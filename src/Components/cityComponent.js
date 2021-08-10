import React from 'react'
import { View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, Modal, Text } from 'react-native'
import { SText } from './CustomText'
import LTInput from '../Components/LTInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LButton } from './CustomButton'

export const LCityModal = (props) => (
    <Modal
        animationType="fade"
        onRequestClose={props.onRequestClose}
        transparent={true}
        visible={props.visible}>
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{
                padding: 10,
                flex: 1,
                justifyContent: "center",
                backgroundColor: "rgba(52, 52, 52, 0.8)"
            }}>
                <TouchableWithoutFeedback>
                    <View style={{
                        borderRadius: 10,
                        marginHorizontal: 20,
                        padding: 10,
                        backgroundColor: "#fdfdfd",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 1,
                            height: 1,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                        ...props.style
                    }}>
                        <View style={{ margin: '2%' }}>
                            <SText
                                style={{
                                    margin: wp('4%'),
                                    color: '#505050',
                                    fontWeight: '600',
                                    // marginVertical: '10%',
                                    ...props.headerStyle
                                }}>
                                {props.header}</SText>
                        </View>
                        <LSearch
                            url={require('../Assets/drawable-xhdpi/SearchIcon.png')}
                            onChangeText={props.searchOnChange}
                            value={props.searchValue}
                        />
                        <LFlatList
                            error="City Not Found"
                            data={props.listData}
                            keyExtractor={(index) => index.toString()}
                            renderItem={props.renderItem}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
)

export const LFlatList = (props) => (
    <View style={{ height: hp('60%') }}>
        <FlatList
            ListEmptyComponent={
                <SText style={{
                    textAlign: "center",
                    color: '#505050',
                    marginTop: hp('2%')
                }}>
                    {props.error}</SText>}
            style={{ margin: 6, flex: 1 }}
            data={props.data}
            keyExtractor={props.keyExtractor}
            renderItem={props.renderItem} />
    </View>
)

export const LCityInput = (props) => (

    <View>
        <TouchableOpacity onPress={props.onPress
            // () => this.setState({ searchCityModal: true })
        }>
            <SText
                style={[{
                    fontSize: 14,
                    borderBottomColor: '#979797',
                    borderBottomWidth: 0.5,
                    marginTop: hp('2%'),
                    paddingBottom: hp('1%'),
                    color: '#b1b1b1'
                },
                // !this.state.scValidate 
                !props.validate ? { borderBottomColor: 'red' } : { borderBottomColor: '#979797' }]}>
                {props.placeholder
                    // this.state.selectedCityId ? this.state.selectedCity : "Select city"
                }</SText>
        </TouchableOpacity>
    </View>
)

export const LCityList = (props) => (
    <TouchableOpacity
        onPress={props.onPress}
        style={{
            flexDirection: "row",
            borderBottomWidth: 0.5,
            borderBottomColor: "#c1c1c1",
            paddingVertical: hp('1.5%')
        }}>
        <SText style={{
            fontSize: 15,
            flex: 1,
            color: '#505050'
        }}>{props.ItemName}</SText>
    </TouchableOpacity>
)

export const LSearch = (props) => (

    <View style={{
        flexDirection: 'row',
        borderColor: '#505050',
        borderWidth: 0.5,
        borderRadius: 7,
        marginHorizontal: wp('2%'),
        height: hp('7%')
    }}>
        <Image
            source={props.url
                // require('../Assets/drawable-xhdpi/SearchIcon.png')
            }
            style={{
                marginHorizontal: wp('4%'),
                marginTop: hp('2%'),
                width: wp('6%'),
                height: hp('3%')
            }}
        ></Image>
        <LTInput
            inputBlock={{ marginHorizontal: wp('3%') }}
            onChangeText={props.onChangeText
                // (v) => this.setState({ search: v }, () => this.findCity())
            }
            value={props.value}
            style={{ width: wp('60%') }}
        />
    </View>

)
