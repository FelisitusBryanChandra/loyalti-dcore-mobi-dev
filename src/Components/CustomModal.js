import React from 'react';
import { Modal, View } from 'react-native';


export const CustomModal = (props) => {
    return(
        <Modal visible={props.visible} animationType="fade" transparent={true} >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: '100%', justifyContent: 'center' }}>
           {props.children}
        </View>
    </Modal>
    )
}