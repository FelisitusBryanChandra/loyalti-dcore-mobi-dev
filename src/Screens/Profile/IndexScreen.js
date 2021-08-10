import React from 'react';
import { View, StyleSheet, ScrollView,  } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SText, STextBold } from '../../Components/CustomText'
import { LModal } from '../../Components/modalComponent'
import URI from '../../Network/Uri'
import STATES from '../../Network/State'
import { LButton } from '../../Components/CustomButton'
import { connect } from 'react-redux'

import ProfileForm from '../../Containers/ProfileForm'
import ApiTargetEndPoint from "../../Network/APITargetEndpoint.js";
import AsyncStorage from "@react-native-community/async-storage";
import { BackgroundAndImages } from "../../Components/CustomImage.js";
import facebookLogo from '../../Assets/drawable-xhdpi/icon_facebook_filled.png';
import iconCard from '../../Assets/drawable-xhdpi/icon_card.png';
import iconVoucher from '../../Assets/drawable-xhdpi/icon_coupon.png';
import iconChevronRight from '../../Assets/drawable-xhdpi/chevron_right.png';
import iconLock from '../../Assets/drawable-xhdpi/lock_filled.png';
import iconGiftBox from '../../Assets/drawable-xhdpi/giftbox_outline.png';
import iconHelp from '../../Assets/drawable-xhdpi/help.png';
import BaseComponent from "../../Components/BaseComponent";


