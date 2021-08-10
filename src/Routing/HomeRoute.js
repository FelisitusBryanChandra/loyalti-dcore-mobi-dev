import React from 'react';
import { Text, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import { createStackNavigator, Header } from 'react-navigation-stack';

import ComponentHeaderTitle from '../Components/common/HeaderTitle'
import ComponentHeaderRight from '../Components/common/HeaderRight'
import ComponentHeaderLeft from '../Components/common/HeaderLeft'
import ComponentHeaderGradient from '../Components/common/HeaderGradient'

import HomeScreen from '../Screens/Home.js'
import PromoDetail from '../Screens/PromoDetail.js'
import PromoList from '../Screens/PromoList.js'
import ProgramDetail from '../Screens/Program/DetailScreen'
import Tier from '../Screens/Program/TierScreen'
import MerchantProfile from '../Screens/Merchant/ProfileScreen'

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
    flex: 1
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

const HomeStacker = createStackNavigator({
  homeStack: {
    screen: HomeScreen,
    navigationOptions: () => ({
      headerLeft: null
    })
  },
  promoDetail: {
    screen: PromoDetail,
    navigationOptions: () => ({
      headerRight: null,
      headerTitle: "Promo Detail"
    })
  },
  promoList: {
    screen: PromoList,
    navigationOptions: ({ navigation }) => ({
      headerRight: null,
      headerTitle: navigation.getParam("headerPromo")
    })
  },
  programDetail: {
    screen: ProgramDetail,
    navigationOptions: () => ({
      headerRight: null,
    })
  },
  tier: {
    screen: Tier,
    navigationOptions: () => ({
      headerRight: null,
    })
  },
  merchantDetail: {
    screen: MerchantProfile,
    navigationOptions: () => ({
      headerRight: null,
    })
  },
},
  {
    initialRouteName: 'homeStack',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({navigation}) => ({
      headerTitle: <ComponentHeaderTitle />,
      headerTitleStyle: {
        color: "#FFF"
      },
      headerRight: <ComponentHeaderRight navigation={navigation} />,
      headerLeft: <ComponentHeaderLeft navigation={navigation} />,
      headerBackground: ComponentHeaderGradient()
    })
  }
)

// HomeStacker.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }
//   return {
//     tabBarVisible
//   }
// }

export default HomeStacker;