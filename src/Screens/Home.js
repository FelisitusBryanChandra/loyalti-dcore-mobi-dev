import React from 'react';
import { View, ScrollView, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modalbox';
import {
    LCard,
    LCategory,
    LCard2,
    LCardImage,
    LCardImage1,
    LCardImage2
} from '../Components/cardComponent'
import { LHText, SText } from '../Components/CustomText'
import URI from '../Network/Uri'
import APITargetEndpoint from '../Network/APITargetEndpoint';
import SafeAreaView from 'react-native-safe-area-view';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
// import {SkeletonContent} from 'react-native-skeleton-content';


const { width: screenWidth } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f1f1"
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: wp('2%')
    },
    whiteBox: {
        backgroundColor: "#fff",
        width: wp('100%'),
        height: hp('40%'),
    },
    promo: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        margin: '2%'
    },
    item: {
        width: screenWidth,
        height: hp('30%'),
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
})

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            test: "Editor's Choice"
        }

    }

    static navigationOptions = {
        title: 'home'
    }

    allPromo = async () => {
        await APITargetEndpoint.CustomerHome("(page:0,size:4,sort:4)")
            .then((data) => {
                // console.log(data.data.program)
                this.setState({
                    promoHome: data.data.program
                })
            })
            .catch((err) => console.log(err))
    }

    hotPromo = async () => {
        await APITargetEndpoint.CustomerHome('(page:0,size:4, sort: 2)')
            .then((data) => {
                // console.log(data.data)
                this.setState({
                    promoHot: data.data.program
                })
            })
            .catch((err) => console.log(err))
    }

    specialPromo = async () => {
        await APITargetEndpoint.CustomerSpecialHome('(page:0,size:3)')
            .then((data) => {
                // console.log(data)
                this.setState({
                    promoSpecial: data.data.special
                })
            }).catch((err) => console.log(err))
    }

    sliderPromo = async () => {
        await APITargetEndpoint.CustomerSpecialHome('(page:0,size:15)')
            .then((data) => {
                // console.log(data.data.special[0].program_image, "Gambar slider nih")
                this.setState({
                    images: data.data.special
                })
            }).catch((err) => console.log(err))
    }

    category = async () => {
        await APITargetEndpoint.PromoCategory('(page:0,size:6,sort:1)')
            .then((data) => {
                // console.log(data.data.category[0].image_url, "Gambar nih")
                this.setState({
                    promoCategory: data.data.category
                })
            }).catch((err) => console.log(err))
    }

    callPromo() {
        this.specialPromo()
        this.allPromo()
        this.hotPromo()
        this.category()
        this.sliderPromo()
    }

    componentWillMount() {
        this.callPromo()
    }

    componentDidMount() {
        // super.componentDidMount()
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',  
            () => {this.callPromo()}
        );
       }
    
    componentWillUnmount(){
        // super.componentWillUnmount()
        this.willFocusSubscription.remove()
    }


    _renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.program_image }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        );
    }

    get pagination() {
        const { images, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={15}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotColor={'rgba(255, 255, 255, 0.92)'}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    render() {
        const { isLoading, promoHome, promoHot, promoSpecial, promoCategory, images } = this.state

        return (
            <ScrollView style={styles.container}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    dotColor={'dodgerblue'}
                    data={images}
                    renderItem={this._renderItem}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth}
                    hasParallaxImages={true}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                <View style={{ position: 'absolute', top: hp('22%') }}>
                    {this.pagination}
                </View>

                <View>
                    <LHText
                        header="Editor's Choice"
                        subheader="See All"
                        onPress={() => this.props.navigation.navigate('promoList', { headerPromo: "Editor's Choice" })}
                    // onPress={() => this.props.navigation.navigate('cardDetail')}
                    />
                </View>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>

                    <FlatList
                        ListEmptyComponent={
                            <View style={{ flexDirection: 'row' }}>
                                <LCard
                                    url={URI.STARBUCK}
                                    title="Merchant"
                                    subtitle="Promo"
                                    onPress={() => this.props.navigation.navigate("programDetail")}
                                />
                                <LCard
                                    url={URI.BATEEQ}
                                    title="Merchant"
                                    subtitle="Promo"
                                    onPress={() => this.props.navigation.navigate("programDetail")}
                                />

                                <LCard
                                    url={URI.NIKE}
                                    title="Merchant"
                                    subtitle="Promo"
                                    onPress={() => this.props.navigation.navigate("programDetail")}
                                />
                            </View>
                        }
                        data={promoSpecial}
                        numColumns={3}
                        renderItem={(data) => {
                            let getData = data.item
                            return <View
                                style={{ flexDirection: 'row' }}>
                                <LCard
                                    url={getData.program_image}
                                    title={getData.merchant_name}
                                    subtitle={getData.program_name}
                                    onPress={() => this.props.navigation.navigate("promoDetail",
                                        { promoId: getData.id, promoSection: "special", merchantId: getData.merchant_id }
                                    )}
                                />
                            </View>
                        }}
                    />
                </ScrollView>

                <View
                    style={styles.whiteBox}>
                    <LHText
                        header="Categories"
                    />
                    <FlatList
                        ListEmptyComponent={
                            <SText style={{ alignSelf: 'center', marginTop: hp('2%') }}>No categories to show!</SText>
                        }
                        data={promoCategory}
                        numColumns={3}
                        style={{ marginHorizontal: wp('5%') }}
                        contentContainerStyle={{ alignSelf: 'center' }}
                        renderItem={(data) => {
                            let getData = data.item
                            return <View style={{ marginHorizontal: wp('1%') }}>
                                <LCategory
                                    url={{ uri: getData.image_url }}
                                    categoryName={getData.category_name}
                                    onPress={() => this.refs.modal.open()} />
                            </View>
                        }}
                    // keyExtractor={(data) => data.categoryId}
                    />
                </View>

                <LHText
                    header="Near Me"
                    subheader="See All"
                    onPress={() => this.props.navigation.navigate('promoList', { headerPromo: "Near Me" })}
                />

                <ScrollView
                    horizontal={true}
                    style={{ padding: '0.2%', backgroundColor: "#f1f1f1" }}
                    showsHorizontalScrollIndicator={false}
                >
                    <FlatList
                        ListEmptyComponent={
                            <View>
                                <LCard2
                                    url={URI.STARBUCK}
                                    title='Merchant'
                                    subtitle="Promo"
                                />

                                <LCard2
                                    url={URI.BATEEQ}
                                    title='Merchant'
                                    subtitle="Promo"
                                />

                                <LCard2
                                    url={URI.NIKE}
                                    title='Merchant'
                                    subtitle="Promo"
                                /></View>
                        }

                        data={promoSpecial}
                        numColumns={4}
                        renderItem={(data) => {
                            let getData = data.item
                            return <View style={{ margin: 5 }}>
                                <LCard2
                                    url={getData.program_image}
                                    title={getData.merchant_name}
                                    subtitle={getData.program_name}
                                    onPress={() => this.props.navigation.navigate("promoDetail", { promoId: getData.id, promoSection: "special", merchantId: getData.merchant_id })}
                                />
                            </View>
                        }}
                    />


                </ScrollView>

                <View
                    style={{
                        backgroundColor: "#fff",
                        width: wp('100%'),
                        height: hp('65%'),
                        marginBottom: '1%'
                    }}>

                    <LHText
                        header="Recommended for You"
                        subheader="See All"
                        onPress={() => this.props.navigation.navigate('promoList', { headerPromo: "Recommended for You" })}
                    />

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: wp('4%')
                    }}>
                        <LCardImage1
                            url={URI.KOKUMI}
                            title="Kokumi"
                            subtitle="Buy 1 Get 1"
                        />

                        <LCardImage1
                            url={URI.PESCA}
                            title="Pesca"
                            subtitle="Buy 1 Get 1"
                        />
                    </View>
                    <LCardImage2
                        url={URI.UNION}
                        title="Union Deli"
                        subtitle="10% Discount"
                    />
                </View>

                <View>
                    <LHText
                        header="Hot Promo"
                        subheader="See All"
                        onPress={() => this.props.navigation.navigate('promoList', { headerPromo: "Hot Promo" })}
                    />
                    <SafeAreaView style={{ flex: 1, alignSelf: 'center' }}>
                        <FlatList
                            ListEmptyComponent={
                                <View>
                                    <View style={{ flexDirection: 'row', margin: 5 }}>

                                        <LCardImage
                                            // url={URI.NIKE}
                                            title="Merchant"
                                            subtitle="Description"
                                            style={{ margin: 10 }}
                                        />

                                        <LCardImage
                                            // url={URI.NIKE}
                                            title="Merchant"
                                            subtitle="Description"
                                            style={{ margin: 10 }}
                                        />

                                    </View>
                                    <View style={{ flexDirection: 'row', margin: 5 }}>

                                        <LCardImage
                                            // url={URI.NIKE}
                                            title="Merchant"
                                            subtitle="Description"
                                            style={{ margin: 10 }}
                                        />

                                        <LCardImage
                                            // url={URI.NIKE}
                                            title="Merchant"
                                            subtitle="Description"
                                            style={{ margin: 10 }}
                                        />

                                    </View>
                                </View>
                            }
                            data={promoHot}
                            numColumns={2}
                            renderItem={(data) => {
                                let getData = data.item
                                return <View
                                    style={{ padding: 13 }}
                                ><LCardImage
                                        url={getData.program_image}
                                        title={getData.merchant_name}
                                        subtitle={getData.program_name}
                                        onPress={() => this.props.navigation.navigate("promoDetail", { promoId: getData.id, promoSection: "program", merchantId: getData.merchant_id })}
                                    /></View>
                            }}
                        />

                    </SafeAreaView></View>

                <View
                    style={{ backgroundColor: '#fff', marginBottom: 3 }}
                >
                    <LHText
                        header="All Promo"
                        subheader="See All"
                        onPress={() => this.props.navigation.navigate('promoList', { headerPromo: "All Promo" })}
                    />

                    <SafeAreaView style={{ flex: 1, alignSelf: 'center' }}>
                        <FlatList
                            ListEmptyComponent={
                                <View>
                                    <View style={{ flexDirection: 'row', margin: 5 }}>

                                        <LCardImage
                                            title="Merchant"
                                            subtitle="Description"
                                            style={{ margin: 10 }}
                                        />

                                        <LCardImage
                                            title="Merchant"
                                            subtitle="Description"
                                            style={{ margin: 10 }}
                                        />

                                    </View>
                                    <View style={{ flexDirection: 'row', margin: 5 }}>

                                        <LCardImage
                                            title="Merchant"
                                            subtitle="Description"
                                            style={{ margin: 10 }}
                                        />

                                        <LCardImage
                                            title="Merchant"
                                            subtitle="Description"
                                            style={{ margin: 10 }}
                                        />

                                    </View>
                                </View>
                            }
                            data={promoHome}
                            numColumns={2}
                            renderItem={(data) => {
                                let getData = data.item
                                return <View
                                    style={{ padding: 13 }}
                                ><LCardImage
                                        url={getData.program_image}
                                        title={getData.merchant_name}
                                        subtitle={getData.program_name}
                                        onPress={() => this.props.navigation.navigate("promoDetail", { promoId: getData.id, promoSection: "program", merchantId: getData.merchant_id })}
                                    /></View>
                            }}
                        />
                    </SafeAreaView>
                </View>
                <Modal position={"bottom"} ref={"modal"} backButtonClose={true} coverScreen={true} style={{ height: hp('65%'), borderRadius: 3 }}>
                    <View style={{ paddingVertical: hp('3%'), borderBottomColor: '#c1c1c1', borderBottomWidth: 0.5 }}>
                        <SText style={{ color: '#505050', fontSize: 16, alignSelf: 'center' }}>Explore LoyaltiExpress Categories</SText>
                    </View>
                    {/* <FlatList
                        ListEmptyComponent={
                            <LText style={{ alignSelf: 'center', marginTop: hp('2%') }}>No categories to show!</LText>
                        }
                        data={promoCategory}
                        numColumns={3}
                        style={{ marginHorizontal: wp('8%') }}
                        contentContainerStyle={{ alignSelf: 'center' }}
                        renderItem={(data) => {
                            let getData = data.item
                            return <View style={{ marginTop: hp('3%'), marginHorizontal: wp('3%') }}>
                                <LCategory
                                    url={{ uri: getData.image_url }}
                                    categoryName={getData.category_name} />
                            </View>
                        }}
                    // keyExtractor={(data) => data.categoryId}
                    /> */}
                    <View style={{ marginHorizontal: wp('8%') }}>
                        <View style={{ justifyContent: 'space-between', alignSelf: 'center', marginTop: hp('3%'), flexDirection: 'row' }}>
                            <View style={{ marginHorizontal: wp('3%') }}>
                                <Image source={require('../Assets/drawable-xhdpi/fnbIcon.png')}
                                    style={{ width: 68, height: 68 }}></Image>
                                <SText style={{ fontSize: 9, alignSelf: 'center' }}>Food & Beverage</SText>
                            </View>
                            <View style={{ marginHorizontal: wp('3%') }}>
                                <Image source={require('../Assets/drawable-xhdpi/lifestyleIcon.png')}
                                    style={{ width: 68, height: 68 }}></Image>
                                <SText style={{ fontSize: 9, alignSelf: 'center' }}>Lifestyle</SText>
                            </View>
                            <View style={{ marginHorizontal: wp('3%') }}>
                                <Image source={require('../Assets/drawable-xhdpi/hnbIcon.png')}
                                    style={{ width: 68, height: 68 }}></Image>
                                <SText style={{ fontSize: 9, alignSelf: 'center' }}>Health & Beauty</SText>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', alignSelf: 'center', marginTop: hp('3%'), flexDirection: 'row' }}>
                            <View style={{ marginHorizontal: wp('3%') }}>
                                <Image source={require('../Assets/drawable-xhdpi/travelIcon.png')}
                                    style={{ width: 68, height: 68 }}></Image>
                                <SText style={{ fontSize: 9, alignSelf: 'center' }}>Travel</SText>
                            </View>
                            <View style={{ marginHorizontal: wp('3%') }}>
                                <Image source={require('../Assets/drawable-xhdpi/ecommerceIcon.png')}
                                    style={{ width: 68, height: 68 }}></Image>
                                <SText style={{ fontSize: 9, alignSelf: 'center' }}>E-Commerce</SText>
                            </View>
                            <View style={{ marginHorizontal: wp('3%') }}>
                                <Image source={require('../Assets/drawable-xhdpi/serviceIcon.png')}
                                    style={{ width: 68, height: 68 }}></Image>
                                <SText style={{ fontSize: 9, alignSelf: 'center' }}>Service</SText>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', alignSelf: 'center', marginTop: hp('3%'), flexDirection: 'row' }}>
                            <View style={{ marginHorizontal: wp('3%') }}>
                                <Image source={require('../Assets/drawable-xhdpi/activityIcon.png')}
                                    style={{ width: 68, height: 68 }}></Image>
                                <SText style={{ fontSize: 9, alignSelf: 'center' }}>Activity</SText>
                            </View>
                            <View style={{ marginHorizontal: wp('3%') }}>
                                <Image source={require('../Assets/drawable-xhdpi/entertainmentIcon.png')}
                                    style={{ width: 68, height: 68 }}></Image>
                                <SText style={{ fontSize: 9, alignSelf: 'center' }}>Entertainment</SText>
                            </View>
                            <View style={{ marginHorizontal: wp('3%') }}>
                                <Image source={require('../Assets/drawable-xhdpi/ecommerceIcon.png')}
                                    style={{ width: 68, height: 68 }}></Image>
                                <SText style={{ fontSize: 9, alignSelf: 'center' }}>E-Commerce</SText>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>

        );
    }
}

export default Home;