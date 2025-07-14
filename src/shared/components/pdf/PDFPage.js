import React from 'react';
import { Page, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingTop: 50,
        paddingBottom: 70,
        paddingLeft: 5,
        borderWidth: 1,
        borderRadius: 16,
        marginRight: 0,
        marginLeft: 0,
    },
});

const PDFPage = (props) => (
    <Page size="A4" style={styles.page}>
        {props.children}
    </Page>
);

export default PDFPage;
