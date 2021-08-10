import React from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";
import { SText } from '../Components/CustomText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ToggleSwitch from 'toggle-switch-react-native'

const styles = StyleSheet.create({
  body: {
    fontSize: 14,
    width: wp('65%')
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('4%'),
    marginRight: wp('5%')
  }
})

class SettingScreen extends React.Component {

  static navigationOptions = {

  };

  render() {
    return (
      <View>
        <View style={{ marginTop: hp('4%'), marginLeft: wp('4%') }}>
          <View style={styles.container}>
            <SText style={[styles.body, this.props.style]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</SText>
            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor="gray"
              // label="Example label"
              // labelStyle={{ color: "black", fontWeight: "900" }}
              size="medium"
              onToggle={isOn => console.log("changed to : ", isOn)}
            />
          </View>
          <View style={styles.container}>
            <SText style={[styles.body, this.props.style]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</SText>
            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor="gray"
              // label="Example label"
              // labelStyle={{ color: "black", fontWeight: "900" }}
              size="medium"
              onToggle={isOn => console.log("changed to : ", isOn)}
            />
          </View>
          <View style={styles.container}>
            <SText style={[styles.body, this.props.style]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</SText>
            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor="gray"
              // label="Example label"
              // labelStyle={{ color: "black", fontWeight: "900" }}
              size="medium"
              onToggle={isOn => console.log("changed to : ", isOn)}
            />
          </View>
          <View style={styles.container}>
            <SText style={[styles.body, this.props.style]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</SText>
            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor="gray"
              // label="Example label"
              // labelStyle={{ color: "black", fontWeight: "900" }}
              size="medium"
              onToggle={isOn => console.log("changed to : ", isOn)}
            />
          </View>
        </View>
        <View style={{ borderBottomColor: '#c1c1c1', borderTopColor: '#c1c1c1', borderBottomWidth: 0.5, borderTopWidth: 0.5, marginVertical: hp('4%') }}>
          <View style={{flexDirection: 'row', marginLeft: wp('6%'), marginVertical: hp('4%')}}>
            <Image
            style={{width: 16, height: 21, marginRight: wp('5%')}}
            source={require('../Assets/drawable-xhdpi/baseline_https_24_px.png')}></Image>
            <SText style={{fontSize: 14, textAlignVertical: 'center', color: '#2096f3'}}>Change Password</SText>
          </View>
        </View>
      </View>
    );
  }
}

export default SettingScreen;
