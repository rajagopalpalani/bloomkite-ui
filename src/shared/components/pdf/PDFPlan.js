import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    plan: {
        width: 500,
        marginTop: 20,
        paddingHorizontal: 50,
    },
    planText: {
        fontSize: 13,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
    },
});

const PDFPlan = (props) => {
    const { info } = props;
    if (info && info.length) {
        return (<View style={styles.plan}>
            {info.map((item, i) => (
                <View key={`plan-${i}`} style={{ flexDirection: 'row' }}>
                    <Text style={{ width: 70, ...styles.planText }}>{item.label}</Text>
                    <Text style={styles.planText}>: {item.value}</Text>
                </View>
            ))}
        </View>
        );
    }
    return null;
}

export default PDFPlan;
