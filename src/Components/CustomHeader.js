
import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, Image, Dimensions, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Back from '../Assets/drawable-xhdpi/shape.png';
import { Header } from 'react-navigation-stack';

export const LHTitle2 = (props) => (
    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#3f9cc5', '#6768a8']}
        style={styles.linearGradient}>
        <Text
            style={{ fontSize: 18, textAlign: 'center', color: '#fff', fontWeight: '700' }}
        >{props.header}</Text>
    </LinearGradient>
)

export const LHTitle = (props) => (
    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#3f9cc5', '#6768a8']}
        style={styles.linearGradient}>
        <Text
            style={styles.headertitle}
        >{props.header}</Text>
    </LinearGradient>
)

export const GradientHeader = () => {
    return (<LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#3f9cc5', '#6768a8']}
        style={styles.linearGradient} />
    )
}



export const HeaderBack = ({ onPress }) => (
    <TouchableWithoutFeedback
        onPress={onPress}
        underlayColor='#ffffff'>
        <Image
            source={Back}
            style={styles.backArrowStyle}
        />
    </TouchableWithoutFeedback>
)
const dimH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    icon: {
        width: '25%',
        height: '90%',
        justifyContent: "center",
        alignItems: 'center',
        // tintColor:'black'
        // tintColor:'#2096f3'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    linearGradient: {
        width: wp('100%'),
        paddingVertical: hp('3%')
    },
    headertitle: {
        textAlign: "center",
        fontSize: 18,
        color: "#fff",
        fontWeight: "900",
        textAlignVertical: "center"
    },
    linearGradient: {
        width: wp('100%'),
        height: Platform.OS === "ios" && (dimH == 812 || dimH == 896) ? Header.HEIGHT + 24 : Header.HEIGHT
    },
    backArrowStyle: {
        width: wp(4.3),
        height: wp(4.3),
        marginLeft: wp(4.3),
        marginTop: Platform.OS === "ios" ? null : wp(3)
    }
})

export const HeaderStyles = StyleSheet.create({
    commonHeader: {
        textAlign: "center",
        flex: 1,
        color: 'white',
        fontFamily: 'NunitoSans-SemiBold',
        fontSize: 16,
        marginTop: Platform.OS === "ios" ? null : wp(3)
    },
    commonHeader2: {
        textAlign: "center",
        flex: 1,
        color: 'white',
        fontFamily: 'NunitoSans-SemiBold',
        fontSize: 16,
        marginRight: Platform.OS === "ios" ? null : '25%',
        marginTop: Platform.OS === "ios" ? null : wp(3)
    }
})