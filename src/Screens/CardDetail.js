import React from "react";
import { FlatList, View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView, SafeAreaView, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SText } from '../Components/CustomText'
import { LMemberCard, LChopCard, LPointCard, LVoucherCard } from '../Components/walletComponent'
import { LLendModal, LGiveModal, LRateModal, LRemoveModal, LCollectModal, LModal } from '../Components/modalComponent'
import { LButton } from '../Components/CustomButton'
import Modal from 'react-native-modalbox';
import URI from "../Network/Uri";
import APITargetEndpoint from '../Network/APITargetEndpoint'
import AsyncStorage from "@react-native-community/async-storage";



const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5
    },
    containerPointsDetail: {
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
    },
    card: {
        marginVertical: hp('2%'),
        alignItems: 'center'
    },
    icon: {
        width: wp('5%'),
        height: hp('2.7%'),
        alignSelf: 'center',
        marginBottom: hp('1%')
    },
    iconText: {
        fontSize: 10,
        color: '#2096f3'
    },
    input: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#c7c7c7',
        marginTop: hp('2%')
    },
    button: {
        height: hp('7%'),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#2096f3',
        borderRadius: 5,
        width: wp('92%'),
        elevation: 10
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    }
})

class CardDetailScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lendCardModal: false,
            giveCardModal: false,
            rateUsModal: false,
            removeModal: false,
            collectModal: false,
            cardType: '',
            modalSuccess: false,
            modalError: false
        }
    }

    async getIdCard() {

        try {
            const custId = await AsyncStorage.getItem('customerId')
            if (custId !== null) {
                this.setState({ idCust: custId })
            }
        } catch (err) {
            console.log(err)
        }

        const useridCardParam = this.props.navigation.getParam("userCardID")
        const idCardParam = this.props.navigation.getParam("cardId")
        const customeridCardParam = this.state.idCust
        console.log(customeridCardParam, "Customer Id", useridCardParam, "User card Id", idCardParam, "card id")
        this.setState({ usercardId: useridCardParam, idCard: idCardParam, customerid: customeridCardParam })
    }

    async cardDetail() { // get card from merchant card

        await this.getIdCard()
        var cardId = ""
        var userCardId = ""
        var customerIdCard = ""

        const useridForCard = JSON.stringify(this.state.usercardId)
        const cardIdForCard = JSON.stringify(this.state.idCard)
        const customerIdForCard = JSON.stringify(this.state.customerid)
        cardIdForCard === undefined ? cardId = "" : cardId = `cardId:${cardIdForCard}`
        useridForCard === undefined ? userCardId = "" : userCardId = `,id:${useridForCard}`
        customerIdForCard === undefined ? customerIdCard = "" : customerIdCard = `,customerId:${customerIdForCard}`

        var CardsParam = `(${userCardId}${cardId}${customerIdCard})`
        console.log(CardsParam, "CARD DETAIL")
        APITargetEndpoint.CustomerWallet(CardsParam)
            .then((data) => {
                const dataMerchant = data.data.cards
                // console.log(dataMerchant[0].rewardTarget)
                console.log(dataMerchant[0].userCardId, "userCardID", dataMerchant[0].title, "toko")
                this.setState({
                    cardType: dataMerchant[0].cardType,
                    cardsMerchantId: dataMerchant[0].merchantId,
                    userCardId: dataMerchant[0].userCardId,
                    programId: dataMerchant[0].programId,
                    cardsTitle: dataMerchant[0].title,
                    cardMerchantName: dataMerchant[0].merchantName,
                    cardsBackground: dataMerchant[0].templateColor,
                    cardsLogo: dataMerchant[0].iconImage,
                    cardsTierStatus: dataMerchant[0].currentRewardPoint,
                    cardsValidDate: dataMerchant[0].validUntil,
                    cardsPointsNeeded: dataMerchant[0].rewardTarget + dataMerchant[0].currentRewardPoint,
                    cardsRewardTarget: dataMerchant[0].rewardTarget,
                    cardsDesc: dataMerchant[0].description,
                    cardsTnc: dataMerchant[0].termsAndCondition,
                    cardsProgramId: dataMerchant[0].programId,
                    cardsIconStamp: dataMerchant[0].iconImageStamp,
                    cardsIsLent: dataMerchant[0].isLent
                    // cardsLength: dataMerchant[0].cards.length
                })
                this.outletIdFetch()
                // console.log(this.state.cardsTierStatus / this.state.cardsRewardTarget, "test")
            })
            .catch(error => console.log(error, "Card Has Been Removed"))
    }

    emailisValid(params) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            this.lendGiveCardGraphQL(params)
        }
        else {
            console.log("Your email format is invalid")
            this.setState({ modalError: true, modalSuccess: true })
        }
    }

    async lendGiveCardGraphQL(params) {
        var emailFriend = await this.state.email
        var emailCust = `email: ${JSON.stringify(emailFriend)}`
        var specialFunc = params;
        console.log(specialFunc)
        console.log(emailCust, "Friend's Email Give Card")
        await APITargetEndpoint.CustomerProfile(emailCust)
            .then((data) => {
                const CustomerData = data.data.customers;
                if (specialFunc === 'give') {
                    console.log("give")
                    this.giveCardKafka(CustomerData[0].userId)
                }
                else if (specialFunc === 'lend') {
                    console.log("lend")
                    this.lendCardKafka(CustomerData[0].userId)
                }
                else {
                    console.log("return")
                    this.returnCardKafka(CustomerData[0].userId)
                }
                console.log("success step 1")
            }).catch((err) => {
                console.log("Lend Give Card: ", err)
                this.setState({ modalError: false })
            })
        this.setState({ modalSuccess: true })
    }

    async giveCardKafka(params) {
        let dataSet = {}
        dataSet.CustomerId = params,
        dataSet.UserCardId = this.state.userCardId
        //' "CustomerId" : "idasjdkajs",
        //  "UserCardId" : "aksjdla"
        console.log(dataSet, "dataSet Give Card Body")
        // if(dataSet)
        await APITargetEndpoint.GiveCard(dataSet)
            .then((response) => JSON.stringify(response))
            .then((responseData) => {
                console.log(responseData);
                console.log("Success Step 2")
                this.onModalClose()
                this.props.navigation.navigate('walletStack')

            })
            .catch((err) =>
                console.log("Error" + err))
    }

    async returnCardKafka(params) {
        let dataSet = {}
        dataSet.Id = params
        console.log(dataSet, "dataSet Return Card Body")
        await APITargetEndpoint.ReturnCard(dataSet)
            .then((response) => JSON.stringify(response))
            .then((responseData) => {
                console.log(responseData);
                console.log("Success Step 2")
                this.onModalClose()
                this.props.navigation.navigate('walletStack')

            })
            .catch((err) =>
                console.log("Error" + err))
    }

    async lendCardKafka(params) {
        let dataSet = {}
        dataSet.BorrowerId = params,
            dataSet.Id = this.state.userCardId
        console.log(dataSet, "dataSet Lend Card Body")
        // if(dataSet)
        await APITargetEndpoint.GiveCard(dataSet)
            .then((response) => JSON.stringify(response))
            .then((responseData) => {
                console.log(responseData);
                console.log("Success Step 2")
                this.onModalClose()
                this.props.navigation.navigate('walletStack')

            })
            .catch((err) =>
                console.log("Error" + err))
    }

    cardCheck = (params) => {

        switch (params) {
            case "Member":
                return <LMemberCard
                    title={this.state.cardMerchantName}
                    imgBackground={{ uri: this.state.cardsBackground }}
                    logo={{ uri: this.state.cardsLogo }}
                    tierStatus={this.state.cardsTierStatus}
                    validDate={this.state.cardsValidDate}
                    pointsNeeded={this.state.cardsPointsNeeded}>
                </LMemberCard>
            case "Point":
                // let pointCalculation = this.state.cardsTierStatus/this.state.cardsRewardTarget + 0.1
                return <LPointCard
                    title={this.state.cardMerchantName}
                    imgBackground={{ uri: this.state.cardsBackground }}
                    logo={{ uri: this.state.cardsLogo }}
                    tierStatus={this.state.tierStatus}
                    validDate={this.state.cardsValidDate}
                    points={this.state.cardsTierStatus}
                    // pointProgress={"1"}
                    pointsNeeded={this.state.cardsPointsNeeded}>
                </LPointCard>
            case "Chop":
                let chopArray = []
                let valueAdded = this.state.cardsRewardTarget - this.state.cardsTierStatus
                // console.log(valueAdded)
                for (let i = 0; i < this.state.cardsTierStatus; i++)
                    chopArray.push("fill")
                for (let j = 0; j < valueAdded; j++)
                    chopArray.push("noFill")
                return <LChopCard
                    title={this.state.cardMerchantName}
                    imgBackground={{ uri: this.state.cardsBackground }}
                    logo={{ uri: this.state.cardsLogo }}
                    tierStatus={this.state.tierStatus}
                    validDate={this.state.cardsValidDate}
                    chops={this.state.cardsTierStatus}
                    chopsNeeded={this.state.cardsRewardTarget}
                    data={chopArray}
                    emptyComponent={<Text style={{ textAlign: 'center', color: "white" }}>Empty</Text>}

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
                                        width: 40,
                                        height: 40,
                                        marginHorizontal: hp('0.25%'),
                                        marginVertical: wp('0.5%')
                                    }} />

                            case "noFill":
                                // console.log('no fill')
                                return <View style={{
                                    backgroundColor: 'white',
                                    borderRadius: 75,
                                    width: 40,
                                    height: 40,
                                    marginHorizontal: hp('0.25%'),
                                    marginVertical: wp('0.5%')
                                }}></View>
                        }
                        // }
                    }}
                >
                </LChopCard>

            case "voucher":
                return <LVoucherCard
                    imgBackground={{ uri: this.state.cardsBackground }}
                    logo={{ uri: this.state.cardsLogo }}
                    voucherName={this.state.cardsTitle}
                    merchantName={this.state.cardMerchantName}
                    validDate={this.state.cardsValidDate}>
                </LVoucherCard>
        }
    }

    async outletIdFetch() {
        var merchantId = this.state.cardsMerchantId
        var outletParam = `(page:0, size:1, id:${merchantId})`
        await APITargetEndpoint.OutletLocation(outletParam)
            .then((data) => {
                console.log("Outlet Id: ", data.data.outlet[0].id)
                let outletData = data.data.outlet[0].id
                if (outletData === undefined) {
                    this.setState({
                        outletId: "Wrong PIN code"
                    })
                } else {
                    this.setState({
                        outletId: outletData
                    })
                    // this.collectCardPointGraphQL()
                }
            })
            .catch(error => console.error(`'Error: OutletId' + ${JSON.stringify(error)}`))
    }

    SeePointsDetail(params) {
        switch (params) {
            case 'pointCard':
                return (<View style={styles.containerPointsDetail}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('pointsDetail')}>
                        <View style={{ marginHorizontal: wp('5%'), marginBottom: hp('4%') }}>
                            <SText style={{ marginTop: hp('3%'), fontSize: 16, color: '#2096f3', alignSelf: 'center' }}>See Points Detail Here</SText>
                        </View>
                    </TouchableOpacity>
                </View>
                )
            case ('membershipCard' || 'chopCard' || 'voucher'):
                return (
                    <View></View>
                )
        }
    }

    RedeemCardReward(params) {
        switch (params) {
            case 'point':
                return (<View>
                    <LButton
                        style={styles.button}
                        text="Collect Points"
                        onPress={() => this.setState({ collectModal: true })}
                        textStyle={styles.buttonText}
                    ></LButton>

                    <LCollectModal //Collect Card
                        onRequestClose={this.onModalClose}
                        visible={this.state.collectModal}
                        onPress={this.onModalClose}
                        header="Collect Points"
                        inputStyle={[this.props.style, styles.input]}
                        placeholder1="Total Transaction"
                        changeInput1={(collectTotalTransaction) => this.setState({ collectTotalTransaction })}
                        placeholder2="Bill Number"
                        changeInput2={(collectBillNumber) => this.setState({ collectBillNumber })}
                        placeholder3="Cashier PIN"
                        changeInput3={(collectPIN) => this.setState({ collectPIN })}
                        textSecurity={true}
                        button1text="CANCEL"
                        button1press={this.onModalClose}
                        button2text="SEND"
                        button2press={() => (this.collectCardPointGraphQL(), this.onModalClose(), this.render)}
                    ></LCollectModal>

                    {/* only visible for membership and points */}
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('rewardsInfo', {programId: this.state.cardsProgramId,userCardId: this.state.userCardId, points: this.state.cardsTierStatus })}>
                        <SText style={{ color: '#2096f3', alignSelf: 'center', marginVertical: hp('2%') }}>SEE REWARDS</SText>
                    </TouchableOpacity>

                </View>
                )

            case 'member':
                return (<View>
                    <LButton
                        style={styles.button}
                        text="Collect Points"
                        onPress={() => this.setState({ collectModal: true })}
                        textStyle={styles.buttonText}
                    ></LButton>

                    <LCollectModal //Collect Card
                        onRequestClose={this.onModalClose}
                        visible={this.state.collectModal}
                        onPress={this.onModalClose}
                        header="Collect Points"
                        inputStyle={[this.props.style, styles.input]}
                        placeholder1="Total Transaction"
                        changeInput1={(collectTotalTransaction) => this.setState({ collectTotalTransaction })}
                        placeholder2="Bill Number"
                        changeInput2={(collectBillNumber) => this.setState({ collectBillNumber })}
                        placeholder3="Cashier PIN"
                        changeInput3={(collectPIN) => this.setState({ collectPIN })}
                        textSecurity={true}
                        button1text="CANCEL"
                        button1press={this.onModalClose}
                        button2text="SEND"
                        button2press={() => (this.collectCardPointGraphQL(), this.onModalClose(), this.render)}
                    ></LCollectModal>

                    {/* only visible for membership and points */}
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('rewardsInfo')}>
                        <SText style={{ color: '#2096f3', alignSelf: 'center', marginVertical: hp('2%') }}>SEE REWARDS</SText>
                    </TouchableOpacity>

                </View>
                )

            case 'chop':
                return (<View>
                    <LButton
                        style={styles.button}
                        text="Collect Stamp"
                        onPress={() => this.setState({ collectModal: true })}
                        textStyle={styles.buttonText}
                    ></LButton>

                    <LCollectModal //Collect Card
                        onRequestClose={this.onModalClose}
                        visible={this.state.collectModal}
                        onPress={this.onModalClose}
                        header="Collect Stamp"
                        inputStyle={[this.props.style, styles.input]}
                        placeholder1="Total Transaction"
                        changeInput1={(collectTotalTransaction) => this.setState({ collectTotalTransaction })}
                        placeholder2="Bill Number"
                        changeInput2={(collectBillNumber) => this.setState({ collectBillNumber })}
                        placeholder3="Cashier PIN"
                        changeInput3={(collectPIN) => this.setState({ collectPIN })}
                        textSecurity={true}
                        button1text="CANCEL"
                        button1press={this.onModalClose}
                        button2text="SEND"
                        button2press={() => this.collectCardPointGraphQL()}
                    ></LCollectModal>
                </View>
                )

            case 'voucher':
                return (<View>
                    <LButton
                        style={styles.button}
                        text="Redeem Reward"
                        onPress={() => this.setState({ collectModal: true })}
                        textStyle={styles.buttonText}
                    ></LButton>

                    <LCollectModal //Collect Card
                        onRequestClose={this.onModalClose}
                        visible={this.state.collectModal}
                        onPress={this.onModalClose}
                        header="Collect Points"
                        inputStyle={[this.props.style, styles.input]}
                        placeholder1="Total Transaction"
                        changeInput1={(collectTotalTransaction) => this.setState({ collectTotalTransaction })}
                        placeholder2="Bill Number"
                        changeInput2={(collectBillNumber) => this.setState({ collectBillNumber })}
                        placeholder3="Cashier PIN"
                        changeInput3={(collectPIN) => this.setState({ collectPIN })}
                        textSecurity={true}
                        button1text="CANCEL"
                        button1press={this.onModalClose}
                        button2text="SEND"
                        button2press={() => this.collectCardPointGraphQL()}
                    ></LCollectModal>
                </View>
                )
        }
        // this.cardDetail()
    }

    cardTypeFunc() {
        let Type = this.state.cardType
        console.log(Type)

        if (Type === 'Point') {
            this.setState({ cardTypeWallet: 'Point' })
        }
        else if (Type === 'Member') {
            this.setState({ cardTypeWallet: 'Member' })
        }
        else if (Type === 'Chop') {
            this.setState({ cardTypeWallet: 'Chop' })
        }
        else if (Type === 'voucher') {
            this.setState({ cardTypeWallet: 'Voucher' })
        }
    }

    async collectCardPointGraphQL() {
        this.cardTypeFunc()
        var ProgramID = JSON.stringify(this.state.cardsProgramId)
        var outletID = JSON.stringify(this.state.outletId)
        var cardTypes = JSON.stringify(await this.state.cardTypeWallet)
        var programId = `id: ${ProgramID}`
        var merchantPin = `,pin: ${JSON.stringify(this.state.collectPIN)}`
        var totalPay = `,pay: ${this.state.collectTotalTransaction}`
        var outletId = `,outletid: ${JSON.stringify(outletID)}`
        var cardType = `,cardtype:${JSON.stringify(this.state.cardTypeWallet)}`
        var CardsParam = `(${programId}${merchantPin}${totalPay}${outletId}${cardType})`
        console.log(CardsParam, "Inget Ya")
        // console.log(JSON.stringify(this.state.programId))

        if (programId === undefined || merchantPin === undefined || totalPay === undefined || outletId === undefined || cardType === undefined) {
            this.setState({ modalSuccess: true, modalError: true })
        }
        else {
            await APITargetEndpoint.CollectCardPoint(CardsParam)
                .then((data) => {
                    let pointData = data.data.totalpoint
                    console.log(pointData, "point Data")
                    if (pointData === null || pointData === undefined) {
                        console.log("No Data or Wrong PIN")
                    } else {
                        console.log("Success Step 1")
                        this.setState({
                            convertedPoint: pointData[0].total_point
                        })
                        this.collectCardPointKafka(pointData[0].total_point)
                    }
                })
                .catch(error => { this.setState({ modalSuccess: true, modalError: true }) })
        }
    }

    async collectCardPointKafka(params) {
        let pointValue = params;
        console.log(JSON.stringify(this.state.userCardId))
        let dataSet = {}
        dataSet.Id = this.state.userCardId
        dataSet.AddValue = JSON.stringify(pointValue);
        // this.state.convertedPoint
        console.warn(dataSet, " Kafka Dataset ")

        await APITargetEndpoint.CollectPromoCard(dataSet)
            .then((response) => JSON.stringify(response))
            .then((responseData) => {
                console.log(responseData, "test");
            })
            .catch((err) => {
                console.log("Error" + err)
                this.setState({ modalError: true })
            })

        this.setState({ modalSuccess: true })
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
        this.cardDetail()
    }

    componentWillMount() {
        this.cardDetail()
    }


    render() {
        const { navigation } = this.props;

        let mediaSocial = [
            {
                medsocId: 1,
                medsocLogo: URI.WHATSAPP,
                medsocName: "WhatsApp"
            },
            {
                medsocId: 2,
                medsocLogo: URI.FACEBOOK,
                medsocName: "Facebook"
            },
            {
                medsocId: 3,
                medsocLogo: URI.TWITTER,
                medsocName: "Twitter"
            },
            {
                medsocId: 4,
                medsocLogo: URI.TELEGRAM,
                medsocName: "Telegram"
            },
            {
                medsocId: 5,
                medsocLogo: URI.LINE,
                medsocName: "LINE"
            },
            {
                medsocId: 6,
                medsocLogo: URI.EMAIL,
                medsocName: "E-mail"
            },
            {
                medsocId: 7,
                medsocLogo: URI.OTHERS,
                medsocName: "Others"
            },
        ]
        let Type = navigation.getParam("type")
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <SafeAreaView>
                                {this.cardCheck(Type)}
                            </SafeAreaView>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp('3%'), marginVertical: hp('4%') }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ lendCardModal: true })}>
                                <View>
                                    <Image source={this.state.cardsIsLent === true ? require('../Assets/drawable-xhdpi/returnLend.png') : require('../Assets/drawable-xhdpi/lendcard.png')}
                                        style={styles.icon}></Image>
                                    <SText style={styles.iconText}>Lend Card</SText>
                                    <LLendModal //Lend Card
                                        onRequestClose={this.onModalClose}
                                        visible={this.state.lendCardModal}
                                        onPress={this.onModalClose}
                                        header="Lend This Card"
                                        body="Surprise your friend by lending them this awesome card. Just let us know their email."
                                        inputStyle={[this.props.style, styles.input]}
                                        placeholder1="Your Friend's Email"
                                        changeInput1={(email) => this.setState({ email })}
                                        button1text="CANCEL"
                                        button1press={this.onModalClose}
                                        button2text="SEND"
                                        button2press={this.emailisValid.bind(this, this.state.cardsIsLent === true ? 'return' : 'lend')}
                                    ></LLendModal>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({ giveCardModal: true })}>
                                <View>
                                    <Image source={require('../Assets/drawable-xhdpi/givecard.png')}
                                        style={styles.icon}></Image>
                                    <SText style={styles.iconText}>Give Card</SText>
                                    <LGiveModal //Give Card
                                        onRequestClose={this.onModalClose}
                                        visible={this.state.giveCardModal}
                                        onPress={this.onModalClose}
                                        header="Give Card Away"
                                        body="Surprise your friend by giving this card. Just let us know your friends' email and number."
                                        inputStyle={[this.props.style, styles.input]}
                                        placeholder1="Your Friend's Email"
                                        changeInput1={(email) => this.setState({ email })}
                                        // placeholder2="Your Friend's Number"
                                        // changeInput2={(phoneNumber) => this.setState({ phoneNumber })}
                                        button1text="CANCEL"
                                        button1press={this.onModalClose}
                                        button2text="SEND"
                                        button2press={this.emailisValid.bind(this, 'give')}
                                    ></LGiveModal>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({ rateUsModal: true })}>
                                <View>
                                    <Image source={require('../Assets/drawable-xhdpi/rateus.png')}
                                        style={styles.icon}></Image>
                                    <SText style={styles.iconText}>Rate Us</SText>
                                    <LRateModal //Rate Us
                                        onRequestClose={this.onModalClose}
                                        visible={this.state.rateUsModal}
                                        onPress={this.onModalClose}
                                        header="Help Us Improve"
                                        body="Tap a star to rate."
                                        inputStyle={[this.props.style, styles.input]}
                                        placeholder1="Title"
                                        changeInput={(title) => this.setState({ title })}
                                        placeholder2="Review"
                                        changeInput2={(review) => this.setState({ review })}
                                        button1text="CANCEL"
                                        button1press={this.onModalClose}
                                        button2text="SEND"
                                    ></LRateModal>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.refs.modal.open()}>
                                <View>
                                    <Image source={require('../Assets/drawable-xhdpi/share.png')}
                                        style={styles.icon}></Image>
                                    <SText style={styles.iconText}>Share</SText>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({ removeModal: true })}>
                                <View>
                                    <Image source={require('../Assets/drawable-xhdpi/remove.png')}
                                        style={styles.icon}
                                        resizeMode='cover'></Image>
                                    <SText style={styles.iconText}>Remove</SText>
                                    <LRemoveModal //Remove Card
                                        onRequestClose={this.onModalClose}
                                        visible={this.state.removeModal}
                                        onPress={this.onModalClose}
                                        header="Delete Card?"
                                        button1text="CANCEL"
                                        button1press={this.onModalClose}
                                        button2text="DELETE"
                                    ></LRemoveModal>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={{ marginHorizontal: wp('5%'), marginBottom: hp('4%') }}>
                            <SText style={{ marginTop: hp('3%'), fontSize: 16 }}>Rewards</SText>
                            <SText style={{ marginTop: hp('1%') }}>
                                {this.state.cardsDesc}</SText>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={{ marginHorizontal: wp('5%'), marginBottom: hp('4%') }}>
                            <SText style={{ marginTop: hp('3%'), fontSize: 16 }}>Terms & Conditions</SText>
                            <SText style={{ marginTop: hp('1%') }}>
                                {this.state.cardsTnc}</SText>
                        </View>
                    </View>

                    {/* only visible for points card type */}
                    {this.SeePointsDetail(Type)}
                </ScrollView>

                <View style={{ alignSelf: 'center', marginVertical: hp('2.5%') }}>
                    {this.RedeemCardReward(this.state.cardType)}
                </View>
                <Modal position={"bottom"} ref={"modal"} backButtonClose={true} coverScreen={true} style={{ height: hp('40%'), borderRadius: 3 }}>
                    <View style={{ paddingVertical: hp('3%'), borderBottomColor: '#c1c1c1', borderBottomWidth: 0.5 }}>
                        <SText style={{ color: '#505050', fontSize: 16, alignSelf: 'center' }}>Share your card</SText>
                    </View>
                    <View style={{ marginHorizontal: wp('7%') }}>
                        <FlatList
                            ListEmptyComponent={
                                <SText style={{ alignSelf: 'center', marginTop: hp('2%') }}>No media social available!</SText>
                            }
                            data={mediaSocial}
                            numColumns={5}
                            renderItem={({ item }) =>
                                <View style={{ marginTop: hp('3%') }}>
                                    <TouchableOpacity>
                                        <Image
                                            source={{ isStatic: true, uri: item.medsocLogo }}
                                            style={{ width: 52, height: 52, marginRight: wp('3%') }}></Image>
                                        <SText style={{ fontSize: 6, alignSelf: 'center' }}>{item.medsocName}</SText>
                                    </TouchableOpacity>
                                </View>
                            }
                            keyExtractor={(data) => data.medsocId}
                        />
                    </View>
                </Modal>
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

export default CardDetailScreen;