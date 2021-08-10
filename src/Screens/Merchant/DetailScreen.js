import React, { Component } from 'react'
import { View , Image, StyleSheet, FlatList, Dimensions} from 'react-native'
import HTML from 'react-native-render-html';
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
  block: {
    borderTopWidth: 1, 
    borderTopColor: "#CCC",
    padding: 15
  },
  ratingBlock: {
    flexDirection: "row",
    alignItems: "center"
  },
  ratingBar: {
    height: 15,
    backgroundColor: "#EEE",
    flex: 1
  },
  star: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  ratingScore: {
    fontSize: 18,
    marginRight: 11
  }
})

export default class DetailScreen extends Component {

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
        <View style={{flexDirection: "row", padding: 15}}>
            <MText.STextSemiBold style={{fontSize: 24}}>CHATIME</MText.STextSemiBold>
          </View>
          <View style={style.block}>
            <View style={{flexDirection: "row", marginBottom: 30}}>
              <View style={{alignItems: "center"}}>
                <MText.STextSemiBold style={{fontSize: 60}}>4.2</MText.STextSemiBold>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Image style={{width: 10, height: 10, marginRight: 5}} source={require("../../Assets/drawable-hdpi/user.png")} />
                  <MText.STextSemiBold style={{fontSize: 12}}>25 Total</MText.STextSemiBold>
                </View>
              </View>
              <View style={{flex: 1, marginLeft: 15}}>
                <View style={{...style.ratingBlock}}>
                  <Image style={{...style.star}} source={star} />
                  <MText.STextSemiBold style={{...style.ratingScore}}>5</MText.STextSemiBold>
                  <View style={{...style.ratingBar, flex: 0.24, backgroundColor: "#73c718"}}></View>
                </View>
                <View style={{...style.ratingBlock}}>
                  <Image style={{...style.star}} source={star} />
                  <MText.STextSemiBold style={{...style.ratingScore}}>4</MText.STextSemiBold>
                  <View style={{...style.ratingBar, flex: 0.51, backgroundColor: "#a3ea55"}}></View>
                </View>
                <View style={{...style.ratingBlock}}>
                  <Image style={{...style.star}} source={star} />
                  <MText.STextSemiBold style={{...style.ratingScore}}>3</MText.STextSemiBold>
                  <View style={{...style.ratingBar, flex: 0.03, backgroundColor: "#f8e71c"}}></View>
                </View>
                <View style={{...style.ratingBlock}}>
                  <Image style={{...style.star}} source={star} />
                  <MText.STextSemiBold style={{...style.ratingScore}}>2</MText.STextSemiBold>
                  <View style={{...style.ratingBar, flex: 0.15, backgroundColor: "#f5a623"}}></View>
                </View>
                <View style={{...style.ratingBlock}}>
                  <Image style={{...style.star}} source={star} />
                  <MText.STextSemiBold style={{...style.ratingScore}}>1</MText.STextSemiBold>
                  <View style={{...style.ratingBar, flex: 0.07, backgroundColor: "#d0021b"}}></View>
                </View>
              </View>
            </View>
            <View>
              <View>
                <MText.STextSemiBold style={{fontSize: 12, marginBottom: 5}}>Wanda</MText.STextSemiBold>
                <View style={{flexDirection: "row", marginBottom: 8}}>
                  {this.generateStars(5)}
                </View>
                <MText.STextLightItalic>"Wonderfull, great apps"</MText.STextLightItalic>
                <MText.SText style={{fontSize: 12}}>12-12-2012</MText.SText>
              </View>
            </View>
          </View>
          <View style={style.block}>
            <MText.STextSemiBold style={{fontSize: 16}}>About Us</MText.STextSemiBold>
            <HTML style={{marginVertical: 20}} baseFontStyle={{fontSize:14, fontFamily: "NunitoSans-Light", color: "#505050"}} html="<p>Graece donan, Latine voluptatem vocant. Neminem videbis ita laudatum, ut artifex callidus comparandarum voluptatum diceretur. Scientiam pollicentur, quam non erat mirum sapientiae cupido patria esse cariorem. Negat esse eam, inquit, propter se expetendam. </p><ol> <li>Qui autem diffidet perpetuitati bonorum suorum, timeat necesse est, ne aliquando amissis illis sit miser.</li><li>Qua igitur re ab deo vincitur, si aeternitate non vincitur?</li><li>Iam id ipsum absurdum, maximum malum neglegi.</li><li>Sed quanta sit alias, nunc tantum possitne esse tanta.</li></ol>" />
          </View>
          <View style={style.block}>
            <MText.STextSemiBold style={{fontSize: 16, marginBottom: 17}}>Gallery</MText.STextSemiBold>
            <FlatList data={data} keyExtractor={item => item.id} numColumns={3} renderItem={({item, index}) => {
              console.log((index) % 3)
            return (
              <View style={{width: (Dimensions.get("screen").width - 30) / 3, position: "relative", marginTop: (index > 2 ? 11 : 0), alignItems: (index % 3 == 1 ? "center" : (index % 3 == 0 ? "flex-start" : "flex-end"))}}>
                <Image
                  source={{ uri: "https://cdn2.tstatic.net/travel/foto/bank/images/chatime_20180923_145738.jpg" }}
                  style={{width: 109, height: 109, borderRadius: 5}}
                />
                {index + 1 == data.length && (
                  <View style={{width: 109, height: 109, position: "absolute", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0, 0.7)", borderRadius: 5}}>
                    <MText.STextLight style={{color: "#FFF"}}>More +</MText.STextLight>
                  </View>
                )}
              </View>
            )}} />
          </View>
          <View style={style.block}>
            <MText.STextSemiBold style={{fontSize: 16}}>Media Social</MText.STextSemiBold>
            <View style={{flexDirection: "row", marginTop: 18}}>
              <Image style={{width: 36, height: 36, marginRight: 14}} source={require("../../Assets/drawable-hdpi/fbIcon.png")} />
              <Image style={{width: 36, height: 36, marginRight: 14}} source={require("../../Assets/drawable-hdpi/twitterIcon.png")} />
              <Image style={{width: 36, height: 36, marginRight: 14}} source={require("../../Assets/drawable-hdpi/igIcon.png")} />
              <Image style={{width: 36, height: 36, marginRight: 14}} source={require("../../Assets/drawable-hdpi/googleIcon.png")} />
              <Image style={{width: 36, height: 36, marginRight: 14}} source={require("../../Assets/drawable-hdpi/linkedinIcon.png")} />
              <Image style={{width: 36, height: 36, marginRight: 14}} source={require("../../Assets/drawable-hdpi/waIcon.png")} />
            </View>
          </View>
          <View style={style.block}>
            <MText.STextSemiBold style={{fontSize: 16}}>Website</MText.STextSemiBold>
            <MText.STextLight>https://www.chatime.co.id</MText.STextLight>
          </View>
      </View>
    )
  }
}
