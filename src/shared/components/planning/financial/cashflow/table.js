import React from 'react';
import classNames from 'classnames';
import Error from '../../common/error';
import { numberMethod } from '../../../../constants/commonRules';
import { planningMessage } from '../../../../constants/planningConstant';
import { toCamelCase } from '../../../../utils/functions';
import FontIcon from '../../../common/fontAwesomeIcon';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import CustomField from '../../../common/customField';

const Table = ({ index, name, editable, items, flow, tabIndex, setActiveTab }) => {
    return (
        <div className={classNames('cashflow', { active: index === tabIndex })}>
            <h5 className="cf-heading" onClick={() => setActiveTab(index)}>
                {`${index + 1}. ${toCamelCase(flow[name].totalSum.lable)}`}
                <FontIcon icon={faChevronDown} />
            </h5>
            <div className="cf-table-design">
                <table className="cf-table">
                    <colgroup>
                        <col width="60%" />
                        <col width="30%" />
                        <col width="10%" />
                    </colgroup>
                    <tbody>
                        <tr className="cf-border">
                            <th>{planningMessage.cashFlowList}</th>
                            <th className="value-align">{planningMessage.actualAmount}</th>
                        </tr>
                        {!editable && items.map((cashFlow, i) => (
                            <tr key={`cashflow_${i}`}>
                                <td>{cashFlow.cashFlowItem}</td>
                                <td className="value-align">{cashFlow.actualAmt}</td>
                            </tr>
                        ))}
                        {editable && items.map((cashFlow, i) => (
                            <tr key={`cashflow_${i}`}>
                                <td>{cashFlow.cashFlowItem}</td>
                                <td className="value-align">
                                    <CustomField
                                        type="text"
                                        onKeyPress={(e) => numberMethod(e)}
                                        onFocus={(event) => event.target.select()}
                                        className="form-control form-control-sm"
                                        name={`cashFlow.${name}.formValues.${i}.actualAmt`}
                                    />
                                    <Error name={`cashFlow.${name}.formValues.${i}.actualAmt`} />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>{flow[name].totalSum.lable}</td>
                            <td className="value-align">{flow[name].totalSum.totalActualAmt}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;