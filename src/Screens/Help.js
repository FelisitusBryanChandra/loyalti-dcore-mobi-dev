import React from "react";
import { Button, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SText } from '../Components/CustomText'

const styles = StyleSheet.create({
  box: {
    borderBottomColor: '#979797',
    borderBottomWidth: 0.5
  },
  title: {
    marginHorizontal: wp('4%'),
    marginVertical: hp('2.5%')
  }
});

class HelpScreen extends React.Component {

  static navigationOptions = {

  };

  render() {
    return (
      <View style={{ marginVertical: hp('3%') }}>
        <View style={styles.box}>
          <View style={styles.title}>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('')}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <SText style={{ fontSize: 14 }}>Basic Button</SText>
              <Image
                source={require('../Assets/drawable-xhdpi/shape_2.png')}
                style={{ width: wp('3%'), height: hp('2.5%') }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.title}>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('')}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <SText style={{ fontSize: 14 }}>How to Claim</SText>
              <Image
                source={require('../Assets/drawable-xhdpi/shape_2.png')}
                style={{ width: wp('3%'), height: hp('2.5%') }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.title}>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('')}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <SText style={{ fontSize: 14 }}>How to Redeem</SText>
              <Image
                source={require('../Assets/drawable-xhdpi/shape_2.png')}
                style={{ width: wp('3%'), height: hp('2.5%') }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.title}>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('')}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <SText style={{ fontSize: 14 }}>How to Lend Loyalti Card to a Friend</SText>
              <Image
                source={require('../Assets/drawable-xhdpi/shape_2.png')}
                style={{ width: wp('3%'), height: hp('2.5%') }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.title}>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('')}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <SText style={{ fontSize: 14 }}>Business Inquiry</SText>
              <Image
                source={require('../Assets/drawable-xhdpi/shape_2.png')}
                style={{ width: wp('3%'), height: hp('2.5%') }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default HelpScreen;
