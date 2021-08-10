import React from 'react';

import {
    View, StyleSheet, ScrollView, SafeAreaView,
    PermissionsAndroid
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { SText } from '../../Components/CustomText'
import LTInput from '../../Components/LTInput' //dipake
import { GenderPicker, Error, LHeader, DOBPicker, } from '../../Components/CustomForm'//dipake
import { LFlatList, LSearch, LCityList, LCityInput, LModal } from '../../Components/cityComponent'
import RNFetchBlob from 'rn-fetch-blob'
import STATES from '../../Network/State'
import { connect } from 'react-redux'
import Geolocation from 'react-native-geolocation-service';
// import RegisterForm from '../Containers/RegisterForm'
import APITargetEndpoint from '../../Network/APITargetEndpoint';
// import items from '../Components/cityItems'
import URI from '../../Network/Uri'
import API from '../../Network/Api'
import AsyncStorage from '@react-native-community/async-storage'
import BaseComponent from '../../Components/BaseComponent';
import * as CONST from '../../Config/Constants';


// Sentry.init({
//     dsn: 'https://cde742df398b422f9d295a361aaf9cbe@sentry.io/1763379' 
// });



const styles = StyleSheet.create({

    ErrorRed: {
        color: 'red',
        textAlign: 'left',
        fontSize: 11,
        marginTop: hp('1%')
    },

    subHeader: {
        fontSize: 10,
        marginTop: hp('2%'),
        color: '#505050'
    },
    Input: {
        fontSize: 14,
        padding: 1,
        marginTop: hp('2%'),
        borderBottomColor: '#979797',
        borderBottomWidth: 0.5,
        color: '#505050'
    },
    InputHidden: {
        fontSize: 14,
        padding: 1,
        marginTop: hp('2%'),
        borderBottomColor: '#979797',
        borderBottomWidth: 0.5,
        letterSpacing: 5,
        color: '#505050'
    },
    error: {
        borderBottomWidth: 2,
        borderBottomColor: 'red'
    }
})

class Register extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            fnValidate: true,
            lastName: '',
            lnValidate: true,
            phoneNum: '',
            pnValidate: true,
            email: '',
            eValidate: true,
            DOB: '',
            dobValidate: true,
            gender: '',
            geValidate: true,
            refCodeValidate: true,

            password: '',
            passValidate: true,
            conPassword: '',
            conpassValidate: true,

            refCode: '',

            validate: false,
            lastPosition: '',
            location: ''
        }
    }

    // findCity() {
    //     var cities = []

    //     for (var key in items) {
    //         if (items.hasOwnProperty(key)) {
    //             if (items[key].name.toLowerCase().includes(this.state.search) || this.state.search == "") {
    //                 cities.push({
    //                     id: items[key].id,
    //                     name: items[key].name,
    //                 })
    //             }
    //         }
    //     }

    //     this.setState({ cityList: cities })
    // }

    // onModalClose = () => {
    //     this.setState({
    //         searchCityModal: false
    //     })
    // }

    // onValueChange = (item) => {
    //     this.setState({
    //         selectedCityId: item.id,
    //         selectedCity: item.name,
    //         searchCityModal: false,
    //         scValidate: true
    //     })
    // }

    validation = () => {
        const {
            firstName, lastName, phoneNum, email, gender, DOB, password, conPassword
        } = this.state;

        let PEY = CONST.COMMON_ERROR_MESSAGE;

        let checkFN = true,
            checkLN = true,
            checkPN = true,
            checkEM = true,
            checkGE = true,
            checkDOB = true,
            checkPass = true,
            checkConPass = true,
            messageEmail = `${PEY} email`,
            messagePass = `${PEY} password`,
            messageConPass = `${PEY} confirm password`;

        firstName === "" ? checkFN = false : checkFN = true
        lastName === "" ? checkLN = false : checkLN = true
        phoneNum === "" ? checkPN = false : checkPN = true
        gender === "" ? checkGE = false : checkGE = true
        DOB === "" ? checkDOB = false : checkDOB = true

        if (email === "") {
            checkEM = false;
        } else {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                checkEM = true
            }
            else {
                messageEmail = "wrong email format."
                checkEM = false
            }
        }

        if (password === "") {
            checkPass = false;
        } else {
            if (password.length < 6) {
                checkPass = false;
                messagePass = "Your password must more than 6 characters."
            } else {
                if (/[A-Z]/.test(password)) {
                    checkPass = true;
                } else {
                    checkPass = false;
                    messagePass = "Your password must have 1 uppercase character."
                }
            }
        }

        if (conPassword === "") {
            checkConPass = false;
        } else {
            if (conPassword !== password) {
                checkConPass = false;
                messageConPass = "Your confirmation password doesn't match.";
            } else {
                checkConPass = true;
            }
        }

        if (!checkFN) {
            this.setState({
                fnValidate: checkFN,
                errorFn: `${PEY} first name.`
            })
        }

        if (!checkLN) {
            this.setState({
                lnValidate: checkLN,
                errorLn: `${PEY} last name.`
            })
        }

        if (!checkPN) {
            this.setState({
                pnValidate: checkPN,
                errorPn: `${PEY} phone number.`
            })
        }

        if (!checkEM) {
            this.setState({
                eValidate: checkEM,
                errorEm: messageEmail
            })
        }

        if (!checkGE) {
            this.setState({
                geValidate: checkGE,
                errorGe: "Please choose your gender."
            })
        }

        if (!checkDOB) {
            this.setState({
                validate: false,
                dobValidate: checkDOB,
                errorDob: `${PEY} your birthdate.`
            })
        }

        if (!checkPass) {
            this.setState({
                validate: false,
                passValidate: checkPass,
                errorPass: messagePass
            })
        }


        if (!checkConPass) {
            this.setState({
                validate: false,
                conpassValidate: checkConPass,
                errorConPass: messageConPass
            })
        }
        if (checkFN && checkLN && checkPN && checkEM && checkGE &&
            checkDOB && checkPass && checkConPass) {
            this.submitted();
            this.props.emailSubmit();
            // this.Auth();
            // this.AuthTranslate();

        }

    };

    EmailChecker = async () => {

        let emailTest = this.state.email
        const url = 'http://11.11.5.146:2828/graphql';
        let query = `
        query {
          customers(email:"${emailTest}"){       
            email
          }
        }`

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ query })
        })
            .then(response => {
                return response.json()
                    .then((json) => {
                        const dataCustomer = json.data.customers
                        this.setState({
                            emailCheck: dataCustomer[0].email,
                        })
                    })
            })
            .catch(error => console.error(`'Error: ' + ${JSON.stringify(error)}`))

    }

    // async componentDidMount() {
    //     const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    //         'title': 'React Native Location Permission',
    //         'message': ',React Native needs access to your location'
    //     }
    //     )

    //     if (granted) {
    //         Geolocation.getCurrentPosition(
    //             (position) => {
    //                 const geo = position.coords;
    //                 // console.log("My current location", JSON.stringify(position));
    //                 this.setState({
    //                     geoLatitude: geo.latitude.toString(),
    //                     geoLongitude: geo.longitude.toString()
    //                 })
    //                 // console.log(this.state.geoLatitude, this.state.geoLongitude)
    //             },
    //             (error) => {
    //                 console.log(error.code, error.message);
    //             },
    //             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //         );
    //         this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
    //             this.setState({ lastPosition });
    //         })
    //     }
    // }

    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
    }

    async postProfile() {
        let dataSet = {};
        var countFail = 0;
        var countResendCode = 0;
        var countResendVerification = 0;
        var referralCode = '13546';
        var profilePict = 'http://www.google.com'

        dataSet.ProfilePict = profilePict,
            dataSet.FirstName = this.state.firstName,
            dataSet.LastName = this.state.lastName,
            dataSet.UserEmail = this.state.email,
            dataSet.Gender = this.state.gender,
            dataSet.PhoneNumber = this.state.phoneNum,
            dataSet.BirthDate = this.state.DOB,
            dataSet.DomicileCity = this.state.selectedCity,
            dataSet.ReferralCode = referralCode,
            dataSet.CountFail = countFail,
            dataSet.CountResendCode = countResendCode,
            dataSet.CountResendVerification = countResendVerification
        dataSet.latitude = this.state.geoLatitude,
            dataSet.longitude = this.state.geoLongitude,
            dataSet.password = this.state.password;
        // dataSet.ConPassword = this.state.ConPassword;

        // console.warn(dataSet)

        await APITargetEndpoint.RegisterProfile(dataSet)
            .then((response) => JSON.stringify(response))
            .then((responseData) => {
                console.log(responseData);
            })
            .catch((err) => console.log("Error" + err))

        // let emailData = this.state.email
        // await AsyncStorage.setItem('emailData',emailData)
        this.props.navigation.navigate('SignInSignOut');


    }

    submitted = async () => {

        this.postProfile();

        // this.Auth2();
        // this.translateToken();
        // await AsyncStorage.getItem('emailData', (error, result) => {
        //     if (result) {
        //         // console.log(result, "AsyncStorage")

        //         this.setState({
        //             email: result.email
        //         })
        //     } if (error) {
        //         console.log(error)
        //     }
        // })
        //    let Data = {
        //      emailData: email
        //    }

    }

    render() {
        const { navigate } = this.props.navigation;
        const { phoneNum, firstName, lastName, fnValidate, errorFn, errorLn, errorPn, errorEm, errorGe,
            errorDob, errorPass, errorConPass, pnValidate, eValidate, email, DOB, dobValidate, passValidate,
            password, conPassword, conpassValidate, refCode, lnValidate, geValidate, refCodeValidate } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    flex: 1, alignContent: 'center', justifyContent: 'center', margin: hp(2.4)
                }}>
                    <ScrollView
                        style={{ marginHorizontal: hp(0.6) }}>
                        <this.form.InputFieldTopDesc
                            desc="FIRST NAME"
                            value={firstName}
                            validate={fnValidate}
                            errorMesssage={errorFn}
                            extraStyleError={{ textAlign: 'right' }}
                            onChangeText={(firstName) => this.setState({ firstName, fnValidate: true })} />

                        <this.form.InputFieldTopDesc
                            desc="LAST NAME"
                            value={lastName}
                            validate={lnValidate}
                            errorMesssage={errorLn}
                            extraStyleError={{ textAlign: 'right' }}
                            extraStyleDesc={{ marginTop: hp(1.92) }}
                            onChangeText={(lastName) => this.setState({ lastName, lnValidate: true, validate: true })} />

                        <this.form.PhoneField
                            phoneNum={phoneNum}
                            valid={!pnValidate}
                            validate={pnValidate}
                            errorMesssage={errorPn}
                            extraStyleDesc={{ marginTop: hp(1.92) }}
                            extraStyleError={{ textAlign: 'right' }}
                            extraStyleInput={{ width: wp(80) }}
                            onChangeText={(phoneNum) => {
                                if (phoneNum.charAt(0) === "0") {
                                    phoneNum = phoneNum.replace("0", "")
                                }
                                if (/^\d+$/.test(phoneNum) || phoneNum == "") {
                                    this.setState({ phoneNum, pnValidate: true })
                                }
                            }} />

                        <this.form.InputFieldTopDesc
                            desc="EMAIL"
                            value={email}
                            validate={eValidate}
                            errorMesssage={errorEm}
                            extraStyleError={{ textAlign: 'right' }}
                            extraStyleDesc={{ marginTop: hp(1.92) }}
                            onChangeText={(email) => this.setState({ email, eValidate: true })} />

                        <LHeader SubHeader="GENDER" style={{ marginBottom: hp(2) }} />
                        <this.form.GenderPicker
                            initial={-1}
                            onPress={(item) => this.setState({ gender: item, geValidate: true })} />
                        <Error
                            validate={geValidate}
                            errorMesssage={errorGe}
                            extraStyle={{ textAlign: 'right' }} />
                        <LHeader SubHeader="DATE OF BIRTH" />
                        <this.form.DOBPicker
                            date={DOB}
                            error={!dobValidate ? 'red' : '#979797'}
                            placeholder="DD / MM / YYYY"
                            format="DD / MM / YYYY"
                            onChange={(DOB) => { this.setState({ DOB, dobValidate: true }) }} />
                        <Error
                            validate={dobValidate}
                            errorMesssage={errorDob}
                            extraStyle={{ textAlign: 'right' }} />

                        <this.form.InputFieldTopDesc
                            desc="PASSWORD"
                            value={password}
                            validate={passValidate}
                            errorMesssage={errorPass}
                            extraStyleError={{ textAlign: 'right' }}
                            extraStyleDesc={{ marginTop: hp(1.92) }}
                            textSecurity={true}
                            onChangeText={(password) => this.setState({ password, passValidate: true })} />

                        <this.form.InputFieldTopDesc
                            desc="CONFIRM PASSWORD"
                            value={conPassword}
                            validate={conpassValidate}
                            errorMesssage={errorConPass}
                            extraStyleError={{ textAlign: 'right' }}
                            extraStyleDesc={{ marginTop: hp(1.92) }}
                            textSecurity={true}
                            onChangeText={(conPassword) => this.setState({ conPassword, conpassValidate: true })} />

                        <this.form.InputFieldTopDesc
                            desc="REFERRAL CODE (OPTIONAL)"
                            value={refCode}
                            validate={refCodeValidate}
                            extraStyleDesc={{ marginTop: hp(1.92) }}
                            onChangeText={(refCode) => this.setState({ refCode })} />
                    </ScrollView>

                    <View>
                        <SText
                            style={{
                                color: '#2096f3', alignSelf: 'center', marginVertical: hp(2.2)
                            }} >By clicking this button, I accept LoyaltiExpress T&C</SText>
                        <this.button.CommonButtonLarge
                            text="REGISTER"
                            onpressed={() => this.validation()} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.email
    }
}

function mapDispatchToProps(dispatch) {
    return {
        emailSubmit: () => dispatch({ type: 'ADD_CUSTOMER' })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);