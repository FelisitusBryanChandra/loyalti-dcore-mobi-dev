import React from "react";
import { Button, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LLendModal, LGiveModal, LRateModal, LRemoveModal, LCollectModal, LModal } from '../Components/modalComponent'
import { SText } from '../Components/CustomText'
import LTInput from '../Components/LTInput'
import { LPromo } from '../Components/LPromo'
import { LYourReward, LCatalog } from '../Components/PointsReward'
import APITargetEndpoint from "../Network/APITargetEndpoint";
import AsyncStorage from '@react-native-community/async-storage'


class RewardsInfo extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isRewardPressed: true,
            isCatalogPressed: false
        }
    }

    async rewardsList() {
        // console.log(this.props.navigation.getParam("programId"))
        // console.log(this.props.navigation.getParam("userCardId"), "test")
        let programId = this.props.navigation.getParam("programId")
        let params = `size:10, id:${programId}, card_type:"voucher"`
        await APITargetEndpoint.merchantCardId(params)
            .then((data) => {
                console.log(data.data.card)
                console.log(data.data.card[0].id, 'id')
                console.log(data.data.card[0].title, 'title')
                console.log(data.data.card[0].current_point, 'price point')
                console.log(data.data.card[0].icon_image, 'icon image')
                this.setState({
                    merchantCard: data.data.card,
                    // voucherCardId: data.data.card[0].id
                })
            }).catch((err) => { console.log(err) })
    }

    async rewardPage(paramsIndex) {
        try {
            const custId = await AsyncStorage.getItem('customerId')
            if (custId !== null) {
                this.setState({ idCust: custId })
            }
        } catch (err) {
            console.log(err)
        }
        let cardData = this.state.merchantCard
        let CardId = cardData[paramsIndex].id
        let MinusPoint = cardData[paramsIndex].current_point
        console.log(CardId, MinusPoint, "id", "Point Price")
        // console.log(this.props.navigation.getParam("userCardId"))
        console.log(paramsIndex)
        let dataSet = {}
        dataSet.Id = this.props.navigation.getParam("userCardId") //userCardId
        dataSet.CustomerId = this.state.idCust
        dataSet.CardId = CardId //voucherId
        dataSet.MinusPoint = MinusPoint
        console.log(dataSet)
        await APITargetEndpoint.RedeemReward()
            .then((response) => JSON.stringify(response))
            .then((responseData) => {
                console.log(responseData);            
            })
            .catch((err) =>
            {
                console.log("Error" + err)
                this.setState({ modalSuccess: true, modalError: true })
            })
            

    }

    async useVoucher(params){
        try {
            const custId = await AsyncStorage.getItem('customerId')
            if (custId !== null) {
                this.setState({ idCust: custId })
            }
        } catch (err) {
            console.log(err)
        }


        let dataSet = {}
        dataSet.CardId = this.state.rewardsData[params].voucherId//voucherId 
        dataSet.CustomerId = this.state.idCust
        dataSet.Id = this.state.rewardsData[params].rewardId//rewardId
        console.log(dataSet, params)
        await APITargetEndpoint.UseVoucher()
            .then((response) => JSON.stringify(response))
            .then((responseData) => {
                console.log(responseData);
            })
            .catch((err) =>{
                this.setState({ modalSuccess: true, modalError: true })
                console.log("Error" + err)})
    }

    async yourRewardList(){
        try {
            const custId = await AsyncStorage.getItem('customerId')
            if (custId !== null) {
                this.setState({ idCust: custId })
            }
        } catch (err) {
            console.log(err)
        }
        let parameters = `userId:${JSON.stringify(this.state.idCust)}`
        console.log(parameters)
        await APITargetEndpoint.RewardList(parameters)
            .then((data) => {
                console.log(data.data.rewards)
                this.setState({
                    rewardsData: data.data.rewards,                    
                })
            }).catch((err) => { console.log(err) })
    }

    redeemButton(params){
        let currentPoint = this.props.navigation.getParam("points")
        let voucherPrice = this.state.merchantCard[params].current_point
        if (currentPoint >= voucherPrice ){
            this.rewardPage(params)
        }
        else{console.log("your point is not enough")
        this.setState({ modalSuccess: true, modalError: true })
    }}

    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => { this.rewardsList(),
                this.yourRewardList() }
        );        
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove()
    }

    onModalClose = () => {
        this.setState({
            lendCardModal: false,
            giveCardModal: false,
            rateUsModal: false,
            removeModal: false,
            collectModal: false,
            modalSuccess: false
        })
    }

    render() {

        const Points = this.props.navigation.getParam("points")
        console.log(Points)
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    marginTop: hp('4%'), marginBottom: hp('2%'), justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: this.state.isRewardPressed ? '#2096f3' : 'white',
                        borderBottomLeftRadius: 5,
                        borderTopLeftRadius: 5,
                        width: wp('45%'),
                        height: hp('7%'),
                        shadowColor: 'gray',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        elevation: 5,
                    }}
                        onPress={() =>
                            this.setState({ isRewardPressed: true, isCatalogPressed: false })}>
                        <SText style={{ color: this.state.isRewardPressed ? 'white' : '#2096f3' }}>YOUR REWARD</SText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: this.state.isCatalogPressed ? '#2096f3' : 'white',
                        borderColor: '#2096f3',
                        borderWidth: 0.5,
                        borderBottomRightRadius: 5,
                        borderTopRightRadius: 5,
                        width: wp('45%'),
                        height: hp('7%'),
                        shadowColor: 'gray',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        elevation: 5,
                    }}
                        onPress={() =>
                            this.setState({ isCatalogPressed: true, isRewardPressed: false })}>
                        <SText style={{ color: this.state.isCatalogPressed ? 'white' : '#2096f3' }}>CATALOG</SText>
                    </TouchableOpacity>
                </View>
                <View style={{ display: this.state.isRewardPressed ? 'flex' : 'none' }}>
                    <FlatList
                        ListEmptyComponent={
                            <SText style={{ alignSelf: 'center' }}>No rewards available!</SText>
                        }
                        data={this.state.rewardsData}
                        renderItem={({ item, index }) =>{
                        let getIndex = index
                        return <LYourReward
                                uri={{uri:item.iconImage}}
                                title={item.title}
                                expiryDate={item.validUntil}
                                onPress={() => {this.useVoucher(index), this.onModalClose()}}/>
                        }}
                        keyExtractor={(data) => data.id} />
                </View>
                <View style={{ display: this.state.isCatalogPressed ? 'flex' : 'none' }}>
                    <View style={{ borderBottomColor: '#979797', borderBottomWidth: 0.5, paddingHorizontal: wp('5%'), paddingVertical: hp('2.5%') }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Image
                                source={require('../Assets/drawable-xhdpi/point_icon.png')}
                                style={{ width: 26, height: 26, marginRight: wp('3%') }}>
                            </Image>
                            <SText style={{ paddingVertical: hp('0.5%') }}>{Points} Points</SText>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        ListEmptyComponent={
                            <SText style={{ alignSelf: 'center' }}>No rewards available!</SText>
                        }
                        data={this.state.merchantCard}
                        renderItem={({ item, index }) => {
                            let getData = index
                            console.log(getData, "index")                            
                            return <LCatalog
                                uri={{ uri: item.icon_image }}
                                rewardTitle={item.title}
                                rewardPoint={item.current_point}
                                onPress = {() => {this.redeemButton(getData), this.onModalClose()}}
                            />
                        }
                        }
                        keyExtractor={(data) => data.rewardId} />
                </View>
                <LModal
                    onRequestClose={this.onModalClose}
                    visible={this.state.modalSuccess}
                    onPress={this.onModalClose}
                    successText={this.state.modalError === false ? "Collect Point Succeeded" : "Collect Point Failed"}
                    src={this.state.modalError === false ? require('../Assets/drawable-xhdpi/check.png') : require('../Assets/drawable-xhdpi/fail.png')}
                />
            </View>
        )
    }
}

export default RewardsInfo;