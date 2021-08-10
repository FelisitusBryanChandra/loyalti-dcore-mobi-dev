import React, { Component } from 'react'
import { TouchableWithoutFeedback, Image } from 'react-native'

export default HeaderTitle = (props) => (
  <Image
    source={require('../../Assets/HeaderWhite.png')}
    style={{ width: 150, height: 31, alignSelf: 'center' }} />
)
