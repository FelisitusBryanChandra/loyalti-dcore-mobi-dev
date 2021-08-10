import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default gradientHeader = () => {
  return (<LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={['#3f9cc5', '#6768a8']}
    style={{flex: 1}} />
  )
}