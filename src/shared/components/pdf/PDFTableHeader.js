import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerTitle: {
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 20,
    },
    headerTitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#251534',
    },
});

const PDFTableHeader = (props) => (
    <View style={{ ...styles.headerTitle, ...(props.styles || {}) }}>
        <Text style={styles.headerTitleText}>
            {props.title}
        </Text>
    </View>
);

export default PDFTableHeader;