class IndexScreen extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      dOB: '',
      email: '',
      city: '',
      gender: '',
      emailData: '',
      modalSuccess: false
    }
  }

  onModalClose = () => {
    this.setState({
      modalSuccess: false
    })
  }

  genderFunc(gender) {
    let sex = null;
    gender === "M" ? sex = "Male" : sex = "Female"

    this.setState({
      gender: sex
    })
  }

  async callProfile() {

    var params = ""

    try {
      // const token = await AsyncStorage.getItem('tokenKey')
      const emailS = await AsyncStorage.getItem('emailData')
      const customerIds = await AsyncStorage.getItem('customerId')
      if (emailS !== null || customerIds !== null) {
        // console.log(emailS, "Email Cache")
        // console.log(token)
        this.setState({
          cardEmail: emailS,
          customerId: customerIds
        })
      }
    }
    catch (error) {
      console.warn(error)
    }
    console.log(this.state.cardEmail, "customer email profile page asyncstorage")

    this.state.cardEmail !== null ? params = `email: ${JSON.stringify(this.state.cardEmail)}` : console.log("email not available")
    // this.state.customerId !== undefined ? params = `id: ${JSON.stringify(this.state.customerId)} ` : console.log("id not available")
    console.log(params)
    await ApiTargetEndPoint.CustomerProfile(`${params}`)
      .then((data) => {
        // console.log("PROFILE", JSON.stringify(data.data.customers))
        const dataCustomer = data.data.customers;
        this.setState({
          firstName: dataCustomer[0].firstName,
          lastName: dataCustomer[0].lastName,
          phoneNumber: dataCustomer[0].phoneNumber,
          email: dataCustomer[0].email,
          city: dataCustomer[0].city,
          dateOfBirth: dataCustomer[0].dOB
        })
        this.genderFunc(dataCustomer[0].gender)

      })
      .catch((err) => console.log(err))
  }

  async updateProfile() {

    let dataSet = {};
    dataSet.Id = this.state.customerId,
      dataSet.UserEmail = this.state.cardEmail,
      dataSet.PhoneNumber = this.state.phoneNumber,
      dataSet.DomicileCity = this.state.city
    console.warn(dataSet, "dataSet Update Profile")

    await ApiTargetEndPoint.UpdateProfile(dataSet)
      .then((response) => JSON.stringify(response))
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((err) => console.log("Error" + err))

    this.setState({ modalSuccess: true })
  }

  componentDidMount() {
    // super.componentDidMount()
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => { this.callProfile() }
    );
  }

  componentWillUnmount() {
    // super.componentWillUnmount()
    this.willFocusSubscription.remove()
  }

  onNavigation(destination, data) {
    this.props.navigation.navigate(destination, data)
  }

  render() {
    const { isLoading } = this.state
    return (
      <View style={{ flex: 1 }}>
        <BackgroundAndImages
          name="Stevanus Kurniawan"
          phone="0825825384"
          editProfile={false}
          onEditPress={() => this.onNavigation("EditProfile")} />
        <View style={{ flex: 2 }}>
          <ScrollView>
            <View
              style={styles.contentButtonContainerStyle}>
              <this.button.CustomButtonWithContent
                icon={iconCard}
                extraStyle={{
                  width: wp(6.4),
                  height: wp(5.3)
                }}
                text="9 Cards"
                onPressed={() => this.onNavigation("wallet", { target: 'card' })} />
              <this.button.CustomButtonWithContent
                icon={iconVoucher}
                extraStyle={{
                  width: wp(6.4),
                  height: wp(4.53)
                }}
                text="2 Voucher"
                onPressed={() => this.onNavigation("wallet", { target: 'voucher' })} />
            </View>
            <View>
              <this.button.CustomFlatTextButton
                text="My Reward"
                icon={iconChevronRight}
                extraImageStyle={{
                  width: wp(2.13),
                  height: wp(3.2)
                }}
                onPressed={() => this.onNavigation("MyReward")} />
              <this.button.CustomFlatTextButton
                text="Archive Cards"
                icon={iconChevronRight}
                extraImageStyle={{
                  width: wp(2.13),
                  height: wp(3.2)
                }} />
              <this.button.CustomFlatTextButton
                text="History"
                icon={iconChevronRight}
                extraImageStyle={{
                  width: wp(2.13),
                  height: wp(3.2)
                }} />
              <this.button.CustomFlatTextButton
                text="Settings"
                icon={iconChevronRight}
                itsButton={false}
                extraViewStyle={{
                  marginBottom: wp(3)
                }}
                extraImageStyle={{
                  width: wp(2.13),
                  height: wp(3.2)
                }} />
              <this.button.CustomButtonTextWithContent
                text="Change Password"
                icon={iconLock}
                extraViewStyle={{
                  marginTop: -wp(0.46)
                }}
                extraImageStyle={{
                  width: wp(4.61),
                  height: wp(6.08)
                }}
                onPressed={() => this.onNavigation("ChangePassword")} />
              <this.button.CustomButtonTextWithContent
                text="Referral Code"
                icon={iconGiftBox}
                extraImageStyle={{
                  width: wp(5.86),
                  height: wp(5.86)
                }} />
              <this.button.CustomButtonTextWithContent
                text="Help"
                icon={iconHelp}
                extraImageStyle={{
                  width: wp(5.55),
                  height: wp(5.55)
                }}
                onPressed={() => this.onNavigation("Help")} />
              <this.button.CustomButtonTextWithContent
                text="Connect to Facebook"
                icon={facebookLogo}
                extraImageStyle={{
                  width: wp(5.53),
                  height: wp(5.53)
                }} />
              <this.button.CustomFlatTextButton
                text="Send Us Feedback"
                icon={iconChevronRight}
                extraImageStyle={{
                  width: wp(2.13),
                  height: wp(3.2)
                }} />
              <this.button.CustomFlatTextButton
                text="Version 1.0.0"
                extraImageStyle={{
                  width: wp(2.13),
                  height: wp(3.2)
                }} />
              <View
                style={{ margin: wp(8) }}>
                <this.button.CommonButtonLarge
                  text="LOG OUT"
                  extraTextStyle={{ color: '#2096f3', alignItems: 'center' }}
                  extraStyleButton={{ backgroundColor: 'white', borderColor: '#2096f3', borderWidth: 1 }} />
              </View>
            </View>

          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageFB: {
    width: 20,
    height: 20,
    marginRight: 10,

  },
  contentButtonContainerStyle: {
    flexDirection: 'row',
    margin: wp(3),
    paddingVertical: wp(4),
    justifyContent: "space-between"
  },
  subHeader: {
    fontSize: 14,
    fontWeight: '800', //belum bold
    color: '#505050',
    padding: 1,
    marginTop: hp('2%'),
    width: wp('25%'),
    textAlignVertical: "center"
  },

  body: {
    fontSize: 14,
    color: '#505050',
    padding: 1,
    marginTop: hp('2%'),
    width: wp('55%'),
    textAlignVertical: "center",
    marginLeft: wp('10%')
  },

  Input: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
  }
})

function mapStateToProps(state) {
  return {
    email: state.email
  }
}

function mapDispatchToProps(dispatch) {
  return {
    emailSubmit: () => dispatch({ type: 'EMAIL_SUBMIT' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexScreen);