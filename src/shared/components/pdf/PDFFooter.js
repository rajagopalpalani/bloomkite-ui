import React from 'react';
import { Image, Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';
import bloomkiteLogo from '../../../images/color_logo.png';

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        fontSize: 8,
        width: '100%',
        color: '#251534',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        width: 60,
        height: 10,
    }
});

const PDFFooter = () => (
    <View fixed style={styles.footer}>
        <Text>{moment().format('MMMM-YYYY')} Powered by, </Text>
        <Image src={bloomkiteLogo} style={styles.logo} />
    </View>
);

export default PDFFooter;
