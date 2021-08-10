import React from 'react'
import { View, StyleSheet, TextInput, ImageBackground, Image, Text, TouchableOpacity } from 'react-native'
import { SText, STextSemiBold, STextBold } from './CustomText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PhotoUpload from 'react-native-photo-upload';
import RadioForm from 'react-native-simple-radio-button'
import DatePicker from 'react-native-datepicker'
import zoomGlasses from '../Assets/drawable-xhdpi/SearchIcon.png';
import * as CONST from '../Config/Constants';

const genderOption = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' }
];

export const FormInput = ({ extraStyle, placeholder, text, value }) => (

    <View style={{ flexDirection: "row" }}>
        <SText
            style={styles.subHeader}>
            {text}
        </SText>
        <TextInput
            style={[styles.body, extraStyle]}
            placeholder={placeholder}
            editable={false}>{value}</TextInput>
    </View>
)

export const LInput = (props) => (

    <View style={{ flexDirection: "row" }}>
        <SText
            style={styles.subHeader}>
            {props.text}
        </SText>
        <TextInput
            style={[styles.body, props.style]}
            placeholder={props.placeholder}
            editable={true}
            onChangeText={props.onChangeText}
        >{props.data}</TextInput>
    </View>

)

export const LHeader = (props) => (

    <Text style={[styles.subHeader2, props.style]}>{props.SubHeader}</Text>

)

export const GenderPicker = (props) => (
    <RadioForm
        radio_props={genderOption}
        initial={props.initial}
        formHorizontal={true}
        labelHorizontal={true}
        style={[{ flexDirection: 'column' }, props.extraStyle]}
        animation={false}
        buttonSize={9}
        buttonOuterSize={20}
        buttonColor={'#505050'}
        selectedButtonColor={CONST.COMMON_BLUE}
        labelStyle={{
            fontFamily: 'NunitoSans-Bold',
            fontSize: 12,
            color: '#505050',
            paddingRight: wp('10%')
        }}
        onPress={props.onPress}
    />
)
export const DOBPicker = ({ date, error, placeholder, format, onChange,
    extraStyle = { width: wp(30), fontSize: 14, fontFamily: "NunitoSans-Regular" } }) => (
        <DatePicker
            date={date}
            mode="date"
            placeholder={placeholder}
            format={format}
            minDate="01-01-1970"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            style={{ width: extraStyle.width }}
            customStyles={{
                dateIcon: {
                    display: "none",

                },
                dateInput: {
                    borderWidth: 0,
                    borderBottomWidth: 0.5,
                    borderBottomColor: error,
                    alignItems: "flex-start",
                },
                dateText: {
                    fontFamily: extraStyle.fontFamily,
                    fontSize: extraStyle.fontSize
                }
            }}
            onDateChange={onChange}
        />
    )

export const Error = ({ validate, errorMesssage, extraStyle }) => (
    !validate ? <Text style={[styles.ErrorRed, extraStyle]}>{errorMesssage}</Text> : null

)

export const PhotoSelector = (props) => (
    <ImageBackground
        source={require('../Assets/drawable-xhdpi/defaultBackground_loyalti.png')}
        style={{ width: wp('100%'), height: hp('25%') }}>

        <PhotoUpload
            onPhotoSelect={props.photoSelect}>
            <Image
                style={{
                    paddingVertical: hp('5%'),
                    width: 100,
                    height: 100,
                    borderRadius: 75
                }}
                resizeMode='cover'
                source={require('../Assets/drawable-xhdpi/loyalti_logo.jpg')}
            />
        </PhotoUpload>
    </ImageBackground>
)

export const PhoneField = ({ onChangeText, phoneNum, valid, extraStyle, validate, errorMesssage,
    extraStyleError, extraStyleDesc, extraStyleInput }) => {
    return (
        <View>
            <STextSemiBold style={[styles.subHeaderInputFieldStyle, extraStyleDesc]} >PHONE NUMBER</STextSemiBold>
            <View style={[{ flexDirection: 'row', marginTop: hp(1.2) }, extraStyle]}>
                <SText style={styles.phoneFieldTextStyle}>+62</SText>
                <TextInput
                    style={[styles.phoneNum,
                    valid ? { borderBottomColor: 'red' } : { borderBottomColor: '#979797' }, extraStyleInput]}
                    placeholder="Phone Number"
                    keyboardType='number-pad'
                    returnKeyType="done"
                    onChangeText={onChangeText}
                    value={phoneNum} />
            </View>
            <Error
                validate={validate}
                errorMesssage={errorMesssage}
                extraStyle={extraStyleError} />
        </View>
    )
};

