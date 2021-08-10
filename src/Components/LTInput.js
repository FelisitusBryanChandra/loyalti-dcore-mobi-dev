
import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'

const styles = StyleSheet.create({
    defaultStyle: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 14
    },
  });

export default class LTInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
        };
    }

    render() {
        return(
            <TextInput
            style={[styles.defaultStyle, this.props.style]}
            placeholder={this.props.placeholder}
            onChangeText={(value) => this.props.onChangeText(value)}
            value={this.props.value}
            autoCorrect={false}
            autoCapitalize={this.props.autoCapitalize}
            secureTextEntry={this.props.textSecurity}
            />
        );
    }
}