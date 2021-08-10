import React,{Component} from 'react';
import * as FormCustom from './CustomForm';
import * as ButtonCustom from './CustomButton';
import {StatusBar} from 'react-native';

export default class BaseComponent extends Component {

    constructor(props) {
        super(props)
        this.form = FormCustom
        this.button = ButtonCustom

    }

    setStatusBarTransparant(){
        StatusBar.setBarStyle('light-content');
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent')
      }
}