import React from 'react';
import CorporateLeftbar from '../corporateLeftbar';
import ProfileHeader from '../../profileHeader';
import Loader from '../../common/loader';
import Upload from '../../common/upload';
import { showMonth } from '../../../constants/appConstants';
import { contentMethod, aplhaNumericMethod, maxLength } from '../../../constants/commonRules';
import { corporateMessage } from '../../../constants/corporateConstant';
import { advisorMessage } from '../../../constants/advisorConstant';
import { toastrError } from '../../../helpers/toastrHelper';
import { toastrMessage } from '../../../constants/toastrMessage';
import PublishPopup from '../../Contact/publishPopup';
import CustomReactTooltip from '../../common/customReactTooltip';
import FontIcon from '../../common/fontAwesomeIcon';
import { faMinusCircle, faInfo } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import CustomMonthYearPicker from '../../common/customMonthYearPicker';

class AwardsCertificates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advId: '',
            awards: [],
            certificates: [],
            loading: false,
            isTabOpened: false,
            domLoaded: false,
            disableButton: true,
            openPopup: false
        };
    }

    handleTabChange = (index) => {
        this.setState({ currentTab: index });
        this.props.handleTabChange(index);
    };

    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.advisorDetails) != JSON.stringify(oldProps.advisorDetails) || this.state.currentTab != this.props.currentTab) {
            this.setState({ advisorDetails: this.props.advisorDetails, currentTab: this.props.currentTab });
            this.updateCurrentInformation(this.props.advisorDetails);
        }
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
        }
        if (this.props.imagePath && this.state.selectedItem && oldProps.imagePath !== this.props.imagePath) {
            const { imagePath } = this.props;
            const {
                selectedItem: { type, index }
            } = this.state;
            if (type !== 'profile') {
                const data = [...this.state[type]];
                const item = data[index];
                data.splice(index, 1, { ...item, imagePath });
                this.setState({ [type]: data, imagePath: '', selectedItem: null }, () => this.handleDisableButton());
            }
        }
    }

    componentDidMount() {
        this.setState({ advisorDetails: this.props.advisorDetails, currentTab: this.props.currentTab, domLoaded: true });
        this.updateCurrentInformation(this.props.advisorDetails);
    }

    updateCurrentInformation = (advisorDetails) => {
        let advisorNewDetails = JSON.parse(JSON.stringify(advisorDetails));
        let advisorOriginalAwardDetails = {
            awards: advisorDetails.awards,
            certificates: advisorDetails.certificates
        };
        this.setState({
            awards: advisorNewDetails.awards && advisorNewDetails.awards.length > 0 ? advisorNewDetails.awards : [],
            certificates: advisorNewDetails.certificates && advisorNewDetails.certificates.length > 0 ? advisorNewDetails.certificates : [],
            loading: false,
            advisorOriginalAwardDetails,
            disableButton: true
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleAwardsCertificate = (e) => {
        e.preventDefault();
        if (!this.state.disableButton) {
            if (this.state.awards.length > 0) {
                let showAwardError = false;
                this.state.awards.forEach((award) => {
                    if (award.title.trim() == '' || award.issuedBy.trim() == '' || award.year.trim() == '') {
                        showAwardError = true;
                    }
                });

                if (showAwardError) {
                    toastrError(toastrMessage.emptyAward);
                    return false;
                }
            }
            if (this.state.certificates.length > 0) {
                let showCertificateError = false;
                this.state.certificates.forEach((certificate) => {
                    if (certificate.title.trim() == '' || certificate.issuedBy.trim() == '' || certificate.year.trim() == '') {
                        showCertificateError = true;
                    }
                });

                if (showCertificateError) {
                    toastrError(toastrMessage.emptyCertificate);
                    return false;
                }
            }

            let options = {
                advId: this.state.advisorDetails.advId,
                awards: this.state.awards && this.state.awards.length > 0 && this.state.awards[0].title ? this.state.awards : [],
                certificates: this.state.certificates && this.state.certificates.length > 0 && this.state.certificates[0].title ? this.state.certificates : []
            };
            if (
                (this.props.advisorDetails.awards && this.props.advisorDetails.awards.length > 0) ||
                (this.props.advisorDetails.certificates && this.props.advisorDetails.certificates.length > 0) ||
                (this.props.advisorDetails.educations && this.props.advisorDetails.educations.length > 0) ||
                (this.props.advisorDetails.experiences && this.props.advisorDetails.experiences.length > 0)
            ) {
                this.props.updateAwardsInformation(options);
            } else {
                this.props.updateAwardsInformation(options);
            }
            this.setState({ loading: true, isTabOpened: false });
            this.onOpenModal();
        }
    };

    handleAddAwards = () => {
        if (!this.state.isTabOpened) {
            let newInput = {
                imagePath: '',
                issuedBy: '',
                title: '',
                year: ''
            };
            this.setState((prevState) => ({ awards: prevState.awards.concat([newInput]), isTabOpened: true }));
        } else {
            toastrError(toastrMessage.emptyError);
        }

        // this.setState({ isTabOpened: true });
    };

    handleAddCertificates = () => {
        if (!this.state.isTabOpened) {
            let newInput = {
                imagePath: '',
                issuedBy: '',
                title: '',
                year: ''
            };
            this.setState((prevState) => ({ certificates: prevState.certificates.concat([newInput]), isTabOpened: true }));
        } else {
            toastrError(toastrMessage.emptyError);
        }
    };

    getMonth = (month) => {
        return showMonth[month];
    };

    getMonthNumber = (month) => {
        return showMonth.findIndex((a) => a == month);
    };

    handleDisableButton = () => {
        let disableButton = false;
        let currentAwardDetails = {
            awards: this.state.awards,
            certificates: this.state.certificates
        };
        disableButton = JSON.stringify(this.state.advisorOriginalAwardDetails) == JSON.stringify(currentAwardDetails);
        this.setState({ disableButton });
    };

    handleAwardsText = (e, i, from, fromMonth, fromYear) => {
        let name, value;
        if (e) {
            name = e.target.name;
            value = e.target.value;
        }
        if (from) {
            name = from;
            value = `${this.getMonth(fromMonth)}-${fromYear}`;
        }
        let awards = [...this.state.awards];
        if (awards.length > 0) {
            awards[i][name] = value || '';
        }
        let isTabOpened = true;
        if (awards.length > 0) {
            isTabOpened = !(awards[i].title != '' && awards[i].issuedBy != '' && awards[i].year != '');
        }
        this.setState({ awards, isTabOpened }, () => {
            this.handleDisableButton();
        });
    };

    handleCertificatesText = (e, i, from, fromMonth, fromYear) => {
        let name, value;
        if (e) {
            name = e.target.name;
            value = e.target.value;
        }
        if (from) {
            name = from;
            value = `${this.getMonth(fromMonth)}-${fromYear}`;
        }
        let certificates = [...this.state.certificates];
        if (certificates.length > 0) {
            certificates[i][name] = value || '';
        }
        let isTabOpened = true;
        if (certificates.length > 0) {
            isTabOpened = !(certificates[i].title != '' && certificates[i].issuedBy != '' && certificates[i].year != '');
        }
        this.setState({ certificates, isTabOpened }, () => {
            this.handleDisableButton();
        });
    };

    handleUpload = (files, type, index) => {
        this.setState({ selectedItem: { type, index } }, () => {
            this.handleDisableButton();
        });
        this.props.uploadFile(files, type);
    };

    handleImageDelete = (file, type, index) => {
        const data = [...this.state[type]];
        const item = data[index];
        data.splice(index, 1, { ...item, imagePath: '' });
        this.setState({ [type]: data, imagePath: '', selectedItem: null }, () => {
            this.handleDisableButton();
        });
        // this.props.onDeleteFile(fileName);
    };

    handleAwardsDelete = (e, i) => {
        e.preventDefault();
        let awards = [...this.state.awards.slice(0, i), ...this.state.awards.slice(i + 1)];
        this.setState({ awards, isTabOpened: false }, () => {
            this.handleDisableButton();
        });
    };

    handleCertificatesDelete = (e, i) => {
        e.preventDefault();
        let certificates = [...this.state.certificates.slice(0, i), ...this.state.certificates.slice(i + 1)];

        this.setState({ certificates, isTabOpened: false }, () => {
            this.handleDisableButton();
        });
    };

    render() {
        const { loading } = this.props;
        let self = this;
        return (
            <div>
                {!this.props.popup && (
                    <div className="col-12">
                        <ProfileHeader
                            name={this.props.advisorDetails.displayName || (this.props.advisorDetails && this.props.advisorDetails.name)}
                            location={this.props.advisorDetails && this.props.advisorDetails.city}
                            designation={this.props.advisorDetails.designation}
                            handleSave={this.handleAwardsCertificate}
                            showSaveButton={true}
                            disableButton={this.state.disableButton}
                            onPublish={this.props.onPublish}
                            advisorDetails={this.props.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            role={true}
                        />
                    </div>
                )}
                {this.props.advisorDetails.workFlowStatus == 4 && !loading && !this.props.popup && (
                    <PublishPopup openPopup={this.state.openPopup} showCloseIcon={true} onCloseModal={this.onCloseModal}></PublishPopup>
                )}
                <div className={classNames('', { 'row col-12 advisor-gap': !this.props.popup })}>
                    {!this.props.popup && (
                        <CorporateLeftbar
                            handleTabChange={this.handleTabChange}
                            currentTab={this.state.currentTab}
                            showBrandTag={this.props.showBrandTag}
                            parentPartyId={this.props.advisorDetails.parentPartyId != 0 ? this.props.advisorDetails.parentPartyId : ''}
                        />
                    )}
                    <div className={classNames('', { 'col-10 nopadding page-height': !this.props.popup })}>
                        <div className={classNames('', { 'col-12 center-page planning-right row': !this.props.popup })}>
                            {this.props.popup && <h2 className="popup-heading">Awards and Certificates</h2>}
                            <div className="page-center bg-white">
                                <form className="form" id="awardId">
                                    <h4 className="award-align">
                                        {corporateMessage.recentAwards}{' '}
                                        {this.state.awards.length < 3 && (
                                            <a onClick={() => this.handleAddAwards()}>
                                                <img className="add-plus" src="/images/add.png" alt="add image" />
                                            </a>
                                        )}
                                    </h4>
                                    {this.state.awards.length > 0 ? (
                                        this.state.awards.map((award, index) => {
                                            let fromYear = (award.year && parseInt(award.year.split('-')[1])) || '';
                                            let fromMonth = award.year ? this.getMonthNumber(award.year.split('-')[0]) : '';
                                            return (
                                                <div className="form-group row" key={`awards-${index}`}>
                                                    <div className="col-3 box-align">
                                                        <label>{corporateMessage.awardsRecentTitle}</label>
                                                        <input
                                                            className="text-border"
                                                            autoComplete="off"
                                                            name="title"
                                                            id="awards-title"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => aplhaNumericMethod(e)}
                                                            onChange={(e) => this.handleAwardsText(e, index)}
                                                            value={award.title}
                                                        />
                                                    </div>
                                                    <div className="col-3 box-align">
                                                        <label>{corporateMessage.awardsIssuedBy}</label>
                                                        <input
                                                            className="text-border"
                                                            autoComplete="off"
                                                            name="issuedBy"
                                                            id="awards-issuedBy"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            onChange={(e) => this.handleAwardsText(e, index)}
                                                            value={award.issuedBy}
                                                        />
                                                    </div>
                                                    <div className="col-2 year-align">
                                                        <label>{corporateMessage.awardsYear}</label>
                                                        <CustomMonthYearPicker
                                                            mode="calendarOnly"
                                                            displayFormat="MM/yyyy"
                                                            className="my-custom-datepicker-component datePicker-input-awards"
                                                            name="year"
                                                            id="year"
                                                            autoComplete="off"
                                                            year={fromYear}
                                                            month={fromMonth}
                                                            maxDate={new Date()}
                                                            closeOnSelect={true}
                                                            onSelect={(date) => {
                                                                self.handleAwardsText(null, index, 'year', date.getMonth(), date.getFullYear());
                                                            }}
                                                            showMonthYearPicker
                                                            placeholder="MM/YYYY"
                                                            value={award.year}
                                                            disabled={false}
                                                        />
                                                    </div>
                                                    <div className="col-1 box-align awards-certificates-upload">
                                                        <Upload
                                                            preview={true}
                                                            showLabel={false}
                                                            defaultFiles={[award.imagePath]}
                                                            allImages={this.state.awards}
                                                            index={index}
                                                            onDelete={(item) => this.handleImageDelete(item, 'awards', index)}
                                                            onChange={(files) => this.handleUpload(files, 'awards', index)}
                                                        />
                                                    </div>
                                                    <div className="col-1 box-align upload-icon">
                                                        <a className="comments-icon-upload" id="comments-icon" data-tip data-for="rejectComments">
                                                            <FontIcon icon={faInfo} />
                                                        </a>
                                                        {this.state.domLoaded && (
                                                            <CustomReactTooltip id="rejectComments" type="info" effect="solid">
                                                                <span className="comments-details">{advisorMessage.uploadImage}</span> <br />
                                                                <span className="comments-details">{advisorMessage.supportFormats}</span>
                                                            </CustomReactTooltip>
                                                        )}
                                                    </div>
                                                    <div className="upload-Data">
                                                        <a className="ml-1 danger upload-Data" onClick={(e) => this.handleAwardsDelete(e, index)}>
                                                            <FontIcon icon={faMinusCircle} />
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="form-group add-awards row">{corporateMessage.awardsAdd}</div>
                                    )}
                                </form>
                                <form className="form" id="certificateId">
                                    <h4 className="award-align">
                                        {corporateMessage.awardsCertificate}{' '}
                                        {this.state.certificates.length < 3 && (
                                            <a onClick={() => this.handleAddCertificates()}>
                                                <img className="add-plus" src="/images/add.png" alt="add image" />
                                            </a>
                                        )}
                                    </h4>
                                    {this.state.certificates.length > 0 ? (
                                        this.state.certificates.map((certificate, index) => {
                                            let fromYear = (certificate.year && parseInt(certificate.year.split('-')[1])) || '';
                                            let fromMonth = certificate.year ? this.getMonthNumber(certificate.year.split('-')[0]) : '';
                                            return (
                                                <div className="form-group row" key={`certificates-${index}`}>
                                                    <div className="col-3 box-align">
                                                        <label>{corporateMessage.awardsTitle}</label>
                                                        <input
                                                            className="text-border"
                                                            autoComplete="off"
                                                            name="title"
                                                            id="certificates-title"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => aplhaNumericMethod(e)}
                                                            onChange={(e) => this.handleCertificatesText(e, index)}
                                                            value={certificate.title}
                                                        />
                                                    </div>
                                                    <div className="col-3 box-align">
                                                        <label>{corporateMessage.awardsIssuedBy}</label>
                                                        <input
                                                            className="text-border"
                                                            autoComplete="off"
                                                            name="issuedBy"
                                                            id="certificates-issuedBy"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            type="text"
                                                            onChange={(e) => this.handleCertificatesText(e, index)}
                                                            value={certificate.issuedBy}
                                                        />
                                                    </div>
                                                    <div className="col-2 year-align">
                                                        <label>{corporateMessage.awardsYear}</label>
                                                        <CustomMonthYearPicker
                                                            mode="calendarOnly"
                                                            name="year"
                                                            id="year"
                                                            autoComplete="off"
                                                            year={fromYear}
                                                            month={fromMonth}
                                                            closeOnSelect={true}
                                                            displayFormat="MM/yyyy"
                                                            maxDate={new Date()}
                                                            showMonthYearPicker
                                                            className="my-custom-datepicker-component datePicker-input-awards"
                                                            onSelect={(date) => {
                                                                self.handleCertificatesText(null, index, 'year', date.getMonth(), date.getFullYear());
                                                            }}
                                                            value={certificate.year}
                                                            disabled={false}
                                                        />
                                                    </div>
                                                    <div className="col-1 box-align awards-certificates-upload">
                                                        <Upload
                                                            preview={true}
                                                            showLabel={false}
                                                            defaultFiles={[certificate.imagePath]}
                                                            allImages={this.state.certificates}
                                                            index={index}
                                                            onDelete={(item) => this.handleImageDelete(item, 'certificates', index)}
                                                            onChange={(files) => this.handleUpload(files, 'certificates', index)}
                                                        />
                                                    </div>
                                                    <div className="col-1 box-align upload-icon">
                                                        <a className="comments-icon-upload" id="comments-icon" data-tip data-for="rejectComments">
                                                            <FontIcon icon={faInfo} />
                                                        </a>
                                                        {this.state.domLoaded && (
                                                            <CustomReactTooltip id="rejectComments" type="info" effect="solid">
                                                                <span className="comments-details">{advisorMessage.uploadImage}</span>
                                                                <br />
                                                                <span className="comments-details">{advisorMessage.supportFormats}</span>
                                                            </CustomReactTooltip>
                                                        )}
                                                    </div>

                                                    <div className="upload-Data">
                                                        <a className="ml-1 danger upload-Data" onClick={(e) => this.handleCertificatesDelete(e, index)}>
                                                            <FontIcon icon={faMinusCircle} />
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="form-group add-awards row">{corporateMessage.awardsAddCer}</div>
                                    )}
                                </form>
                            </div>
                        </div>
                        {this.props.popup && !this.state.disableButton && (
                            <div className="popup-save">
                                <button onClick={this.handleAwardsCertificate} className="btn btn-primary" disabled={this.state.disableButton}>
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <Loader loading={this.props.loading} />
            </div>
        );
    }
}

export default AwardsCertificates;
