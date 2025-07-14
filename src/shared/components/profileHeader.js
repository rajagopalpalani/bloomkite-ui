import React from 'react';
import { apibaseURI, headersToken, pageURI, admins } from '../constants/apiAttributes';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import FontIcon from './common/fontAwesomeIcon';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class ProfileHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollTop: 0,
            disableButton: false
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

    render() {
        let isAllowed = false;
        let isDisabled = 'disabled';
        if (this.props.advisorDetails) {
            let newDetails = JSON.parse(JSON.stringify(this.props.advisorDetails));
            let oldDetails;
            if (this.props.publicAdvisorDetails) {
                oldDetails = JSON.parse(JSON.stringify(this.props.publicAdvisorDetails));
            }
            newDetails.advBrandInfo &&
                newDetails.advBrandInfo.length > 0 &&
                newDetails.advBrandInfo.forEach((element) => {
                    delete element.advBrandId;
                });
            newDetails.advBrandRank &&
                newDetails.advBrandRank.length > 0 &&
                newDetails.advBrandRank.forEach((element) => {
                    delete element.advBrandRankId;
                });
            newDetails.advProducts &&
                newDetails.advProducts.length > 0 &&
                newDetails.advProducts.forEach((element) => {
                    delete element.advProdId;
                    delete element.created;
                    delete element.created_by;
                    delete element.updated;
                    delete element.updated_by;
                });
            newDetails.awards &&
                newDetails.awards.length > 0 &&
                newDetails.awards.forEach((element) => {
                    delete element.awardId;
                });
            newDetails.certificates &&
                newDetails.certificates.length > 0 &&
                newDetails.certificates.forEach((element) => {
                    delete element.certificateId;
                });
            newDetails.experiences &&
                newDetails.experiences.length > 0 &&
                newDetails.experiences.forEach((element) => {
                    delete element.expId;
                });
            newDetails.educations &&
                newDetails.educations.length > 0 &&
                newDetails.educations.forEach((element) => {
                    delete element.eduId;
                });
            if (oldDetails) {
                oldDetails.advBrandInfo &&
                    oldDetails.advBrandInfo.length > 0 &&
                    oldDetails.advBrandInfo.forEach((element) => {
                        delete element.advBrandId;
                    });
                oldDetails.advBrandRank &&
                    oldDetails.advBrandRank.length > 0 &&
                    oldDetails.advBrandRank.forEach((element) => {
                        delete element.advBrandRankId;
                    });
                oldDetails.advProducts &&
                    oldDetails.advProducts.length > 0 &&
                    oldDetails.advProducts.forEach((element) => {
                        delete element.advProdId;
                        delete element.created;
                        delete element.created_by;
                        delete element.updated;
                        delete element.updated_by;
                    });
                oldDetails.awards &&
                    oldDetails.awards.length > 0 &&
                    oldDetails.awards.forEach((element) => {
                        delete element.awardId;
                    });
                oldDetails.certificates &&
                    oldDetails.certificates.length > 0 &&
                    oldDetails.certificates.forEach((element) => {
                        delete element.certificateId;
                    });
                oldDetails.experiences &&
                    oldDetails.experiences.length > 0 &&
                    oldDetails.experiences.forEach((element) => {
                        delete element.expId;
                    });
                oldDetails.educations &&
                    oldDetails.educations.length > 0 &&
                    oldDetails.educations.forEach((element) => {
                        delete element.eduId;
                    });
            }
            isAllowed = JSON.stringify(newDetails) != JSON.stringify(oldDetails);
            let isNotNewPublish = this.props.advisorDetails.workFlowStatus == 1 ? (isAllowed ? false : false) : !isAllowed;
            if (this.props.advisorDetails.advType == 1) {
                if (
                    !this.props.advisorDetails ||
                    !this.props.advisorDetails.name ||
                    !this.props.advisorDetails.aboutme ||
                    !this.props.advisorDetails.designation ||
                    !this.props.advisorDetails.address1 ||
                    !this.props.advisorDetails.address2 ||
                    !this.props.advisorDetails.dob ||
                    !this.props.advisorDetails.displayName ||
                    !this.props.advisorDetails.pincode ||
                    !this.props.advisorDetails.gender ||
                    !this.props.advisorDetails.city ||
                    !this.props.advisorDetails.awards ||
                    this.props.advisorDetails.awards.length < 1 ||
                    !this.props.advisorDetails.certificates ||
                    this.props.advisorDetails.certificates.length < 1 ||
                    !this.props.advisorDetails.experiences ||
                    this.props.advisorDetails.experiences.length < 1 ||
                    !this.props.advisorDetails.educations ||
                    this.props.advisorDetails.educations.length < 1 ||
                    !this.props.advisorDetails.advProducts ||
                    this.props.advisorDetails.advProducts.length < 1 ||
                    isNotNewPublish
                ) {
                    isDisabled = 'disabled';
                } else {
                    isDisabled = '';
                }
            } else {
                if (this.props.advisorDetails.advType == 2) {
                    if (
                        !this.props.advisorDetails ||
                        !this.props.advisorDetails.name ||
                        !this.props.advisorDetails.aboutme ||
                        !this.props.advisorDetails.address1 ||
                        !this.props.advisorDetails.address2 ||
                        !this.props.advisorDetails.dob ||
                        !this.props.advisorDetails.displayName ||
                        !this.props.advisorDetails.pincode ||
                        !this.props.advisorDetails.city ||
                        !this.props.advisorDetails.awards ||
                        this.props.advisorDetails.awards.length < 1 ||
                        !this.props.advisorDetails.certificates ||
                        this.props.advisorDetails.certificates.length < 1 ||
                        !this.props.advisorDetails.advProducts ||
                        this.props.advisorDetails.advProducts.length < 1 ||
                        isNotNewPublish
                    ) {
                        isDisabled = 'disabled';
                    } else {
                        isDisabled = '';
                    }
                }
            }
        }
        return (
            <div className="row page-full">
                <div className={`col-12 sub-nav profile-fixed`}>
                    <div className="container profile-container">
                        {this.props.showProduct && (
                            <>
                                <Link className="product-back" to="/product">
                                    Product
                                </Link>
                                <FontIcon className="checvron-right" icon={faChevronRight} />
                            </>
                        )}
                        {this.props.showPrevious && (
                            <>
                                <FontIcon icon={faChevronLeft} />
                                <Link className="product-experts" to="/experts">
                                    Back to experts
                                </Link>
                            </>
                        )}

                        {this.props.financialPlan && <a className="planbar-link2">Financial Planning</a>}
                        {this.props.equityInvestments && <a className="planbar-link2">Equity Investments</a>}
                        {this.props.mutualFunds && <a className="planbar-link2">Mutual Funds</a>}
                        {this.props.portFolioManagement && <a className="planbar-link2">Port Folio Management</a>}
                        {this.props.fixedIncome && <a className="planbar-link2">Fixed Income</a>}
                        {this.props.lifeInsurance && <a className="planbar-link2">Life Insurance</a>}
                        {this.props.generalInsurance && <a className="planbar-link2">General Insurance</a>}
                        {this.props.healthInsurance && <a className="planbar-link2">Health Insurance</a>}
                        {this.props.loans && <a className="planbar-link2">Loans</a>}
                    </div>

                    {this.props.onPublish && (
                        <div className="pull-right">
                            {(this.props.advisorDetails.workFlowStatus == 2 || this.props.advisorDetails.workFlowStatus == 8) && (
                                <button className={`save-btn2 btn`} disabled={'disabled'}>
                                    Requested to Publish
                                </button>
                            )}
                            {{ isAllowed } && this.props.advisorDetails.workFlowStatus != 2 && this.props.advisorDetails.workFlowStatus != 8 && (
                                <button className={`save-btn2 btn`} disabled={isDisabled} onClick={this.props.onPublish}>
                                    Publish
                                </button>
                            )}
                            {!{ isAllowed } && this.props.advisorDetails.workFlowStatus == 4 && (
                                <button className={`save-btn2 btn`} disabled={isDisabled} onClick={this.props.onPublish}>
                                    Profile Approved
                                </button>
                            )}
                            {/* {this.props.advisorDetails.workFlowStatus != 6 && (
                                <button className={`save-btn2 btn`} disabled={isDisabled} onClick={this.props.onPublish}>
                                    PUBLISH
                                </button>
                            )} */}
                            {this.props.advisorDetails.workFlowStatus == 6 && (
                                <button className={`save-btn2 btn`} disabled={isDisabled} onClick={this.props.onPublish}>
                                    Profile Rejected
                                </button>
                            )}
                        </div>
                    )}
                    {this.props.showSaveButton && (
                        <div className="pull-right">
                            <button className={classNames('save-btn2 btn', { disabled: this.props.disableButton })} onClick={(e) => this.props.handleSave(e)}>
                                Save
                                </button>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}

ProfileHeader.defaultProps = {
    advisorDetails: {}
};

export default ProfileHeader;
