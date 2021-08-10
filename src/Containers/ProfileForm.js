import { FormInput } from '../Components/CustomForm'
import React, { Component } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux'

class ProfileForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            dOB: '',
            // email: this.props.emailSubmit(),
            city: '',
            gender: ''
        }
    }
    
    render() {
        return (
            <View>
                <FormInput
                    text="First Name"
                    extraStyle={this.props.style}
                    placeholder="First Name"
                    data={this.state.firstName} />

                <FormInput
                    text="Last Name"
                    extraStyle={this.props.style}
                    placeholder="Last Name"
                    data={this.state.lastName} />

                <FormInput
                    text="Date of Birth"
                    extraStyle={this.props.style}
                    data="22 - 03 - 1998" />

                <FormInput
                    text="Phone Number"
                    extraStyle={[this.props.style, styles.Input]}
                    placeholder="Phone Number"
                    data={this.state.phoneNumber} />

                <FormInput
                    text="Email"
                    extraStyle={[this.props.style, styles.Input]}
                    placeholder="Email"
                    data={this.state.email} />

                <FormInput
                    text="City"
                    extraStyle={[this.props.style, styles.Input]}
                    placeholder="City"
                    data={this.state.city} />

                <FormInput
                    text="Gender"
                    extraStyle={this.props.style}
                    placeholder="Male"
                    data={this.state.gender} />
            </View>
        );
    }
}

export default ProfileForm
