import React from 'react';
import ProfileHeader from '../../profileHeader';
import AdvisorLeftbar from '../advisorLeftbar';
import Loader from '../../common/loader';
import { toastrError } from '../../../helpers/toastrHelper';

import { toastrMessage } from '../../../constants/toastrMessage';
import { advisorMessage } from '../../../constants/advisorConstant';
import PublishPopup from '../../Contact/publishPopup';

class BrandTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advId: '',
            brandInfoReqList: [
                {
                    prodId: 0,
                    services: [
                        {
                            serviceId: 0,
                            brandId1: 0,
                            brandId2: 0,
                            brandId3: 0
                        }
                    ]
                }
            ],
            loading: false,
            disableButton: true,
            openPopup:false
        };
    }
    
    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    componentDidMount() {
        this.setState({ advisorDetails: this.props.advisorDetails, currentTab: this.props.currentTab });
        this.updateCurrentInformation(this.props.advisorDetails);
    }
    
    updateCurrentInformation = (advisorDetails) => {
        let advisorNewDetails = JSON.parse(JSON.stringify(advisorDetails));
        let advisorOriginalAwardDetails = {
            brandInfoReqList: advisorNewDetails.brandInfoReqList
        };
        let products = advisorNewDetails.advProducts;
        let brandDetails = advisorNewDetails.advBrandInfo && advisorNewDetails.advBrandInfo.length > 0 ? advisorNewDetails.advBrandInfo : [];
        let advBrandProducts = [];
        products.map((product) => {
            let selectedProduct = {};
            let prodIdAvailable = advBrandProducts.findIndex((a) => product.prodId == a.prodId);
            let brandsAvailable = this.props.productList.find((a) => product.prodId == a.prodId && a);
            if (prodIdAvailable == -1 && brandsAvailable && brandsAvailable.brands.length > 0) {
                selectedProduct.prodId = product.prodId;
                selectedProduct.services = [];
                let serviceListIds = product.serviceId && product.serviceId.split(',');
                serviceListIds.map((serviceListId) => {
                    let singleService = {
                        serviceId: serviceListId,
                        brandId1: 0,
                        brandId2: 0,
                        brandId3: 0,
                        brandsList1: JSON.parse(JSON.stringify(brandsAvailable.brands)),
                        brandsList2: [],
                        brandsList3: []
                    };
                    selectedProduct.services.push(singleService);
                });
            }
            if (selectedProduct.prodId) {
                advBrandProducts.push(selectedProduct);
            }
        });
        brandDetails &&
            brandDetails.length > 0 &&
            brandDetails.map((brand) => {
                advBrandProducts.forEach((advProduct) => {
                    if (brand.prodId == advProduct.prodId) {
                        advProduct.services.forEach((service) => {
                            if (brand.serviceId == service.serviceId && brand.priority == 1) {
                                service.brandId1 = brand.brandId;
                                let brandsList2 = JSON.parse(JSON.stringify(service['brandsList1']));
                                let brandId2RemoveId = brandsList2.findIndex((a) => brand.brandId == a.brandId);
                                brandsList2.splice(brandId2RemoveId, 1);
                                service.brandsList2 = brandsList2;
                            }
                            if (brand.serviceId == service.serviceId && brand.priority == 2) {
                                service.brandId2 = brand.brandId;
                                let brandsList3 = JSON.parse(JSON.stringify(service['brandsList2']));
                                let brandId3RemoveId = brandsList3.findIndex((a) => brand.brandId == a.brandId);
                                brandsList3.splice(brandId3RemoveId, 1);
                                service.brandsList3 = brandsList3;
                            }
                            if (brand.serviceId == service.serviceId && brand.priority == 3) {
                                service.brandId3 = brand.brandId;
                            }
                        });
                    }
                });
            });
        this.setState({ advBrandProducts, loading: false, advisorOriginalAwardDetails, disableButton: true });
    };

    jsonCompare = () => {
        let currentAwardDetails = {
            brandInfoReqList: this.state.brandInfoReqList
        };
        return JSON.stringify(this.state.advisorOriginalAwardDetails) == JSON.stringify(currentAwardDetails);
    };

    handleBrandTagChange = (e, prodIndex, serviceIndex) => {
        const { name, value } = e.target;

        let advBrandProducts = [...this.state.advBrandProducts];
        if (advBrandProducts.length > 0) {
            advBrandProducts[prodIndex].services[serviceIndex][name] = value || '';
            if (name == 'brandId1') {
                advBrandProducts[prodIndex].services[serviceIndex]['brandId2'] = '0';
                advBrandProducts[prodIndex].services[serviceIndex]['brandId3'] = '0';
                let brandsList2 = JSON.parse(JSON.stringify(advBrandProducts[prodIndex].services[serviceIndex]['brandsList1']));
                let brandId2RemoveId = brandsList2.findIndex((a) => value == a.brandId);
                brandsList2.splice(brandId2RemoveId, 1);
                advBrandProducts[prodIndex].services[serviceIndex]['brandsList2'] = brandsList2;
                advBrandProducts[prodIndex].services[serviceIndex]['brandsList3'] = [];
            }
            if (name == 'brandId2') {
                advBrandProducts[prodIndex].services[serviceIndex]['brandId3'] = '0';
                let brandsList3 = JSON.parse(JSON.stringify(advBrandProducts[prodIndex].services[serviceIndex]['brandsList2']));
                let brandId3RemoveId = brandsList3.findIndex((a) => value == a.brandId);
                brandsList3.splice(brandId3RemoveId, 1);
                advBrandProducts[prodIndex].services[serviceIndex]['brandsList3'] = brandsList3;
            }
        }
        let disableButton = this.jsonCompare();
        this.setState({ advBrandProducts, disableButton });
    };

    handleBrandTag = (e) => {
        e.preventDefault();
        if (!this.state.disableButton) {
            let brandInfoReqList = [];
            this.state.advBrandProducts.map((advBrandProduct) => {
                advBrandProduct.services.map((service) => {
                    let brandInfo = {
                        brandId1: service.brandId1,
                        brandId2: service.brandId2,
                        brandId3: service.brandId3,
                        prodId: advBrandProduct.prodId,
                        serviceId: service.serviceId
                    };
                    brandInfoReqList.push(brandInfo);
                });
            });
            if (this.state.advBrandProducts && this.state.advBrandProducts.length > 0) {
                let showBrandError = false;
                this.state.advBrandProducts.map((advBrandProduct) => {
                    advBrandProduct.services.map((service) => {
                        if (service.brandId1 == '') {
                            showBrandError = true;
                        }
                        if (service.brandId1 == '0') {
                            showBrandError = true;
                        }
                    });
                });
                if (showBrandError) {
                    toastrError('Kindly choose minimum one brand');
                    return false;
                }
            }
            let options = {
                advId: this.state.advisorDetails.advId,
                brandInfoReqList: brandInfoReqList
            };
            this.props.addAdvBrandInfo(options);
            this.setState({ loading: true, disableButton: true });
            this.onOpenModal();
        }
    };

    render() {
        const advBrandProducts = this.state.advBrandProducts;
        let self = this;
        const { advisorDetails,loading } = this.props;
        const { userName } = advisorDetails || {};
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        name={this.props.advisorDetails.displayName || (this.props.advisorDetails && this.props.advisorDetails.name)}
                        location={this.props.advisorDetails && this.props.advisorDetails.city}
                        designation={this.props.advisorDetails.designation}
                        handleSave={this.handleBrandTag}
                        showSaveButton={true}
                        disableButton={this.state.disableButton}
                        onPublish={this.props.onPublish}
                        advisorDetails={this.props.advisorDetails}
                        publicAdvisorDetails={this.props.publicAdvisorDetails}
                    />
                </div>
                {this.props.advisorDetails.workFlowStatus == 4  && !loading &&  <PublishPopup openPopup={this.state.openPopup} showCloseIcon={true} onCloseModal={this.onCloseModal}></PublishPopup>}
                <div className="row col-12 advisor-gap">
                    <AdvisorLeftbar
                        userName={userName}
                        handleTabChange={this.props.handleTabChange}
                        currentTab={this.props.currentTab}
                        showBrandTag={this.props.showBrandTag}
                        parentPartyId={this.props.advisorDetails.parentPartyId != 0 ? this.props.advisorDetails.parentPartyId : ''}
                    />
                    <div className="col-10 nopadding">
                        <div className="col-12 center-page planning-right row" >
                            <div className="page-center bg-white">
                                <form className="form">
                                    {advBrandProducts &&
                                        advBrandProducts.length > 0 &&
                                        advBrandProducts.map((advBrandProduct, index) => {
                                            let showProductAvailable = this.props.productList.find((a) => advBrandProduct.prodId == a.prodId && a);
                                            let showServices = (service, serviceIndex, prodIndex) => {
                                                let showServiceID = this.props.serviceList.find((c) => service.serviceId == c.serviceId && c);
                                                return (
                                                    <div className="form-group row nomargin nopadding paddingBottom" key={'brand-product-' + serviceIndex + prodIndex}>
                                                        <div className="col-3">
                                                            <label className="subtitle-content">{showServiceID.service}</label>
                                                        </div>
                                                        <div className="col-3 brand-list-align">
                                                            <select
                                                                className="text-border-pi brand-width"
                                                                name="brandId1"
                                                                value={service.brandId1}
                                                                onChange={(e) => self.handleBrandTagChange(e, prodIndex, serviceIndex)}
                                                                >
                                                                <option value="0">{advisorMessage.brandTag1}</option>
                                                                {service.brandsList1.map((brand) => {
                                                                    return (
                                                                        <option key={'brand-' + brand.brandId} value={brand.brandId}>
                                                                            {brand.brand}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="col-3 brand-list-align">
                                                            <select
                                                                className="text-border-pi brand-width"
                                                                name="brandId2"
                                                                value={service.brandId2}
                                                                onChange={(e) => self.handleBrandTagChange(e, prodIndex, serviceIndex)}
                                                                >
                                                                <option value="0">{advisorMessage.brandTag2}</option>
                                                                {service.brandsList2.map((brand) => {
                                                                    return (
                                                                        <option key={'brand-' + brand.brandId} value={brand.brandId}>
                                                                            {brand.brand}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="col-3 brand-list-align">
                                                            <select
                                                                className="text-border-pi brand-width"
                                                                name="brandId3"
                                                                value={service.brandId3}
                                                                onChange={(e) => self.handleBrandTagChange(e, prodIndex, serviceIndex)}
                                                                >
                                                                <option value="0">{advisorMessage.brandTag3}</option>
                                                                {service.brandsList3.map((brand) => {
                                                                    return (
                                                                        <option key={'brand-' + brand.brandId} value={brand.brandId}>
                                                                            {brand.brand}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                );
                                            };
                                            // let showServicesIds = advBrandProduct.serviceId.split(',');
                                            return (
                                                showProductAvailable.brands &&
                                                showProductAvailable.brands.length > 0 && (
                                                    <React.Fragment key={'product-brand-' + index}>
                                                        <div className="form-group row nomargin nopadding">
                                                            <div className="col-3">
                                                                <h4 className="header-style">{showProductAvailable.product}</h4>
                                                            </div>
                                                            {index == 0 && (
                                                                <>
                                                                    <div className="col-3"></div>
                                                                    <div className="col-3"></div>
                                                                    <div className="col-3"></div>
                                                                </>
                                                            )}
                                                        </div>
                                                        {advBrandProduct.services &&
                                                            advBrandProduct.services.length > 0 &&
                                                            advBrandProduct.services.map((service, sindex) => {
                                                                return showServices(service, sindex, index);
                                                            })}
                                                    </React.Fragment>
                                                )
                                            );
                                        })}
                                </form>
                                <div className="brand-btn">
                                    {/* <button className="cancel-Btn">CANCEL</button> */}
                                    {/* <button className="save-Btn" onClick={(e) => this.handleBrandTag(e)}>SAVE</button> */}
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

export default BrandTag;
