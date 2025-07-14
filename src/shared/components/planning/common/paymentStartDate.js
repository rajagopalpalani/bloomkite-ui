import React from 'react';
import MonthYearPicker from '../../common/monthYearPicker';

const PaymentStartDate = ({ title, data, onChange, dateValue }) => {
    return (
        <div className="slidecontainer start-date">
            <div className="header">
                <div className="title">{title}</div>
                <div className="controls">
                    <MonthYearPicker
                        name='loanDate'
                        date={dateValue}
                        onChange={onChange}
                        mode='calendarOnly'
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentStartDate;