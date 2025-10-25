import React from 'react';
import { Link, Image, View, StyleSheet } from '@react-pdf/renderer';
// Use URL instead of direct import to avoid SSR issues
const bloomkiteLogo = '/images/logo.png';

const styles = StyleSheet.create({
    logoContainer: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#251534',
        height: 50,
        paddingHorizontal: 20,
    },
    logo: {
        width: 'auto',
        height: 25,
    },
    link: {
        fontSize: 14,
    },
});

const PDFHeader = () => (
    <View fixed style={{ ...styles.logoContainer }}>
        <Image src={bloomkiteLogo} style={styles.logo} />
        <Link style={styles.link} src="https://www.bloomkite.com">www.bloomkite.com</Link>
    </View>
);

export default PDFHeader;
