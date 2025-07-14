import React from 'react';
import Error from '../../common/error';
import { numberMethod } from '../../../../constants/commonRules';
import CustomField from '../../../common/customField';

const Table = ({ name, editable, items, nw }) => {
    return (
        <table className="cf-table">
            <colgroup>
                <col width="70%" />
                <col width="30%" />                
            </colgroup>
            <tbody>
                <tr className="cf-border">
                    <th style={{'textTransform':'capitalize'}}>{name}</th>
                    <th className="value-align">Value</th>
                </tr>
                {!editable && items.map((networth, i) => (
                    <tr key={`networth_${i}`}>
                        <td >{networth.accountEntry}</td>
                        <td className="value-align">{networth.value}</td>
                    </tr>
                ))}
                {editable && items.map((networth, i) => (
                    <tr key={`networth_${i}`}>
                        <td>{networth.accountEntry}</td>
                        <td>
                            <CustomField
                                type="text"
                                onKeyPress={(e) => numberMethod(e)}
                                onFocus={(event) => event.target.select()}
                                className="form-control form-control-sm"
                                name={`networth.${name}.formValues.${i}.value`}
                            />
                            <Error name={`networth.${name}.formValues.${i}.value`} />
                        </td>
                    </tr>
                ))}
                <tr>
                    <td className="value-align">{nw.totalSum.lable}</td>
                    <td className="value-align">{nw.totalSum.totalValue}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Table;