import React from 'react';
import classNames from 'classnames';
import { planningMessage } from '../../constants/planningConstant';
import { calcMenu } from '../../constants/appConstants';

const PlanningLeftbar = ({ selectedPlan, currentTab, handleTabChange }) => {
    return (
        <div className="bg-white">
            <div className="left-sidebar-calculator">
                <select className="ul-calculator hidden-lg-up" defaultValue={currentTab} onChange={(e) => handleTabChange(e.target.value)}>
                    {calcMenu.map((menu, mindex) => {
                        mindex = mindex + 1;
                        return (
                            selectedPlan.includes(menu) && (
                                <React.Fragment key={'calcli-' + mindex}>
                                    <option
                                        className={classNames('li-calculator a-calculator', { active: currentTab == mindex, 'no-active': currentTab != mindex })}
                                        value={mindex}>
                                        {planningMessage[menu]}
                                    </option>
                                </React.Fragment>
                            )
                        );
                    })}
                </select>
                <ul className="ul-calculator hidden-lg-down">
                    {calcMenu.map((menu, mindex) => {
                        mindex = mindex + 1;
                        return (
                            selectedPlan.includes(menu) && (
                                <li className="li-calculator" key={`plan-menu-${mindex}`}>
                                    <a
                                        className={classNames('a-calculator', { active: currentTab == mindex, 'no-active': currentTab != mindex })}
                                        onClick={() => handleTabChange(mindex)}>
                                        {planningMessage[menu]}
                                    </a>
                                </li>
                            )
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PlanningLeftbar;
