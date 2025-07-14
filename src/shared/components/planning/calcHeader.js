import React from 'react';
import classNames from 'classnames';
import ContactPopupSignup from '../../components/Contact/contactPopupSignup';

const CalcHeader = ({ showSaveBtn, items, chooseItem, selectedItem, disabled, handleSave, savedItems, sharedTab }) => {
    const renderButtons = (items) => {
        return (
            items &&
            items.length > 0 &&
            items.map((item, index) => (
                <button
                    key={'calc-' + index}
                    className={classNames('btn calc-goal', { active: selectedItem == item }, { selected: savedItems.includes(item) && selectedItem !== item })}
                    type="button"
                    value={item}
                    onClick={chooseItem}>
                    {item}
                </button>
            ))
        );
    };

    const renderDropdown = (items) => {
        return (
            items &&
            items.length > 0 && (
                <select className="sub-calc" defaultValue={selectedItem ? selectedItem : 'Choose Item'} onChange={(e) => chooseItem(e, e.target.value)}>
                    {items.map((item, index) => (
                        <option
                            key={'calc-' + index}
                            className={classNames('btn calc-goal', { active: selectedItem == item }, { selected: savedItems.includes(item) && selectedItem !== item })}
                            type="button"
                            value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            )
        );
    };

    return (
        <div className="col-12 calc-option">
            <div className="hidden-lg-down">
                {(!sharedTab || !sharedTab.postedToPartyId) && renderButtons(items)}
                {sharedTab && sharedTab.postedToPartyId && renderButtons(savedItems)}
            </div>
            <div className="hidden-lg-up">
                {(!sharedTab || !sharedTab.postedToPartyId) && renderDropdown(items)}
                {sharedTab && sharedTab.postedToPartyId && renderDropdown(savedItems)}
            </div>
            {showSaveBtn && (
                <div className="pull-right calc-save-header">
                    <ContactPopupSignup buttonName={'Save'} />
                    <button className="btn btn-primary ml-2" disabled={disabled} type="button" onClick={handleSave}>
                        Calculate
                    </button>
                </div>
            )}
        </div>
    );
};

export default CalcHeader;
