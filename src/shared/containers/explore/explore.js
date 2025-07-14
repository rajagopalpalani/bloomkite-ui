import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeConstants } from '../../constants/routes';
import Loader from '../../components/common/loader';
import { exploreSelector } from '../../selectors/explore';
import UserSearch from '../../components/explore/userSearch';
import ProductSearch from '../../components/explore/productSearch';
import Tabs from '../../components/explore/tabs';
import User from '../../components/explore/user';
import NoResults from '../../components/explore/noResults';
import Pagination from '../../components/common/pagination';
import { exploreByUser, exploreByUserSuccess, exploreAdvisorByProducts } from '../../actions/explore';
import { fetchAllStateCityPincode, fetchProductList, fetchByAdvisorID } from '../../actions/advisor';
import { fetchByInvestorId } from '../../actions/investor';
import { homeMessage } from '../../constants/homeConstant';

const ITEMS_PER_COUNT = 10;
class Explore extends Component {
    constructor(props) {
        super(props);
        this.search = false;
        this.data = {};
        this.state = {
            currentRole: '',
            displayName: '',
            activeTabIndex: 0,
            pageNumber: 1,
            roleBasedId: ''
        };
    }

    componentDidMount() {
        const { allStateCityPincode, productList } = this.props;
        if (!(allStateCityPincode && allStateCityPincode.length)) {
            this.props.fetchAllStateCityPincode();
        }
        if (!(productList && productList.length)) {
            this.props.fetchProductList();
        }
        const reqBody = {
            ...this.data,
            records: ITEMS_PER_COUNT,
            pageNum: 0
        };
        this.props.exploreByUser(reqBody);
        if (window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'))) {
            const userInfo = window.localStorage.getItem('bloomkiteUsername');
            const { roleBasedId, roleId } = JSON.parse(userInfo) || {};
            let isInvestor = roleId == 2;
            if (isInvestor) {
                this.props.fetchByInvestorId(roleBasedId);
            } else {
                this.props.fetchByAdvisorID(roleBasedId);
            }
            this.setState({ currentRole: roleId, roleBasedId });
        }
    }

    logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    };

    tabChange = (index) => {
        this.search = false;
        //this.props.exploreByUserSuccess();
        this.setState(
            {
                activeTabIndex: index,
                pageNumber: 0
            },
            () => {
                this.data = {};
                const { activeTabIndex } = this.state;
                const reqBody = {
                    records: ITEMS_PER_COUNT,
                    pageNum: 0
                };
                if (activeTabIndex === 0) {
                    this.props.exploreByUser(reqBody);
                } else {
                    this.props.exploreAdvisorByProducts(reqBody);
                }
            }
        );
    };

    pageChangeHandler = (pageNumber) => {
        const { activeTabIndex } = this.state;
        this.setState({ pageNumber }, () => {
            this.search = true;
            const reqBody = {
                ...this.data,
                records: ITEMS_PER_COUNT,
                pageNum: pageNumber - 1
            };
            if (activeTabIndex === 0) {
                this.props.exploreByUser(reqBody);
            } else {
                this.props.exploreAdvisorByProducts(reqBody);
            }
        });
    };

    renderTabs = () => {
        const { activeTabIndex } = this.state;
        return <Tabs activeTabIndex={activeTabIndex} onTabChange={this.tabChange} />;
    };

    searchHandler = (data) => {
        this.search = true;
        this.data = { ...data };
        this.setState({ pageNumber: 0 }, () => {
            const { activeTabIndex } = this.state;
            const reqBody = {
                ...this.data,
                records: ITEMS_PER_COUNT,
                pageNum: 0
            };
            if (activeTabIndex === 0) {
                this.props.exploreByUser(reqBody);
            } else {
                this.props.exploreAdvisorByProducts(reqBody);
            }
        });
    };

    resetHandler = () => {
        this.search = false;
        this.setState({ pageNumber: 0 }, () => {
            this.data = {};
            const { activeTabIndex } = this.state;
            const reqBody = {
                records: ITEMS_PER_COUNT,
                pageNum: 0
            };
            if (activeTabIndex === 0) {
                this.props.exploreByUser(reqBody);
            } else {
                this.props.exploreAdvisorByProducts(reqBody);
            }
        });
    };

    userClickHandler = (user) => {
        const { userName } = user;
        const url = routeConstants.CORPORTATE_PROFILE.replace(':corporateId', userName);
        this.props.history.push(url);
    };

    profileHandler = (advId) => {
        const url = routeConstants.CORPORTATE_PROFILE.replace(':corporateId', advId);
        this.props.history.push(url);
    };

    renderUsers = () => {
        const { users } = this.props;
        const message = !this.search ? 'Explore Users' : '';
        return (
            <div className="explore-user-list row form-group col-md-12">
                {users ? (
                    users.map((item, i) => {
                        const { imagePath, phoneNumber, emailId, state, city, pincode, displayName } = item;
                        const location = `${city ? `${city}, ` : ''}${state ? `${state}, ` : ''}${pincode || ''}`;
                        return (
                            <ul key={`user-${i}`} className="explore-user list-group col-md-6">
                                <User
                                    details={{
                                        displayName,
                                        image: imagePath,
                                        phoneNumber,
                                        email: emailId,
                                        location
                                    }}
                                    handleUser={() => this.userClickHandler(item)}
                                />
                            </ul>
                        );
                    })
                ) : (
                    <NoResults message={message} />
                )}
            </div>
        );
    };

    renderUserSearch = () => {
        const { allStateCityPincode, totalRecords } = this.props;
        return (
            <div className="explore-user-search-container explore-usersearch">
                <UserSearch
                    list={allStateCityPincode}
                    onSearch={this.searchHandler}
                    onReset={this.resetHandler}
                    totalRecords={totalRecords}
                    advisorDetails={this.props.advisorDetails}
                />
                {this.renderUsers()}
                {this.renderPagination(totalRecords)}
            </div>
        );
    };

    renderProductSearch = () => {
        const { productList, totalRecords, advisorDetails } = this.props;
        return (
            <div className="explore-user-search-container explore-usersearch">
                <ProductSearch list={productList} onSearch={this.searchHandler} onReset={this.resetHandler} totalRecords={totalRecords} advisorDetails={advisorDetails} />
                {this.renderUsers()}
                {this.renderPagination(totalRecords)}
            </div>
        );
    };

    renderPagination = (totalItemsCount) => {
        const { pageNumber } = this.state;
        return (
            <div className="explore-pagination">
                {ITEMS_PER_COUNT < totalItemsCount && (
                    <Pagination
                        activePage={pageNumber}
                        itemsCountPerPage={ITEMS_PER_COUNT}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={5}
                        onPageChange={this.pageChangeHandler}
                    />
                )}
            </div>
        );
    };

    render() {
        const { isLoading } = this.props;
        const { activeTabIndex, roleBasedId } = this.state;
        return (
            <React.Fragment>
                <div className="explore-design">
                    <div className={roleBasedId ? 'app-container main-container pt-1' : 'container main-container pt-1'}>
                        <h1 className="heading">{homeMessage.exploreHeader}</h1>
                        {
                            //this.renderTabs()
                        }
                        {activeTabIndex === 0 && this.renderUserSearch()}
                        {activeTabIndex === 1 && this.renderProductSearch()}
                    </div>
                </div>
                <Loader loading={isLoading} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => exploreSelector(state);

const mapDispatchToProps = (dispatch) => {
    return {
        exploreByUser: bindActionCreators(exploreByUser, dispatch),
        exploreByUserSuccess: bindActionCreators(exploreByUserSuccess, dispatch),
        exploreAdvisorByProducts: bindActionCreators(exploreAdvisorByProducts, dispatch),
        fetchAllStateCityPincode: bindActionCreators(fetchAllStateCityPincode, dispatch),
        fetchProductList: bindActionCreators(fetchProductList, dispatch),
        fetchByAdvisorID: bindActionCreators(fetchByAdvisorID, dispatch),
        fetchByInvestorId: bindActionCreators(fetchByInvestorId, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
