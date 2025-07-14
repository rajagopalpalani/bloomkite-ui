import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import PDFTableHeader from './PDFTableHeader';

const styles = StyleSheet.create({
    container: {
        width: 500,
        alignSelf: 'center',
        backgroundColor: '#ececec',
        borderColor: '#ececec',
        borderWidth: 1,
        borderRadius: 16,
    },
    fontSize12: {
        fontSize: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    card: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    }
});

const PDFCard = (props) => {
    const { data, title, styles: customization, id, itemsPerRow = 2 } = props;
    if (data && data.length) {
        return (
            <View style={{ ...styles.container, ...customization }}>
                {title ? <PDFTableHeader title={title} styles={{ paddingVertical: 10 }} /> : null}
                <View style={styles.card}>
                    {data.map((item, i) => {
                        const widthCount = 100 / itemsPerRow;
                        return (
                            <View key={`${id}-row-${i}`} style={{ ...styles.item, width: `${widthCount}%` }}>
                                <View>
                                    <Text
                                        style={styles.value}
                                    >{String(item.value || '')}</Text>
                                </View>
                                <View>
                                    <Text
                                        style={styles.fontSize12}
                                    >{item.label}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }
    return null;
};

export default PDFCard;
