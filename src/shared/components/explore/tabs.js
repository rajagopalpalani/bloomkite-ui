import React from 'react';
import cx from 'classnames';

const tabs = [
    { title: 'Explore Advisor' },
    { title: 'Explore Products' }
];
const Tabs = (props) => {
    const { activeTabIndex, onTabChange } = props;
    return (
        <div className="explore-tabs">
            <ul className="nav nav-tabs">
                {tabs.map((item, i) => {
                    const styles = cx('nav-item explore-menu', { active: activeTabIndex === i });
                    return (
                        <li key={'key-' + i} className={styles} onClick={() => onTabChange(i)}>
                            <span className="nav-link">
                                {item.title}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Tabs;

