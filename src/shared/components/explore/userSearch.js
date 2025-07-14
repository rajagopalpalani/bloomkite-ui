import React from 'react';
import SearchDropdown from '../common/searchDropdown';
import { homeMessage } from '../../constants/homeConstant';

class UserSearch extends React.Component {
    constructor(props) {
        super(props);
        this.allList = {};
        this.state = {
            stateList: [],
            city: '',
            state: '',
            pinCode: '',
            displayName: ''
        };
    }

    componentDidMount() {
        const { list } = this.props;
        if (list) {
            this.formatState();
        }
    }

    componentDidUpdate(prevProps) {
        const { list: prevList = [] } = prevProps;
        const { list = [] } = this.props;
        if (list && prevList && prevList.length !== list.length) {
            this.formatState();
        }
    }

    formatState = () => {
        const { list } = this.props;
        let states = [];
        this.allList = {};
        list.forEach((item) => {
            let cityList = [];
            let pinCodes = {};
            const { state, cities } = item;
            states = [...states, { value: state, name: state }];
            cities.forEach((obj) => {
                const { city, pincodes } = obj;
                cityList = [...cityList, { value: city, name: city }];
                pinCodes = {
                    ...pinCodes,
                    [city]: pincodes.map((item) => ({ value: item, name: item }))
                };
            });
            this.allList = {
                ...this.allList,
                [state]: {
                    cities: cityList,
                    pinCodes
                }
            };
        });
        this.setState({ stateList: states });
    };

    stateChangeHandler = (e) => {
        const {
            target: { value }
        } = e;
        this.setState({ state: value, pinCode: '', city: '' });
    };

    stateSearchChangeHandler = (value) => {
        let e = {
            target: {
                value
            }
        };
        this.stateChangeHandler(e);
    };

    cityChangeHandler = (e) => {
        const {
            target: { value }
        } = e;
        const { state } = this.state;
        const pinCodeList = this.allList[state] && this.allList[state].pinCodes[value] ? this.allList[state].pinCodes[value] : [];
        let pinCode = pinCodeList.length == 1 ? pinCodeList[0].value : '';
        this.setState({ city: value, pinCode });
    };

    citySearchChangeHandler = (value) => {
        let e = {
            target: {
                value
            }
        };
        this.cityChangeHandler(e);
    };

    pinCodeChangeHandler = (e) => {
        const {
            target: { value }
        } = e;
        this.setState({ pinCode: value });
    };

    pinCodeSearchChangeHandler = (value) => {
        let e = {
            target: {
                value
            }
        };
        this.pinCodeChangeHandler(e);
    };

    displayNameChangeHandler = (e) => {
        const {
            target: { value }
        } = e;
        this.setState({ displayName: value });
    };

    searchHandler = () => {
        const { state, pinCode, city, displayName } = this.state;
        this.props.onSearch({
            sortByCity: city,
            sortByState: state,
            sortByPincode: pinCode,
            sortByDisplayName: displayName
        });
    };

    resetHandler = () => {
        this.setState({
            city: '',
            state: '',
            pinCode: '',
            displayName: ''
        });
        this.props.onReset();
    };

    renderState = () => {
        const { state, stateList } = this.state;
        return (
            <div className="explore-user-search-input">
                <SearchDropdown
                    data={stateList}
                    search={true}
                    emptyMessage={'Not Found'}
                    placeholder={'Choose State'}
                    autoComplete={'statelist'}
                    onChange={this.stateSearchChangeHandler}
                    value={state}
                />
            </div>
        );
    };

    renderCity = () => {
        const { city, state } = this.state;
        const cityList = this.allList[state] ? this.allList[state].cities : [];
        return (
            <div className="explore-user-search-input">
                <SearchDropdown
                    data={cityList}
                    search={true}
                    emptyMessage={'Not Found'}
                    placeholder={'Choose City'}
                    autoComplete={'citylist'}
                    onChange={this.citySearchChangeHandler}
                    value={city}
                />
            </div>
        );
    };

    renderPinCode = () => {
        const { pinCode, state, city } = this.state;
        const pinCodeList = this.allList[state] && this.allList[state].pinCodes[city] ? this.allList[state].pinCodes[city] : [];
        return (
            <div className="explore-user-search-input">
                <SearchDropdown
                    data={pinCodeList}
                    search={true}
                    emptyMessage={'Not Found'}
                    placeholder={'Choose Pincode'}
                    onChange={this.pinCodeSearchChangeHandler}
                    value={pinCode}
                    autoComplete={'pincode'}
                />
            </div>
        );
    };

    renderDisplayName = () => {
        const { displayName } = this.state;
        return (
            <div className="explore-user-search-input">
                <input placeholder="Display Name" className="form-control" type="text" value={displayName} onChange={this.displayNameChangeHandler} />
            </div>
        );
    };

    renderButtons = () => {
        const { state, city, pinCode, displayName } = this.state;
        const isDisabled = !(state || city || pinCode || displayName);
        return (
            <div className="explore-user-search-control">
                <button className="btn btn-primary" onClick={this.searchHandler} disabled={isDisabled}>
                    Search
                </button>
                <button className="btn btn-secondary" onClick={this.resetHandler} disabled={isDisabled}>
                    Reset
                </button>
            </div>
        );
    };

    render() {
        const { advisorDetails, totalRecords } = this.props;

        return (
            <>
                {(totalRecords > 10 || advisorDetails.name) && (
                    <div className="explore-user-search">
                        {this.renderState()}
                        {this.renderCity()}
                        {this.renderPinCode()}
                        {this.renderDisplayName()}
                        {this.renderButtons()}
                    </div>
                )}
            </>
        );
    }
}

export default UserSearch;
