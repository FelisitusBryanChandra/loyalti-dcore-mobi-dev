import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SText } from '../Components/CustomText'
import LTInput from '../Components/LTInput'
import { LStoreLocation } from '../Components/LPromo'
import { LMapsModal, LModal } from '../Components/modalComponent'
import URI from '../Network/Uri'
import { AirbnbRating } from 'react-native-ratings';
import Modal from 'react-native-modalbox';
import { LReview } from '../Components/Review'
import { BarChart, Grid } from 'react-native-svg-charts'
import call from 'react-native-phone-call'
import AsyncStorage from '@react-native-community/async-storage'
import APITargetEndpoint from '../Network/APITargetEndpoint'


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp('6.2%'),
        height: hp('6%'),
        borderWidth: 0.3,
        borderColor: '#2096f3',
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    container: {
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5
    },
})

class PromoDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isDetailPressed: true,
            isLocationPressed: false,
            isAboutPressed: false,
            isOpen: false,
            isDisabled: false,
            swipeToClose: true,
            storeLocation: false,
            buttonJoin: false,
            modalSuccess:false,
            modalError: false
        }
    }

    cardId = async () => {
        const programId = await this.state.programId
        console.log(programId, "test programId")
        let idProgram = `size:1,id:${programId}`
        await APITargetEndpoint.merchantCardId(idProgram)
            .then((data) => {
                console.log(data.data.card[0].id,'test lah cuiiiii')
                this.setState({  
                    merchantCard: data.data.card[0].id
                })
            }).catch((err) => {console.log(err)})
        }

    promoSpecialGraphQL = async () => {

        const idSpecialPromo = this.props.navigation.getParam("promoId")
        console.log(idSpecialPromo)
        await this.setState({
            id: idSpecialPromo
        })

        let idPromo = JSON.stringify(this.state.id)


        await APITargetEndpoint.CustomerSpecialHome(`(id:${idPromo})`)
            .then((data) => {
                console.log(data.data.special, "test")
                let dataProgram = data.data.special[0]
                this.setState({
                    programCardType: dataProgram.card,
                    programId: dataProgram.id,
                    programImage: dataProgram.program_image,
                    programName: dataProgram.program_name,
                    merchantName: dataProgram.merchant_name,
                    programDesc: dataProgram.program_description,
                    programTnc: dataProgram.terms_and_condition,
                    programTier: dataProgram.tier,
                })

                this.cardId()

            })
            .catch((err) => console.log(err))
    }

    promoProgramGraphQL = async () => {

        const idPromos = this.props.navigation.getParam("promoId")
        await this.setState({
            id: idPromos
        })

        let idPromo = JSON.stringify(this.state.id)

        await APITargetEndpoint.CustomerHome(`(id: ${idPromo})`)
            .then((data) => {
                console.log(data.data.program[0].id, "Promo Detail")
                let dataProgram = data.data.program[0]
                this.setState({
                    programCardType: dataProgram.card,
                    programId: dataProgram.id,
                    programImage: dataProgram.program_image,
                    programName: dataProgram.program_name,
                    merchantName: dataProgram.merchant_name,
                    programDesc: dataProgram.program_description,
                    programTnc: dataProgram.terms_and_condition,
                    programTier: dataProgram.tier,
                })
                this.cardId()
            })
            .catch((err) => console.log(err))
    }

    


    programLocation = async () => {
        const outlet_id = this.props.navigation.getParam("merchantId")
        await this.setState({
            outletId: outlet_id
        })
        console.log(this.state.outletId, "Outlet Id")
        let idMerchant = `page:0, size:3,id: ${outlet_id}`
        await APITargetEndpoint.OutletLocation(idMerchant)
            .then((data) => {
                console.log(data.data.outlet, "test")
                var dataOutlet = data.data.outlet
                this.setState({
                    outletName: dataOutlet.outlet_name,
                    outletAddress: dataOutlet.outlet_address,
                    outletCity: dataOutlet.outlet_city,
                    outletPhone: dataOutlet.outlet_phone
                })
            })
            .catch((err) => console.log(err))

    }

    programAboutUs = async () => {
        const merchant_id = this.props.navigation.getParam("merchantId")
        await this.setState({
            merchantId: merchant_id
        })
        console.log(this.state.merchantId, "test2")
        let idPromo = `,id: ${merchant_id}`
        await APITargetEndpoint.MerchantAboutUs(idPromo)
            .then((data) => {
                console.log(data.data.merchant, "test")
                this.setState({
                    merchantDesc: data.data.merchant.merchant_description
                })
            })
            .catch((err) => console.log(err))
    }
    
    async checkGraphQL() {
        const promoSection = this.props.navigation.getParam("promoSection")

        if (promoSection === "special") {
            this.promoSpecialGraphQL()
        }
        if (promoSection === "program") {
            this.promoProgramGraphQL()
        }
    }

    getId = async () => {
        try {
            // const token = await AsyncStorage.getItem('tokenKey')
            const customerId = await AsyncStorage.getItem('customerId')
            if (customerId !== null) {
                // console.log(emailS, "Email Cache")
                this.setState({
                    id: customerId
                })
            }
        }
        catch (error) {
            console.warn(error)
        }
    }

    async checkValidateJoin(){
        await this.getId()
        // console.log(programCardType,"CARD TYPE")
        console.log(this.state.id, this.state.merchantCard, "id & merchantCard")        

        if (await this.state.merchantCard === undefined || 
            await this.state.merchantCard === null || await this.state.merchantCard === '00000000-0000-0000-0000-000000000000' ||
             this.state.id === '00000000-0000-0000-0000-000000000000' || this.state.id === null || this.state.id === undefined
            ){
                console.log("Your data is invalid")
                this.setState({buttonJoin:false, modalError: true, modalSuccess:true})
                
            }
            else{
                this.joinPromoProfile()                
                this.setState({buttonJoin:true, modalSuccess: true})
            }
    }

    async joinPromoProfile() {
        await this.getId()
        
        var programCardType = this.state.programCardType
        var cardType=""
        console.log(programCardType,"CARD TYPE")
        console.log(this.state.id, this.state.merchantCard, "id & merchantCard")
        
        let dataSet= {}        
        dataSet.CustomerId = this.state.id;
        dataSet.CardId = this.state.merchantCard;        
        console.warn(dataSet, "Join Promo Dataset")

        await APITargetEndpoint.JoinPromoCard(dataSet)
            .then((response) => JSON.stringify(response))
            .then((responseData) => {
                console.log(responseData, "Resp Data");                
                this.props.navigation.navigate('cardDetail',{cardId:this.state.merchantCard, customerId:this.state.id, type:programCardType})
                
            })
            .catch((err) => {console.log("Error" + err)})

            if(programCardType === "Chop"){
                cardType = "chopCard"
            }
            if(programCardType === "Member"){ 
                cardType = "membershipCard"
            }
            if(programCardType === "Point"){
                cardType = "pointCard"
            }
            if(programCardType === "Voucher"){
                cardType = "voucher"
            }            
    }

    componentWillMount() {
        this.checkGraphQL()
        this.programAboutUs()
        this.programLocation()
    }

    makeCall = (number) => {
        const args = {
            number: number,
            prompt: true
        }
        call(args).catch(console.error)
    }

    onModalClose = () => {
        this.setState({
            storeLocation: false,
            modalSuccess:false
        })
    }

    render() {

        var { programImage, programName, merchantName, programDesc, programTnc, programTier } = this.state

        let socmedLogo = [

            { SocialMediaLogo: '../Assets/drawable-xhdpi/fbIcon.png' },
            { SocialMediaLogo: '../Assets/drawable-xhdpi/twitterIcon.png' },
            { SocialMediaLogo: '../Assets/drawable-xhdpi/igIcon.png' },
            { SocialMediaLogo: '../Assets/drawable-xhdpi/googleIcon.png' },
            { SocialMediaLogo: '../Assets/drawable-xhdpi/linkedinIcon.png' },
            { SocialMediaLogo: '../Assets/drawable-xhdpi/waIcon.png' }
        ]


        let merchantLocation = [
            {
                storeId: 1,
                merchantName: "PT. Moonlay Technologies",
                address: "Jl. Jendral Sudirman Kav.52-53, Jakarta Selatan",
                storeNumber: "081234523467",
                hours: "09.00 - 21.00",
                distance: "0.5",
            },
            {
                storeId: 2,
                merchantName: "PT. Moonlay Technologies",
                address: "Jl. Jendral Sudirman Kav.52-53, Jakarta Selatan",
                storeNumber: "081234523467",
                hours: "09.00 - 21.00",
                distance: "0.5",
            },
            {
                storeId: 3,
                merchantName: "PT. Moonlay Technologies",
                address: "Jl. Jendral Sudirman Kav.52-53, Jakarta Selatan",
                phone: "081234523467",
                hours: "09.00 - 21.00",
                distance: "0.5",
            }
        ]

        let customerReview = [
            {
                reviewId: 1,
                custName: "Loyalti Express",
                rate: "4",
                content: "Lorem ipsum dolor sit amet.",
                date: "12-12-2018"
            },
            {
                reviewId: 2,
                custName: "Loyalti Express",
                rate: "4",
                content: "Lorem ipsum dolor sit amet.",
                date: "12-12-2018"
            },
            {
                reviewId: 3,
                custName: "Loyalti Express",
                rate: "4",
                content: "Lorem ipsum dolor sit amet.",
                date: "12-12-2018"
            },
        ]

        let gallery = [
            {
                photoId: 1,
                photo: URI.STARBUCK
            },
            {
                photoId: 2,
                photo: URI.STARBUCK
            },
            {
                photoId: 3,
                photo: URI.UNION
            },
            {
                photoId: 4,
                photo: URI.UNION
            },
            {
                photoId: 5,
                photo: URI.STARBUCK
            },
            {
                photoId: 6,
                photo: URI.UNION
            }
        ]

        let mediaSocial = [
            {
                medsocId: 1,
                medsocLogo: URI.FACEBOOK
            },
            {
                medsocId: 2,
                medsocLogo: URI.TWITTER
            },
            {
                medsocId: 3,
                medsocLogo: URI.INSTAGRAM
            },
            {
                medsocId: 4,
                medsocLogo: URI.GPLUS
            },
            {
                medsocId: 5,
                medsocLogo: URI.LINKEDIN
            },
            {
                medsocId: 6,
                medsocLogo: URI.WHATSAPP
            },
        ]

        const star5 = [60, 0]
        const star4 = [50, 0]
        const star3 = [40, 0]
        const star2 = [30, 0]
        const star1 = [20, 0]

        // console.log(this.state.merchantCard, "Program Card Id")

        return (

            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View>
                        <Image
                            source={{ uri: programImage }}
                            style={{ width: wp('100%'), height: hp('25%') }}>
                        </Image>
                    </View>
                    <View style={{
                        flexDirection: 'row', alignSelf: 'center', position: 'absolute', marginTop: hp('21.9%'), backgroundColor: 'white', borderRadius: 5
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: this.state.isDetailPressed ? '#2096f3' : 'white',
                            borderBottomLeftRadius: 5,
                            borderTopLeftRadius: 5,
                            ...styles.button
                        }}
                            activeOpacity={0.6}
                            onPress={() =>
                                this.setState({
                                    isDetailPressed: true, isAboutPressed: false, isLocationPressed: false
                                })}>
                            <SText style={{ color: this.state.isDetailPressed ? 'white' : '#000' }}>DETAIL</SText>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: this.state.isLocationPressed ? '#2096f3' : 'white',
                            ...styles.button
                        }}
                            activeOpacity={0.6}
                            onPress={() =>
                                this.setState({
                                    isLocationPressed: true, isDetailPressed: false, isAboutPressed: false
                                })
                            } >
                            <SText style={{ color: this.state.isLocationPressed ? 'white' : '#000' }}>LOCATION</SText>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: this.state.isAboutPressed ? '#2096f3' : 'white',
                            borderBottomRightRadius: 5,
                            borderTopRightRadius: 5,
                            ...styles.button
                        }}
                            activeOpacity={0.6}
                            onPress={() =>
                                this.setState({
                                    isAboutPressed: true, isLocationPressed: false, isDetailPressed: false
                                })}>
                            <SText style={{ color: this.state.isAboutPressed ? 'white' : '#000' }}>ABOUT US</SText>
                        </TouchableOpacity>
                    </View>
                    {/* DETAIL */}
                    <View style={{ display: this.state.isDetailPressed ? 'flex' : 'none' }}>
                        <View style={styles.container}>
                            <View style={{ marginHorizontal: wp('5%'), marginVertical: hp('2%') }}>
                                <SText style={{ marginTop: hp('4%'), fontSize: 24, color: '#505050' }}>{programName}</SText>
                                <SText style={{ color: '#505050' }}>{merchantName}</SText>
                                <View style={{ flexDirection: 'row', marginVertical: hp('2%'), justifyContent: 'space-between' }}>
                                    <TouchableOpacity style={{ backgroundColor: '#2096f3', borderRadius: 5, paddingVertical: hp('0.5%'), paddingHorizontal: wp('1.5%'), flexDirection: 'row' }}>
                                        <SText style={{ color: 'white' }}>5.0
                                        </SText>
                                        <AirbnbRating
                                            count={1}
                                            defaultRating={0}
                                            size={12}
                                            showRating={false}
                                            isDisabled={true}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.refs.modal.open()}
                                        style={{ flexDirection: 'row' }}>
                                        <SText style={{ color: '#2096f3', textAlignVertical: 'center' }}>Reviews</SText>
                                        <Image source={require('../Assets/drawable-xhdpi/bluearrow.png')} style={{ width: 8, height: 12, marginTop: hp('1.3%'), marginLeft: wp('2.5%') }}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={{ marginHorizontal: wp('5%'), marginBottom: hp('4%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                                <SText style={{ marginTop: hp('4%'), fontSize: 16 }}>Rating this program</SText>
                                <AirbnbRating
                                    count={5}
                                    defaultRating={0}
                                    size={25}
                                    showRating={false}
                                    starContainerStyle={{ marginTop: hp('3%') }}
                                />
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={{ marginHorizontal: wp('5%'), marginBottom: hp('4%') }}>
                                <SText style={{ marginTop: hp('3%'), fontSize: 16 }}>Description</SText>
                                <SText style={{ marginTop: hp('1%') }}>
                                    {programDesc}</SText>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={{ marginHorizontal: wp('5%'), marginBottom: hp('4%') }}>
                                <SText style={{ marginTop: hp('3%'), fontSize: 16 }}>Terms & Conditions</SText>
                                <SText style={{ marginTop: hp('1%') }}>
                                    {programTnc}</SText>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={{ marginHorizontal: wp('5%'), marginBottom: hp('4%') }}>
                                <SText style={{ marginTop: hp('3%'), fontSize: 16 }}>Info Tier</SText>
                                <TouchableOpacity>
                                    <SText style={{ marginTop: hp('3%'), color: '#2096f3' }}>{programTier}</SText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* location */}
                    <View style={{ display: this.state.isLocationPressed ? 'flex' : 'none' }}>
                        <View style={{
                            flexDirection: 'row',
                            borderColor: '#505050',
                            borderWidth: 0.5,
                            borderRadius: 5,
                            height: hp('7%'),
                            marginHorizontal: wp('5%'),
                            marginTop: hp('6%')
                        }}>
                            <LTInput
                                inputBlock={{ marginHorizontal: wp('3%') }}
                                // onChangeText={()=>
                                // this.callSearchCards(searches)
                                // }
                                // value={this.state.search}
                                style={{ width: wp('80%'), marginLeft: wp('1%') }}
                            />
                            <Image
                                source={require('../Assets/drawable-xhdpi/SearchIcon.png')}
                                style={{
                                    marginTop: hp('2%'),
                                    width: wp('6%'),
                                    height: hp('3%')
                                }}
                            ></Image>
                        </View>
                        <View style={{ marginTop: hp('3%') }}>
                            <SText style={{ color: '#505050', fontSize: 16, marginHorizontal: wp('5%') }}>Location</SText>
                            <FlatList
                                ListEmptyComponent={
                                    <SText style={{ alignSelf: 'center', marginTop: hp('2%') }}>No store location!</SText>
                                }
                                data={merchantLocation}
                                renderItem={({ item }) =>
                                    <LStoreLocation
                                        merchantName={item.merchantName}
                                        address={item.address}
                                        phone={item.phone}
                                        hours={item.hours}
                                        distance={item.distance}
                                        button1press={() => this.setState({ storeLocation: true })}
                                        button2press={() => this.makeCall(item.storeNumber)}
                                    />
                                }
                                keyExtractor={(data) => data.storeId}
                            />
                            <LMapsModal
                                onRequestClose={this.onModalClose}
                                visible={this.state.storeLocation}
                                onPress={this.onModalClose}
                                header="Open in Maps?"
                                button1text="NO"
                                button1press={this.onModalClose}
                                button2text="YES"
                            // button2press={}
                            ></LMapsModal>
                        </View>
                    </View>
                    {/* about */}
                    <View style={{ display: this.state.isAboutPressed ? 'flex' : 'none' }}>
                        <View style={styles.container}>
                            <View style={{ marginHorizontal: wp('5%'), marginBottom: hp('4%') }}>
                                <SText style={{ marginTop: hp('7%'), fontSize: 16 }}>About Us</SText>
                                <SText style={{ marginTop: hp('1%') }}>
                                    {this.state.merchantDesc}</SText>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={{ paddingHorizontal: wp('5%'), marginBottom: hp('4%') }}>
                                <SText style={{ marginTop: hp('3%') }}>Gallery</SText>
                                <FlatList
                                    ListEmptyComponent={
                                        <SText style={{ alignSelf: 'center', marginTop: hp('2%') }}>No photos to show!</SText>
                                    }
                                    data={gallery}
                                    numColumns={3}
                                    renderItem={({ item }) =>
                                        <View style={{ marginTop: hp('2%') }}>
                                            <TouchableOpacity>
                                                <Image
                                                    source={{ uri: item.photo }}
                                                    style={{ width: wp('29%'), height: hp('17%'), marginRight: wp('1.5%'), borderRadius: 5 }}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    keyExtractor={(data) => data.photoId}
                                />
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={{ marginHorizontal: wp('5%'), marginBottom: hp('4%') }}>
                                <SText style={{ marginTop: hp('3%'), fontSize: 16 }}>Media Social</SText>
                                {/* <FlatList
                                    ListEmptyComponent={
                                        <LText style={{ alignSelf: 'center', marginTop: hp('2%') }}>No media social available!</LText>
                                    }
                                    data={mediaSocial}
                                    horizontal={true}
                                    renderItem={({ item }) =>
                                        <View style={{ marginTop: hp('2%') }}>
                                            <TouchableOpacity>
                                                <Image
                                                    source={{ uri: item.medsocLogo }}
                                                    style={{ width: 38, height: 38, marginRight: wp('3%') }}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    keyExtractor={(data) => data.medsocId}
                                /> */}
                                <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>

                                    <TouchableOpacity>
                                        <Image
                                            source={require('../Assets/drawable-xhdpi/fbIcon.png')}
                                            style={{ width: 38, height: 38, marginRight: wp('3%') }}>
                                        </Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image
                                            source={require('../Assets/drawable-xhdpi/twitterIcon.png')}
                                            style={{ width: 38, height: 38, marginRight: wp('3%') }}>
                                        </Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image
                                            source={require('../Assets/drawable-xhdpi/igIcon.png')}
                                            style={{ width: 38, height: 38, marginRight: wp('3%') }}>
                                        </Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image
                                            source={require('../Assets/drawable-xhdpi/googleIcon.png')}
                                            style={{ width: 38, height: 38, marginRight: wp('3%') }}>
                                        </Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image
                                            source={require('../Assets/drawable-xhdpi/linkedinIcon.png')}
                                            style={{ width: 38, height: 38, marginRight: wp('3%') }}>
                                        </Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image
                                            source={require('../Assets/drawable-xhdpi/waIcon.png')}
                                            style={{ width: 38, height: 38 }}>
                                        </Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={{ marginHorizontal: wp('5%'), marginBottom: hp('4%') }}>
                                <SText style={{ marginTop: hp('3%'), fontSize: 16 }}>Website</SText>
                                <SText style={{ marginTop: hp('3%'), color: '#2096f3' }}>https://www.bateeq.com</SText>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => this.checkValidateJoin()}
                    disable={this.state.buttonJoin === true ? false : true}
                    >
                    <View 
                    style={{backgroundColor: '#2096f3', paddingVertical: hp('2%')}}                    
                    >
                        <SText style={{ color: 'white', alignSelf: 'center' }}>JOIN PROMO</SText>
                    </View>
                </TouchableOpacity>
                <Modal position={"bottom"} ref={"modal"} backButtonClose={true} coverScreen={true} style={{ height: hp('80%') }}>
                    <View style={{ backgroundColor: '#2096f3', paddingVertical: hp('2%') }}>
                        <SText style={{ color: 'white', alignSelf: 'center' }}>Rating & Review</SText>
                    </View>
                    <View style={{ marginHorizontal: wp('5%'), marginVertical: hp('3%'), alignContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <SText style={{ fontSize: 60 }}>5.0</SText>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp('4%') }}>
                                    <Image source={require('../Assets/drawable-xhdpi/user.png')} style={{ height: 12, width: 10, marginRight: wp('1%') }}></Image>
                                    <SText style={{ fontSize: 12 }}>25 Total</SText>
                                </View>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../Assets/drawable-xhdpi/star.png')} style={{ height: 9, width: 10, marginRight: wp('1%') }}></Image>
                                    <SText style={{ fontSize: 18 }}>5</SText>
                                    <View style={{ flex: 1, marginLeft: wp('3%') }}>
                                        <BarChart
                                            style={{ height: hp('3%') }}
                                            yMax={100}
                                            data={star5}
                                            svg={{ fill: '#73c718' }}
                                            contentInset={{ top: 15, bottom: 25 }}
                                            horizontal={true}>
                                            {/* <Grid /> */}
                                        </BarChart>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../Assets/drawable-xhdpi/star.png')} style={{ height: 9, width: 10, marginRight: wp('1%') }}></Image>
                                    <SText style={{ fontSize: 18 }}>4</SText>
                                    <View style={{ flex: 1, marginLeft: wp('3%') }}>
                                        <BarChart
                                            style={{ height: hp('3%') }}
                                            yMax={100}
                                            data={star4}
                                            svg={{ fill: '#a3ea55' }}
                                            contentInset={{ top: 15, bottom: 25 }}
                                            horizontal={true}>
                                            {/* <Grid /> */}
                                        </BarChart>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../Assets/drawable-xhdpi/star.png')} style={{ height: 9, width: 10, marginRight: wp('1%') }}></Image>
                                    <SText style={{ fontSize: 18 }}>3</SText>
                                    <View style={{ flex: 1, marginLeft: wp('3%') }}>
                                        <BarChart
                                            style={{ height: hp('3%') }}
                                            yMax={100}
                                            data={star3}
                                            svg={{ fill: '#f8e71c' }}
                                            contentInset={{ top: 15, bottom: 25 }}
                                            horizontal={true}>
                                            {/* <Grid /> */}
                                        </BarChart>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../Assets/drawable-xhdpi/star.png')} style={{ height: 9, width: 10, marginRight: wp('1%') }}></Image>
                                    <SText style={{ fontSize: 18 }}>2</SText>
                                    <View style={{ flex: 1, marginLeft: wp('3%') }}>
                                        <BarChart
                                            style={{ height: hp('3%') }}
                                            yMax={100}
                                            data={star2}
                                            svg={{ fill: '#f5a623' }}
                                            contentInset={{ top: 15, bottom: 25 }}
                                            horizontal={true}>
                                            {/* <Grid /> */}
                                        </BarChart>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../Assets/drawable-xhdpi/star.png')} style={{ height: 9, width: 10, marginRight: wp('1%') }}></Image>
                                    <SText style={{ fontSize: 18 }}>1</SText>
                                    <View style={{ flex: 1, marginLeft: wp('3%'), alignContent: 'center' }}>
                                        <BarChart
                                            style={{ height: hp('3%') }}
                                            yMax={100}
                                            data={star1}
                                            svg={{ fill: '#d0021b' }}
                                            contentInset={{ top: 15, bottom: 25 }}
                                            horizontal={true}>
                                            {/* <Grid /> */}
                                        </BarChart>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <FlatList
                            ListEmptyComponent={
                                <SText style={{ alignSelf: 'center', marginTop: hp('2%') }}>No rating and review yet!</SText>
                            }
                            data={customerReview}
                            renderItem={({ item }) =>
                                <LReview
                                    custName={item.custName}
                                    rate={item.rate}
                                    content={item.content}
                                    date={item.date}>
                                </LReview>
                            }
                            keyExtractor={(data) => data.reviewId}
                        />
                    </View>
                </Modal>
                <LModal
              onRequestClose={this.onModalClose}
              visible={this.state.modalSuccess}
              onPress={this.onModalClose}
              successText={this.state.modalError === false ? "You have joined the promo" : "Failed to Join the Promo" }            
              src={this.state.modalError === false ? require('../Assets/drawable-xhdpi/check.png'): require('../Assets/drawable-xhdpi/fail.png')}
            />
            </View >
        )
    }
}

export default PromoDetail;