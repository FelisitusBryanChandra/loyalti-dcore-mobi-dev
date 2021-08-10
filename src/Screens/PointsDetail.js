import React from "react";
import { Button, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SText } from '../Components/CustomText'
import LTInput from '../Components/LTInput'
import { LPromo } from '../Components/LPromo'
import { LInfoPoints } from "../Components/PointsReward";

class PointsDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isCollectPressed: true,
            isUsedPressed: false
        }
    }

    render() {

        let pointCollected = [
            {
                id: 1,
                title: "Lorem ipsum is simply dummy",
                points: "120",
                date: "25 Dec 2019",
                timestamp: "12.00 PM"
            },
            {
                id: 2,
                title: "Lorem ipsum is simply dummy",
                points: "120",
                date: "25 Dec 2019",
                timestamp: "12.00 PM"
            },
            {
                id: 3,
                title: "Lorem ipsum is simply dummy",
                points: "120",
                date: "25 Dec 2019",
                timestamp: "12.00 PM"
            },
            {
                id: 4,
                title: "Lorem ipsum is simply dummy",
                points: "120",
                date: "25 Dec 2019",
                timestamp: "12.00 PM"
            }
        ]

        let pointUsed = [
            {
                id: 1,
                title: "Lorem ipsum is simply dummy",
                points: "-100",
                date: "25 Dec 2019",
                timestamp: "12.00 PM"
            },
            {
                id: 2,
                title: "Lorem ipsum is simply dummy",
                points: "-80",
                date: "25 Dec 2019",
                timestamp: "12.00 PM"
            }
        ]

        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    marginTop: hp('4%'), marginBottom: hp('2%'), justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: this.state.isCollectPressed ? '#2096f3' : 'white',
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
                            this.setState({ isCollectPressed: true, isUsedPressed: false })}>
                        <SText style={{ color: this.state.isCollectPressed ? 'white' : '#2096f3' }}>POINT COLLECTED</SText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: this.state.isUsedPressed ? '#2096f3' : 'white',
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
                            this.setState({ isUsedPressed: true, isCollectPressed: false })}>
                        <SText style={{ color: this.state.isUsedPressed ? 'white' : '#2096f3' }}>POINT USED</SText>
                    </TouchableOpacity>
                </View>
                <View style={{ display: this.state.isCollectPressed ? 'flex' : 'none' }}>
                    <FlatList
                        ListEmptyComponent={
                            <SText style={{ alignSelf: 'center' }}>No points available!</SText>
                        }
                        data={pointCollected}
                        renderItem={({ item }) =>
                            <LInfoPoints
                                title={item.title}
                                points={item.points}
                                date={item.date}
                                timestamp={item.timestamp} />
                        }
                        keyExtractor={(data) => data.id} />
                </View>
                <View style={{ display: this.state.isUsedPressed ? 'flex' : 'none' }}>
                    <FlatList
                        ListEmptyComponent={
                            <SText style={{ alignSelf: 'center' }}>No points available!</SText>
                        }
                        data={pointUsed}
                        renderItem={({ item }) =>
                            <LInfoPoints
                                title={item.title}
                                points={item.points}
                                date={item.date}
                                timestamp={item.timestamp} />
                        }
                        keyExtractor={(data) => data.id} />
                </View>
            </View>
        )
    }
}

export default PointsDetail;