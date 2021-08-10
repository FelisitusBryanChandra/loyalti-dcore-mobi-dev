import React from "react";
import { View, Image, ScrollView, Dimensions, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { STextSemiBold } from '../../Components/CustomText'
import BaseComponent from "../../Components/BaseComponent";
import { SafeAreaView } from 'react-navigation';
import { Error } from "../../Components/CustomForm";
import logoLoyalti from '../../Assets/LoyaltiLogoColor.png';

class ForgotPasswordScreen extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            phoneValidate: true,
        }
    }

    onSubmitPressed() {
        let checkPhone = true;

        this.state.phone === "" ? checkPhone = false : checkPhone = true

        if (!checkPhone) {
            this.setState({
                phoneValidate: checkPhone,
                errorPhone: "Please Enter Your Phone Number"
            })
        }
    }

    render() {
        const { phoneValidate, phone, errorPhone } = this.state
        return (
            <View style={{ flex: 1 }}>
                    <View style={{ margin: hp("4%") }}>
                        <View style={{ alignItems: "center", justifyContent: "center", marginTop: hp(4.36) }}>
                            <Image
                                source={logoLoyalti}
                                style={{ width: wp(20.8), height: wp(25.6), marginBottom: hp(5.3) }} />
                            <STextSemiBold
                                style={{ fontSize: 24 }}>Forgot Password? </STextSemiBold>
                            <STextSemiBold
                                style={{ fontSize: 11 }}>Don't worry! Enter your phone number below and {"\n"}
                                    we'll sending a verification code to your phone </STextSemiBold>
                        </View>
                        <View style={{ marginTop: hp(5.8) }}>
                            <this.form.PhoneField
                                valid={!phoneValidate}
                                phoneNum={phone}
                                onChangeText={(phone) => {
                                    if (phone.charAt(0) === "0") {
                                        phone = phone.replace("0", "")
                                    }
                                    if (/^\d+$/.test(phone) || phone == "") {
                                        this.setState({ phone, phoneValidate: true })
                                    }
                                }} />

                            <Error
                                validate={phoneValidate}
                                errorMesssage={errorPhone} />
                        </View>
                        <this.button.CommonButtonLarge
                                text="SUBMIT"
                                extraStyleButton={{marginTop:hp(5.93)}}
                                onpressed={() => this.onSubmitPressed()} />
                    </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({

})

export default ForgotPasswordScreen;