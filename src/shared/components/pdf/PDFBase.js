import React from 'react';
import PDFHeader from './PDFHeader';
import PDFFooter from './PDFFooter';
// import PDFPlan from './PDFPlan';
import PDFTable from './PDFTable';
import CustomFragment from '../common/customFragment';

const getPlan = (plan) => {
    if (plan) {
        return [
            {
                label: 'Name',
                value: plan.name
            },
            {
                label: 'Age',
                value: plan.age
            },
            {
                label: 'RefID',
                value: plan.referenceId
            }
        ];
    }
    return null;
};

const PDFBase = (props) => {
    const { plan, name, data, title, id, styles, type } = props;
    // const info = getPlan(plan);
    if (data && data.length) {
        return (
            <CustomFragment>
                <PDFHeader />
                {/* <PDFPlan info={info} /> */}
                <PDFTable type={type} id={id} rows={data} title={title} styles={styles} />
                {props.children}
                <PDFFooter />
            </CustomFragment>
        );
    }
    return null;
};

export default PDFBase;
