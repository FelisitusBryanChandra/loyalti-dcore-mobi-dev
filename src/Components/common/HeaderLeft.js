import React, { Component } from 'react'
import { TouchableWithoutFeedback, Image } from 'react-native'

export default HeaderRight = (props) => (
  <TouchableWithoutFeedback
    onPress={() => props.navigation.goBack(null)}
    underlayColor='#ffffff'>
    <Image
      source={require('../../Assets/drawable-xhdpi/shape.png')}
      style={{ width: 20, height: 20, marginLeft: 20 }}
    />
  </TouchableWithoutFeedback>
)
