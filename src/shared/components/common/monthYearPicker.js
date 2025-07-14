import React from 'react';
import Picker from 'react-month-picker-input';
import { MONTHS } from '../../constants/appConstants';

const MonthYearPicker = ({ name, date, onChange, mode}) => {
    let preselect = {};
    if (date) {
        let [month, year] = date.split('-');
        year = parseInt(year);
        for(let key in Object.keys(MONTHS)){
            if (month === MONTHS[key]){
                month = parseInt(key);
                break;
            }
        }
        preselect = {
            year,
            month
        };
    }
    return (
        <Picker
            mode={mode}
            inputProps={{
                id: name
            }}
            i18n={{
                monthFormat: 'short'
            }}            
            closeOnSelect={true}
            onChange={(v, year, month) => {
                onChange(name, `${MONTHS[month]}-${year}`, 'blur')
            }}
            {...preselect}
        />
    );
};

export default MonthYearPicker;