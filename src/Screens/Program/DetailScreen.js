import React, { Component } from 'react'
import { Text, View , Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import HTML from 'react-native-render-html';
import * as MText from '../../Components/CustomText'
import * as MButton from '../../Components/CustomButton'

const style = StyleSheet.create({
  block: {
    borderTopWidth: 1, 
    borderTopColor: "#CCC",
    padding: 15
  }
})

export default class IndexScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <ScrollView>
        <View>
          <View style={{alignItems: "center"}}>
            <Image
                source={{ uri: "https://images.liven.com.au/u/c/chatime/l/J8L26VQC4.png" }}
                style={{width: 160, height: 160, resizeMode: "contain"}}
            />
          </View>
          <View style={{flexDirection: "row", padding: 15}}>
            <View style={{flex: 1}}>
              <MText.STextSemiBold style={{fontSize: 24}} numberOfLines={1}>Diskon 80% maximum 2000</MText.STextSemiBold>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("merchantDetail")}><MText.STextSemiBold>Chatime</MText.STextSemiBold></TouchableOpacity>
            </View>
            <View>
              <MText.STextSemiBold style={{fontSize: 24}}>4.2 <Image source={require("../../Assets/drawable-hdpi/star.png")} /> </MText.STextSemiBold>
              <MText.SText>1.8k Reviews</MText.SText>
            </View>
          </View>
          <View style={style.block}>
            <MText.STextSemiBold style={{fontSize: 16}}>Description</MText.STextSemiBold>
            <HTML style={{marginVertical: 20}} baseFontStyle={{fontSize:14, fontFamily: "NunitoSans-Light", color: "#505050"}} html="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conferam avum tuum Drusum cum C. Haec quo modo conveniant, non sane intellego. Tubulo putas dicere? Sapientem locupletat ipsa natura, cuius divitias Epicurus parabiles esse docuit. Aliud igitur esse censet gaudere, aliud non dolere. Quo plebiscito decreta a senatu est consuli quaestio Cn. Occultum facinus esse potuerit, gaudebit; Duo Reges: constructio interrete. Illis videtur, qui illud non dubitant bonum dicere -; </p>" />
          </View>
          <View style={style.block}>
            <MText.STextSemiBold style={{fontSize: 16}}>Terms and Conditions</MText.STextSemiBold>
            <HTML style={{marginVertical: 20}} baseFontStyle={{fontSize:14, fontFamily: "NunitoSans-Light", color: "#505050"}} html="<p>Graece donan, Latine voluptatem vocant. Neminem videbis ita laudatum, ut artifex callidus comparandarum voluptatum diceretur. Scientiam pollicentur, quam non erat mirum sapientiae cupido patria esse cariorem. Negat esse eam, inquit, propter se expetendam. </p><ol> <li>Qui autem diffidet perpetuitati bonorum suorum, timeat necesse est, ne aliquando amissis illis sit miser.</li><li>Qua igitur re ab deo vincitur, si aeternitate non vincitur?</li><li>Iam id ipsum absurdum, maximum malum neglegi.</li><li>Sed quanta sit alias, nunc tantum possitne esse tanta.</li></ol>" />
          </View>
          <View style={style.block}>
            <MText.STextSemiBold style={{fontSize: 16}}>Info Tier</MText.STextSemiBold>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("tier")}><MText.STextLight>Click to view info tier</MText.STextLight></TouchableOpacity>
          </View>
          <View style={style.block}>
              <MText.STextSemiBold style={{fontSize: 16, marginBottom: 12}}>Location</MText.STextSemiBold>
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
        </View>
        <MButton.CommonButtonLarge text="JOIN PROMO" extraStyleButton={{borderRadius: 0}} />
      </ScrollView>
    )
  }
}
