import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import PDFTableHeader from './PDFTableHeader';

const styles = StyleSheet.create({
    container: {
        width: 400,
        alignSelf: 'center',
    },
    item: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    fontSize12: {
        fontSize: 12,
        width: '100%',
    },
    column: {
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    secondary: {
        backgroundColor: '#d5f1ea',
        borderColor: '#d5f1ea',
        borderWidth: 1,
        borderRadius: 16,
        marginTop: -30,
    },
    primary: {
        backgroundColor: '#faf3f0',
        borderColor: '#faf3f0',
        borderWidth: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingBottom: 30,
    }
});

const PDFTable = (props) => {
    const { rows, title, styles: customization, id } = props;
    if (rows && rows.length) {
        return (
            <View style={{ ...styles.container, ...customization, ...props.type ? styles[props.type] : {} }}>
                {title ? <PDFTableHeader styles={{ paddingVertical: 10 }} title={title} /> : null}
                <View>
                    {rows.map((item, i) => {
                        const { type, ...others } = item;
                        const widthCount = 100 / Object.keys(others).length;
                        return (
                            <View key={`${id}-row-${i}`} style={styles.item}>
                                {Object.keys(others).map((key, j) => {
                                    return (
                                        <View key={`${id}-row-${i}-${j}`} style={{
                                            ...styles.column,
                                            width: `${widthCount}%`,
                                        }}>
                                            <Text
                                                style={{
                                                    ...styles.fontSize12,
                                                    ...type ? styles[type] : {}
                                                }}
                                            >{String(item[key] || '')}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }
    return null;
};

export default PDFTable;