export const InputFieldTopDesc = ({ desc, value, extraStyleInput, extraStyleDesc, textSecurity,
    onChangeText, placeholder, validate, errorMesssage, extraStyleError, containerStyle }) => {
    return (
        <View style={containerStyle}>
            <STextSemiBold style={[styles.subHeaderInputFieldStyle, extraStyleDesc]} >{desc}</STextSemiBold>
            <TextInput
                placeholder={placeholder}
                secureTextEntry={textSecurity}
                style={[styles.inputFieldStyle, extraStyleInput, !validate ? { borderBottomColor: 'red' } : { borderBottomColor: '#979797' }]}
                value={value}
                onChangeText={onChangeText} />
            <Error
                validate={validate}
                errorMesssage={errorMesssage}
                extraStyle={extraStyleError} />
        </View>
    )
};

export const InputFieldSideDesc = ({ desc, phoneField = false, validate, errorMesssage, extraInputStyle, extraStyleError, value, onChangeText }) => {
    return (
        <View style={{ marginBottom: hp(4.6) }}>
            <View style={styles.containerInputFieldSideStyle}>
                <STextBold>{desc}</STextBold>
                {phoneField ?
                    <View style={styles.containerPhoneFieldStyle}>
                        <TextInput
                            value="+62"
                            style={[styles.codePhoneStyle, !validate ? { borderBottomColor: 'red' } : { borderBottomColor: '#979797' }]} />
                        <TextInput
                            value={value}
                            style={[styles.inputFieldSideStyle, extraInputStyle, !validate ? { borderBottomColor: 'red' } : { borderBottomColor: '#979797' }]}
                            onChangeText={onChangeText} />
                    </View> : <TextInput
                        value={value}
                        style={[styles.inputFieldSideStyle, extraInputStyle, !validate ? { borderBottomColor: 'red' } : { borderBottomColor: '#979797' }]}
                        onChangeText={onChangeText} />}

            </View>
            <Error
                validate={validate}
                errorMesssage={errorMesssage}
                extraStyle={[extraStyleError, { textAlign: 'right' }]} />
        </View>
    )
};

export const SearchInput = ({ extraViewStyle, extraInputStyle, onChangeText }) => {
    return (
        <View style={[styles.searchContainerStyle, extraViewStyle]}>
            <TouchableOpacity>
                <Image
                    source={zoomGlasses}
                    style={styles.zoomGlassesStyle} />
            </TouchableOpacity>
            <TextInput
                style={[{ marginBottom: -wp(3) }, extraInputStyle]}
                onChangeText={onChangeText} />
        </View>
    )
}

const styles = StyleSheet.create({

    ErrorRed: {
        color: 'red',
        textAlign: 'left',
        fontSize: 11,
        marginTop: hp('1%')
    },

    subHeader: {
        fontSize: 14,
        fontWeight: '800',
        color: '#505050',
        padding: 1,
        marginTop: hp('2%'),
        width: wp('25%'),
        textAlignVertical: "center"
    },

    subHeader2: {
        fontSize: 10,
        marginTop: hp('2%'),
        color: '#505050',
        fontFamily: 'NunitoSans-SemiBold'
    },
    phoneNum: {
        borderBottomColor: '#979797',
        borderBottomWidth: 0.5,
        marginLeft: wp(4),
        width: wp(70),
        padding: 1,
        color: '#505050',
    },
    phoneFieldTextStyle: {
        width: wp(9.3),
        padding: 3,
        borderBottomColor: '#979797',
        borderBottomWidth: 0.5,
        textAlign: 'center',
    },
    subHeaderInputFieldStyle: {
        fontSize: 10
    },
    inputFieldStyle: {
        fontSize: 14,
        fontFamily: "NunitoSans-Regular",
        color: '#505050',
        marginTop: hp(1.5),
        paddingBottom: hp(0.5),
        borderBottomColor: "#979797",
        borderBottomWidth: 0.5,
    },
    inputFieldSideStyle: {
        fontSize: 16,
        fontFamily: "NunitoSans-Light",
        color: '#505050',
        paddingBottom: hp(0.5),
        width: wp(60),
        borderBottomColor: "#979797",
        borderBottomWidth: 0.5,
    },
    containerInputFieldSideStyle: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    codePhoneStyle: {
        fontSize: 16,
        fontFamily: "NunitoSans-Light",
        color: '#505050',
        paddingBottom: hp(0.5),
        width: wp(10),
        borderBottomColor: "#979797",
        borderBottomWidth: 0.5,
    },
    containerPhoneFieldStyle: {
        width: wp(60),
        flexDirection: 'row'
    },
    searchContainerStyle: {
        flexDirection: 'row',
        borderColor: '#505050',
        borderWidth: 0.5,
        borderRadius: 5,
        height: wp(10.6),
    },
    zoomGlassesStyle: {
        width: wp(5.52),
        height: wp(5.52),
        marginVertical: wp(2.56),
        marginHorizontal: wp(2.29)
    },
})