import React, { Component } from 'react'
import { Text, View, Image} from 'react-native'
import * as MButton from '../../Components/CustomButton'
import * as MText from '../../Components/CustomText'
import HTML from 'react-native-render-html';

export default class TierScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      blockSilver: true,
      blockGold: false,
      blockPlatinum: false,
    }
  }

  onSilverPress = () => {
    this.setState({
      blockSilver: true,
      blockGold: false,
      blockPlatinum: false,
    })
  }

  onGoldPress = () => {
    this.setState({
      blockSilver: false,
      blockGold: true,
      blockPlatinum: false,
    })
  }

  onPlatinumPress = () => {
    this.setState({
      blockSilver: false,
      blockGold: false,
      blockPlatinum: true,
    })
  }

  render() {
    return (
      <View style={{padding: 30}}>
        <View style={{flexDirection:"row"}}>
          <MButton.CustomButtonSelection left title="SILVER" actionPressed={this.state.blockSilver} onPressed={this.onSilverPress}/>
          <MButton.CustomButtonSelection title="GOLD" actionPressed={this.state.blockGold} onPressed={this.onGoldPress}/>
          <MButton.CustomButtonSelection right title="PLATINUM" actionPressed={this.state.blockPlatinum} onPressed={this.onPlatinumPress}/>
        </View>

        <View style={{flexDirection: "row", alignItems: "center", paddingTop: 30}}>
          <Image style={{marginRight: 10, width: 25, height: 25}} source={require("../../Assets/drawable-hdpi/point_icon.png")}  />
          <MText.STextSemiBold>500 Point</MText.STextSemiBold>
        </View>

        <MText.SText style={{marginBottom: 21, marginTop: 5}}>Valid 30 Days</MText.SText>

        <View>
            <MText.STextSemiBold style={{fontSize: 16}}>Benefit</MText.STextSemiBold>
            <HTML style={{marginVertical: 20}} baseFontStyle={{fontSize:14, fontFamily: "NunitoSans-Light", color: "#505050"}} html="<p>Graece donan, Latine voluptatem vocant. Neminem videbis ita laudatum, ut artifex callidus comparandarum voluptatum diceretur. Scientiam pollicentur, quam non erat mirum sapientiae cupido patria esse cariorem. Negat esse eam, inquit, propter se expetendam. </p><ol> <li>Qui autem diffidet perpetuitati bonorum suorum, timeat necesse est, ne aliquando amissis illis sit miser.</li><li>Qua igitur re ab deo vincitur, si aeternitate non vincitur?</li><li>Iam id ipsum absurdum, maximum malum neglegi.</li><li>Sed quanta sit alias, nunc tantum possitne esse tanta.</li></ol>" />
          </View>
      </View>
    )
  }
}
