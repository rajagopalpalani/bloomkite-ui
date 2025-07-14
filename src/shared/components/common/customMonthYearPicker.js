import React from 'react';
import DatePicker from 'react-datepicker';

const CustomMonthYearPicker = ({ id, name, year, autoComplete, month, onSelect, minDate, maxDate, dateFormat, mode, disabled, className, closeOnSelect, value }) => {
    return (
        <div className="month-year-picker">
            <DatePicker
                mode={mode}
                name={name}
                id={id}
                year={year}
                month={month}
                maxDate={maxDate}
                minDate={minDate}
                autoComplete={autoComplete}
                displayFormat={dateFormat || 'MM/yyyy'}
                showMonthYearPicker
                showYearDropdown
                className={className}
                closeOnSelect={closeOnSelect}
                onChange={(date) => onSelect(date)}
                value={value}
                disabled={disabled}
                selected={year ? new Date(year, month, 1) : new Date()}
            />
        </div>
    );
};

export default CustomMonthYearPicker;
