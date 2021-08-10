
import React from 'react';
import { View, Text } from 'react-native';
import BaseComponent from '../../Components/BaseComponent';
import { SText } from '../../Components/CustomText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as CONST from '../../Config/Constants';
import {WebView} from 'react-native-webview';

class Help extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            expandedButton: false,
            expandedClaim: false,
            expandedRedeem: false,
            expandedLend: false,
            expandedBusiness: false
        }
    }


    render() {

        const textTitle = ['Basic Button', 'How to Claim', 'How to Redeem',
            'How to Lend Loyalti Card to Friend', 'Business Inquiry']

        const textDescription = [CONST.BASIC_BUTTON]

        const { expandedBusiness, expandedButton, expandedClaim, expandedLend, expandedRedeem } = this.state
        return (
            <View>
                <this.button.CustomExpandedButton
                    text={textTitle[0]}
                    expanded={expandedButton}
                    onPressed={() => this.setState({ expandedButton: !expandedButton })}>
                    <View style={{ marginHorizontal: wp(4), marginVertical: wp(6.67),height:100 }}>
                        <WebView source={{html:textDescription[0]}}/>
                    </View>
                </this.button.CustomExpandedButton>
                <this.button.CustomExpandedButton
                    text={textTitle[1]}
                    expanded={expandedClaim}
                    onPressed={() => this.setState({ expandedClaim: !expandedClaim })}>
                    <Text>asd</Text>
                </this.button.CustomExpandedButton>
                <this.button.CustomExpandedButton
                    text={textTitle[2]}
                    expanded={expandedRedeem}
                    onPressed={() => this.setState({ expandedRedeem: !expandedRedeem })}>
                    <Text>asd</Text>
                </this.button.CustomExpandedButton>
                <this.button.CustomExpandedButton
                    text={textTitle[3]}
                    expanded={expandedLend}
                    onPressed={() => this.setState({ expandedLend: !expandedLend })}>
                    <Text>asd</Text>
                </this.button.CustomExpandedButton>
                <this.button.CustomExpandedButton
                    text={textTitle[4]}
                    expanded={expandedBusiness}
                    onPressed={() => this.setState({ expandedBusiness: !expandedBusiness })}>
                    <Text>asd</Text>
                </this.button.CustomExpandedButton>
            </View>

        )
    }
}

export default Help