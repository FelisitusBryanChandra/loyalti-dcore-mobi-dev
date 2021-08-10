import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import ComponentHeaderTitle from '../Components/common/HeaderTitle'
import ComponentHeaderRight from '../Components/common/HeaderRight'
import ComponentHeaderLeft from '../Components/common/HeaderLeft'
import ComponentHeaderGradient from '../Components/common/HeaderGradient'

import IndexScreen from '../Screens/Notification';

export default createStackNavigator({
    IndexNotification: {
        screen: IndexScreen,
        navigationOptions: () => ({
            headerTitle: "Notification",
            headerLeft: null
        })
    }
},
{
    initialRouteName:'IndexNotification',
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