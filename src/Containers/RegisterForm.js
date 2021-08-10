
import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity,
    Modal,
    FlatList,
    PermissionsAndroid
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import STATES from '../Network/State';
import LTInput from '../Components/LTInput';
import { LRadio, Error, LHeader, LDate } from '../Components/LForm';
import { LFlatList, LSearch, LCityList, LCityInput, LModal, LCityModal } from '../Components/cityComponent';
import Register from '../Screens/Register';
import { LText } from '../Components/LText'

const styles = StyleSheet.create({

    ErrorRed: {
        color: 'red',
        textAlign: 'left',
        fontSize: 11,
        marginTop: hp('1%')
    },

    subHeader: {
        fontSize: 10,
        marginTop: hp('2%'),
        color: '#505050'
    },
    Input: {
        fontSize: 14,
        padding: 1,
        marginTop: hp('2%'),
        borderBottomColor: '#979797',
        borderBottomWidth: 0.5,
        color: '#505050'
    },
    InputHidden: {
        fontSize: 14,
        padding: 1,
        marginTop: hp('2%'),
        borderBottomColor: '#979797',
        borderBottomWidth: 0.5,
        letterSpacing: 5,
        color: '#505050'
    },
    phoneNum: {

        borderBottomColor: '#979797',
        borderBottomWidth: 0.5,
        marginLeft: wp('5%'),
        width: wp('80%'),
        padding: 1,
        color: '#505050',
    },
    error: {
        borderBottomWidth: 2,
        borderBottomColor: 'red'
    }
})

const gender = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' }
];

const items = [
    {
        id: 1,
        name: 'Jakarta Barat',
        value: "Jakarta Barat"
    },
    {
        id: 2,
        name: 'Jakarta Utara',
        value: "Jakarta Utara"
    },
    {
        id: 3,
        name: 'Jakarta Selatan',
        value: "Jakarta Selatan"
    }
];

class RegisterForm extends Component {

    constructor(props) {
        super(props);


        this.state = {
            FirstName: '',
            fnValidate: true,
            LastName: '',
            lnValidate: true,
            PhoneNum: '',
            pnValidate: true,
            // email: this.props.emailSubmit(),
            eValidate: true,
            DOB: '',
            dobValidate: true,
            Gender: '',
            geValidate: true,

            City: '',
            cityList: items,
            searchCityModal: false,
            selectedCityId: null,
            selectedCity: "",
            scValidate: true,

            Password: '',
            pValidate: true,
            ConPassword: '',
            cpValidate: true,
            conpassValidate: true,

            RefCode: '',

            validate: false,
            lastPosition: '',
            location: ''
        }
    }


    findCity() {
        var city = []

        for (var key in items) {
            if (items.hasOwnProperty(key)) {
                if (items[key].name.toLowerCase().includes(this.state.search) || this.state.search == "") {
                    city.push({
                        id: items[key].id,
                        name: items[key].name,
                    })
                }
            }
        }

        this.setState({ cityList: city })
    }

    onModalClose = () => {
        this.setState({
            searchCityModal: false
        })
    }

    onValueChange = (item) => {
        this.setState({
            selectedCityId: item.id,
            selectedCity: item.name,
            searchCityModal: false,
            scValidate: true
        })
    }

