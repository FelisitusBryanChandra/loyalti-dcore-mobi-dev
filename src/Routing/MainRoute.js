import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Touchable,
  TouchableWithoutFeedback,
  Platform, Dimensions
} from 'react-native';

import { LHTitle, HeaderBack, LHTitle2 } from '../Components/CustomHeader'
import { TabIcon, DrawerIcon } from '../Components/tabNavigator'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

import HomeIcon from '../Assets/drawable-xhdpi/outline_store_24_px.png';
import WalletIcon from '../Assets/drawable-xhdpi/outline_account_balance_wallet_24_px.png';
import BellIcon from '../Assets/drawable-xhdpi/outline_notification_important_24_px.png';
import ProfileIcon from '../Assets/drawable-xhdpi/outline_perm_identity_24_px.png';

import ArchiveIcon from '../Assets/drawable-xhdpi/baseline_credit_card_24_px_copy.png';
import HistoryIcon from '../Assets/drawable-xhdpi/baseline_history_24_px.png';
import SettingsIcon from '../Assets/drawable-xhdpi/group_7.png';
import HelpIcon from '../Assets/drawable-xhdpi/baseline_help_24_px.png';
import FeedbackIcon from '../Assets/drawable-xhdpi/baseline_feedback_24_px.png';

import HomeRoute from '../../src/Routing/HomeRoute'
import LoginRoute from '../Routing/LoginRoute.js';
import WalletRoute from '../Routing/WalletRoute.js';
import NotificationRoute from './NotificationRoute.js';
import ProfileRoute from './ProfileRoute.js';

import NotificationScreen from '../Screens/Notification.js'

import ArchiveScreen from '../Screens/Archive.js'
import HistoryScreen from '../Screens/History.js'
import SettingScreen from '../Screens/Setting.js'
import HelpScreen from '../Screens/Help.js'
import SendUsFeedbackScreen from '../Screens/SendUsFeedBack.js'
import ReferralCodeScreen from '../Screens/ReferralCode'

import CardDetailScreen from '../Screens/CardDetail.js'
import PointsDetail from '../Screens/PointsDetail.js'
import RewardsInfo from '../Screens/RewardsInfo.js'


import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, Header } from 'react-navigation-stack';

import drawerContentComponent from '../Components/drawerContentComponent.js'
import { LButton } from '../Components/CustomButton';

global.currentScreenIndex = 0;

/*
Notes:
titleHeaderStyle = no padding
titleHeaderStyle2 = withPaddingRight 20%
*/

const dimH = Dimensions.get('window').height;

const styles = StyleSheet.create({
  icon: {
    width: '25%',
    height: '90%',
    justifyContent: "center",
    alignItems: 'center',
    // tintColor:'black'
    // tintColor:'#2096f3'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linearGradient: {
    width: wp('100%'),
    height: Platform.OS === "ios" && (dimH == 812 || dimH == 896) ? Header.HEIGHT + 24 : Header.HEIGHT
  },
  headertitle: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "900",
    textAlignVertical: "center"
  },
  titleHeaderStyle: {
    textAlign: "center",
    flex: 1,
    color: 'white',
    fontSize: 18
  },
  titleHeaderStyle2: {
    textAlign: "center",
    flex: 1,
    paddingRight: Platform.OS === "ios" ? null : '20%',
    color: 'white',
    fontSize: 18
  }
})

const gradientHeader = () => {
  return (<LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={['#3f9cc5', '#6768a8']}
    style={styles.linearGradient} />
  )
}

export const buttonBack = (navigation) => {
  return <HeaderBack onPress={() => navigation.goBack(null)} />
}



const WalletStacker = createStackNavigator({
  walletStack: {
    screen: WalletRoute,
    navigationOptions: {
      title: "Wallet",
      headerBackground: gradientHeader(),
      headerTitleStyle: styles.titleHeaderStyle,
    }
  },
  cardDetail: {
    screen: CardDetailScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft:
          <HeaderBack
            onpress={() => navigation.goBack(null)}
          />,
        headerRight: null,
        headerStyle: {
          backgroundColor: '#3f9cc5'
        },
        headerTitle:
          <LHTitle
            header="Card Details"
          />
      }
    }
  },
  pointsDetail: {
    screen: PointsDetail,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft:
          <TouchableWithoutFeedback
            onPress={() => navigation.goBack(null)}
            underlayColor='#ffffff'
          >
            <Image
              source={require('../Assets/drawable-xhdpi/shape.png')}
              style={{ width: wp('5%'), height: hp('2%'), marginLeft: wp('5%') }}
            />
          </TouchableWithoutFeedback>,
        headerStyle: {
          backgroundColor: '#3f9cc5'
        },
        headerTitle:
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3f9cc5', '#6768a8']}
            style={styles.linearGradient}>
            <Text
              style={{ fontSize: 18, textAlign: 'center', color: '#fff', fontWeight: '700' }}
            >Points Detail</Text>
          </LinearGradient>,
        headerRight:
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('HowToGetPoint')}>
            <Image
              source={require('../Assets/drawable-xhdpi/questionmark.png')}
              style={{ width: wp('7%'), height: hp('4%'), marginRight: wp('5%') }}
            />
          </TouchableWithoutFeedback>
      }
    }
  },
  rewardsInfo: {
    screen: RewardsInfo,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft:
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('cardDetail')}
            underlayColor='#ffffff'
          >
            <Image
              source={require('../Assets/drawable-xhdpi/shape.png')}
              style={{ width: wp('5%'), height: hp('2%'), marginLeft: wp('5%') }}
            />
          </TouchableWithoutFeedback>,
        headerRight: null,
        headerStyle: {
          backgroundColor: '#3f9cc5'
        },
        headerTitle:
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3f9cc5', '#6768a8']}
            style={styles.linearGradient}>
            <Text
              style={{ fontSize: 18, textAlign: 'center', color: '#fff', fontWeight: '700' }}
            >Info Rewards</Text>
          </LinearGradient>
      }
    }
  }
},
  {
    initialRouteName: 'walletStack',
    headerLayoutPreset: 'center'
  }
)

WalletStacker.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <LButton
          onPress={() => this.props.navigation.navigate('pointsDetail')}
          text="Dismiss"
        />
      </View>
    );
  }
}

const PointsDetailStacker = createStackNavigator(
  {
    Wallet: WalletStacker,
    HowToGetPoint: { screen: ModalScreen },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'Wallet'
  }
);

const ArchiveStacker = createStackNavigator({

  archive: {
    screen: ArchiveScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft:
          <HeaderBack
            onpress={() => navigation.goBack(null)}
          />,
        headerRight: null,
        headerStyle: {
          backgroundColor: '#3f9cc5'
        },
        headerTitle:
          <LHTitle2
            header="Archive Cards"
          />
      }
    }
  }
}, {
  headerLayoutPreset: 'center'
})

const HistoryStacker = createStackNavigator({
  history: {
    screen: HistoryScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft:
          <HeaderBack
            onpress={() => navigation.goBack(null)}
          />,
        headerRight: null,
        headerStyle: {
          backgroundColor: '#3f9cc5'
        },
        headerTitle:
          <LHTitle2
            header="History"
          />
      }
    }
  }
}, {
  headerLayoutPreset: 'center'
})

const SettingsStacker = createStackNavigator({
  settings: {
    screen: SettingScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft:
          <HeaderBack
            onpress={() => navigation.goBack(null)}
          />,
        headerRight: null,
        headerStyle: {
          backgroundColor: '#3f9cc5'
        },
        headerTitle:
          <LHTitle2
            header="Settings"
          />
      }
    }
  }
}, {
  headerLayoutPreset: 'center'
})

const HelpStacker = createStackNavigator({
  help: {
    screen: HelpScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft:
          <HeaderBack
            onpress={() => navigation.goBack(null)}
          />,
        headerRight: null,
        headerStyle: {
          backgroundColor: '#3f9cc5'
        },
        headerTitle:
          <LHTitle2
            header="Help"
          />
      }
    }
  }
}, {
  headerLayoutPreset: 'center'
})

const SendUsFeedbackStacker = createStackNavigator({
  sendUsFeedback: {
    screen: SendUsFeedbackScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft:
          <HeaderBack
            onpress={() => navigation.goBack(null)}
          />,
        headerRight: null,
        headerStyle: {
          backgroundColor: '#3f9cc5'
        },
        headerTitle:
          <LHTitle2
            header="Send Us Feedback"
          />
      }
    }
  }
}, {
  headerLayoutPreset: 'center'
})

