import React, { Component } from 'react'
import { TouchableWithoutFeedback, Image } from 'react-native'

import MenuIcon from '../../Assets/menu.png';

export default HeaderRight = (props) => (
  <TouchableWithoutFeedback onPress={() => props.navigation.openDrawer()}>
    <Image
      source={MenuIcon}
      style={{ width: 20, height: 20, marginHorizontal: 20 }}
    />
  </TouchableWithoutFeedback>
)