    render() {
        return (
            <ScrollView
                style={{ margin: hp('3%') }}>

                <LHeader
                    SubHeader="FIRST NAME"
                />
                <LTInput style={[styles.Input, { textTransform: 'capitalize' }, !this.state.fnValidate ? {
                    borderBottomColor: 'red'
                } : {
                        borderBottomColor: '#979797'
                    }]}
                    placeholder="First Name"
                    onChangeText={(FirstName) => this.setState({ FirstName, fnValidate: true })}
                    value={this.state.FirstName} />

                <Error
                    validate={this.state.fnValidate}
                    error={this.state.ErrorFn}
                />


                <LHeader
                    SubHeader="LAST NAME"
                />
                <LTInput style={[styles.Input, { textTransform: 'capitalize' },
                !this.state.lnValidate ? { borderBottomColor: 'red' } : { borderBottomColor: '#979797' }]}
                    placeholder="Last Name"
                    onChangeText={(LastName) => this.setState({ LastName, lnValidate: true, validate: true })}
                    value={this.state.LastName}
                />
                <Error
                    validate={this.state.lnValidate}
                    error={this.state.ErrorLn}
                />

                <LHeader
                    SubHeader="PHONE NUMBER"
                />
                <View
                    style={{
                        fontSize: 14,
                        flexDirection: 'row',
                        marginTop: hp('2%')
                    }}
                >
                    <LText
                        style={{
                            width: wp('10%'),
                            borderBottomColor: '#979797',
                            borderBottomWidth: 0.5,
                            padding: 1,
                            fontSize: 14,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: '#505050'
                        }}
                    >+62</LText>

                    <TextInput
                        style={[styles.phoneNum,
                        !this.state.pnValidate ? { borderBottomColor: 'red' } : { borderBottomColor: '#979797' }]}
                        placeholder="Phone Number"
                        keyboardType='numeric'
                        onChangeText={(PhoneNum) => this.setState({ PhoneNum, pnValidate: true })}
                        value={this.state.PhoneNum}
                    ></TextInput>
                </View>
                <Error
                    validate={this.state.pnValidate}
                    error={this.state.ErrorPn}
                />


                {/* <TouchableOpacity
                    onPress={() => this.props.emailSubmit()}>
                    <Text>Submit</Text></TouchableOpacity>
                <TextInput>{this.props.email}</TextInput>
                <Text>{this.props.email}</Text> */}
                <LHeader
                    SubHeader="EMAIL"
                />
                <LTInput
                    style={[styles.Input,
                    this.props.style, !this.state.eValidate ? { borderBottomColor: 'red' } : { borderBottomColor: '#979797' }]}
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email, eValidate: true })}
                    value={this.state.email}
                />
                <Error
                    validate={this.state.eValidate}
                    error={this.state.ErrorEm}
                />

                <LHeader
                    SubHeader="GENDER"
                />
                <LRadio
                    array={gender}
                    initial={-1}
                    onPress={(item) => this.setState({ Gender: item, geValidate: true })}
                />
                <Error
                    validate={this.state.geValidate}
                    error={this.state.ErrorGe}
                />


                <LHeader
                    SubHeader="CITY"
                />
                <LCityInput
                    onPress={() => this.setState({ searchCityModal: true })}
                    validate={this.state.scValidate}
                    placeholder={this.state.selectedCityId ? this.state.selectedCity : "Select city"}
                />
                <LCityModal
                    onRequestClose={this.onModalClose}
                    visible={this.state.searchCityModal}
                    onPress={this.onModalClose}
                    style={{
                        borderRadius: 5,
                        marginHorizontal: 20,
                        padding: 10
                    }}
                    headerStyle={{
                        fontSize: 24,
                        marginVertical: '10%'
                    }}
                    header="City"
                    searchOnChange={(v) => this.setState({ search: v }, () => this.findCity())}
                    searchValue={this.state.search}
                    listData={this.state.cityList}
                    renderItem={({ item }) =>
                        <LCityList
                            onPress={() => this.onValueChange(item)}
                            ItemName={item.name}
                        />}
                ></LCityModal>
                <Error
                    validate={this.state.scValidate}
                    error={this.state.ErrorCi}
                />

                <LHeader
                    SubHeader="DATE OF BIRTH"
                />
                <LDate
                    date={this.state.DOB}
                    onChange={(DOB) => { this.setState({ DOB: DOB, dobValidate: true }) }}
                    error={!this.state.dobValidate ? 'red' : '#979797'}
                />
                <Error
                    validate={this.state.dobValidate}
                    error={this.state.ErrorDo}
                />

                <LHeader
                    SubHeader="PASSWORD"
                />
                <TextInput
                    style={[styles.InputHidden,
                    !this.state.pValidate ? { borderBottomColor: 'red' } : { borderBottomColor: '#979797' }]}
                    onChangeText={(Password) => this.setState({ Password, pValidate: true })}
                    value={this.state.Password}
                    secureTextEntry={true}
                />
                <Error
                    validate={this.state.pValidate}
                    error={this.state.ErrorPass}
                />

                <LHeader
                    SubHeader="CONFIRM PASSWORD"
                />
                <TextInput style={[styles.InputHidden,
                !this.state.cpValidate ? { borderBottomColor: 'red' } : { borderBottomColor: '#979797' }
                ]}
                    onChangeText={(ConPassword) => this.setState({ ConPassword, cpValidate: true, conpassValidate: true })}
                    value={this.state.ConPassword}
                    secureTextEntry={true}
                />
                <Error
                    validate={this.state.cpValidate}
                    error={this.state.ErrorCpass}
                />
                <Error
                    validate={this.state.conpassValidate}
                    error={this.state.ErrorConPass}
                />

                <LHeader
                    SubHeader="REFERRAL CODE (OPTIONAL)"
                />
                <LTInput style={[styles.Input, this.props.style]}
                    onChangeText={(RefCode) => this.setState({ RefCode })}
                    placeholder='Referral Code (Optional)'
                    value={this.state.RefCode}
                />
            </ScrollView>
        )
    }
}

export default RegisterForm
