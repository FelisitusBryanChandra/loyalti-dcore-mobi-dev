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
},{
  id: 4
},{
  id: 5
},{
  id: 6
}]

const style = StyleSheet.create({
  item: {
    marginHorizontal: 15,
    flex: 1,
    paddingVertical: 9,
    paddingStart: 16,
    paddingEnd: 13,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderRadius: 5
  },
  star: {
    width: 13,
    height: 13,
    marginRight: 7
  }
})

export default class ProgramScreen extends Component {
  generateStars = (n) => {
    let stars = []
    for(var i = 0; i < n; i++){
      stars.push(<Image style={{...style.star}} source={star} />)
    }

    return stars
  }
  render() {
    return (
      <View>
        <FlatList data={data} keyExtractor={item => item.id} renderItem={({item, index}) => {
            return (
              <View style={{...style.item, marginTop: 4, marginBottom: 16, flexDirection: "row"}}>
                <Image
                  source={{ uri: "https://images.liven.com.au/u/c/chatime/l/J8L26VQC4.png" }}
                  style={{width: 109, height: 109, borderRadius: 5}}
                />
                <View style={{flex: 1, marginLeft: 12}}>
                  <MText.STextSemiBold style={{fontSize: 18, marginBottom: 5}} numberOfLines={1}>Shihlin (Lorem Ipsum dolor sit amet)</MText.STextSemiBold>
                  <MText.STextLight style={{fontSize: 10, marginBottom: 8}}>Valid from <MText.STextSemiBold style={{fontSize: 10}}>09/12/2018</MText.STextSemiBold> to <MText.STextSemiBold style={{fontSize: 10}}>09/12/2019</MText.STextSemiBold></MText.STextLight>
                  <View style={{flexDirection: "row", marginBottom: 17}}>
                    {this.generateStars(5)}
                  </View>
                  <MButton.CommonButtonLarge text="JOIN PROMO" extraStyleButton={{flex: 0, alignSelf: "flex-end"}} extraTextStyle={{fontSize: 12}} />
                </View>
              </View>
            )}} />
      </View>
    )
  }
}
