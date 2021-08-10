import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Modal, Image, ActivityIndicator } from 'react-native'
import { SText } from './CustomText'
import LTInput from '../Components/LTInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LButton } from './CustomButton'
import { AirbnbRating } from 'react-native-ratings';

const styles = StyleSheet.create({
    modal: {
        padding: 10,
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(52, 52, 52, 0.8)"
    },
    container: {
        borderRadius: 5,
        marginHorizontal: wp('1.5%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%'),
        backgroundColor: "#FDFDFD",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3
    },
    mapsContainer: {
        borderRadius: 5,
        marginHorizontal: wp('10%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%'),
        backgroundColor: "#FDFDFD",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3
    },
    header: {
        fontSize: 16,
        alignSelf: 'center',
        marginVertical: wp('4%'),
        color: '#505050'
    },
    buttonContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginBottom: hp('3%'),
        marginTop: hp('7%')
    },
    btnContainerMaps: {
        flexDirection: "row",
        alignSelf: "center",
        marginBottom: hp('3%'),
        marginTop: hp('2%')
    },
    button1: {
        height: hp('6%'),
        borderWidth: 1,
        borderColor: "#2096f3",
        backgroundColor: "#fff",
        borderRadius: 17.5,
        width: wp('30%'),
        marginHorizontal: wp('1.5%')
    },
    textButton1: {
        height: hp('5.5%'),
        fontSize: 14,
        color: "#2096f3",
        textAlign: "center",
        textAlignVertical: "center"
    },
    button2: {
        height: hp('6%'),
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#2096f3",
        borderRadius: 17.5,
        width: wp('30%'),
        marginHorizontal: wp('1.5%')
    },
    textButton2: {
        height: hp('5.5%'),
        fontSize: 14,
        color: '#fff',
        textAlign: "center",
        textAlignVertical: "center"
    },
})

export const LLendModal = (props) => (
    <Modal
        animationType="fade"
        onRequestClose={props.onRequestClose}
        transparent={true}
        visible={props.visible}>
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.modal}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <View style={{ marginHorizontal: wp('5%') }}>
                            <SText
                                style={styles.header}>
                                {props.header}</SText>
                        </View>
                        <SText>{props.body}</SText>
                        <LTInput
                            style={props.inputStyle}
                            placeholder={props.placeholder1}
                            onChangeText={props.changeInput1}></LTInput>
                        <View style={styles.buttonContainer}>
                            <LButton
                                style={styles.button1}
                                textStyle={styles.textButton1}
                                text={props.button1text}
                                onPress={props.button1press}
                            />

                            <LButton
                                style={styles.button2}
                                textStyle={styles.textButton2}
                                text={props.button2text}
                                onPress={props.button2press}
                            />

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
)

export const LGiveModal = (props) => (
    <Modal
        animationType="fade"
        onRequestClose={props.onRequestClose}
        transparent={true}
        visible={props.visible}>
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.modal}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <View style={{ marginHorizontal: wp('5%') }}>
                            <SText
                                style={styles.header}>
                                {props.header}</SText>
                        </View>
                        <SText>{props.body}</SText>
                        <LTInput
                            style={props.inputStyle}
                            placeholder={props.placeholder1}
                            onChangeText={props.changeInput1}></LTInput>
                        {/* <LTInput
                            style={props.inputStyle}
                            placeholder={props.placeholder2}
                            onChangeText={props.changeInput2}></LTInput> */}
                        <View style={styles.buttonContainer}>
                            <LButton
                                style={styles.button1}
                                textStyle={styles.textButton1}
                                text={props.button1text}
                                onPress={props.button1press}
                            />
                            <LButton
                                style={styles.button2}
                                textStyle={styles.textButton2}
                                text={props.button2text}
                                onPress={props.button2press}
                            />
                            
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
)

