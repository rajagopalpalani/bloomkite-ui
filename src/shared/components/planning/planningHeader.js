import React from 'react';
import { Link } from 'react-router-dom';
import { planningMessage } from '../../constants/planningConstant';
import classNames from 'classnames';
import PlanSharePopUp from '../PlanningShare/PlanSharePopUp';
import FontIcon from '../common/fontAwesomeIcon';
import { faChevronRight, faShare } from '@fortawesome/free-solid-svg-icons';

class PlanningHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollTop: 0,
            openPopup: false,
            disabled: true
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        var element = document.getElementById('header');
        var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        this.setState({ scrollTop });
    };

    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    render() {
        let { handleEdit, handleSave, handleCancel, enableEdit, showEditBtn, showSaveBtn, enableCalculate, showCalculateBtn, handleCalculate, name, sharedTab, role } = this.props;
        return (
            <div className="row full-page">
                <div className={classNames('col-12 sub-nav-plan', { ' profile-fixed': this.state.scrollTop > 70 })}>
                    {name && (
                        <div className="planning-sub-nav">
                            <Link className="planbar-back" to="/planning-list">
                                {planningMessage.planningList}
                            </Link>
                            <>
                                <FontIcon icon={faChevronRight} />
                                <a className="planbar-link2">{name}</a>
                            </>
                            {sharedTab && sharedTab.postedToPartyId && (
                                <>
                                    <FontIcon icon={faChevronRight} />
                                    <a className="planbar-link2">{'Shared'}</a>
                                </>
                            )}
                        </div>
                    )}
                    {enableEdit ? (
                        !showEditBtn ? (
                            <span className="planbar-Btn">
                                <button className="savegoal-Btn" onClick={handleEdit}>
                                    {planningMessage.edit}
                                </button>
                            </span>
                        ) : (
                            <React.Fragment>
                                <span className="planbar-Btn">
                                    <button type="button" className="savegoal-Btn" onClick={handleCancel}>
                                        {planningMessage.cancel}
                                    </button>
                                </span>
                                <span className="planbar-Btn">
                                    <button type="button" className="btn btn-primary pull-right savegoal-Btn" disabled={this.props.disabled} onClick={this.props.handleSave}>
                                        {planningMessage.headerSave}
                                    </button>
                                </span>
                            </React.Fragment>
                        )
                    ) : null}
                    {showSaveBtn && (
                        <span className="planbar-Btn">
                            <button type="button" className="btn btn-primary pull-right" disabled={this.props.disabled} onClick={this.props.handleSave}>
                                {planningMessage.headerSave}
                            </button>
                        </span>
                    )}
                    {showCalculateBtn && !sharedTab.postedToPartyId && (
                        <button className="btn btn-primary pull-right calculate-btn" type="button" onClick={handleCalculate}>
                            Calculate
                        </button>
                    )}
                    {showCalculateBtn && sharedTab.postedToPartyId && (
                        <span className="planbar-Btn2">
                            <button className="btn btn-primary pull-right calculate-btn" type="button" disabled={this.props.disabled} onClick={handleCalculate}>
                                Calculate
                            </button>
                        </span>
                    )}
                    {enableEdit && showCalculateBtn && sharedTab.postedToPartyId && (
                        !showEditBtn ? (
                            <span className="planbar-Btn">
                                <button className="savegoal-Btn" onClick={handleEdit}>
                                    {planningMessage.edit}
                                </button>
                            </span>
                        ) : (
                            <React.Fragment>
                                <span className="planbar-Btn">
                                    <button type="button" className="savegoal-Btn" onClick={handleCancel}>
                                        {planningMessage.cancel}
                                    </button>
                                </span>
                                <span className="planbar-Btn">
                                    <button type="button" className="btn btn-primary pull-right savegoal-Btn" disabled={this.props.disabled} onClick={this.props.handleSave}>
                                        Calculate
                                    </button>
                                </span>
                            </React.Fragment>
                        )
                    )
                    }
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default PlanningHeader;
