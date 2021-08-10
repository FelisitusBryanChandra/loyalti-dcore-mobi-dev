import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

import { Error } from '../../Components/CustomForm'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { STextLight, STextSemiBold } from '../../Components/CustomText'
import LTInput from '../../Components/LTInput'

import API from '../../Network/Api'
import URI from '../../Network/Uri'

import { LModalLoading, LModal } from '../../Components/modalComponent'

import AsyncStorage from '@react-native-community/async-storage'

import RNFetchBlob from 'rn-fetch-blob'
import BaseComponent from '../../Components/BaseComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import logoLoyalti from '../../Assets/LoyaltiLogoColor.png';

const styles = StyleSheet.create({
    Input: {
        marginTop: hp(1.5),
        paddingBottom: hp(0.5),
        borderBottomColor: "#979797",
        borderBottomWidth: 0.5,
    },
    InputHidden: {
        padding: 1,
        marginVertical: hp('1%'),
        marginHorizontal: wp('3%'),
        borderBottomColor: "#979797",
        borderBottomWidth: 0.5,
        letterSpacing: 5
    },
    subHeader: {
        fontSize: 10
    },
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(8),
        paddingVertical: hp('3%'),
        backgroundColor: 'white'
    },
})


class Login extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            password: "",
            accessToken: '',
            tokenKey: '',
            passValidate: true,
            phoneValidate: true,
            usernameTokenActive: '',
            tokenValidate: true,
            showIndicator: true,
            loginFail: false,
            modalClose: false,
            modalError: true
        }
    }

    componentDidMount() {
        this.setStatusBarTransparant()
    }

    Auth = async () => {

        this.getToken()

        let phoneNumb = this.state.phone
        let password = this.state.password
        console.log(phoneNumb, password, "idpass")
        let data = {
            'grant_type': 'password',
            'username': phoneNumb,
            'password': password,
            'scope': 'openid'
        }

        let formBody = [];

        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        await RNFetchBlob.config({
            trusty: true
        })
            .fetch('POST', URI.AUTH_API + API.AUTH, {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic cm1SSF95MmxqVUZfR0ZFWlFlX0xha09fWWl3YTpEYng1VG82YjFDQ2dMd2R1MWdaRHkzdnJ6YjRh'
            },
                formBody
            ).then((response) => response.json())
            .then((responseDatasz) => {
                console.log(responseDatasz.access_token, "WSO2");
                // console.log(responseDatasz.access_token, "test")
                this.setState({
                    accessToken: responseDatasz.access_token,
                    tokenValidate: true, modalClose: true, modalError: true
                })
                // console.log(this.state.modalError)
                this.AuthTranslate(responseDatasz.access_token)
                // console.log(responseDatasz.upn, "username",this.state.Password, "password")
                // this.setUserData(responseDatasz.upn, this.state.Password)
            })
            .catch((err) => {
                console.log("Error WSO2: " + err),
                    this.setState({ showIndicator: false, modalError: false, modalClose: false })
                console.log(this.state.modalError)
            })
            .done();
    }

    onModalClose = () => {
        this.setState({
            removeModal: false,
            modalClose: false,
            modalError: true
        })
    }
    AuthTranslate = async (params) => {

        await RNFetchBlob.config({
            trusty: true
        })
            .fetch('POST', URI.AUTH_API + `/userinfo?schema=openid`, {

                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer' + ` ${params}` //Minta ama radya token
            },
                // formBody
            ).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData.userId, "test custId", responseData.upn, "username")
                console.log(responseData, "Whole Login Data Last")
                this.setState({
                    usernameToken: responseData.username,
                    usernameTokenActive: responseData.active,
                    userId: responseData.userId
                })

                // // this.onButtonPress();
                // console.log(responseData.upn, responseData.userId, this.state.Password)
                // this.tokenStore(responseData.upn, responseData.userId, this.state.Password);

                console.log(responseData.userId, "User Id")
                // responseData.userId !== undefined ? this.props.navigation.navigate('home') : this.onHandlerStateIndicator();
                if (responseData.userId !== undefined) {
                    this.props.navigation.navigate('home')
                    this.tokenStore(responseData.upn, responseData.userId, this.state.password);
                    console.log(responseData.upn, responseData.userId, this.state.password)
                } else {
                    this.onHandlerStateIndicator();
                }

                this.setState({ tokenValidate: true, modalClose: true, modalError: true })
                console.log(this.state.modalError)

            })
            .catch((err) => { console.log("Error WSO2 Introspect" + err + this.state.modalError), this.setState({ modalError: false }) })
        // .done();

    }

    tokenStore = async (params1, params2, params3) => {
        try {
            // await AsyncStorage.setItem('tokenKey', this.signIn.responseDatasz.access_token)
            await AsyncStorage.setItem('emailData', params1)
            await AsyncStorage.setItem('customerId', params2)
            await AsyncStorage.setItem('passwordLogin', params3)
            // await AsyncStorage.setItem('tokenKeyTranslated',this.responseData)
        }
        catch (err) {
            console.log(err, "Error User Data")
        }
    }

    getToken = async () => {
        try {
            // const token = await AsyncStorage.getItem('tokenKey')
            let emailS = await AsyncStorage.getItem('emailData')
            let passwordS = await AsyncStorage.getItem('passwordLogin')
            if (emailS !== undefined && passwordS !== undefined) {
                this.setState({ emailS: emailS, passwordS: passwordS })
                console.log(this.state.emailS, "Email Cache")
                console.log(this.state.passwordS, "Password Cache")
            }

            // this.setState({emailAuto: emailS, passwordAuto: passwordS})
        }
        catch (error) {
            console.warn(error)
        }
    }

    // onModalClose = () => {
    //     this.setState({

    //     })
    // }

    validate = () => {
        const { phone, password, usernameTokenActive } = this.state
        let checkPhone = true,
            checkPassword = true,
            checkAccessToken = true;

        phone === "" ? checkPhone = false : checkPhone = true;
        password === "" ? checkPassword = false : checkPassword = true;

        if (!checkPhone) {
            this.setState({
                validate: false,
                phoneValidate: checkPhone,
                ErrorPhone: "Please Enter Your Phone Number"
            })
        }
        if (!checkPassword) {
            this.setState({
                validate: false,
                passValidate: checkPassword,
                ErrorPassword: "Please Enter Your Password"
            })
        }
        if (!checkAccessToken) {
            this.setState({
                validate: false,
                tokenValidate: checkAccessToken,
                ErrorToken: "Make sure your account is registered"
            })
        }
        if (checkPhone === true && checkPassword === true && checkAccessToken === true) {
            this.onHandlerStateIndicator();
            this.Auth()
            // console.log(this.state.usernameTokenActive)                          
        }
    }

    onButtonPress = async () => {
        this.validate();
    }

    onHandlerStateIndicator() {
        this.setState({
            showIndicator: !this.state.showIndicator,
            loginFail: false,
            modalError: false
        })
        console.log(this.state.loginFail, "Test Modal")
    }

    render() {
        const { phoneValidate, ErrorPhone, tokenValidate, ErrorToken, passValidate, ErrorPassword, modalError, phone } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                    <View style={{flex:1}}>
                        <View style={styles.container}>
                            <Image
                                source={logoLoyalti}
                                resizeMode="contain"
                                style={{ width: wp(20.8), height: wp(25.6), alignSelf: 'center', marginVertical: hp(7) }} />
                            <this.form.PhoneField
                                valid={!phoneValidate}
                                phoneNum={phone}
                                validate={phoneValidate}
                                errorMesssage={ErrorPhone}
                                onChangeText={(phone) => {
                                    if (phone.charAt(0) === "0") {
                                        phone = phone.replace("0", "")
                                    }
                                    if (/^\d+$/.test(phone) || phone == "") {
                                        this.setState({ phone, phoneValidate: true })
                                    }
                                }} />
                            <Error
                                validate={tokenValidate}
                                erro={ErrorToken} />
                            <this.form.InputFieldTopDesc
                                desc="PASSWORD"
                                textSecurity={true}
                                extraStyleDesc={{ marginTop: hp(2.8) }}
                                extraStyleInput={!passValidate ? { borderBottomColor: 'red' } : null}
                                validate={passValidate}
                                errorMesssage={ErrorPassword}
                                onChangeText={(password) => this.setState({ password, passValidate: true })} />
                            <this.button.CommonButtonText
                                extraStyleButton={{ alignSelf: "flex-end", marginTop: hp(1.2) }}
                                text="Forgot Password?"
                                type="regular"
                                onpressed={() => this.props.navigation.navigate('forgotPass')} />
                            <this.button.CommonButtonLarge
                                text="LOGIN"
                                extraStyleButton={{ marginVertical: hp(4) }}
                                // onpressed={() => this.onButtonPress()}/>
                            onpressed={() => this.props.navigation.navigate('home')}/>
                            <View
                                style={{ alignItems: 'center' }}>
                                <STextLight style={{ color: "#000000" }}>Don't have an account?</STextLight>
                                <this.button.CommonButtonText
                                    text="Create Now"
                                    type="bold"
                                    onpressed={() => this.props.navigation.navigate('register')} />
                            </View>
                            <LModalLoading
                                onRequestClose={this.onModalClose}
                                onPress={this.onModalClose}
                                visible={modalError === false ? true : false}
                                loadingText={"Please Wait"}
                            />
                        </View>
                    </View>
            </SafeAreaView>
        );
    }
}


// }

export default Login;