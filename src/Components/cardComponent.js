// import URI from '../Network/Uri'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { SText } from './CustomText';

export const LCard = (props) => (
    <TouchableOpacity style={styles.ecCard} activeOpacity={0.6} onPress={props.onPress}>
        <View>
            <Image
                source={{ uri: props.url }}
                style={styles.ecCardImage}
            />
        </View>
        <View
            style={{ margin: '8%' }}>

            <Text
                style={styles.cardTitle}>
                {props.title}</Text>

            <Text
                style={styles.cardSubTitle}>
                {props.subtitle}</Text>

        </View>
    </TouchableOpacity>
)

export const LCategory = (props) => (
    <TouchableOpacity
        activeOpacity={0.6}
        onPress={props.onPress}
        style={{alignItems: 'center'}}
    >
        <Image
            source={props.url}
            style={styles.categoryIcon}
        />
        <SText style={{ fontSize: 9 }}>{props.categoryName}</SText>
    </TouchableOpacity>
)

export const LCardImage1 = (props) => (


    <TouchableOpacity
        activeOpacity={0.6}
        style={{ backgroundColor: '#f1f1f1', elevation: 20,borderRadius:10 }}
    >
        <View
            style={{
                overflow: 'hidden',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,

            }}
        >
            <Image
                source={{ uri: props.url }}
                style={{
                    width: wp('43%'),
                    height: hp('30%'),
                    borderRadius: 10,
                }}
            />
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                colors={['black', 'transparent']}
                style={styles.linearGradient}>
                <Text
                    style={{
                        fontSize: 18,
                        color: '#fff',
                        fontWeight: '700',
                        marginLeft: '10%',
                    }}
                >{props.title}</Text>
                <Text
                    style={{
                        marginLeft: '10%',
                        color: '#fff',
                        fontSize: 10
                    }}
                >{props.subtitle}</Text>
            </LinearGradient>
        </View>
    </TouchableOpacity>

)


export const LCardImage2 = (props) => (

    <View
        style={{
            margin: '2%',
            borderRadius:10,
            backgroundColor: '#f1f1f1',
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.9,
            shadowRadius: 10,
            elevation: 15
        }}
    >
        <TouchableOpacity
            activeOpacity={0.6}
        >
            <View
                style={{
                    overflow: 'hidden',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 1,
                        height: 1,
                    },
                    shadowOpacity: 0,
                    shadowRadius: 10,
                    elevation: 15,
                    backgroundColor: '#f1f1f1'
                }}
            >
                <Image
                    source={{ uri: props.url }}
                    style={{ width: wp('90%'), height: hp('20%'), borderRadius: 10 }}
                />
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    colors={['black', 'transparent']}
                    style={{
                        width: '100%',
                        position: 'absolute',
                        paddingBottom: hp('2%'),
                        marginTop: '30%'
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#fff',
                            fontWeight: '700',
                            marginLeft: '5%',
                        }}
                    >{props.title}</Text>
                    <Text
                        style={{
                            marginLeft: '5%',
                            color: '#fff',
                            fontSize: 10
                        }}
                    >{props.subtitle}</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    </View>
)

export const LCard2 = (props) => (
    <TouchableOpacity style={styles.ecCard2} activeOpacity={0.6}
    onPress={props.onPress}
    >
        <View
            style={{
                backgroundColor: '#f1f1f1',
                shadowOffset: {
                    width: 0,
                    height: 1
                },
                shadowOpacity: 0.9,
                shadowRadius: 1,
                elevation: 8,
                outlineProvider: 'bounds',
                borderRadius:10
            }}
        >
            <Image
                source={{ uri: props.url }}
                style={styles.ecCardImage2}
            />
        </View>
        <View
            style={{ margin: '8%' }}>

            <Text
                style={styles.cardTitle}>
                {props.title}</Text>

            <Text
                style={styles.cardSubTitle}>
                {props.subtitle}</Text>

        </View>
        </TouchableOpacity>
)


export const LCardImage = (props) => (
    <View
    style={props.style}
    >
        <TouchableOpacity
            activeOpacity={0.6}
            style={{    
                backgroundColor:'#f1f1f1',
                shadowColor:'#000',
                elevation:15,
                borderRadius:10,
                marginBottom:5
            }}
            onPress={props.onPress}
        >
            <Image
                source={{ uri: props.url }}
                style={styles.ecCardImage2}
            /></TouchableOpacity>
        <Text
            style={styles.cardTitle}
        >{props.title}</Text>
        <Text
            style={styles.cardSubTitle}
        >{props.subtitle}</Text>
    </View>
)



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f1f1"
    },
    linearGradient: {
        paddingVertical: hp('2%'),
        position: 'absolute',
        width: wp('45%'),
        marginTop: hp('21%')

    },
    ecCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        height: hp('30%'),
        width: wp('40%'),
        margin: hp('1%'),
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 12
    },
    ecCard2: {
        overflow: "hidden",
        height: hp('30%'),
        width: wp('40%'),
        marginVertical: wp('1%'),
        marginHorizontal: hp('1%'),
        backgroundColor: '#f1f1f1', 
    },
    ecCardImage: {
        height: hp('20%'),
        width: wp('40%')
    },
    ecCardImage2: {
        height: hp('20%'),
        width: wp('40%'),
        borderRadius: 10,
        // marginBottom: '5%',        

    },

    categoryIcon: {
        width: 68,
        height: 68,
        margin: hp('1%'),
    },

    title:
    {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: wp('2%')
    },

    header: {
        fontSize: 18,
        fontWeight: "bold",
        textAlignVertical: "center",
        padding: '1%'
    },
    subheader: {
        fontSize: 12,
        color: '#4b8cbc',
        textAlignVertical: "center",
        marginTop: '35%',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cardSubTitle:
    {
        fontSize: 11
    },
    whiteBox: {
        backgroundColor: "#fff",
        width: wp('100%'),
        height: hp('40%'),
        marginBottom: '4%',
        marginTop: '4%'
    }
})