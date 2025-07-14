import React from 'react';
import ProfileHeader from '../../profileHeader';
import AdvisorLeftbar from '../advisorLeftbar';
import moment, { formatDate, parseDate } from 'moment';
import CustomDatePicker from '../../common/datePicker';
import Loader from '../../common/loader';
import { toastrError } from '../../../helpers/toastrHelper';
import { advisorMessage } from '../../../constants/advisorConstant';
import { toastrMessage } from '../../../constants/toastrMessage';
import { addressMethod, pincodeMethod, contentMethod, maxLength, minLength } from '../../../constants/commonRules';
import { maskEmail, maskPanNumber, maskPhoneNumber } from '../../../helpers/maskHelper';
import TypeAhead from '../../common/typeAhead';
import SearchDropdown from '../../common/searchDropdown';
import PublishPopup from '../../Contact/publishPopup';
import classNames from 'classnames';

class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.allList = {};
        this.state = {
            advisorDetails: this.props.advisorDetails,
            advId: '',
            fullName: '',
            userName: '',
            emailId: '',
            phoneNumber: '',
            panNumber: '',
            aboutme: '',
            address1: '',
            address2: '',
            city: '',
            designation: '',
            displayName: '',
            dob: '',
            gender: '',
            pincode: '',
            state: '',
            imagePath: '',
            render: false,
            currentTab: 0,
            loading: false,
            disableButton: true,
            uploadFile: true,
            pinCodeList: [],
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
    }

    componentDidMount() {
        this.setState({ advisorDetails: this.props.advisorDetails, currentTab: this.props.currentTab });
        this.updateCurrentInformation(this.props.advisorDetails);
    }

    getCityDetails = (value) => {
        value = value.selectedTag;
        let stayPincode = value.pincodes.findIndex((x) => x == this.state.pincode);
        let pinCodeList = value.pincodes.map((pincode) => ({ name: pincode, value: pincode }));
        this.setState({ city: value.city, state: value.state, pinCodeList, pincode: stayPincode > -1 ? this.state.pincode : pinCodeList.length == 1 ? pinCodeList[0].value : '' });
    };

    renderCity = () => {
        return (
            <div>
                <label>City</label>
                <TypeAhead selectedTags={this.state.tags} inputValue={this.state.city} updatedTag={(value) => this.getCityDetails(value)} />
            </div>
        );
    };

    renderState = () => {
        const { state } = this.state;
        return (
            <div>
                <label>State</label>
                <input className="text-border-pi" autoComplete="state" name="state" id="state" type="text" readOnly value={state} disabled />
            </div>
        );
    };

    renderPinCode = () => {
        const { pincode, state, city, pinCodeList } = this.state;
        return (
            <div className="personal-info-input">
                <label>Pincode</label>
                <SearchDropdown
                    data={pinCodeList}
                    search={true}
                    emptyMessage={'Not found'}
                    placeholder={'Choose Pincode'}
                    onChange={this.pinCodeSearchChangeHandler}
                    value={pincode}
                />
            </div>
        );
    };

    pinCodeSearchChangeHandler = (value) => {
        let e = {
            target: {
                name: 'pincode',
                value
            }
        };
        this.handleChange(e);
    };

    updateCurrentInformation = (advisorDetails) => {
        let advisorNewDetails = JSON.parse(JSON.stringify(advisorDetails));
        this.setState({
            fullName: advisorNewDetails.name ? advisorNewDetails.name : '',
            userName: advisorNewDetails.userName ? advisorNewDetails.userName : '',
            emailId: advisorNewDetails.emailId,
            phoneNumber: advisorNewDetails.phoneNumber,
            panNumber: advisorNewDetails.panNumber,
            aboutme: advisorNewDetails.aboutme ? advisorNewDetails.aboutme : '',
            address1: advisorNewDetails.address1 ? advisorNewDetails.address1 : '',
            address2: advisorNewDetails.address2 ? advisorNewDetails.address2 : '',
            advId: advisorNewDetails.advId,
            city: advisorNewDetails.city ? advisorNewDetails.city : '',
            designation: advisorNewDetails.designation ? advisorNewDetails.designation : '',
            displayName: advisorNewDetails.displayName ? advisorNewDetails.displayName : '',
            dob: advisorNewDetails.dob ? new Date(advisorNewDetails.dob) : '',
            gender: advisorNewDetails.gender ? advisorNewDetails.gender : '',
            pincode: advisorNewDetails.pincode ? advisorNewDetails.pincode : '',
            state: advisorNewDetails.state ? advisorNewDetails.state : '',
            loading: false,
            disableButton: true
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            if (
                this.props.advisorDetails.displayName != this.state.displayName ||
                this.props.advisorDetails.designation != this.state.designation ||
                this.props.advisorDetails.gender != this.state.gender ||
                this.props.advisorDetails.address1 != this.state.address1 ||
                this.props.advisorDetails.address2 != this.state.address2 ||
                this.props.advisorDetails.city != this.state.city ||
                this.props.advisorDetails.state != this.state.state ||
                this.props.advisorDetails.pincode != this.state.pincode ||
                this.props.advisorDetails.aboutme != this.state.aboutme
            ) {
                this.setState({ disableButton: false });
            } else {
                this.setState({ disableButton: true });
            }
        });
    };

    handlePersonalInformation = (e) => {
        e.preventDefault();
        var testDateUtc = moment.utc(this.state.dob);
        var localDate = testDateUtc.local();
        if (
            this.state.designation.trim() &&
            this.state.gender &&
            this.state.dob &&
            this.state.displayName.trim() &&
            this.state.address1.trim() &&
            this.state.address2.trim() &&
            this.state.aboutme.trim() &&
            this.state.pincode &&
            this.state.state &&
            this.state.city
        ) {
            if (
                this.props.advisorDetails.displayName != this.state.displayName ||
                this.props.advisorDetails.designation != this.state.designation ||
                this.props.advisorDetails.dob != localDate.format('MM-DD-YYYY') ||
                this.props.advisorDetails.gender != this.state.gender ||
                this.props.advisorDetails.address1 != this.state.address1 ||
                this.props.advisorDetails.address2 != this.state.address2 ||
                this.props.advisorDetails.city != this.state.city ||
                this.props.advisorDetails.state != this.state.state ||
                this.props.advisorDetails.pincode != this.state.pincode ||
                this.props.advisorDetails.aboutme != this.state.aboutme
            ) {
                let options = {
                    name: this.state.fullName,
                    userName: this.state.userName,
                    emailId: this.state.emailId,
                    phoneNumber: this.state.phoneNumber,
                    panNumber: this.state.panNumber,
                    aboutme: this.state.aboutme,
                    address1: this.state.address1,
                    address2: this.state.address2,
                    advId: this.state.advId,
                    city: this.state.city,
                    designation: this.state.designation,
                    displayName: this.state.displayName,
                    dob: localDate.format('MM-DD-YYYY'),
                    gender: this.state.gender,
                    pincode: this.state.pincode,
                    state: this.state.state,
                    imagePath: this.state.advisorDetails.imagePath
                };
                this.props.updatePersonalInformation(options);
                this.setState({ loading: true });
                this.onOpenModal();
            } else {
                this.setState({ disableButton: true });
            }
        } else {
            toastrError(toastrMessage.emptyError);
        }
    };

    handleDate = (day) => {
        var testDateUtc = moment.utc(this.state.dob);
        var localDate = testDateUtc.local();
        this.setState({ dob: day });
        if (this.props.advisorDetails.dob != localDate.format('MM-DD-YYYY')) {
            this.setState({ disableButton: false });
        } else {
            this.setState({ disableButton: true });
        }
    };

    render() {
        const { advisorDetails, loading } = this.props;
        const { userName } = advisorDetails || {};
        let curDate = new Date();
        curDate.setFullYear(curDate.getFullYear() - 15);
        return (
            <div>
                {!this.props.popup && (
                    <div className="col-12">
                        <ProfileHeader
                            name={this.props.advisorDetails.displayName || (this.props.advisorDetails && this.props.advisorDetails.name)}
                            location={this.props.advisorDetails && this.props.advisorDetails.city}
                            designation={this.props.advisorDetails.designation}
                            handleSave={this.handlePersonalInformation}
                            onPublish={this.props.onPublish}
                            showSaveButton={true}
                            disableButton={this.state.disableButton}
                            advisorDetails={this.props.advisorDetails}
                            publicAdvisorDetails={this.props.publicAdvisorDetails}
                            role={true}
                        />
                        {this.props.advisorDetails.workFlowStatus == 4 && !loading && !this.props.popup && (
                            <PublishPopup openPopup={this.state.openPopup} showCloseIcon={true} onCloseModal={this.onCloseModal}></PublishPopup>
                        )}
                    </div>
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
                    <div className={classNames('', { 'col-10 nopadding': !this.props.popup })}>
                        <div className={classNames('', { 'col-12 center-page planning-right row': !this.props.popup })}>
                            {this.props.popup && <h2 className="popup-heading">Personal Information</h2>}
                            <div className="page-center bg-white">
                                <form className="form">
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">
                                            <label>{advisorMessage.personalInfoName}</label>
                                            <input className="text-border-pi" name="fullName" id="fullName" type="text" value={this.state.fullName} disabled />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>{advisorMessage.personalInfoUserName}</label>
                                            <input
                                                className="text-border-pi"
                                                name="userName"
                                                id="userName"
                                                type="text"
                                                onChange={this.handleChange}
                                                value={this.state.userName}
                                                disabled={this.state.advisorDetails.userName ? true : false}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">
                                            <label>{advisorMessage.personalInfoPanNumber}</label>
                                            <input
                                                className="text-border-pi uppercase"
                                                name="panNumber"
                                                id="panNumber"
                                                type="text"
                                                value={maskPanNumber(this.state.panNumber)}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>{advisorMessage.personalInfoMoblie}</label>
                                            <input
                                                className="text-border-pi"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                type="text"
                                                value={maskPhoneNumber(this.state.phoneNumber)}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        {/* <div className="col-4 adv-box">
                      <label>{advisorMessage.personalInfoUserName}</label>
                      <input className="text-border-pi" name="userName" id="userName" type="text" value={this.state.userName} disabled />
                    </div> */}
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">
                                            <label>{advisorMessage.personalInfoEmail}</label>
                                            <input className="text-border-pi uppercase" name="emailId" id="emailId" type="email" value={maskEmail(this.state.emailId)} disabled />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>{advisorMessage.personalInfoDisplay}</label>
                                            <input
                                                className="text-border-pi"
                                                autoComplete="displayName"
                                                name="displayName"
                                                id="displayName"
                                                type="text"
                                                maxLength={maxLength.content}
                                                onKeyPress={(e) => contentMethod(e)}
                                                onChange={this.handleChange}
                                                value={this.state.displayName}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-4 adv-box">
                                            <label>{advisorMessage.personalInfoDesignation}</label>
                                            <input
                                                className="text-border-pi"
                                                autoComplete="designation"
                                                name="designation"
                                                id="designation"
                                                type="text"
                                                maxLength={maxLength.content}
                                                onKeyPress={(e) => contentMethod(e)}
                                                onChange={this.handleChange}
                                                value={this.state.designation}
                                            />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>{advisorMessage.personalInfoDOB}</label>
                                            <CustomDatePicker
                                                displayFormat="dd-MM-yyyy"
                                                onChange={(day) => this.handleDate(day)}
                                                showOnInputClick
                                                date={this.state.dob ? this.state.dob : ''}
                                                maxDate={curDate}
                                                placeholder="Select Date"
                                                className="text-border-pi my-custom-datepicker-component datePicker-Input"
                                                disabled={this.state.advisorDetails.dob ? true : false}
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">
                                            <label>{advisorMessage.personalInfoGender}</label>
                                            <select className="text-border-pi" name="gender" id="gender" type="select" onChange={this.handleChange} value={this.state.gender}>
                                                <option value="">{advisorMessage.personalInfoGenderSelect}</option>
                                                <option value="M">{advisorMessage.genderSelectMale}</option>
                                                <option value="F">{advisorMessage.genderSelectFemale}</option>
                                                <option value="O">{advisorMessage.genderSelectOthers}</option>
                                            </select>
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>{advisorMessage.personalInfoAddress1}</label>
                                            <input
                                                className="text-border-pi"
                                                autoComplete="address1"
                                                name="address1"
                                                id="address1"
                                                type="text"
                                                maxLength={maxLength.content}
                                                onKeyPress={(e) => addressMethod(e)}
                                                onChange={this.handleChange}
                                                value={this.state.address1}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">
                                            <label>{advisorMessage.personalInfoAddress2}</label>
                                            <input
                                                className="text-border-pi"
                                                autoComplete="address2"
                                                name="address2"
                                                id="address2"
                                                type="text"
                                                maxLength={maxLength.content}
                                                onKeyPress={(e) => addressMethod(e)}
                                                onChange={this.handleChange}
                                                value={this.state.address2}
                                            />
                                        </div>
                                        <div className="col-4 adv-box">{this.renderCity()}</div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">{this.renderState()}</div>
                                        <div className="col-4 adv-box">{this.renderPinCode()}</div>
                                    </div>
                                    <div className="col-4 adv-box1">
                                        <label>{advisorMessage.personalInfoAbout}</label>
                                    </div>
                                    <textarea
                                        className="tell-anything"
                                        name="aboutme"
                                        id="aboutme"
                                        type="text"
                                        rows="5"
                                        cols="70"
                                        maxLength={maxLength.about}
                                        onChange={this.handleChange}
                                        value={this.state.aboutme}>
                                        {this.state.aboutme}
                                    </textarea>
                                </form>
                            </div>
                        </div>
                        {this.props.popup && !this.state.disableButton && (
                            <div className="popup-save">
                                <button onClick={this.handlePersonalInformation} className="btn btn-primary" disabled={this.state.disableButton}>
                                    Save
                                </button>
                            </div>
                        )}
                    </div>{' '}
                </div>
                <Loader loading={this.props.loading} />
            </div>
        );
    }
}

export default PersonalInfo;
