import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import ComponentHeaderTitle from '../Components/common/HeaderTitle'
import ComponentHeaderRight from '../Components/common/HeaderRight'
import ComponentHeaderLeft from '../Components/common/HeaderLeft'
import ComponentHeaderGradient from '../Components/common/HeaderGradient'

import IndexScreen from '../Screens/Wallet/IndexScreen';

export default createStackNavigator({
    IndexWallet: {
        screen: IndexScreen,
        navigationOptions: () => ({
            headerTitle: "Wallet",
            headerLeft: null
        })
    }
},
{
    initialRouteName:'IndexWallet',
    defaultNavigationOptions: ({navigation}) => ({
        headerTitle: <ComponentHeaderTitle />,
        headerTitleStyle: {
        color: "#FFF"
        },
        headerRight: <ComponentHeaderRight navigation={navigation} />,
        headerLeft: <ComponentHeaderLeft navigation={navigation} />,
        headerBackground: ComponentHeaderGradient()
    })
})