export const LRateModal = (props) => (
    <Modal
        animationType="fade"
        onRequestClose={props.onRequestClose}
        transparent={true}
        visible={props.visible}>
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.modal}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <View style={{ marginHorizontal: wp('5%') }}>
                            <SText
                                style={styles.header}>
                                {props.header}</SText>
                        </View>
                        <SText>{props.body}</SText>
                        <AirbnbRating
                            count={5}
                            defaultRating={0}
                            size={30}
                            showRating={false}
                            starContainerStyle={{ marginTop: hp('2%') }}
                        />
                        <LTInput
                            style={props.inputStyle}
                            placeholder={props.placeholder1}
                            onChangeText={props.changeInput1}></LTInput>
                        <LTInput
                            style={props.inputStyle}
                            placeholder={props.placeholder2}
                            onChangeText={props.changeInput2}></LTInput>
                        <View style={styles.buttonContainer}>
                            <LButton
                                style={styles.button1}
                                textStyle={styles.textButton1}
                                text={props.button1text}
                                onPress={props.button1press}
                            />

                            <LButton
                                style={styles.button2}
                                textStyle={styles.textButton2}
                                text={props.button2text}
                                onPress={props.button2press}
                            />

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
)

export const LRemoveModal = (props) => (
    <Modal
        animationType="fade"
        onRequestClose={props.onRequestClose}
        transparent={true}
        visible={props.visible}>
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.modal}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <View style={{ marginHorizontal: wp('5%') }}>
                            <SText
                                style={styles.header}>
                                {props.header}</SText>
                        </View>
                        <View style={styles.buttonContainer}>
                            <LButton
                                style={styles.button1}
                                textStyle={styles.textButton1}
                                text={props.button1text}
                                onPress={props.button1press}
                            />

                            <LButton
                                style={styles.button2}
                                textStyle={styles.textButton2}
                                text={props.button2text}
                                onPress={props.button2press}
                            />

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
)

export const LCollectModal = (props) => (
    <Modal
        animationType="fade"
        onRequestClose={props.onRequestClose}
        transparent={true}
        visible={props.visible}>
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.modal}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <View style={{ marginHorizontal: wp('5%') }}>
                            <SText
                                style={styles.header}>
                                {props.header}</SText>
                        </View>
                        <LTInput
                            style={props.inputStyle}
                            placeholder={props.placeholder1}
                            onChangeText={props.changeInput1}></LTInput>
                        <LTInput
                            style={props.inputStyle}
                            placeholder={props.placeholder2}
                            onChangeText={props.changeInput2}></LTInput>
                        <LTInput
                            style={props.inputStyle}
                            placeholder={props.placeholder3}
                            onChangeText={props.changeInput3}
                            textSecurity={props.textSecurity}
                            >                            
                            </LTInput>
                        <View style={styles.buttonContainer}>
                            <LButton
                                style={styles.button1}
                                textStyle={styles.textButton1}
                                text={props.button1text}
                                onPress={props.button1press}
                            />

                            <LButton
                                style={styles.button2}
                                textStyle={styles.textButton2}
                                text={props.button2text}
                                onPress={props.button2press}
                            />

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
)

export const LModal = (props) => (
    <Modal
        animationType="fade"
        onRequestClose={props.onRequestClose}
        transparent={true}
        visible={props.visible}>
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.modal}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <View style={{ marginVertical: hp('3%') }}>
                            <Image source={props.src}
                                style={{ width: 50, height: 50, alignSelf: 'center' }}></Image>
                            <SText
                                style={styles.header}>
                                {props.successText}</SText>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
)

export const LMapsModal = (props) => (
    <Modal
        animationType="fade"
        onRequestClose={props.onRequestClose}
        transparent={true}
        visible={props.visible}>
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.modal}>
                <TouchableWithoutFeedback>
                    <View style={styles.mapsContainer}>
                        <View style={{ marginHorizontal: wp('5%') }}>
                            <SText
                                style={styles.header}>
                                {props.header}</SText>
                        </View>
                        <View style={styles.btnContainerMaps}>
                            <LButton
                                style={styles.button1}
                                textStyle={styles.textButton1}
                                text={props.button1text}
                                onPress={props.button1press}
                            />

                            <LButton
                                style={styles.button2}
                                textStyle={styles.textButton2}
                                text={props.button2text}
                                onPress={props.button2press}
                            />

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
)

export const LModalLoading = (props) => (
    <Modal
        animationType="fade"
        onRequestClose={props.onRequestClose}
        transparent={true}
        visible={props.visible}>
        <TouchableWithoutFeedback onPress={props.onPress} disable={props.disable}>
            <View style={styles.modal}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <View style={{ marginVertical: hp('3%') }}>                            
                        <ActivityIndicator
                        size="large" color="dodgerblue"
                        />
                            <SText
                                style={styles.header}>
                                {props.loadingText}</SText>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
    )