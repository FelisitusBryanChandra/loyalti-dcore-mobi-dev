import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from '../Screens/Login/IndexScreen';
import RegisterScreen from '../Screens/Login/Register';
import ForgotPasswordScreen from '../Screens/Login/ForgotPassword';
import { GradientHeader, HeaderStyles, HeaderBack } from '../Components/CustomHeader';

export default createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    register: {
        screen: RegisterScreen,
        navigationOptions: ({ navigation }) => {
            return {
                title: "Register",
                headerBackground: GradientHeader(),
                headerTitleStyle: HeaderStyles.commonHeader2,
                headerLeft: <HeaderBack onPress={() => navigation.goBack(null)} />
            }
        }
    },
    forgotPass: {
        screen: ForgotPasswordScreen,
        navigationOptions: ({ navigation }) => {
            return {
                title: "Forgot Password",
                headerBackground: GradientHeader(),
                headerTitleStyle: HeaderStyles.commonHeader2,
                headerLeft: <HeaderBack onPress={() => navigation.goBack(null)} />
            }
        }
    }
}, {
    initialRouteName: "Index"
})