import React from 'react';
import { advisorSelector } from '../../../selectors/advisor';
import { connect } from 'react-redux';
import ProfileHeader from '../../profileHeader';
import CorporateLeftbar from '../corporateLeftbar';
import DatePicker from 'react-datepicker';
import moment, { formatDate, parseDate } from 'moment';
import { Tabs, Tab } from 'react-bootstrap';
import Loader from '../../common/loader';
import { licenseMethod, contentMethod, maxLength } from '../../../constants/commonRules';
import CheckBox from '../../common/checkBox';
import { toastrError } from '../../../helpers/toastrHelper';
import CustomDatePicker from '../../common/datePicker';
import { toastrMessage } from '../../../constants/toastrMessage';
import { corporateMessage } from '../../../constants/corporateConstant';
import MultiSelect from '../../common/multiSelect';
import PublishPopup from '../../Contact/publishPopup';
import PopUp from '../../popup';
import FontIcon from '../../common/fontAwesomeIcon';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

class ProductService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advId: '',
            advProducts: [],
            productList: [],
            serviceList: [],
            remunerationList: [],
            licenseList: [],
            tabKey: '1',
            loading: false,
            showBrandTag: false,

            isTabOpened: false,
            disableButton: true,
            productIndex: '',
            openPopup: false
        };
    }

    handleTabChange = (index) => {
        this.props.handleTabChange(index);
    };
    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.advisorDetails) != JSON.stringify(oldProps.advisorDetails)) {
            this.setState({
                advisorDetails: this.props.advisorDetails,
                currentTab: this.props.currentTab,
                serviceList: this.props.serviceList,
                remunerationList: this.props.remunerationList,
                licenseList: this.props.licenseList
            });
            this.updateCurrentInformation(this.props.advisorDetails);
        }
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
        }
    }

    componentDidMount() {
        this.setState({
            advisorDetails: this.props.advisorDetails,
            currentTab: this.props.currentTab,
            productList: this.props.productList,
            serviceList: this.props.serviceList,
            remunerationList: this.props.remunerationList,
            licenseList: this.props.licenseList
        });
        this.updateCurrentInformation(this.props.advisorDetails);
    }

    updateCurrentInformation = (advisorDetails) => {
        let advisorNewDetails = JSON.parse(JSON.stringify(advisorDetails));
        let advisorOriginalAwardDetails = {
            advProducts: advisorDetails.advProducts
        };
        advisorNewDetails.advProducts.forEach((advProduct, index) => {
            let productList = this.props.productList && JSON.parse(JSON.stringify(this.props.productList));
            if (index != 0) {
                for (let i = 1; i <= index; i++) {
                    let productAvailable = productList.findIndex((a) => a.prodId == advisorNewDetails.advProducts[i - 1].prodId);
                    productList.splice(productAvailable, 1);
                }
            }
            advProduct.showProducts = productList;
            this.props.productList &&
                this.props.productList.map((product) => {
                    if (product.prodId == advProduct.prodId) {
                        advProduct.services = product.services;
                    }
                });
            let licenceList = [];
            this.props.licenseList.map((licence) => {
                if (licence.prodId == advProduct.prodId) {
                    licenceList.push(licence);
                }
            });
            advProduct.licences = licenceList;
            let license = this.props.licenseList.find((a) => a.licId == advProduct.licId && a);
            advProduct.issuedBy = license.issuedBy;
        });
        this.setState({
            advProducts: advisorNewDetails.advProducts.length > 0 ? advisorNewDetails.advProducts : [],
            loading: false,
            advisorOriginalAwardDetails,
            disableButton: true
        });
    };

    handleAddAdvProducts = () => {
        if (!this.state.isTabOpened) {
            let newInput = {
                licId: 0,
                licImage: '',
                licNumber: '',
                prodId: 0,
                remId: 0,
                serviceId: 0,
                issuedBy: '',
                validity: ''
            };
            let showProductsList = this.state.productList;
            let showingProducts = [];
            let alreadySelectedList = this.state.advProducts;
            showProductsList.map((showProduct, showIndex) => {
                let showProductAvailable = alreadySelectedList.findIndex((a) => showProduct.prodId == a.prodId);
                if (showProductAvailable == -1) {
                    showingProducts.push(showProduct);
                }
            });
            newInput.showProducts = showingProducts;
            this.setState((prevState) => ({
                advProducts: prevState.advProducts.concat([newInput]),
                tabKey: (parseInt(alreadySelectedList.length) + 1).toString(),
                isTabOpened: true
            }));
        } else {
            toastrError(toastrMessage.emptyError);
        }
        this.setState({ isTabOpened: true });
    };

    handleAdvProductsText = (e, i, dateProduct) => {
        let name, value;
        if (e) {
            name = e.target.name;
            value = e.target.value;
        }
        let advProducts = [...this.state.advProducts];
        let testDateUtc, localDate;
        if (dateProduct) {
            testDateUtc = moment.utc(dateProduct);
            localDate = testDateUtc.local();
            name = 'validity';
            value = localDate.format('MM-DD-YYYY');
        }
        if (advProducts.length > 0) {
            advProducts[i][name] = value || '';
        }
        if (name == 'prodId') {
            this.state.productList.map((product) => {
                if (product.prodId == value) {
                    advProducts[i].services = product.services;
                    let advLicence = [];
                    this.state.licenseList.map((licence) => {
                        if (licence.prodId == value) {
                            advLicence.push(licence);
                        }
                    });
                    advProducts[i]['licences'] = advLicence;
                }
            });
            advProducts[i]['licNumber'] = '';
            advProducts[i]['licId'] = '';
            advProducts[i]['issuedBy'] = '';
            advProducts[i]['serviceId'] = '';
            advProducts[i]['validity'] = '';
            advProducts[i]['remId'] = '';
        }
        if (name == 'licId') {
            this.state.licenseList.map((license) => {
                if (license.licId == value) {
                    advProducts[i]['issuedBy'] = license.issuedBy;
                }
            });
        }
        if (name == 'serviceId') {
            const services = value.length ? value.join(',') : '';
            advProducts[i]['serviceId'] = services;
        }
        let isTabOpened = true;
        if (advProducts.length > 0) {
            isTabOpened = !(
                advProducts[i].licNumber != '' &&
                advProducts[i].issuedBy != '' &&
                advProducts[i].validity != '' &&
                advProducts[i].licId != '' &&
                advProducts[i].prodId != '' &&
                advProducts[i].serviceId != '' &&
                advProducts[i].remId != ''
            );
        }
        this.setState({ advProducts, isTabOpened }, () => {
            this.handleDisableButton();
        });
    };

    onSelect = (selectedItem, index) => {
        let e = {
            target: {
                name: 'serviceId',
                value: selectedItem
            }
        };
        this.handleAdvProductsText(e, index);
    };

    onRemove = (selectedItem, index) => {
        let e = {
            target: {
                name: 'serviceId',
                value: selectedItem
            }
        };
        this.handleAdvProductsText(e, index);
    };

    handleAdvProductsDelete = (e, i) => {
        e.preventDefault();
        let advProducts = [...this.state.advProducts.slice(0, i), ...this.state.advProducts.slice(i + 1)];
        const prevTabKey = String(Number(this.state.tabKey) - 1 || 1);
        this.setState({ advProducts, isTabOpened: false, tabKey: prevTabKey }, () => {
            this.handleDisableButton();
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleDisableButton = () => {
        let disableButton = false;
        let currentAwardDetails = {
            advProducts: this.state.advProducts
        };
        disableButton = JSON.stringify(this.state.advisorOriginalAwardDetails) == JSON.stringify(currentAwardDetails);
        this.setState({ disableButton });
    };

    handleProductService = (e) => {
        e.preventDefault();
        if (!this.state.disableButton) {
            let advProducts = [];
            if (this.state.advProducts.length > 0) {
                let showProductsError = false;
                this.state.advProducts.forEach((advProduct) => {
                    if (
                        advProduct.licId == '' ||
                        advProduct.licNumber.trim() == '' ||
                        advProduct.licNumber == '' ||
                        advProduct.prodId == '' ||
                        advProduct.remId == '' ||
                        advProduct.serviceId == '' ||
                        advProduct.issuedBy.trim() == '' ||
                        advProduct.validity.trim() == ''
                    ) {
                        showProductsError = true;
                    }
                });
                if (showProductsError) {
                    toastrError(toastrMessage.emptyProduct);
                    return false;
                }
            }
            this.state.advProducts.map((advP) => {
                let advProduct = {
                    licId: advP.licId,
                    licImage: advP.licImage,
                    licNumber: advP.licNumber,
                    prodId: advP.prodId,
                    remId: advP.remId,
                    serviceId: advP.serviceId,
                    issuedBy: advP.issuedBy,
                    validity: advP.validity
                };
                if (advP.advProdId) {
                    advProduct.advProdId = advP.advProdId;
                }
                advProducts.push(advProduct);
            });
            let options = {
                advId: this.state.advisorDetails.advId,
                advProducts: advProducts
            };
            if (this.state.advProducts && this.state.advProducts.length > 0 && !this.state.advProducts[0].advProdId) {
                this.props.updateProdInformation(options);
            } else {
                this.props.updateProdInformation(options);
            }
            this.setState({ loading: true, isTabOpened: false });
            this.onOpenModal();
        }
    };

    showProducts = (index, productList) => {
        return (
            productList &&
            productList.length > 0 &&
            productList.map((product) => {
                return (
                    <option key={`products-${index}-${product.prodId}`} value={product.prodId}>
                        {product.product}
                    </option>
                );
            })
        );
    };

    showServices = (index, servicesList) => {
        return (
            servicesList &&
            servicesList.length > 0 &&
            servicesList.map((service) => {
                return (
                    <option key={`services-${index}-${service.serviceId}`} value={service.serviceId}>
                        {service.service}
                    </option>
                );
            })
        );
    };

    showRemuneration = (index, remunerationList) => {
        return (
            remunerationList &&
            remunerationList.length > 0 &&
            remunerationList.map((remuneration) => {
                return (
                    <option key={`remuneration-${index}-${remuneration.remId}`} value={remuneration.remId}>
                        {remuneration.remuneration}
                    </option>
                );
            })
        );
    };

    showLicense = (index, licenseList) => {
        return (
            licenseList &&
            licenseList.length > 0 &&
            licenseList.map((license) => {
                return (
                    <option key={`license-${index}-${license.licId}`} value={license.licId}>
                        {license.license}
                    </option>
                );
            })
        );
    };

    onChange = (name, value) => {
        this.setState({ [name]: value });
    };

    // handleAllChecked = (event, services) => {
    //   let servicesList = services;
    //   servicesList.forEach(service => service.isChecked = event.target.checked);
    //   let e = {
    //     target: {
    //       name: 'serviceId',
    //       value: selectedItem
    //     }
    //   };
    //   this.handleAdvProductsText(e, index);
    //   this.setState({ fruites: fruites })
    // }

    // handleCheckChieldElement = (event) => {
    //   let fruites = this.state.fruites
    //   fruites.forEach(fruite => {
    //     if (fruite.value === event.target.value)
    //       fruite.isChecked = event.target.checked
    //   })
    //   this.setState({ fruites: fruites })
    // }

    renderMultiSelect = (options, values, index) => {
        const optionsList = options
            ? options.map((item) => {
                  const { serviceId, service } = item;
                  return { label: service, value: serviceId };
              })
            : [];
        const selectedValues = values ? values.map((item) => item.serviceId) : [];
        return (
            <MultiSelect
                id={`product-services-${index}`}
                key={`product-services-${index}`}
                className="serviceAlign"
                options={optionsList}
                values={selectedValues}
                onChange={(selectedItem) => this.onSelect(selectedItem, index)}
                displayValue="service"
            />
        );
    };

    render() {
        const { tabKey } = this.state;
        const { loading } = this.props;
        let curDate = new Date();
        curDate.setFullYear(curDate.getFullYear() + 15);
        return (
            <div>
                {!this.props.popup && (
                    <div className="col-12">
                        <ProfileHeader
                            name={this.props.advisorDetails.displayName || (this.props.advisorDetails && this.props.advisorDetails.name)}
                            location={this.props.advisorDetails && this.props.advisorDetails.city}
                            designation={this.props.advisorDetails.designation}
                            handleSave={this.handleProductService}
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
                            {this.props.popup && <h2 className="popup-heading">Products and Services</h2>}
                            <div className="page-center bg-white">
                                <form className="form" id="advProdId">
                                    <h4 className="product-title">
                                        {corporateMessage.productTitle}{' '}
                                        {this.state.advProducts.length < 16 && (
                                            <a onClick={() => this.handleAddAdvProducts()}>
                                                <img className="add-plus" src="/images/add.png" alt="add image" />
                                            </a>
                                        )}
                                    </h4>
                                    <Tabs id="product-service-tab" className="product-bgcolor" activeKey={tabKey} onSelect={(value) => this.onChange('tabKey', value)}>
                                        {this.state.advProducts.length > 0 ? (
                                            this.state.advProducts.map((advProduct, index) => {
                                                let servicesId = advProduct.serviceId && advProduct.serviceId.split(',');
                                                let serviceIdNumber = [];
                                                servicesId &&
                                                    servicesId.length > 0 &&
                                                    servicesId.filter((service) => {
                                                        var ItemIndex = advProduct.services && advProduct.services.find((b) => b.serviceId == service && b);
                                                        if (ItemIndex) {
                                                            serviceIdNumber.push(ItemIndex);
                                                        }
                                                    });
                                                const selectedProduct = advProduct.showProducts && advProduct.showProducts.find((f) => f.prodId == advProduct.prodId && f);
                                                return (
                                                    <Tab
                                                        eventKey={`${index + 1}`}
                                                        key={`product-tab-${index}`}
                                                        title={selectedProduct ? selectedProduct.product : `Product ${index + 1}`}>
                                                        <div className="form-group row" key={`advProducts-${index}`}>
                                                            <div className="col-12">
                                                                <a
                                                                    className="ml-1 danger pull-right product-delete"
                                                                    data-toggle="modal"
                                                                    data-target={`#productDeleteModal${index}`}
                                                                    onClick={() => this.setState({ productIndex: index })}>
                                                                    <FontIcon icon={faTimesCircle} />
                                                                </a>
                                                            </div>
                                                            <div className="col-12 row">
                                                                <div className="col-6">
                                                                    <div>
                                                                        <label>{corporateMessage.productName}</label>
                                                                        <select
                                                                            className="text-border-prod"
                                                                            name="prodId"
                                                                            id="prodId"
                                                                            type="select"
                                                                            onChange={(e) => this.handleAdvProductsText(e, index)}
                                                                            value={advProduct.prodId}>
                                                                            <option value="">{corporateMessage.productSelect}</option>
                                                                            {this.showProducts(index, advProduct.showProducts)}
                                                                        </select>
                                                                    </div>
                                                                    <div>
                                                                        <label>{corporateMessage.productLicense}</label>
                                                                        <select
                                                                            className="text-border-prod"
                                                                            name="licId"
                                                                            id="licId"
                                                                            type="select"
                                                                            onChange={(e) => this.handleAdvProductsText(e, index)}
                                                                            value={advProduct.licId}>
                                                                            <option value="">{corporateMessage.productLicenseSelect}</option>
                                                                            {this.showLicense(index, advProduct.licences)}
                                                                        </select>
                                                                    </div>
                                                                    <div>
                                                                        <label className="licNum">{corporateMessage.productLicenseNumber}</label>
                                                                        <input
                                                                            className="text-border-prod"
                                                                            autoComplete="off"
                                                                            name="licNumber"
                                                                            id="licNumber"
                                                                            type="text"
                                                                            onKeyPress={(e) => aplhaNumericMethod(e)}
                                                                            maxLength={maxLength.content}
                                                                            onChange={(e) => this.handleAdvProductsText(e, index)}
                                                                            value={advProduct.licNumber}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label>{corporateMessage.productIssued}</label>
                                                                        <input
                                                                            className="text-border-prod"
                                                                            autoComplete="off"
                                                                            name="issuedBy"
                                                                            id="issuedBy"
                                                                            type="text"
                                                                            readOnly={true}
                                                                            onKeyPress={(e) => contentMethod(e)}
                                                                            maxLength={maxLength.issuedBy}
                                                                            onChange={(e) => this.handleAdvProductsText(e, index)}
                                                                            value={advProduct.issuedBy}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label>{corporateMessage.productVality}</label>
                                                                        <CustomDatePicker
                                                                            displayFormat="MM-DD-YYYY"
                                                                            onChange={(day) => {
                                                                                this.handleAdvProductsText(null, index, day);
                                                                            }}
                                                                            showOnInputClick
                                                                            date={advProduct.validity ? new Date(advProduct.validity) : ''}
                                                                            maxDate={curDate}
                                                                            placeholder="Select Date"
                                                                            className="my-custom-datepicker-component datePicker-Input-Prod"
                                                                            readOnly={true}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label>{corporateMessage.productRenumeration}</label>
                                                                        <select
                                                                            className="text-border-prod"
                                                                            name="remId"
                                                                            id="remId"
                                                                            type="select"
                                                                            onChange={(e) => this.handleAdvProductsText(e, index)}
                                                                            value={advProduct.remId}>
                                                                            <option value="">{corporateMessage.productSelectRenumeration}</option>
                                                                            {this.showRemuneration(index, this.props.remunerationList)}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="modal fade"
                                                                    id={`productDeleteModal${index}`}
                                                                    role="dialog"
                                                                    data-backdrop="static"
                                                                    data-keyboard="false">
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h4 className="modal-title text-center">{'Delete Product'}</h4>
                                                                                <button type="button" className="close" data-dismiss="modal">
                                                                                    &times;
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body product-popup-content">{`Are you sure want to delete product`}</div>
                                                                            <div className="modal-footer">
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-danger"
                                                                                    data-dismiss="modal"
                                                                                    onClick={(e) => this.handleAdvProductsDelete(e, this.state.productIndex)}>
                                                                                    Delete
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-primary"
                                                                                    data-dismiss="modal"
                                                                                    onClick={() => this.setState({ productIndex: '' })}>
                                                                                    Cancel
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div>
                                                                        <label>{corporateMessage.productService}</label>
                                                                        {advProduct.prodId ? this.renderMultiSelect(advProduct.services, serviceIdNumber, index) : null}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Tab>
                                                );
                                            })
                                        ) : (
                                            <div>Add products</div>
                                        )}
                                    </Tabs>
                                    {/* {this.state.advProducts.length > 0 && this.state.advProducts.map((advProduct, index) => {
                    let servicesId = advProduct.serviceId && advProduct.serviceId.split(',');
                    let serviceIdNumber = [];
                    servicesId && servicesId.length > 0 && servicesId.filter(service => {
                      var ItemIndex = advProduct.services && advProduct.services.find(b => b.serviceId == service && b);
                      if (ItemIndex) {
                        serviceIdNumber.push(ItemIndex);
                      }
                    });
                    return (
                      <div className="form-group row" key={`advProducts-${index}`}>
                        <div className="col-4">
                          <label>Product</label>
                          <select className="form-control text-border" name="prodId" id="prodId" type="select" onChange={(e) => this.handleAdvProductsText(e, index)} value={advProduct.prodId}>
                            <option value="">Select Product</option>
                            {this.showProducts(index, advProduct.showProducts)}
                          </select>
                        </div>
                        <div className="col-4">
                          <label>Service</label>
                          {(advProduct.prodId) ?
                            <Multiselect
                              options={advProduct.services}
                              selectedValues={serviceIdNumber}
                              onSelect={(selectedItem) => this.onSelect(selectedItem, index)}
                              onRemove={(selectedItem) => this.onRemove(selectedItem, index)}
                              displayValue="service"
                              showCheckbox={true}
                            /> : null
                          }
                        </div>
                        <div className="col-4">
                          <label>Remuneration</label>
                          <select className="form-control text-border" name="remId" id="remId" type="select" onChange={(e) => this.handleAdvProductsText(e, index)} value={advProduct.remId} >
                            <option value="">Select Remuneration</option>
                            {this.showRemuneration(index, this.props.remunerationList)}
                          </select>
                        </div>
                        <div className="col-4">
                          <label>License</label>
                          <select className="form-control text-border" name="licId" id="licId" type="select" onChange={(e) => this.handleAdvProductsText(e, index)} value={advProduct.licId} >
                            <option value="">Select License</option>
                            {this.showLicense(index, advProduct.licences)}
                          </select>
                        </div>
                        <div className="col-4">
                          <label>License Number</label>
                          <input className="text-border" name="licNumber" id="licNumber" type="text" onChange={(e) => this.handleAdvProductsText(e, index)} value={advProduct.licNumber} />
                        </div>
                        <div className="col-4">
                          <label>Issued By</label>
                          <input className="text-border" name="issuedBy" id="issuedBy" type="text" onChange={(e) => this.handleAdvProductsText(e, index)} value={advProduct.issuedBy} />
                        </div>
                        <div className="col-4">
                          <label>Validity</label>
                          <DatePicker
                            displayFormat='MM-DD-YYYY'
                            onChange={day => { this.handleAdvProductsText(null, index, day) }}
                            showOnInputClick
                            value={advProduct.validity ? new Date(advProduct.validity) : ''}
                            // minDate={new Date()}
                            placeholder='Select Date'
                            className='my-custom-datepicker-component'
                          />
                        </div>
                        <a className="ml-1 danger" onClick={(e) => this.handleAdvProductsDelete(e, index)}><i className="fa fa-minus-circle"></i></a>
                      </div>
                    )
                  })} */}
                                </form>
                                {/* <button className="save-btn2" onClick={(e) => this.handleProductService(e)}>SAVE</button> */}
                            </div>
                        </div>
                        {this.props.popup && !this.state.disableButton && (
                            <div className="popup-save">
                                <button onClick={this.handleProductService} className="btn btn-primary" disabled={this.state.disableButton}>
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

const mapStateToProps = (state) => advisorSelector(state);

export default connect(mapStateToProps, {})(ProductService);
