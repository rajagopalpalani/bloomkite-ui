import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import PDFTableHeader from './PDFTableHeader';
import PDFPage from './PDFPage';
import PDFFooter from './PDFFooter';
import PDFHeader from './PDFHeader';
import { planningMessage } from '../../constants/planningConstant';

const styles = StyleSheet.create({
    container: {
        width: 500,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30,
    },
    item: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: '#cccccc',
    },
    fontSize13: {
        fontSize: 12,
    },
    checkboxImage: {
        width: 20,
        height: 20,
    }
});

const listOfDependency = [
    { title: planningMessage.spouse, key: 'spouse' },
    { title: planningMessage.childA, key: 'child1' },
    { title: planningMessage.childB, key: 'child2' },
    { title: planningMessage.childC, key: 'child3' },
    { title: planningMessage.father, key: 'father' },
    { title: planningMessage.mother, key: 'mother' },
    { title: planningMessage.grandParent, key: 'grandParent' },
    { title: planningMessage.sibilings, key: 'sibilings' },
    { title: planningMessage.inlaws, key: 'inLaws' },
    { title: planningMessage.others, key: 'others' }
];
const PDFDependents = (props) => {
    const { plan, id } = props;
    if (plan && Object.keys(plan).length) {
        return (
            <PDFPage>
                <PDFHeader />
                <View style={styles.container}>
                    <PDFTableHeader title={planningMessage.familyTitle} />
                    {listOfDependency.map((item, i) => {
                        const { title, key } = item;
                        const img = plan[key] === 'YES' ? '/images/checked.png' : '/images/Unchecked.png';
                        return (
                            <View key={`${id}-row-${i}`} style={styles.item}>
                                <Text
                                    style={{
                                        ...styles.fontSize13,
                                        width: '50%'
                                    }}
                                >{title}</Text>
                                <Image style={styles.checkboxImage} src={img} />
                            </View>
                        );
                    })}
                </View>
                <PDFFooter />
            </PDFPage>
        );
    }
    return null;
};

export default PDFDependents;
