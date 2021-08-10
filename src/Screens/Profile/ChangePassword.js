import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BaseComponent from '../../Components/BaseComponent';
import * as CONST from '../../Config/Constants';


class ChangePassword extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            oldPassValidate: true,
            newPassValidate: true,
            confPassValidate: true,
            oldPass: '',
            newPass: '',
            confPass: ''
        }
    }

    onButtonSavePressed() {
        const { oldPass, newPass, confPass } = this.state
        let PEY = CONST.COMMON_ERROR_MESSAGE
        let checkOldPass = true,
            checkNewPass = true,
            checkConfPass = true,
            messageOldPass = `${PEY} old password`,
            messageNewPass = `${PEY} new password`,
            messageConfPass = `${PEY} confirm password`;

        oldPass === "" ? checkOldPass = false : checkOldPass = true;

        if (newPass === "") {
            checkNewPass = false;
        } else {
            if (newPass.length < 6) {
                checkNewPass = false;
                messageNewPass = "Your password must more than 6 characters."
            } else {
                if (/[A-Z]/.test(newPass)) {
                    checkNewPass = true;
                } else {
                    checkNewPass = false;
                    messageNewPass = "Your password must have 1 uppercase character."
                }
            }
        }

        if (confPass === "") {
            checkConfPass = false;
        } else {
            if (confPass !== newPass) {
                checkConfPass = false;
                messageConfPass = "Your confirmation password doesn't match.";
            } else {
                checkConfPass = true;
            }
        }

        if (!checkOldPass) {
            this.setState({
                oldPassValidate: checkOldPass,
                errorOldPass: messageOldPass
            })
        }
        if (!checkNewPass) {
            this.setState({
                newPassValidate: checkNewPass,
                errorNewPass: messageNewPass
            })
            if (!checkConfPass) {
                this.setState({
                    confPassValidate: checkConfPass,
                    errorConfPass: messageConfPass
                })
            }
        }
        if (oldPass && newPass && confPass) {

        }
    }

    render() {
        const { oldPassValidate, newPassValidate, confPassValidate, oldPass, newPass,
            confPass, errorOldPass, errorNewPass, errorConfPass } = this.state
        return (
            <View style={{ margin: wp(8) }}>
                <this.form.InputFieldTopDesc
                    desc="OLD PASSWORD"
                    validate={oldPassValidate}
                    value={oldPass}
                    containerStyle={styles.formStyle}
                    errorMesssage={errorOldPass}
                    textSecurity={true}
                    onChangeText={(oldPass) => this.setState({ oldPass, oldPassValidate: true })} />
                <this.form.InputFieldTopDesc
                    desc="NEW PASSWORD"
                    validate={newPassValidate}
                    value={newPass}
                    errorMesssage={errorNewPass}
                    textSecurity={true}
                    containerStyle={styles.formStyle}
                    onChangeText={(newPass) => this.setState({ newPass, newPassValidate: true })} />
                <this.form.InputFieldTopDesc
                    desc="CONFIRM PASSWORD"
                    validate={confPassValidate}
                    value={confPass}
                    errorMesssage={errorConfPass}
                    textSecurity={true}
                    containerStyle={styles.formStyle}
                    onChangeText={(confPass) => this.setState({ confPass, confPassValidate: true })} />
                <this.button.CommonButtonLarge
                    text="SAVE"
                    extraStyleButton={styles.buttonStyle}
                    onpressed={() => this.onButtonSavePressed()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formStyle: {
        marginBottom: wp(6.4)
    },
    buttonStyle: {
        marginTop: wp(8)
    }
})
export default ChangePassword