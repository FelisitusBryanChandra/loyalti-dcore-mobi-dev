import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';

import STATE from '../Screens/Login/Register'

import ArchiveIcon from '../Assets/drawable-xhdpi/icon_card.png';
import HistoryIcon from '../Assets/drawable-xhdpi/history_2.png';
import SettingsIcon from '../Assets/drawable-xhdpi/settings.png';
import HelpIcon from '../Assets/drawable-xhdpi/help.png';
import FeedbackIcon from '../Assets/drawable-xhdpi/feedback.png';

// import LogOutIcon from '../Assets/drawable-xhdpi/logout_2.png'

// import STATES from '../Network/State'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AsyncStorage from "@react-native-community/async-storage";

import APITargetEndpoint from '../Network/APITargetEndpoint';

export default class CustomSidebarMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'loyalti@mail.com',
      firstName: 'Loyalti',
      lastName: 'Express',
    }

    this.profileImage = ('../Assets/drawable-xhdpi/loyalti_logo.jpg');

    this.items = [
      {
        navOptionThumb: ArchiveIcon,
        navOptionName: 'Archive Cards',
        screenToNavigate: 'archiveStack'
      },
      {
        navOptionThumb: HistoryIcon,
        navOptionName: 'History',
        screenToNavigate: 'historyStack'
      },
      {
        navOptionThumb: SettingsIcon,
        navOptionName: 'Settings',
        screenToNavigate: 'settingStack'
      },
      {
        navOptionThumb: HelpIcon,
        navOptionName: 'Help',
        screenToNavigate: 'helpStack'
      },
      {
        navOptionThumb: FeedbackIcon,
        navOptionName: 'Send Us Feedback',
        screenToNavigate: 'sendUsFeedbackStack'
      }
    ];
  }

  tokenStore = async (params) => {
    console.log(this.state.idStore, "test")
    try {
      await AsyncStorage.setItem('customerId', params)
    }
    catch (err) {
      console.log(err)
    }
  }

  drawerProfile = async () => {

    try {
      const emailS = await AsyncStorage.getItem('emailData')
      if (emailS !== null) {
        this.setState({
          cardEmail: emailS
        })
      }
    }
    catch (error) {
      console.warn(error + "Drawer Profile")
    }

    let emailDrawer = JSON.stringify(this.state.cardEmail)

    console.log(emailDrawer, "emailDrawer from drawerContentComponent Page")

    await APITargetEndpoint.CustomerProfile(`email: ${emailDrawer}`)
      .then((json) => {
        // console.log("PROFILE", JSON.stringify(json.data.customers[0].id))
        const dataCustomer = json.data.customers;
        this.setState({
          idStore: json.data.customers[0].userId,
          firstName: dataCustomer[0].firstName,
          lastName: dataCustomer[0].lastName,
          email: dataCustomer[0].email,
        })
        this.tokenStore(dataCustomer[0].userId)

      })
      .catch((err) => console.log(err))
  }


  async deleteCache(){
    // await AsyncStorage.removeItem('tokenKey');
    await AsyncStorage.removeItem('emailData');
    await AsyncStorage.removeItem('customerId');
    await AsyncStorage.removeItem('passwordlogin');
  }



  componentWillMount() {
    this.drawerProfile()
    console.log(this.state.cardEmail, "emailDrawer")
  }

  render() {

    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <ImageBackground
          source={require('../Assets/drawable-xhdpi/defaultBackground_loyalti.png')}
          // style={{width:'100%',height:'50%', alignItems:'center'}}
          style={styles.sideMenuProfileBg}
        >
          <Image
            source={require('../Assets/drawable-xhdpi/loyalti_logo.jpg')}
            style={styles.sideMenuProfileIcon}
          />
          
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 17 }}>{[this.state.firstName, " ", this.state.lastName]}</Text>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, margin: '1%' }}>{this.state.email}</Text>

        </ImageBackground>
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            backgroundColor: '#e2e2e2',
            // marginTop: 50,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%', height: '100%' }}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: '3%',
                paddingBottom: '3%',
                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}
              key={key}>
              <View
                style={{
                  marginRight: '5%',
                  marginLeft: '5%',
                  marginBottom: '3%'
                }}
              >
                <Image
                  source={item.navOptionThumb}
                  style={{
                    width: wp('8.5%'),
                    height: hp('3.5%'),
                    margin: '4%',
                    justifyContent: 'center',
                    tintColor: global.currentScreenIndex === key ? '#2096f3' : '#505050'
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}
                style={{ width: '100%', height: '70%' }}
                activeOpacity={0.9}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: global.currentScreenIndex === key ? '#2096f3' : '#505050',
                  }}>
                  {item.navOptionName}
                </Text>
              </TouchableOpacity>

            </View>
          ))}

          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate('referralCodeStack');
            }}
            style={{ width: '100%', height: '30%' }}
            underlayColor='#e0dbdb'
          >
            <View
              style={{ flexDirection: 'row' }}
            >
              <Text
                style={{
                  fontSize: 15,
                  marginVertical: '4%',
                  marginLeft: '8%'
                }}>
                REFERRAL CODE
                </Text>
              <Image
                source={require('../Assets/drawable-xhdpi/shape_2.png')}
                style={{ width: wp('3%'), height: hp('2%'), marginVertical: '6%', marginLeft: '35%' }} />
            </View>
          </TouchableHighlight>



          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate('SignInSignOut');
              this.deleteCache()
            }}
            style={{ width: wp('80%'), height: hp('30%'), borderTopWidth: 0.2 }}
            underlayColor='#e0dbdb'
          >
            <View
              style={{ flexDirection: 'row', marginLeft: '5%', alignItems: 'center', marginTop: '5%' }}
            >
              <View
              // style={{ marginRight: '5%', marginLeft: '5%' }}
              >
                <Image source={require('../Assets/drawable-xhdpi/logout_2.png')}
                  style={{ width: wp('8.8%'), height: hp('3.7%'), marginRight: '5%' }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: '#505050',
                  fontWeight: '700'
                }}>
                LOGOUT
                </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '25%',
    // backgroundColor: 'blue',
    alignItems: 'center',
    // paddingTop: 20,
  },
  sideMenuProfileBg: {
    resizeMode: 'center',
    width: '100%',
    height: '100%',
    // marginTop: 20,
    // margin:'2%',
    borderRadius: 150 / 2,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: '50%',
    height: '50%',
    marginTop: 20,
    margin: '2%',
    borderRadius: 150 / 2,
    alignSelf: 'center'
  },
});