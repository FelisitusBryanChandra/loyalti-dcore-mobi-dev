import React from "react";
import { View, Image, ScrollView, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SText } from '../Components/CustomText'
import LTInput from '../Components/LTInput'
import { LPromo } from '../Components/LPromo'
import APITargetEndpoint from '../Network/APITargetEndpoint'

class PromoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            promoHome: '',
            promoHot: '',
            promoSpecial: ''
        }
    }

    allPromo = async () => {
        await APITargetEndpoint.CustomerHome("(page:0, size:50, sort:2)")
            .then((data) => {                                
                console.log(data)
                this.setState({
                    promoHome: data.data.program
                })
            })
            .catch((err) => console.log(err))
    }

    hotPromo = async () => {
        await APITargetEndpoint.CustomerHome('(sort: 1)')
            .then((data) => {
                this.setState({
                    promoHot: data.data.program
                })
            })
            .catch((err) => console.log(err))
    }

    specialPromo = async () => {
        await APITargetEndpoint.CustomerSpecialHome("")
            .then((data) => {                
                this.setState({
                    promoSpecial: data.data.special
                })
            }).catch((err) => console.log(err))
    }

    componentWillMount() {
        this.specialPromo()
        this.allPromo()
        this.hotPromo()
    }

    checkSwitch = (param) => {

        switch (param) {
            case "Editor's Choice":
                return <View>
                    <FlatList
                    ListEmptyComponent={
                        <SText style={{ alignSelf: 'center' }}>Please Wait</SText>
                    }
                    data={this.state.promoSpecial}
                    renderItem={(data) => {
                        let getData = data.item
                        return <LPromo
                            img={{ uri: getData.program_image }}
                            merchantName={getData.merchant_name}
                            onPress={() => this.props.navigation.navigate("promoDetail", {promoId: getData.id, promoSection: "special", merchantId: getData.merchant_id})}
                            validFrom="09/12/2018"
                            validUntil="09/12/2019">
                        </LPromo>
                    }}
                /></View>

            case "Near Me":
                return <FlatList
                    ListEmptyComponent={
                        <SText style={{ alignSelf: 'center' }}>Please Wait</SText>
                    }
                    data={this.state.promoSpecial}
                    renderItem={(data) => {
                        let getData = data.item
                        return <LPromo
                            img={{ uri: getData.program_image }}
                            merchantName={getData.merchant_name}
                            onPress={() => this.props.navigation.navigate("promoDetail", {promoId: getData.id, promoSection: "special", merchantId: getData.merchant_id})}
                            validFrom="09/12/2018"
                            validUntil="09/12/2019">
                        </LPromo>
                    }}
                />

            

            case "Recommended for You":
                return <FlatList
                    ListEmptyComponent={
                        <SText style={{ alignSelf: 'center' }}>Please Wait</SText>
                    }
                    data={this.state.promoHot}
                    renderItem={(data) => {
                        let getData = data.item
                        return <LPromo
                            img={{ uri: getData.program_image }}
                            merchantName={getData.merchant_name}
                            onPress={() => this.props.navigation.navigate("promoDetail", {promoId: getData.id, promoSection: "special", merchantId: getData.merchant_id})}
                            validFrom="09/12/2018"
                            validUntil="09/12/2019">
                        </LPromo>
                    }}
                />

            case "Hot Promo":
                return <FlatList
                    ListEmptyComponent={
                        <SText style={{ alignSelf: 'center' }}>Please Wait</SText>
                    }
                    data={this.state.promoHot}
                    renderItem={(data) => {
                        let getData = data.item
                        return <LPromo
                            img={{ uri: getData.program_image }}
                            merchantName={getData.merchant_name}
                            onPress={() => this.props.navigation.navigate("promoDetail", {promoId: getData.id, promoSection:"program", merchantId: getData.merchant_id})}
                            validFrom="09/12/2018"
                            validUntil="09/12/2019">
                        </LPromo>
                    }}
                />

            case "All Promo":
                return <FlatList
                    ListEmptyComponent={
                        <SText style={{ alignSelf: 'center' }}>Please Wait</SText>
                    }
                    data={this.state.promoHome}
                    
                    renderItem={(data) => {
                        let getData = data.item
                        return <LPromo
                            img={{ uri: getData.program_image }}
                            merchantName={getData.merchant_name}
                            onPress={() => this.props.navigation.navigate("promoDetail", {promoId: getData.id, promoSection: "program", merchantId: getData.merchant_id})}
                            validFrom="09/12/2018"
                            validUntil="09/12/2019">
                        </LPromo>
                    }}
                />
        }
    }

    render() {

        const { navigation } = this.props

        let headerTitles = navigation.getParam("headerPromo")
        console.log(headerTitles)

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp('4%'), marginVertical: hp('2.5%') }}>
                    <View style={{
                        flexDirection: 'row',
                        borderColor: '#505050',
                        borderWidth: 0.5,
                        borderRadius: 5,
                        height: hp('7%'),
                        width: wp('80%')
                    }}>
                        <Image
                            source={require('../Assets/drawable-xhdpi/SearchIcon.png')}
                            style={{
                                marginRight: wp('4%'),
                                marginLeft: wp('2%'),
                                marginTop: hp('2%'),
                                width: wp('6%'),
                                height: hp('3%')
                            }}
                        ></Image>
                        <LTInput
                            inputBlock={{ marginHorizontal: wp('3%') }}
                            // onChangeText={
                            //     (v) => this.setState({ search: v }, () => this.findCity())
                            // }
                            // value={this.state.search}
                            style={{ width: wp('65%') }}
                        />
                    </View>
                    <Image
                        source={require('../Assets/drawable-xhdpi/group_12.png')}
                        style={{ width: wp('7.5%'), height: hp('3.5%'), marginVertical: hp('1.5%') }}></Image>
                </View>

                <ScrollView><SafeAreaView>{this.checkSwitch(headerTitles)}</SafeAreaView></ScrollView>
            </View >
        )
    }
}

export default PromoList;