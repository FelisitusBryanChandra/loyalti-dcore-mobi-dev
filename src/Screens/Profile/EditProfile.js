import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { BackgroundAndImages } from '../../Components/CustomImage';
import BaseComponent from '../../Components/BaseComponent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-navigation';
import { STextBold } from '../../Components/CustomText';
import * as CONST from '../../Config/Constants';
import ImagePicker from 'react-native-image-picker';

const options = {
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
class EditProfile extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            DOB: '',
            email: '',
            gender: '',
            validFN: true,
            validLN: true,
            validPhone: true,
            validEmail: true,
            profilePhoto: null,
            backgroundPhoto: null,
        }
    }

    onButtonSavePressed() {
        const { validFN, validLN, validEmail, validPhone, firstName, lastName,
            phoneNumber, email, } = this.state
        let checkFN = validFN,
            checkLN = validLN,
            checkPhone = validPhone,
            checkEmail = validEmail;

        let required = CONST.COMMON_ERROR_MESSAGE;

        firstName === "" ? checkFN = false : checkFN = true;
        lastName === "" ? checkLN = false : checkLN = true;
        phoneNumber === "" ? checkPhone = false : checkPhone = true;

        if (email === "") {
            checkEmail = false;
        } else {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                checkEM = true
            }
            else {
                messageEmail = "wrong email format."
                checkEM = false
            }
        }
        if (!checkFN) {
            this.setState({
                validFN: checkFN,
                errorFN: `${required} first name.`
            })
        }
        if (!checkLN) {
            this.setState({
                validLN: checkLN,
                errorLN: `${required} last name.`
            })
        }
        if (!checkPhone) {
            this.setState({
                validPhone: checkPhone,
                errorPhone: `${required} phone number.`
            })
        }
        if (!email) {
            this.setState({
                validEmail: checkEmail,
                errorEmail: `${required} email.`
            })
        }
        if (checkFN && checkLN && checkEmail && checkPhone) {

        }
    }

    onImagePickerHandler(type) {
        ImagePicker.showImagePicker(options, (response) => {
            const source = { uri: response.uri }
            alert(source.uri)
            if (source.uri != undefined) {
                if (type == 1) {
                    this.setState({ profilePhoto: source })
                } else {
                    this.setState({ backgroundPhoto: source })
                }
            }
        })
    }

    render() {
        const { validEmail, validFN, validLN, validPhone, errorFN, errorLN, errorPhone, errorEmail, DOB,
            firstName, lastName, phoneNumber, email, backgroundPhoto, profilePhoto, gender } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                    <View style={{height:'100%'}}>
                        <BackgroundAndImages
                            editProfile={true}
                            onSelectPhoto={() => this.onImagePickerHandler(1)}
                            profile={profilePhoto}
                            background={backgroundPhoto}
                            onselectBackground={() => this.onImagePickerHandler(2)} />
                        <ScrollView style={styles.svStyle}>
                            <this.form.InputFieldSideDesc
                                desc="First Name"
                                value={firstName}
                                validate={validFN}
                                errorMesssage={errorFN}
                                onChangeText={(firstName => this.setState({ firstName, validFN: true }))} />
                            <this.form.InputFieldSideDesc
                                desc="Last Name"
                                value={lastName}
                                validate={validLN}
                                errorMesssage={errorLN}
                                onChangeText={(lastName => this.setState({ lastName, validLN: true }))} />
                            <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: hp(3.7), alignItems: 'center' }}>
                                <STextBold>Date of Birth</STextBold>
                                <this.form.DOBPicker
                                    date={DOB}
                                    format="DD - MM - YYYY"
                                    extraStyle={styles.DOBStyle}
                                />
                            </View>
                            <this.form.InputFieldSideDesc
                                desc="Phone number"
                                value={phoneNumber}
                                validate={validPhone}
                                errorMesssage={errorPhone}
                                phoneField={true}
                                extraInputStyle={{ width: wp(50) }}
                                onChangeText={(phoneNumber) => {
                                    if (phoneNumber.charAt(0) === "0") {
                                        phoneNumber = phoneNumber.replace("0", "")
                                    }
                                    if (/^\d+$/.test(phoneNumber) || phoneNumber == "") {
                                        this.setState({ phoneNumber, validPhone: true })
                                    }
                                }} />
                            <this.form.InputFieldSideDesc
                                desc="Email"
                                value={email}
                                validate={validEmail}
                                errorMesssage={errorEmail}
                                onChangeText={(email => this.setState({ email, validEmail: true }))} />
                            <View style={styles.radioButtonContainerStyle}>
                                <STextBold>Gender</STextBold>
                                <this.form.GenderPicker
                                    extraStyle={{ marginLeft: wp(20) }}
                                    initial={0} />
                            </View>
                        </ScrollView>
                        <View style={styles.buttonStyle}>
                            <this.button.CommonButtonLarge
                                text="SAVE"
                                onpressed={() => this.onButtonSavePressed()} />
                        </View>
                    </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    svStyle: {
        margin: wp(3.7),
        marginTop: wp(11.7)
    },
    buttonStyle: {
        margin: wp(8),
    },
    radioButtonContainerStyle: {
        flexDirection: "row",
        alignItems: 'center',
    },
    DOBStyle: {
        width: wp(60),
        fontSize: 16,
        fontFamily: "NunitoSans-Light"
    }
})

export default EditProfile