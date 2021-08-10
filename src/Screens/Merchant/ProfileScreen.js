import React, { Component } from 'react'
import { View , Image, ScrollView, StyleSheet} from 'react-native'
import * as MButton from '../../Components/CustomButton'

import DetailScreen from './DetailScreen'
import ProgramScreen from './ProgramScreen'
import LocationScreen from './LocationScreen'

const style = StyleSheet.create({})

const PAGE_DETAILS = "PAGE_DETAILS"
const PAGE_PROGRAMS = "PAGE_PROGRAMS"
const PAGE_LOCATION = "PAGE_LOCATION"

export default class ProfileScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentPage: PAGE_DETAILS,
    }
  }

  setCurrentPage = (page) => {
    this.setState({currentPage: page})
  }

  renderComponent = () => {
    switch(this.state.currentPage){
      case PAGE_DETAILS:
        return <DetailScreen />
      case PAGE_PROGRAMS:
        return <ProgramScreen />
      case PAGE_LOCATION:
        return <LocationScreen />
      default:
        return <DetailScreen />
    }
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
          <View style={{flexDirection:"row", padding: 15}}>
            <MButton.CustomButtonSelection left title="DETAILS" actionPressed={this.state.currentPage == PAGE_DETAILS} onPressed={() => this.setCurrentPage(PAGE_DETAILS)}/>
            <MButton.CustomButtonSelection title="PROGRAMS" actionPressed={this.state.currentPage == PAGE_PROGRAMS} onPressed={() => this.setCurrentPage(PAGE_PROGRAMS)}/>
            <MButton.CustomButtonSelection right title="LOCATIONS" actionPressed={this.state.currentPage == PAGE_LOCATION} onPressed={() => this.setCurrentPage(PAGE_LOCATION)}/>
          </View>
          {this.renderComponent()}
        </View>
      </ScrollView>
    )
  }
}
