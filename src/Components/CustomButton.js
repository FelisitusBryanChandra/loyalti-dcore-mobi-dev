import React from 'react'
import { SText, STextSemiBold, STextLight, STextBold } from './CustomText'
import { TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import arrowRight from '../Assets/drawable-xhdpi/chevron_right.png';
import arrowBottom from '../Assets/drawable-xhdpi/arrow_bottom.png';
import * as CONST from '../Config/Constants';

export const LButton = (props) => (
  <TouchableOpacity
    activeOpacity={props.opacity}
    style={props.style}
    onPress={props.onPress}
  >
    <SText
      style={props.textStyle}>{props.text}</SText>
  </TouchableOpacity>
)

export const CustomButtonSelection = ({ title, actionPressed, left, right, onPressed }) => {
  return (
    <TouchableOpacity style={[styles.buttonSelectionStyle, {
      backgroundColor: actionPressed ? CONST.COMMON_BLUE : 'white',
      borderBottomLeftRadius: left ? 5 : 0,
      borderTopLeftRadius: left ? 5 : 0,
      borderBottomRightRadius: right ? 5 : 0,
      borderTopRightRadius: right ? 5 : 0,
      flex: 1
    }]}
      onPress={onPressed}>
      <SText style={{ color: actionPressed ? 'white' : CONST.COMMON_BLUE}}>{title}</SText>
    </TouchableOpacity>
  )
}

export const CustomButtonWithContent = ({ icon, extraStyle, text, onPressed }) => {
  return (
    <TouchableOpacity style={styles.buttonWithContentStyle} onPress={onPressed}>
      <Image source={icon} style={[styles.imageContentStyle, extraStyle]} />
      <View style={styles.dividedStyle} />
      <STextSemiBold style={styles.textContentStyle}>{text}</STextSemiBold>
    </TouchableOpacity>
  )
}

export const CustomButtonTextWithContent = ({ text, icon, extraImageStyle, extraViewStyle, onPressed }) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={onPressed}>
        <View
          style={[styles.buttonTextWithContentStyle, extraViewStyle]}>
          <View style={{ width: wp(12) }}>
            <Image
              style={extraImageStyle}
              source={icon} />
          </View>
          <SText>{text}</SText>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export const CustomButtonTextRounded = ({ text, icon, extraImageStyle, extraTextStyle, onPressed, isShadow = false, extraButtonStyle }) => {
  return (
    <TouchableOpacity style={[styles.customButtonTextRoundedStyle, extraButtonStyle,
    isShadow ? styles.shadowStyle : null]}
      onPress={onPressed}>
      <SText
        style={[{ alignSelf: 'center' }, extraTextStyle]}>{text}</SText>
      <Image
        style={[styles.imageContentStyle, extraImageStyle]}
        source={icon} />
    </TouchableOpacity>
  )
}

export const CommonButtonLarge = ({ onpressed, text, extraStyleButton, extraTextStyle, inverted}) => {
  return (
    <TouchableOpacity
      style={[styles.commonButtonLargetStyle, inverted ? styles.commonButtonLargeInvertStyle : {}, extraStyleButton]}
      onPress={onpressed}>
      <STextSemiBold style={[styles.buttonLargeTextStyle, inverted ? styles.buttonLargeTextInvertStyle : {}, extraTextStyle]}>{text}</STextSemiBold>
    </TouchableOpacity>
  )
}

export const CommonButtonText = ({ onpressed, text, type, extraStyle, extraStyleButton }) => {
  return (
    <TouchableOpacity
      style={extraStyleButton}
      onPress={onpressed}>
      {type === "regular" ? <SText style={[styles.commonButtonTextStyle, { extraStyle }]}>{text}</SText> : null}
      {type === "light" ? <STextLight style={[styles.commonButtonTextStyle, { extraStyle }]}>{text}</STextLight> : null}
      {type === "semi-bold" ? <STextSemiBold style={[styles.commonButtonTextStyle, { extraStyle }]}>{text}</STextSemiBold> : null}
      {type === "bold" ? <STextBold style={[styles.commonButtonTextStyle, { extraStyle }]}>{text}</STextBold> : null}
    </TouchableOpacity>
  )
}

export const CustomFlatTextButton = ({ text, icon, extraViewStyle, extraImageStyle, itsButton = true, onPressed }) => {
  return (
    <View>
      <View
        style={styles.borderSingleLineButtonStyle} />
      <TouchableWithoutFeedback
        onPress={onPressed}>
        <View
          style={[styles.flatTextButtonStyle, extraViewStyle]}>
          <SText >{text}</SText>
          {itsButton ? <Image
            style={[extraImageStyle, { alignSelf: 'center' }]}
            source={icon} /> : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export const CustomFlatTextButtonBorderBot = ({ text, icon, extraViewStyle, isChecked = false, extraImageStyle, itsButton = true, onPressed }) => {
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={onPressed}>
        <View
          style={[styles.flatTextButtonStyle, { margin: 0, marginVertical: wp(4) }, extraViewStyle]}>
          {isChecked ? <STextBold style={{ color: CONST.COMMON_BLUE }}>{text}</STextBold> : <SText >{text}</SText>}
          {itsButton || isChecked ? <Image
            style={[extraImageStyle, { alignSelf: 'center' }]}
            source={icon} /> : null}
        </View>
      </TouchableWithoutFeedback>
      <View
        style={[styles.borderSingleLineButtonStyle, { color: '#979797' }]} />
    </View>
  )
}


export const CustomExpandedButton = (props) => {
  return (
    <View >
      <TouchableWithoutFeedback onPress={props.onPressed}
        style={{ marginBottom: wp(6.93) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: wp(3.73) }}>
          <SText>{props.text}</SText>
          <Image source={props.expanded ? arrowBottom : arrowRight}
            style={props.expanded ? { height: wp(1.87), width: wp(3.2) } : { width: wp(1.87), height: wp(3.2) }} />
        </View>
      </TouchableWithoutFeedback>
      <View
        style={[styles.borderSingleLineButtonStyle, props.expanded ? styles.shadowStyle : null]} />
      {props.expanded ? <View >
        {props.children}
        <View
          style={[styles.borderSingleLineButtonStyle,]} />
      </View> : null}
    </View>
  )

}

const styles = StyleSheet.create({
  buttonSelectionStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: wp('45%'),
    // height: hp('7%'),
    paddingVertical: 10,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  customButtonTextRoundedStyle: {
    width: wp(29, 33),
    height: wp(10, 67),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    justifyContent: 'center'
  },
  shadowStyle: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonWithContentStyle: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    width: wp(44),
    height: wp(16),
    margin: wp(1),
    backgroundColor: "#ffffff",
    justifyContent: 'center',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContentStyle: {
    alignSelf: "center"
  },
  flatTextButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: wp(4)
  },
  buttonTextWithContentStyle: {
    flexDirection: 'row',
    margin: wp(2.65),
    marginLeft: wp(4),
    marginTop: wp(5.33)
  },
  dividedStyle: {
    borderColor: "#c1c1c1",
    height: wp(9.3),
    alignSelf: "center",
    borderWidth: 0.5,
    marginHorizontal: wp(4.2)
  },
  borderSingleLineButtonStyle: {
    borderWidth: '100%',
    borderColor: '#c1c1c1',
    borderWidth: 0.5
  },
  textContentStyle: {
    alignSelf: "center",
    color: CONST.COMMON_BLUE,
    fontSize: 16
  },
  commonButtonLargetStyle: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    padding: 10,
    flex: 1,
    // height: wp(10.6),
    backgroundColor: '#2096f3',
    alignItems: 'center',
    borderRadius: 5,
  },
  commonButtonLargeInvertStyle: {
    backgroundColor: '#FFF',
    borderColor: "#2096f3", 
    borderWidth: 1
  },
  buttonLargeTextStyle: {
    color: '#fff',
    fontSize: 17,
  },
  buttonLargeTextInvertStyle: {
    color: '#2096f3',
    fontSize: 17,
  },
  commonButtonTextStyle: {
    fontSize: 14,
    color: '#2096f3'
  },
})