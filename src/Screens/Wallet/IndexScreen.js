import React from 'react';
import { View, Image, StyleSheet, FlatList, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LTInput from '../../Components/LTInput'
import { SText } from '../../Components/CustomText'
import { TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight } from 'react-native-gesture-handler';
import { LMemberCard, LChopCard, LPointCard, LVoucherCard } from '../../Components/walletComponent'
import URI from '../../Network/Uri'

import AsyncStorage from '@react-native-community/async-storage'
import APITargetEndpoint from '../../Network/APITargetEndpoint'
import BaseComponent from '../../Components/BaseComponent';
import filterIcon from '../../Assets/drawable-xhdpi/filter.png';
import sortIcon from '../../Assets/drawable-xhdpi/sort_icon.png';
import checkIcon from '../../Assets/drawable-xhdpi/check_icon.png';
import { SafeAreaView } from 'react-navigation';
import { CustomModal } from '../../Components/CustomModal';

class IndexScreen extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            btnCardPressed: true,
            btnVoucherPressed: false,
            pointPressed: true,
            chopPressed: false,
            memberPressed: false,
            voucherPressed: false,
            setId: null,
            cards: [],
            cardData: '',
            cardEmail: '',
            filterBy: 0,
            sortBy: 10,

            openModalFilter: false,
            pointCheck: false,
            chopCheck: false,
            memberCheck: false,
            lendCheck: false,
        }
    }

    getToken = async () => {
        try {
            const customerId = await AsyncStorage.getItem('customerId')
            if (customerId !== null) {
                this.setState({
                    id: customerId
                })
            }
        }
        catch (error) {
            console.warn(error)
        }
    }

    walletCards = async () => {

        await this.getToken()

        var sortState = await this.state.sort
        var filterState = await this.state.filter
        var searchState = await this.state.search
        var sortCard = ""
        var filterCard = ""
        var searchCard = ""

        sortState === undefined ? sortCard = "" : sortCard = `,sort:${sortState}`
        filterState === undefined ? filterCard = "" : filterCard = `,filter:${filterState}`
        searchState === undefined || searchState === "" ? searchCard = "" : searchCard = `,merchantName:"${searchState}"`

        var idCustomer = JSON.stringify(this.state.id)
        var cardParam = `(customerId: ${idCustomer}${sortCard}${filterCard}${searchCard})`
        console.log(cardParam, "WalletParam")
        APITargetEndpoint.CustomerWallet(cardParam)
            .then((data) => {
                // console.log(JSON.stringify(data.data, "testWaw"))
                const dataMerchant = data.data.cards
                this.setState({
                    cards: dataMerchant,
                    cardsLength: dataMerchant.length
                })
            })
            .catch(error => console.log(error))
    }

    callCards() {
        this.walletCards();
        // this.walletDetails(filter, sort)
    }

    componentDidMount() {
        // super.componentDidMount()
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => { this.callCards() }
        );
        this._unsubscribe = this.props.navigation.addListener('willFocus', () => {
            let params = this.props.navigation.dangerouslyGetParent().state.params
            let target = params ? params.target : "card"
            if (target === "card") {
                this.setState({
                    btnCardPressed: true,
                    btnVoucherPressed: false
                })
            } else {
                this.setState({
                    btnCardPressed: false,
                    btnVoucherPressed: true
                })
            }
        });
    }

    componentWillUnmount() {
        // super.componentWillUnmount()
        this.willFocusSubscription.remove()
        this._unsubscribe.remove()
    }


    async searchOnPress() {
        this.setState({ search })
        this.callCards()
    }

    modalFilter() {
        const { openModalFilter, chopCheck, pointCheck, memberCheck, lendCheck } = this.state
        return (
            <CustomModal visible={openModalFilter}>
                <View
                    style={{ margin: wp(4), padding: wp(6.13), width: wp(92), backgroundColor: 'white', borderRadius: 5 }}>
                    <this.button.CustomFlatTextButtonBorderBot
                        text="Point Card"
                        extraImageStyle={styles.checkIconStyle}
                        itsButton={false}
                        icon={checkIcon}
                        isChecked={pointCheck}
                        onPressed={() => this.setState({ pointCheck: !pointCheck })} />
                    <this.button.CustomFlatTextButtonBorderBot
                        text="Chop Card"
                        extraImageStyle={styles.checkIconStyle}
                        itsButton={false}
                        icon={checkIcon}
                        isChecked={chopCheck}
                        onPressed={() => this.setState({ chopCheck: !chopCheck })} />
                    <this.button.CustomFlatTextButtonBorderBot
                        text="Member Card"
                        extraImageStyle={styles.checkIconStyle}
                        itsButton={false}
                        icon={checkIcon}
                        isChecked={memberCheck}
                        onPressed={() => this.setState({ memberCheck: !memberCheck })} />
                    <this.button.CustomFlatTextButtonBorderBot
                        text="Lend Card"
                        extraImageStyle={styles.checkIconStyle}
                        itsButton={false}
                        icon={checkIcon}
                        isChecked={lendCheck}
                        onPressed={() => this.setState({ lendCheck: !lendCheck })} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: wp(9.87), marginBottom: wp(3.46) }}>
                        <this.button.CustomButtonTextRounded
                            text='CANCEL'
                            extraButtonStyle={{ borderColor: '#2096f3', borderWidth: 1, width: wp(32) }}
                            extraTextStyle={{ color: '#2096f3' }}
                            onPressed={() => this.setState({ openModalFilter: false })} />
                        <this.button.CustomButtonTextRounded
                            text='FILTER'
                            extraButtonStyle={{ backgroundColor: '#2096f3', width: wp(32) }}
                            extraTextStyle={{ color: 'white' }} />
                    </View>
                </View>
            </CustomModal>

        )
    }

    render() {
        // console.log(this.state.id)
        let data = this.state.cards
        const { cardsLength, btnCardPressed, btnVoucherPressed, openModalFilter } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, margin: wp(4) }}>
                    <View style={styles.switchButtonStyle}>
                        <this.button.CustomButtonSelection
                            title="CARD" left={true}
                            actionPressed={btnCardPressed}
                            onPressed={() => this.setState({ btnCardPressed: true, btnVoucherPressed: false })} />
                        <this.button.CustomButtonSelection
                            title="VOUCHER" right={true}
                            actionPressed={btnVoucherPressed}
                            onPressed={() => this.setState({ btnCardPressed: false, btnVoucherPressed: true })} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <this.form.SearchInput
                            extraViewStyle={btnCardPressed ? { width: wp(70.7) } : { width: '100%' }}
                            extraInputStyle={btnCardPressed ? { width: wp(58) } : { width: wp(80) }} />
                        {btnCardPressed ? <TouchableOpacity style={styles.filterContainerStyle}
                            onPress={() => this.setState({ openModalFilter: true })}>
                            <Image
                                source={filterIcon}
                                style={{ width: wp(3.68), height: wp(3.68), marginRight: wp(3, 52) }} />
                            <SText>Filter</SText>
                        </TouchableOpacity> : null}
                    </View>
                    <View
                        style={{ marginVertical: wp(5.33), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <this.button.CustomButtonTextRounded
                            isShadow={true}
                            text="Exp. Soon" />
                        <this.button.CustomButtonTextRounded
                            isShadow={true}
                            text="Merchant"
                            extraImageStyle={styles.sortIconStyle}
                            icon={sortIcon} />
                        {btnCardPressed ? <this.button.CustomButtonTextRounded
                            isShadow={true}
                            text="Card Type"
                            extraImageStyle={styles.sortIconStyle}
                            icon={sortIcon} /> : <this.button.CustomButtonTextRounded
                                isShadow={true}
                                text="A - Z"
                                extraImageStyle={styles.sortIconStyle}
                                icon={sortIcon} />}
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <FlatList
                            ListEmptyComponent={
                                <SText style={{ justifyContent: 'center', marginTop: hp('2%') }}>No card in your wallet!</SText>
                            }
                            data={data}
                            renderItem={(data) => {
                                let getData = data.item
                                // console.log(getData.cardType)
                                if (cardsLength - 1 == data.index) {
                                    switch (getData.cardType) {
                                        case "member":
                                            return <View>
                                                <TouchableWithoutFeedback
                                                    onPress={() => [
                                                        this.setState({ setId: getData.userCardId }),
                                                        data.item.userCardId == this.state.setId ? this.props.navigation.push('cardDetail', { type: "Member", userCardID: this.state.setId }) : null
                                                    ]}>
                                                    <LMemberCard
                                                        title={getData.merchantName}
                                                        imgBackground={{ uri: getData.templateColor }}
                                                        logo={{ uri: getData.iconImage }}
                                                        tierStatus={getData.currentRewardPoint}
                                                        validDate={getData.validUntil}
                                                        pointProgress={getData.currentRewardPoint / getData.rewardTarget}
                                                        pointsNeeded={getData.rewardTarget - getData.currentRewardPoint}
                                                        cardTier={getData.title}>
                                                    </LMemberCard>
                                                </TouchableWithoutFeedback>
                                            </View>

                                        case "point":
                                            return <View>
                                                <TouchableWithoutFeedback
                                                    onPress={() => [
                                                        this.setState({ setId: getData.userCardId, isPointPressed: !this.state.isPointPressed }),
                                                        data.item.userCardId == this.state.setId ? this.props.navigation.navigate('cardDetail', { type: "Point", userCardID: this.state.setId }) : null
                                                    ]}>
                                                    <LPointCard
                                                        title={getData.merchantName}
                                                        imgBackground={{ uri: getData.templateColor }}
                                                        logo={{ uri: getData.iconImage }}
                                                        tierStatus={getData.currentRewardPoint}
                                                        validDate={getData.validUntil}
                                                        points={getData.currentRewardPoint}
                                                        // pointProgress={getData.currentRewardPoint / getData.rewardTarget}
                                                        pointsNeeded={getData.rewardTarget - getData.currentRewardPoint}>
                                                    </LPointCard>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        case "chop":
                                            // console.log('chop bener')
                                            let chopArray = []
                                            let valueAdded = getData.rewardTarget - getData.currentRewardPoint
                                            // console.log(valueAdded)
                                            for (let i = 0; i < getData.currentRewardPoint; i++)
                                                chopArray.push("fill")
                                            for (let j = 0; j < valueAdded; j++)
                                                chopArray.push("noFill")
                                            // console.log(chopArray)
                                            return <View>
                                                <TouchableWithoutFeedback
                                                    onPress={() => [
                                                        this.setState({ setId: data.item.userCardId, isChopPressed: !this.state.isChopPressed }),
                                                        data.item.userCardId == this.state.setId ? this.props.navigation.navigate('cardDetail', { type: "Chop", userCardID: getData.userCardId }) : null
                                                    ]}>
                                                    <LChopCard
                                                        title={getData.merchantName}
                                                        imgBackground={{ uri: getData.templateColor }}
                                                        logo={{ uri: getData.iconImage }}
                                                        chops={getData.currentRewardPoint}
                                                        chopsNeeded={getData.rewardTarget}
                                                        validDate={getData.validUntil}
                                                        data={chopArray}
                                                        emptyComponent={<Text>Empty</Text>}
                                                        numColumns={6}
                                                        render={(data) => {
                                                            switch (data.item) {
                                                                case "fill":
                                                                    // console.log('fill')
                                                                    return <Image
                                                                        source={{ uri: "https://cdn.pixabay.com/photo/2012/04/11/17/53/approved-29149__340.png" }}
                                                                        style={{
                                                                            backgroundColor: "white",
                                                                            borderRadius: 75,
                                                                            width: 45,
                                                                            height: 45,
                                                                            marginHorizontal: hp('0.25%'),
                                                                            marginVertical: wp('0.5%')
                                                                        }} />


                                                                case "noFill":
                                                                    // console.log('no fill')
                                                                    return <View style={{
                                                                        backgroundColor: 'white',
                                                                        borderRadius: 75,
                                                                        width: 45,
                                                                        height: 45,
                                                                        marginHorizontal: hp('0.25%'),
                                                                        marginVertical: wp('0.5%')
                                                                    }}></View>
                                                            }
                                                        }}
                                                    // initalNumToRender={}
                                                    >
                                                    </LChopCard>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        case "voucher":
                                            return <View>
                                                <TouchableWithoutFeedback
                                                    onPress={() => [
                                                        this.setState({ setId: data.item.userCardId, isVoucherPressed: !this.state.isVoucherPressed }),
                                                        data.item.userCardId == this.state.setId ? this.props.navigation.navigate('cardDetail', { type: "voucher", userCardID: getData.userCardId }) : null
                                                    ]}>
                                                    <LVoucherCard
                                                        imgBackground={{ uri: getData.templateColor }}
                                                        logo={{ uri: getData.iconImage }}
                                                        voucherName={getData.title}
                                                        merchantName={getData.merchantName}
                                                        validDate={getData.validUntil}>
                                                    </LVoucherCard>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        default:
                                            return null
                                    }
                                } else {
                                    switch (getData.cardType) {
                                        case "member":
                                            return <View>
                                                <TouchableWithoutFeedback
                                                    onPress={() => [
                                                        this.setState({ setId: data.item.userCardId }),
                                                        data.item.userCardId == this.state.setId ? this.props.navigation.navigate('cardDetail', { type: "Member", userCardID: getData.userCardId }) : null
                                                    ]}
                                                    style={data.item.userCardId != this.state.setId ? [styles.stack] : null}>
                                                    <LMemberCard
                                                        title={getData.merchantName}
                                                        imgBackground={{ uri: getData.templateColor }}
                                                        logo={{ uri: getData.iconImage }}
                                                        tierStatus={getData.rewardTarget}
                                                        validDate={getData.validUntil}
                                                        pointsNeeded={getData.rewardTarget - getData.currentRewardPoint}>
                                                    </LMemberCard>
                                                </TouchableWithoutFeedback>
                                            </View>

                                        case "point":
                                            return <View>
                                                <TouchableWithoutFeedback
                                                    onPress={() => [
                                                        this.setState({ setId: data.item.userCardId, isPointPressed: !this.state.isPointPressed }),
                                                        data.item.userCardId == this.state.setId ? this.props.navigation.navigate('cardDetail', { type: "Point", userCardID: getData.userCardId }) : null
                                                    ]}
                                                    style={data.item.userCardId != this.state.setId ? styles.stack : null}>
                                                    <LPointCard
                                                        title={getData.merchantName}
                                                        imgBackground={{ uri: getData.templateColor }}
                                                        logo={{ uri: getData.iconImage }}
                                                        tierStatus={getData.rewardTarget}
                                                        validDate={getData.validUntil}
                                                        points={getData.currentRewardPoint}
                                                        // pointProgress={getData.currentRewardPoint / getData.rewardTarget}
                                                        pointsNeeded={getData.rewardTarget - getData.currentRewardPoint}>
                                                    </LPointCard>
                                                </TouchableWithoutFeedback>
                                            </View>

                                        case "chop":
                                            let chopArray = []
                                            let valueAdded = getData.rewardTarget - getData.currentRewardPoint
                                            // console.log(valueAdded)
                                            for (let i = 0; i < getData.currentRewardPoint; i++)
                                                chopArray.push("fill")
                                            for (let j = 0; j < valueAdded; j++)
                                                chopArray.push("noFill")
                                            // console.log(chopArray)
                                            return <View>
                                                <TouchableWithoutFeedback
                                                    onPress={() => [
                                                        this.setState({ setId: data.item.userCardId, isChopPressed: !this.state.isChopPressed }),
                                                        data.item.userCardId == this.state.setId ? this.props.navigation.navigate('cardDetail', { type: "Chop", userCardID: getData.userCardId }) : null
                                                    ]}
                                                    style={data.item.userCardId != this.state.setId ? styles.stack : null}>
                                                    <LChopCard
                                                        title={getData.merchantName}
                                                        imgBackground={{ uri: getData.templateColor }}
                                                        logo={{ uri: getData.iconImage }}
                                                        chops={getData.currentRewardPoint}
                                                        chopsNeeded={getData.rewardTarget}
                                                        validDate={getData.validUntil}
                                                        data={chopArray}
                                                        emptyComponent={<Text>test</Text>}
                                                        numColumns={6}
                                                        render={(data) => {
                                                            switch (data.item) {
                                                                case "fill":
                                                                    // console.log('fill')
                                                                    return <Image
                                                                        source={{ uri: "https://cdn.pixabay.com/photo/2012/04/11/17/53/approved-29149__340.png" }}
                                                                        style={{
                                                                            backgroundColor: "white",
                                                                            borderRadius: 75,
                                                                            width: 45,
                                                                            height: 45,
                                                                            marginHorizontal: hp('0.25%'),
                                                                            marginVertical: wp('0.5%')
                                                                        }} />

                                                                case "noFill":
                                                                    // console.log('no fill')
                                                                    return <View style={{
                                                                        backgroundColor: 'white',
                                                                        borderRadius: 75,
                                                                        width: 45,
                                                                        height: 45,
                                                                        marginHorizontal: hp('0.25%'),
                                                                        marginVertical: wp('0.5%')
                                                                    }}></View>
                                                            }
                                                            // }
                                                        }}>
                                                    </LChopCard>
                                                </TouchableWithoutFeedback>
                                            </View>

                                        case "voucher":
                                            return <View>
                                                <TouchableWithoutFeedback
                                                    onPress={() => [
                                                        this.setState({ setId: getData.userCardId, isVoucherPressed: !this.state.isVoucherPressed }),
                                                        data.item.userCardId == this.state.setId ? this.props.navigation.navigate('cardDetail', { type: "voucher", userCardID: getData.userCardId }) : null
                                                    ]}
                                                    style={data.item.userCardId != this.state.setId ? styles.stack : null}>
                                                    <LVoucherCard
                                                        imgBackground={{ uri: getData.templateColor }}
                                                        logo={{ uri: getData.iconImage }}
                                                        voucherName={getData.title}
                                                        merchantName={getData.merchantName}
                                                        validDate={getData.validUntil}>
                                                    </LVoucherCard>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        default:
                                            return null
                                    }
                                }
                            }}
                            keyExtractor={(data) => data.userCardId}
                        />
                    </View>
                </View >
                {this.modalFilter()}
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    headerText: {
        fontSize: 14,
        width: wp('25%')
    },
    menuContent: {
        padding: 2,
        fontSize: 12,
    },
    stack: {
        marginBottom: hp('-27%')
    },
    switchButtonStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: wp(7.46)
    },
    filterContainerStyle: {
        marginLeft: wp(5.6),
        height: wp(10.6),
        flexDirection: 'row',
        alignItems: 'center'
    },
    sortIconStyle: {
        width: wp(3.2),
        height: wp(4),
        marginLeft: wp(2, 66)
    },
    checkIconStyle: {
        width: wp(4),
        height: wp(3.2)
    }
})

export default IndexScreen;