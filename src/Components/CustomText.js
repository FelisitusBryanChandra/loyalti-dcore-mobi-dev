import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

/*
Notes:
SText = Standard Text
*/

export let typography = StyleSheet.create({
  font: {
    fontFamily: "NunitoSans-Regular"
  },
  fontBold: {
    fontFamily: "NunitoSans-Bold"
  },
  fontSemiBold: {
    fontFamily: "NunitoSans-SemiBold"
  },
  fontLight: {
    fontFamily: "NunitoSans-Light"
  },
  fontLightItalic: {
    fontFamily: 'NunitoSans-LightItalic'
  }
})

export let main = StyleSheet.create({
  heading: {
    fontSize: 10
  }
})

export const SText = (props) => (
  <Text {...props} style={[{ fontSize: 14, color: "#505050" }, props.style, typography.font]}>{props.children}</Text>
)
export const STextBold = (props) => (
  <Text {...props} style={[{ fontSize: 14, color: "#505050" }, props.style, typography.fontBold]}>{props.children}</Text>
)
export const STextSemiBold = (props) => (
  <Text {...props} style={[{ fontSize: 14, color: "#505050" }, props.style, typography.fontSemiBold]}>{props.children}</Text>
)
export const STextLight = (props) => (
  <Text {...props} style={[{ fontSize: 14, color: "#505050" }, props.style, typography.fontLight]}>{props.children}</Text>
)
export const STextLightItalic = (props) => (
  <Text {...props} style={[{ fontSize: 14, color: "#505050" }, props.style, typography.fontLightItalic]}>{props.children}</Text>
)
export const LHText = (props) => (
  <View
    style={styles.title}>
    <Text
      style={[styles.header, typography.fontBold]}>
      {props.header}
    </Text>
    <TouchableOpacity
      onPress={props.onPress}>
      <Text
        style={styles.subheader}>
        {props.subheader}</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  title:
  {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: wp('2%')
  },
  header: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: '1%'
  },
  subheader: {
    fontSize: 12,
    color: '#4b8cbc',
    textAlignVertical: "center",
    marginTop: '35%',
  }
})