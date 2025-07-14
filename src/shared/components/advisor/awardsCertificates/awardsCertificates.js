import React from 'react';
import AdvisorLeftbar from '../advisorLeftbar';
import ProfileHeader from '../../profileHeader';
import Loader from '../../common/loader';
import Upload from '../../common/upload';
import { showMonth } from '../../../constants/appConstants';
import { contentMethod, aplhaNumericMethod, websiteMethod, maxLength } from '../../../constants/commonRules';
import { advisorMessage } from '../../../constants/advisorConstant';
import { toastrError } from '../../../helpers/toastrHelper';
import { toastrMessage } from '../../../constants/toastrMessage';
import PublishPopup from '../../Contact/publishPopup';
import classNames from 'classnames';
import CustomReactTooltip from '../../common/customReactTooltip';
import FontIcon from '../../common/fontAwesomeIcon';
import { faMinusCircle, faInfo } from '@fortawesome/free-solid-svg-icons';
import CustomMonthYearPicker from '../../../components/common/customMonthYearPicker';

class AwardsCertificates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advId: '',
            awards: [],
            certificates: [],
            educations: [],
            experiences: [],
            loading: false,
            isTabOpened: false,
            domLoaded: false,
            disableButton: true,
            openPopup: false
        };
    }

    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    handleTabChange = (index) => {
        this.setState({ currentTab: index });
        this.props.handleTabChange(index);
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
        const advisorNewDetails = JSON.parse(JSON.stringify(advisorDetails));
        const advisorNewCheckDetails = JSON.parse(JSON.stringify(advisorDetails));
        const advisorOriginalAwardDetails = {
            awards: advisorNewCheckDetails.awards,
            certificates: advisorNewCheckDetails.certificates,
            educations: advisorNewCheckDetails.educations,
            experiences: advisorNewCheckDetails.experiences
        };
        advisorOriginalAwardDetails.educations = advisorOriginalAwardDetails.educations.map((item, i) => {
            if (advisorOriginalAwardDetails.educations.length - 1 == i) {
                item.tillDate = item.toYear == 'Till Date';
                item.toYear = item.tillDate ? '' : item.toYear;
            }
            return item;
        });
        advisorOriginalAwardDetails.experiences = advisorOriginalAwardDetails.experiences.map((item, i) => {
            if (advisorOriginalAwardDetails.experiences.length - 1 == i) {
                item.tillDate = item.toYear == 'Till Date';
                item.toYear = item.tillDate ? '' : item.toYear;
            }
            return item;
        });
        advisorNewDetails.educations = advisorNewDetails.educations.map((item, i) => {
            if (advisorNewDetails.educations.length - 1 == i) {
                item.tillDate = item.toYear == 'Till Date';
                item.toYear = item.tillDate ? '' : item.toYear;
            }
            return item;
        });
        advisorNewDetails.experiences = advisorNewDetails.experiences.map((item, i) => {
            if (advisorNewDetails.experiences.length - 1 == i) {
                item.tillDate = item.toYear == 'Till Date';
                item.toYear = item.tillDate ? '' : item.toYear;
            }
            return item;
        });
        this.setState(
            {
                awards: advisorNewDetails.awards && advisorNewDetails.awards.length > 0 ? advisorNewDetails.awards : [],
                certificates: advisorNewDetails.certificates && advisorNewDetails.certificates.length > 0 ? advisorNewDetails.certificates : [],
                educations: advisorNewDetails.educations && advisorNewDetails.educations.length > 0 ? advisorNewDetails.educations : [],
                experiences: advisorNewDetails.experiences && advisorNewDetails.experiences.length > 0 ? advisorNewDetails.experiences : [],
                loading: false,
                advisorOriginalAwardDetails,
                disableButton: true
            },
            () => {
                this.handleDisableButton();
            }
        );
    };

    handleAwardsCertificate = (e) => {
        e.preventDefault();
        if (!this.state.disableButton) {
            if (this.state.educations.length > 0) {
                let showEducationError = false;
                let showYearValidation = false;
                this.state.educations.forEach((education) => {
                    if (education.institution.trim() == '' || education.field.trim() == '' || education.degree.trim() == '' || education.fromYear == '' || education.toYear == '') {
                        if (education.tillDate && education.toYear == '') {
                            showEducationError = false;
                        } else {
                            showEducationError = true;
                        }
                    }
                    if (new Date(education.fromYear).getTime() > new Date(education.toYear).getTime()) {
                        showYearValidation = true;
                    }
                });
                if (showEducationError) {
                    toastrError(toastrMessage.emptyEducation);
                    return false;
                }
                if (showYearValidation) {
                    toastrError(toastrMessage.yearError);
                    return false;
                }
            }
            if (this.state.experiences.length > 0) {
                let showExperienceError = false;
                let showYearValidation = false;
                this.state.experiences.forEach((experience) => {
                    if (
                        experience.company.trim() == '' ||
                        experience.designation.trim() == '' ||
                        experience.fromYear == '' ||
                        experience.toYear == '' ||
                        experience.location.trim() == ''
                    ) {
                        if (experience.tillDate && experience.toYear == '') {
                            showExperienceError = false;
                        } else {
                            showExperienceError = true;
                        }
                    }
                    if (new Date(experience.fromYear).getTime() > new Date(experience.toYear).getTime()) {
                        showYearValidation = true;
                    }
                });
                if (showExperienceError) {
                    toastrError(toastrMessage.emptyExperience);
                    return false;
                }
                if (showYearValidation) {
                    toastrError(toastrMessage.yearError);
                    return false;
                }
            }
            if (this.state.awards.length > 0) {
                let showAwardError = false;
                this.state.awards.forEach((award) => {
                    if (award.title.trim() == '' || award.issuedBy.trim() == '' || award.year == '') {
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
                    if (certificate.title.trim() == '' || certificate.issuedBy.trim() == '' || certificate.year == '') {
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
                certificates: this.state.certificates && this.state.certificates.length > 0 && this.state.certificates[0].title ? this.state.certificates : [],
                educations: this.state.educations && this.state.educations.length > 0 && this.state.educations[0].institution ? this.state.educations : [],
                experiences: this.state.experiences && this.state.experiences.length > 0 && this.state.experiences[0].company ? this.state.experiences : []
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

    handleAddEducations = () => {
        if (!this.state.isTabOpened) {
            let newInput = {
                degree: '',
                field: '',
                fromYear: '',
                institution: '',
                toYear: ''
            };
            this.setState((prevState) => ({ educations: prevState.educations.concat([newInput]), isTabOpened: true }));
        } else {
            toastrError(toastrMessage.emptyError);
        }
    };

    handleAddExperiences = () => {
        if (!this.state.isTabOpened) {
            let newInput = {
                company: '',
                designation: '',
                fromYear: '',
                location: '',
                toYear: ''
            };
            this.setState((prevState) => ({ experiences: prevState.experiences.concat([newInput]), isTabOpened: true }));
        } else {
            toastrError(toastrMessage.emptyError);
        }
    };

    getMonth = (month) => {
        return month ? showMonth[month] : '';
    };

    getMonthNumber = (month) => {
        return month ? showMonth.findIndex((a) => a == month) : '';
    };

    handleDisableButton = () => {
        let disableButton = false;
        const currentAwardDetails = {
            awards: this.state.awards,
            certificates: this.state.certificates,
            educations: this.state.educations,
            experiences: this.state.experiences
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
            value = fromMonth ? `${this.getMonth(fromMonth)}-${fromYear}` : '';
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
            value = fromMonth ? `${this.getMonth(fromMonth)}-${fromYear}` : '';
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

    handleEducationsText = (e, i, from, fromMonth, fromYear) => {
        let name, value;
        if (e) {
            name = e.target.name;
            value = name != 'tillDate' ? e.target.value : e.target.checked;
        }
        if (from && name != 'tillDate') {
            name = from;
            value = fromMonth ? `${this.getMonth(fromMonth)}-${fromYear}` : '';
        }
        let educations = [...this.state.educations];
        if (educations.length > 0) {
            educations[i][name] = value || '';
        }
        let isTabOpened = true;
        if (educations.length > 0) {
            isTabOpened = !(educations[i].degree != '' && educations[i].field != '' && educations[i].institution != '' && educations[i].toYear != '');
        }
        this.setState({ educations, isTabOpened }, () => {
            this.handleDisableButton();
        });
    };

    handleExperiencesText = (e, i, from, fromMonth, fromYear) => {
        let name, value;
        if (e) {
            name = e.target.name;
            value = name != 'tillDate' ? e.target.value : e.target.checked;
        }
        if (from && name != 'tillDate') {
            name = from;
            value = fromMonth ? `${this.getMonth(fromMonth)}-${fromYear}` : '';
        }
        let experiences = [...this.state.experiences];
        if (experiences.length > 0) {
            experiences[i][name] = value || '';
        }
        let isTabOpened = true;
        if (experiences.length > 0) {
            isTabOpened = !(experiences[i].company != '' && experiences[i].location != '' && experiences[i].designation != '' && experiences[i].toYear != '');
        }
        this.setState({ experiences, isTabOpened }, () => {
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

    handleEducationsDelete = (e, i) => {
        e.preventDefault();
        let educations = [...this.state.educations.slice(0, i), ...this.state.educations.slice(i + 1)];
        this.setState({ educations, isTabOpened: false }, () => {
            this.handleDisableButton();
        });
    };

    handleExperiencesDelete = (e, i) => {
        e.preventDefault();
        let experiences = [...this.state.experiences.slice(0, i), ...this.state.experiences.slice(i + 1)];
        this.setState({ experiences, isTabOpened: false }, () => {
            this.handleDisableButton();
        });
    };

    render() {
        let self = this;
        const { advisorDetails, loading } = this.props;
        const { userName } = advisorDetails || {};
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
                        <AdvisorLeftbar
                            userName={userName}
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
                                <form className="form" id="eduId">
                                    <h4 className="award-align">
                                        {advisorMessage.awardsEducation}{' '}
                                        {this.state.educations.length < 3 && (
                                            <a onClick={() => this.handleAddEducations()}>
                                                <img className="add-plus" src="/images/add.png" alt="add image" />
                                            </a>
                                        )}
                                    </h4>
                                    {this.state.educations.length > 0 ? (
                                        this.state.educations.map((education, index) => {
                                            let fromYear = (education.fromYear && parseInt(education.fromYear.split('-')[1])) || '';
                                            let fromMonth = education.fromYear ? this.getMonthNumber(education.fromYear.split('-')[0]) : '';
                                            let toYear = (education.toYear && parseInt(education.toYear.split('-')[1])) || '';
                                            let toMonth = education.toYear ? this.getMonthNumber(education.toYear.split('-')[0]) : '';
                                            return (
                                                <div className="form-group row" key={`educations-${index}`}>
                                                    <div className="col-3 box-align">
                                                        <label>{advisorMessage.awardsCollege}</label>
                                                        <input
                                                            className="text-border"
                                                            autoComplete="off"
                                                            name="institution"
                                                            id="institution"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            onChange={(e) => this.handleEducationsText(e, index)}
                                                            value={education.institution}
                                                        />
                                                    </div>
                                                    <div className="col-3 box-align">
                                                        <label>{advisorMessage.awardsDegree}</label>
                                                        <input
                                                            className="text-border"
                                                            autoComplete="off"
                                                            name="degree"
                                                            id="degree"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => websiteMethod(e)}
                                                            onChange={(e) => this.handleEducationsText(e, index)}
                                                            value={education.degree}
                                                        />
                                                    </div>
                                                    <div className="col-3 box-align">
                                                        <label>{advisorMessage.awardsStudy} </label>
                                                        <input
                                                            className="text-border"
                                                            autoComplete="off"
                                                            name="field"
                                                            id="field"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            onChange={(e) => this.handleEducationsText(e, index)}
                                                            value={education.field}
                                                        />
                                                    </div>
                                                    <div className="col-1 year-align">
                                                        <label>{advisorMessage.awardsFromYear}</label>
                                                        {this.state.educations.length - 1 == index && (
                                                            <span style={{ marginLeft: '10px' }}>
                                                                <input
                                                                    name="tillDate"
                                                                    id="tillDate"
                                                                    type="checkbox"
                                                                    title="Current Education"
                                                                    defaultChecked={education.tillDate}
                                                                    onChange={(e) => {
                                                                        self.handleEducationsText(e, index, 'tillDate', '', '', 'Yes');
                                                                    }}
                                                                />
                                                            </span>
                                                        )}
                                                        <CustomMonthYearPicker
                                                            mode="calendarOnly"
                                                            name="fromYear"
                                                            id="fromYear"
                                                            year={fromYear}
                                                            month={fromMonth}
                                                            maxDate={new Date()}
                                                            displayFormat="MM/yyyy"
                                                            autoComplete="off"
                                                            className="my-custom-datepicker-component datePicker-input-education"
                                                            closeOnSelect={true}
                                                            onSelect={(date) => {
                                                                if (date) {
                                                                    self.handleEducationsText(null, index, 'fromYear', date.getMonth(), date.getFullYear());
                                                                } else {
                                                                    self.handleEducationsText(null, index, 'fromYear');
                                                                }
                                                            }}
                                                            value={education.fromYear}
                                                            disabled={false}
                                                        />
                                                    </div>
                                                    <div className="col-1 year-align addTab">
                                                        <label>{advisorMessage.awardsToYear}</label>
                                                        <CustomMonthYearPicker
                                                            mode="calendarOnly"
                                                            name="toYear"
                                                            id="toYear"
                                                            year={toYear}
                                                            month={toMonth}
                                                            maxlength="4"
                                                            autoComplete="off"
                                                            pattern="[1-9][0-9]{3}"
                                                            closeOnSelect={true}
                                                            minDate={new Date(fromYear, fromMonth, 1)}
                                                            maxDate={new Date()}
                                                            displayFormat="MM/yyyy"
                                                            showMonthYearPicker
                                                            className="my-custom-datepicker-component datePicker-input-education"
                                                            onSelect={(date) => {
                                                                if (date) {
                                                                    self.handleEducationsText(null, index, 'toYear', date.getMonth(), date.getFullYear());
                                                                } else {
                                                                    self.handleEducationsText(null, index, 'toYear');
                                                                }
                                                            }}
                                                            value={education.toYear}
                                                            disabled={!education.tillDate ? !education.fromYear : education.tillDate}
                                                        />
                                                    </div>
                                                    <div className="upload-Data">
                                                        <a className="ml-1 danger" onClick={(e) => this.handleEducationsDelete(e, index)}>
                                                            {/* <i className="fa fa-minus-circle"></i> */}
                                                            <FontIcon icon={faMinusCircle} />
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="form-group add-awards row">{advisorMessage.awardsAddEdu}</div>
                                    )}
                                </form>
                                <form className="form" id="expId">
                                    <h4 className="award-align">
                                        {advisorMessage.awardsExperience}{' '}
                                        {this.state.experiences.length < 5 && (
                                            <a onClick={() => this.handleAddExperiences()}>
                                                <img className="add-plus" src="/images/add.png" alt="add image" />
                                            </a>
                                        )}
                                    </h4>
                                    {this.state.experiences.length > 0 ? (
                                        this.state.experiences.map((experience, index) => {
                                            let fromYear = (experience.fromYear && parseInt(experience.fromYear.split('-')[1])) || '';
                                            let fromMonth = experience.fromYear ? this.getMonthNumber(experience.fromYear.split('-')[0]) : '';
                                            let toYear = (experience.toYear && parseInt(experience.toYear.split('-')[1])) || '';
                                            let toMonth = experience.toYear ? this.getMonthNumber(experience.toYear.split('-')[0]) : '';
                                            return (
                                                <div className="form-group row" key={`experiences-${index}`}>
                                                    <div className="col-3 box-align">
                                                        <label>{advisorMessage.awardsCompany}</label>
                                                        <input
                                                            className="text-border"
                                                            autoComplete="off"
                                                            name="company"
                                                            id="company"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            onChange={(e) => this.handleExperiencesText(e, index)}
                                                            value={experience.company}
                                                        />
                                                    </div>
                                                    <div className="col-3 box-align">
                                                        <label>{advisorMessage.awardsDesignation}</label>
                                                        <input
                                                            className="text-border"
                                                            autoComplete="off"
                                                            name="designation"
                                                            id="designation"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            onChange={(e) => this.handleExperiencesText(e, index)}
                                                            value={experience.designation}
                                                        />
                                                    </div>
                                                    <div className="col-3 box-align">
                                                        <label>{advisorMessage.awardsLocation}</label>
                                                        <input
                                                            className="text-border"
                                                            autoComplete="off"
                                                            name="location"
                                                            id="location"
                                                            type="text"
                                                            maxLength={maxLength.content}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            onChange={(e) => this.handleExperiencesText(e, index)}
                                                            value={experience.location}
                                                        />
                                                    </div>
                                                    <div className="col-1 year-align">
                                                        <label>{advisorMessage.awardsFromYear}</label>
                                                        {this.state.experiences.length - 1 == index && (
                                                            <span style={{ marginLeft: '10px' }}>
                                                                <input
                                                                    name="tillDate"
                                                                    id="tillDate"
                                                                    type="checkbox"
                                                                    title="Current Experience"
                                                                    onChange={(e) => {
                                                                        self.handleExperiencesText(e, index, 'tillDate', '', '', 'Yes');
                                                                    }}
                                                                />
                                                            </span>
                                                        )}
                                                        <CustomMonthYearPicker
                                                            mode="calendarOnly"
                                                            name="fromYear"
                                                            id="fromYear"
                                                            autoComplete="off"
                                                            year={fromYear}
                                                            month={fromMonth}
                                                            closeOnSelect={true}
                                                            displayFormat="MM/yyyy"
                                                            maxDate={new Date()}
                                                            showMonthYearPicker
                                                            className="my-custom-datepicker-component datePicker-input-education"
                                                            onSelect={(date) => {
                                                                if (date) {
                                                                    self.handleExperiencesText(null, index, 'fromYear', date.getMonth(), date.getFullYear());
                                                                } else {
                                                                    self.handleExperiencesText(null, index, 'fromYear');
                                                                }
                                                            }}
                                                            value={experience.fromYear}
                                                        />
                                                    </div>
                                                    <div className="col-1 year-align">
                                                        <label>{advisorMessage.awardsToYear}</label>
                                                        <CustomMonthYearPicker
                                                            mode="calendarOnly"
                                                            name="toYear"
                                                            id="toYear"
                                                            year={toYear}
                                                            month={toMonth}
                                                            closeOnSelect={true}
                                                            displayFormat="MM/yyyy"
                                                            autoComplete="off"
                                                            minDate={new Date(fromYear, fromMonth, 1)}
                                                            maxDate={new Date()}
                                                            showMonthYearPicker
                                                            className="my-custom-datepicker-component datePicker-input-education"
                                                            onSelect={(date) => {
                                                                if (date) {
                                                                    self.handleExperiencesText(null, index, 'toYear', date.getMonth(), date.getFullYear());
                                                                } else {
                                                                    self.handleExperiencesText(null, index, 'toYear');
                                                                }
                                                            }}
                                                            value={experience.toYear}
                                                            disabled={!experience.fromYear}
                                                        />
                                                    </div>
                                                    <div className="upload-Data">
                                                        <a className="ml-1 danger upload-Data" onClick={(e) => this.handleExperiencesDelete(e, index)}>
                                                            <FontIcon icon={faMinusCircle} />
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="form-group add-awards row">{advisorMessage.awardsAddExe}</div>
                                    )}
                                </form>
                                <form className="form" id="awardId">
                                    <h4 className="award-align">
                                        {advisorMessage.recentAwards}{' '}
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
                                                        <label>{advisorMessage.awardsRecentTitle}</label>
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
                                                        <label>{advisorMessage.awardsIssuedBy}</label>
                                                        <input
                                                            className="text-border"
                                                            autoComplete="off"
                                                            name="issuedBy"
                                                            id="awards-issuedBy"
                                                            type="text"
                                                            maxLength={maxLength.issuedBy}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            onChange={(e) => this.handleAwardsText(e, index)}
                                                            value={award.issuedBy}
                                                        />
                                                    </div>
                                                    <div className="col-2 year-align">
                                                        <label>{advisorMessage.awardsYear}</label>
                                                        <CustomMonthYearPicker
                                                            mode="calendarOnly"
                                                            name="year"
                                                            id="year"
                                                            dateFormat="MM/yyyy"
                                                            autoComplete="off"
                                                            className="my-custom-datepicker-component datePicker-input-awards"
                                                            year={fromYear}
                                                            month={fromMonth}
                                                            maxDate={new Date()}
                                                            closeOnSelect={true}
                                                            showMonthYearPicker
                                                            onSelect={(date) => {
                                                                if (date) {
                                                                    self.handleAwardsText(null, index, 'year', date.getMonth(), date.getFullYear());
                                                                } else {
                                                                    self.handleAwardsText(null, index, 'year');
                                                                }
                                                            }}
                                                            value={award.year}
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
                                                            <CustomReactTooltip id="rejectComments" type="info" className="upload-info" effect="solid">
                                                                <span className="comments-details">{advisorMessage.uploadImage}</span>
                                                                <br />
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
                                        <div className="form-group add-awards row">{advisorMessage.awardsAdd}</div>
                                    )}
                                </form>
                                <form className="form" id="certificateId">
                                    <h4 className="award-align">
                                        {advisorMessage.awardsCertificate}{' '}
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
                                                        <label>{advisorMessage.awardsTitle}</label>
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
                                                        <label>{advisorMessage.awardsIssuedBy}</label>
                                                        <input
                                                            className="text-border"
                                                            autoComplete="off"
                                                            name="issuedBy"
                                                            id="certificates-issuedBy"
                                                            maxLength={maxLength.issuedBy}
                                                            onKeyPress={(e) => contentMethod(e)}
                                                            type="text"
                                                            onChange={(e) => this.handleCertificatesText(e, index)}
                                                            value={certificate.issuedBy}
                                                        />
                                                    </div>
                                                    <div className="col-2 year-align">
                                                        <label>{advisorMessage.awardsYear}</label>
                                                        <CustomMonthYearPicker
                                                            mode="calendarOnly"
                                                            name="year"
                                                            id="year"
                                                            year={fromYear}
                                                            month={fromMonth}
                                                            autoComplete="off"
                                                            displayFormat="MM/yyyy"
                                                            maxDate={new Date()}
                                                            showMonthYearPicker
                                                            className="my-custom-datepicker-component datePicker-input-awards"
                                                            closeOnSelect={true}
                                                            onSelect={(date) => {
                                                                if (date) {
                                                                    self.handleCertificatesText(null, index, 'year', date.getMonth(), date.getFullYear());
                                                                } else {
                                                                    self.handleCertificatesText(null, index, 'year');
                                                                }
                                                            }}
                                                            value={certificate.year}
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
                                                    <br />
                                                    <div className="upload-Data">
                                                        <a className="ml-1 danger upload-Data" onClick={(e) => this.handleCertificatesDelete(e, index)}>
                                                            <FontIcon icon={faMinusCircle} />
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="form-group add-awards row">{advisorMessage.awardsAddCer}</div>
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
