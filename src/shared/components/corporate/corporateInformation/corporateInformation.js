import React from 'react';
import ProfileHeader from '../../profileHeader';
import CorporateLeftbar from '../corporateLeftbar';
import moment, { formatDate, parseDate } from 'moment';
import CustomDatePicker from '../../common/datePicker';
import Loader from '../../common/loader';
import { addressMethod, pincodeMethod, contentMethod, maxLength, websiteMethod } from '../../../constants/commonRules';
import { toastrError } from '../../../helpers/toastrHelper';
import { maskEmail, maskPanNumber, maskPhoneNumber } from '../../../helpers/maskHelper';
import { toastrMessage } from '../../../constants/toastrMessage';
import { corporateMessage } from '../../../constants/corporateConstant';
import TypeAhead from '../../common/typeAhead';
import SearchDropdown from '../../common/searchDropdown';
import PublishPopup from '../../Contact/publishPopup';
import classNames from 'classnames';

class CorporateInformation extends React.Component {
    constructor(props) {
        super(props);
        this.allList = {};
        this.state = {
            advisorDetails: this.props.advisorDetails,
            name: '',
            userName: '',
            emailId: '',
            phoneNumber: '',
            panNumber: '',
            aboutme: '',
            address1: '',
            address2: '',
            advId: '',
            firmType: '',
            corporateLable: '',
            website: '',
            city: '',
            designation: '',
            displayName: '',
            dob: '',
            gender: '',
            pincode: '',
            state: '',
            render: false,
            currentTab: 0,
            loading: false,
            openPopup: false,
            disableButton: true,
            uploadFile: true,
            pinCodeList: []
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
        const { loading } = this.props;
        const { loading: oldLoading } = oldProps;
        if (JSON.stringify(this.props.advisorDetails) != JSON.stringify(oldProps.advisorDetails) || this.state.currentTab != this.props.currentTab) {
            this.setState({ advisorDetails: this.props.advisorDetails, currentTab: this.props.currentTab });
            this.updateCurrentInformation(this.props.advisorDetails);
        }
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
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
            name: advisorNewDetails.name,
            userName: advisorNewDetails.userName,
            emailId: advisorNewDetails.emailId,
            phoneNumber: advisorNewDetails.phoneNumber,
            panNumber: advisorNewDetails.panNumber,
            aboutme: advisorNewDetails.aboutme ? advisorNewDetails.aboutme : '',
            address1: advisorNewDetails.address1 ? advisorNewDetails.address1 : '',
            address2: advisorNewDetails.address2 ? advisorNewDetails.address2 : '',
            advId: advisorNewDetails.advId,
            city: advisorNewDetails.city ? advisorNewDetails.city : '',
            displayName: advisorNewDetails.displayName ? advisorNewDetails.displayName : '',
            dob: advisorNewDetails.dob ? new Date(advisorNewDetails.dob) : '',
            pincode: advisorNewDetails.pincode ? advisorNewDetails.pincode : '',
            state: advisorNewDetails.state ? advisorNewDetails.state : '',
            firmType: advisorNewDetails.firmType ? advisorNewDetails.firmType : '',
            corporateLable: advisorNewDetails.corporateLable ? advisorNewDetails.corporateLable : '',
            website: advisorNewDetails.website ? advisorNewDetails.website : '',
            loading: false,
            disableButton: true
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(
            {
                [name]: value
            },
            () => {
                if (
                    this.props.advisorDetails.displayName != this.state.displayName ||
                    this.props.advisorDetails.firmType != this.state.firmType ||
                    this.props.advisorDetails.website != this.state.website ||
                    this.props.advisorDetails.address1 != this.state.address1 ||
                    this.props.advisorDetails.address2 != this.state.address2 ||
                    this.props.advisorDetails.city != this.state.city ||
                    this.props.advisorDetails.state != this.state.state ||
                    this.props.advisorDetails.pincode != this.state.pincode ||
                    this.props.advisorDetails.aboutme != this.state.aboutme ||
                    this.props.advisorDetails.corporateLable != this.state.corporateLable
                ) {
                    this.setState({ disableButton: false });
                } else {
                    this.setState({ disableButton: true });
                }
            }
        );
    };

    handleCorporateInfo = (e) => {
        e.preventDefault();
        var testDateUtc = moment.utc(this.state.dob);
        var localDate = testDateUtc.local();
        if (
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
                this.props.advisorDetails.aboutme != this.state.aboutme ||
                this.props.advisorDetails.city != this.state.city ||
                this.props.advisorDetails.state != this.state.state ||
                this.props.advisorDetails.firmType != this.state.firmType ||
                this.props.advisorDetails.address1 != this.state.address1 ||
                this.props.advisorDetails.address2 != this.state.address2 ||
                this.props.advisorDetails.displayName != this.state.displayName ||
                this.props.advisorDetails.corporateLable != this.state.corporateLable ||
                this.props.advisorDetails.dob != localDate.format('MM-DD-YYYY') ||
                this.props.advisorDetails.pincode != this.state.pincode ||
                this.props.advisorDetails.website != this.state.website
            ) {
                let options = {
                    name: this.state.name,
                    userName: this.state.userName,
                    emailId: this.state.emailId,
                    phoneNumber: this.state.phoneNumber,
                    panNumber: this.state.panNumber,
                    aboutme: this.state.aboutme,
                    address1: this.state.address1,
                    address2: this.state.address2,
                    advId: this.state.advId,
                    city: this.state.city,
                    displayName: this.state.displayName,
                    dob: localDate.format('MM-DD-YYYY'),
                    pincode: this.state.pincode,
                    state: this.state.state,
                    firmType: this.state.firmType,
                    corporateLable: this.state.corporateLable,
                    website: this.state.website,
                    imagePath: this.state.advisorDetails.imagePath
                };
                this.props.updateCorporateInfo(options);
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
        const { currentRole, loading } = this.state;
        const { advisorDetails } = this.props;
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
                            handleSave={this.handleCorporateInfo}
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
                    <div className={classNames('', { 'col-10 nopadding': !this.props.popup })}>
                        <div className={classNames('', { 'col-12 center-page planning-right row': !this.props.popup })}>
                            {this.props.popup && <h2 className="popup-heading">Corporate Information</h2>}
                            <div className="page-center bg-white">
                                <form className="form">
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">
                                            <label>{corporateMessage.corporateInfoName}</label>
                                            <input className="text-border-pi" name="name" id="name" type="text" onChange={this.handleChange} value={this.state.name} disabled />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>{corporateMessage.corporateUserName}</label>
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
                                            <label>{corporateMessage.corporateInfoPanNumber}</label>
                                            <input
                                                className="text-border-pi uppercase"
                                                name="panNumber"
                                                id="panNumber"
                                                type="text"
                                                onChange={this.handleChange}
                                                value={maskPanNumber(this.state.panNumber)}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>{corporateMessage.corporateInfoMoblie}</label>
                                            <input
                                                className="text-border-pi"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                type="text"
                                                onChange={this.handleChange}
                                                value={maskPhoneNumber(this.state.phoneNumber)}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">
                                            <label>{corporateMessage.corporateInfoEmail}</label>
                                            <input
                                                className="text-border-pi uppercase"
                                                name="emailId"
                                                id="emailId"
                                                type="email"
                                                onChange={this.handleChange}
                                                value={maskEmail(this.state.emailId)}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>{corporateMessage.corporateInfoDisplay}</label>
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
                                            <label>{corporateMessage.corporateInfoFirmType}</label>
                                            <input
                                                className="text-border-pi"
                                                autoComplete="firmtype"
                                                name="firmType"
                                                id="firmType"
                                                type="text"
                                                maxLength={maxLength.content}
                                                onKeyPress={(e) => contentMethod(e)}
                                                onChange={this.handleChange}
                                                value={this.state.firmType}
                                            />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>{corporateMessage.corporateInfoDOB}</label>
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
                                            <label>{corporateMessage.corporateInfoLabel}</label>
                                            <input
                                                className="text-border-pi"
                                                autoComplete="corporatelable"
                                                name="corporateLable"
                                                id="corporateLable"
                                                type="text"
                                                maxLength={maxLength.content}
                                                onKeyPress={(e) => contentMethod(e)}
                                                onChange={this.handleChange}
                                                value={this.state.corporateLable}
                                            />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>{corporateMessage.corporateInfoWebsite}</label>
                                            <input
                                                className="text-border-pi"
                                                autoComplete="website"
                                                name="website"
                                                id="website"
                                                type="text"
                                                maxLength={maxLength.content}
                                                onKeyPress={(e) => websiteMethod(e)}
                                                onChange={this.handleChange}
                                                value={this.state.website}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">
                                            <label>{corporateMessage.corporateInfoAddress1}</label>
                                            <input
                                                className="text-border-pi"
                                                autoComplete="address1"
                                                name="address1"
                                                id="address1"
                                                type="text"
                                                onKeyPress={(e) => addressMethod(e)}
                                                onChange={this.handleChange}
                                                value={this.state.address1}
                                            />
                                        </div>
                                        <div className="col-4 adv-box">
                                            <label>{corporateMessage.corporateInfoAddress2}</label>
                                            <input
                                                className="text-border-pi"
                                                autoComplete="address2"
                                                name="address2"
                                                id="address2"
                                                type="text"
                                                onKeyPress={(e) => addressMethod(e)}
                                                onChange={this.handleChange}
                                                value={this.state.address2}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">{this.renderCity()}</div>
                                        <div className="col-4 adv-box">{this.renderState()}</div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-4 adv-box">{this.renderPinCode()}</div>
                                    </div>
                                    <div className="col-4 adv-box1">
                                        <label>{corporateMessage.corporateInfoAbout}</label>
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
                                {/* <button className="save-btn2" onClick={(e) => this.handlePersonalInformation(e)}>SAVE</button> */}
                            </div>
                        </div>
                        {this.props.popup && !this.state.disableButton && (
                            <div className="popup-save">
                                <button onClick={this.handleCorporateInfo} className="btn btn-primary" disabled={this.state.disableButton}>
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

export default CorporateInformation;