const ReferralCodeStacker = createStackNavigator({
  referralCode: {
    screen: ReferralCodeScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft:
          <HeaderBack
            onpress={() => navigation.goBack(null)}
          />,
        headerRight: null,
        headerStyle: {
          backgroundColor: '#3f9cc5'
        },
        headerTitle:
          <LHTitle2
            header="Referral Code"
          />
      }
    }
  }
}, {
  headerLayoutPreset: 'center'
})

const Tabs = createBottomTabNavigator(
  {
    home: {
      screen: HomeRoute,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <TabIcon
            tintcolor={tintColor}
            icon={HomeIcon}

          />
        )
      }
    },
    wallet: {
      screen: WalletRoute,
      navigationOptions: {
        tabBarLabel: 'Wallet',
        tabBarIcon: ({ tintColor }) =>
          <TabIcon
            tintcolor={tintColor}
            icon={WalletIcon}
          />
      }
    },
    notification: {
      screen: NotificationRoute,
      navigationOptions: {
        tabBarLabel: 'Notification',
        tabBarIcon: ({ tintColor }) =>
          <TabIcon
            tintcolor={tintColor}
            icon={BellIcon}
          />

      }
    },
    profile: {
      screen: ProfileRoute,
      navigationOptions: ({ navigation }) => {
        let tabBarVisible;
        if (navigation.state.routes.length > 1) {
          navigation.state.routes.map(route => {
            let routeName = route.routeName
            if (routeName === "EditProfile" || routeName === "ChangePassword" || routeName == "Help" || routeName =="MyReward") {
              tabBarVisible = false;
            } else {
              tabBarVisible = true;
            }
          })
        }
        return {
          tabBarLabel: 'Profile',
          tabBarIcon: ({ tintColor }) =>
            <TabIcon
              tintcolor={tintColor}
              icon={ProfileIcon}
            />,
          tabBarVisible
        }
      }
    }
  }, {
  tabBarOptions: {
    style: {
      height: hp(12.3),
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: hp('2%'),
    },
    labelStyle: {
      fontSize: 12,
      fontFamily: "NunitoSans-SemiBold"
    },
    activeTintColor: '#2096f3',
    inactiveTintColor: '#505050'
  }
}, {
  navigationOptions: {
    style: { flex: 1 }
  }
}
);

const Draw = createDrawerNavigator({

  Home: {
    screen: Tabs,
  },

  archiveStack: {
    screen: ArchiveStacker,
    navigationOptions: {
      drawerLabel: 'Archive',
      drawerIcon:
        <DrawerIcon
          icon={ArchiveIcon}
        />
    }
  },
  historyStack: {
    screen: HistoryStacker,
    navigationOptions: {
      drawerLabel: 'History',
      drawerIcon:
        <DrawerIcon
          icon={HistoryIcon}
        />
    }
  },
  settingStack: {
    screen: SettingsStacker,
    navigationOptions: {
      drawerLabel: 'Settings',
      drawerIcon:
        <DrawerIcon
          icon={SettingsIcon}
        />
    }
  },
  helpStack: {
    screen: HelpStacker,
    navigationOptions: {
      drawerLabel: 'Help',
      drawerIcon:
        <DrawerIcon
          icon={HelpIcon}
        />
    }
  },
  sendUsFeedbackStack: {
    screen: SendUsFeedbackStacker,
    navigationOptions: {
      drawerLabel: 'Send Us Feedbacks',
      drawerIcon:
        <DrawerIcon
          icon={FeedbackIcon}
        />
    }
  },
  referralCodeStack: {
    screen: ReferralCodeStacker,
    navigationOptions: {
      drawerLabel: 'Referral Code'
    }
  },
},
  {
    drawerPosition: 'right',
    contentComponent: drawerContentComponent,
    overlayColor: 0
  },
);

export const Switch = createSwitchNavigator({
  LoginRoute,
  Drawer: { screen: Draw },
  PointsDetailStacker
}, { initialRouteName: 'Drawer' })