import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import ComponentHeaderTitle from '../Components/common/HeaderTitle'
import ComponentHeaderRight from '../Components/common/HeaderRight'
import ComponentHeaderLeft from '../Components/common/HeaderLeft'
import ComponentHeaderGradient from '../Components/common/HeaderGradient'

import IndexScreen from '../Screens/Profile/IndexScreen';
import EditProfileScreen from '../Screens/Profile/EditProfile';
import { GradientHeader, HeaderStyles, HeaderBack } from '../Components/CustomHeader';
import ChangePassword from '../Screens/Profile/ChangePassword';
import Help from '../Screens/Profile/Help';
import MyReward from '../Screens/Profile/MyReward';


export default createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions: () => ({
            headerTitle: "Profile",
            headerLeft: null
        })
    },
    EditProfile: {
        screen: EditProfileScreen,
        navigationOptions: () => ({
            headerTitle: "Edit Profile",
        })
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: () => ({
            headerTitle: "Change Password",
        })
    },
    Help: {
        screen: Help,
        navigationOptions: () => ({
            headerTitle: "Help",
        })
    },
    MyReward: {
        screen: MyReward,
        navigationOptions: () => ({
            headerTitle: "My Reward",
        })
    }
},
    {
        initialRouteName: 'Index',
        defaultNavigationOptions: ({navigation}) => ({
            headerTitle: <ComponentHeaderTitle />,
            headerTitleStyle: {
            color: "#FFF"
            },
            headerRight: <ComponentHeaderRight navigation={navigation} />,
            headerLeft: <ComponentHeaderLeft navigation={navigation} />,
            headerBackground: ComponentHeaderGradient()
        })
    });