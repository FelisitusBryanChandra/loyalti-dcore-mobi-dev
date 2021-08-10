import React, { Component } from 'react'
import { View , Image, StyleSheet, FlatList} from 'react-native'
import * as MButton from '../../Components/CustomButton'
import * as MText from '../../Components/CustomText'
import star from '../../Assets/drawable-hdpi/star.png'

const data = [{
  id: 1
},{
  id: 2
},{
  id: 3
}]

const style = StyleSheet.create({
  block: {
    padding: 15
  },
  item: {
    flex: 1,
    backgroundColor: "#FFF",
  },
})

export default class LocationScreen extends Component {
  render() {
    return (
      <View style={style.block}>
        <MText.STextSemiBold style={{fontSize: 16, marginBottom: 20}}>Location</MText.STextSemiBold>
        <FlatList data={data} keyExtractor={item => item.id} renderItem={({item, index}) => {
            return (
              <View style={{...style.item, marginBottom: 20}}>
                <View>
                  <MText.SText>ChaTime Pacific Place</MText.SText>
                  <MText.STextLight>Pacific Place lt. G SCBD Lot 9 Jl. Jendral Sudirman Kav.52-53 Jakarta Selatan</MText.STextLight>
                  <View style={{flexDirection: "row"}}>
                    <View><MText.STextLight style={{width: 120}}>Phone</MText.STextLight></View>
                    <View><MText.STextLight>: 08128128128</MText.STextLight></View>
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <View><MText.STextLight style={{width: 120}}>Operation Hours</MText.STextLight></View>
                    <View><MText.STextLight>: 22.00 - 23.00</MText.STextLight></View>
                  </View>
                  <MText.STextLight><Image style={{width: 10, height: 15}} source={require("../../Assets/drawable-hdpi/pin.png")} /> 0.5 km</MText.STextLight>
                  <View style={{flexDirection: "row", marginVertical: 12}}>
                    <MButton.CommonButtonLarge inverted text="VIEW MAPS" type="bold" extraStyleButton={{flex: 0, marginRight: 10}} />
                    <MButton.CommonButtonLarge text="CALL" type="bold" extraStyleButton={{flex: 0}} />
                  </View>
                </View>
              </View>
            )}} />
      </View>
    )
  }
}
