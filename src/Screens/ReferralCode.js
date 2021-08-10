import React from "react";
import { Button, View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SText } from '../Components/CustomText'
import OTPInputView from '@twotalltotems/react-native-otp-input'

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

class ReferralCodeScreen extends React.Component {

  static navigationOptions = {

  };

  render() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", marginVertical: hp('3%') }}>
        <View style={{ flexDirection: 'row' }}>
          <SText style={{ fontSize: 14, textAlignVertical: 'center', marginHorizontal: wp('2%') }}>Your Referral Code</SText>
          <TouchableOpacity
            style={{ height: hp('4.5%'), borderWidth: 1, borderColor: "#2096f3", borderRadius: 17.5, width: wp('31%'), marginHorizontal: wp('2%') }}
            onPress={() => this.props.navigation.navigate('')}>
            <SText
              style={{ height: hp('4.5%'), fontSize: 14, color: '#2096f3', textAlign: 'center', textAlignVertical: 'center' }}>Generate</SText>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: hp('4%') }}>
          <OTPInputView
            style={{ width: wp('70%'), height: hp('10%')}}
            pinCount={6}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code => {
              console.log(`Code is ${code}, you are good to go!`)
            })}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ marginHorizontal: wp('2%') }}
            onPress={() => this.props.navigation.navigate('')}>
            <Image
              source={require('../Assets/drawable-xhdpi/group_3.png')}
              style={{ width: wp('31%'), height: hp('4.5%') }}>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: hp('4.5%'), backgroundColor: "#2096f3", borderRadius: 17.5, width: wp('31%'), marginHorizontal: wp('2%') }}
            onPress={() => this.props.navigation.navigate('')}>
            <SText
              style={{ height: hp('4.5%'), fontSize: 14, color: '#fff', textAlign: 'center', textAlignVertical: 'center' }}>COPY</SText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ReferralCodeScreen;
