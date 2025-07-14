import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const CustomDatePicker = ({ date, onChange, mode, maxDate, dateFormat, placeholder, disabled, className }) => {
    return (
        <DatePicker
            className={className}
            dateFormat={dateFormat || 'dd/MM/yyyy'}
            maxDate={maxDate || moment().toDate()}
            selected={date}
            onChange={(date) => onChange(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            mode={mode}
            closeOnSelect={true}
            disabled={disabled || false}
            disabledKeyboardNavigation={disabled || false}
            placeholderText={placeholder || 'Select Date'}
        />
    );
};

export default CustomDatePicker;
