import React from 'react';
import ReactStars from 'react-rating-stars-component';
import ProfileHeader from '../../profileHeader';
import InvestorLeftbar from '../investorLeftbar';
import FontIcon from '../../common/fontAwesomeIcon';
import Loader from '../../common/loader';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

class Area extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            investorDetails: this.props.investorDetails,
            prodId: 0,
            interestId: 0,
            invId: '',
            scale: '',
            render: false,
            currentTab: 0,
            loading: false,
            productList: [],
            initialProductList: [],
            disableButton: true
        };
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.investorDetails) != JSON.stringify(oldProps.investorDetails) || this.state.currentTab != this.props.currentTab) {
            this.setState({ investorDetails: this.props.investorDetails, currentTab: this.props.currentTab });
            this.updateCurrentInformation(this.props.investorDetails, this.props.productList);
        }
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
        }
    }

    ratingChanged = (newRating, products) => {
        let productList = JSON.parse(JSON.stringify(this.state.productList));
        let productScaleId = productList.findIndex((a) => a.prodId == products.prodId);
        let disableButton = true;
        productList[productScaleId]['scale'] = newRating;
        if (JSON.stringify(this.state.initialProductList) != JSON.stringify(productList)) {
            disableButton = false;
        }
        this.setState({ productList, disableButton });
    };

    handleArea = (e) => {
        e.preventDefault();
        if (!this.state.disableButton) {
            let productScaleList = [];
            this.state.productList &&
                this.state.productList.length > 0 &&
                this.state.productList.map((sProd) => {
                    let singleProduct = {
                        prodId: sProd.prodId,
                        scale: sProd.scale
                    };
                    if (sProd.interestId) {
                        singleProduct.interestId = sProd.interestId;
                    }
                    if (sProd.scale) {
                        productScaleList.push(singleProduct);
                    }
                });
            let options = {
                invId: this.props.investorDetails.invId,
                invInterestReq: productScaleList
            };
            this.props.addInvInterest(options);
            this.setState({ loading: true });
            this.setState({ disableButton: true });
        }
    };

    componentDidMount() {
        this.setState({ investorDetails: this.props.investorDetails, currentTab: this.props.currentTab, productList: this.props.productList });
        this.updateCurrentInformation(this.props.investorDetails, this.props.productList);
    }

    updateCurrentInformation = (investorDetails, productList) => {
        let investorNewDetails = JSON.parse(JSON.stringify(investorDetails));
        let productUpdateList = JSON.parse(JSON.stringify(productList));
        investorNewDetails &&
            investorNewDetails.invInterest.map((invInt) => {
                let productScaleId = productUpdateList.findIndex((a) => a.prodId == invInt.prodId);
                productUpdateList[productScaleId]['scale'] = invInt.scale;
                productUpdateList[productScaleId]['interestId'] = invInt.interestId;
            });
        this.setState({ productList: productUpdateList, initialProductList: productUpdateList, loading: false, disableButton: true });
    };

    groupBy = (objectArray, property) => {
        return objectArray.reduce(function (acc, obj) {
            let key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    };

    render() {
        const { productList } = this.state;
        let productSortedList = productList.sort((a, b) => a.product > b.product && 1 || -1);
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        name={this.props.investorDetails && this.props.investorDetails.fullName}
                        handleSave={this.handleArea}
                        showSaveButton={true}
                        disableButton={this.state.disableButton}
                        investorDetails={this.props.investorDetails}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <InvestorLeftbar handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} />
                    <div className="col-10 nopadding">
                        <div className="col-12 center-page planning-right row">
                            <div className="col-12 page-center bg-white">
                                <div className="row">
                                    <div className=" box-area">
                                        <ul className="area-log">
                                            {productSortedList.map((prod, valueIndex) => {
                                                return (
                                                    <li key={'product-' + valueIndex} className="member-details col-12 row">
                                                        <div className="area-title col-6">{prod.product}</div>
                                                        <div className="col-6">
                                                            <ReactStars
                                                                count={3}
                                                                value={prod.scale ? parseInt(prod.scale) : 0}
                                                                onChange={(ratings) => this.ratingChanged(ratings, prod)}
                                                                size={24}
                                                                emptyIcon={<FontIcon icon={faCircle} />}
                                                                fullIcon={<FontIcon icon={faCircle} />}
                                                                activeColor="#251534"
                                                            />
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    {/* <button className="save-btn2" onClick={(e) => this.handleArea(e)}>SAVE</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Loader loading={this.props.loading} />
            </div>
        );
    }
}

export default Area;
