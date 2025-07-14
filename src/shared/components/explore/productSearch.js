import React from 'react';
import SearchDropdown from '../common/searchDropdown';
import { homeMessage } from '../../constants/homeConstant';


class ProductSearch extends React.Component {
  constructor(props) {
    super(props);
    this.allServices = {};
    this.state = {
      productList: [],
      productName: '',
      serviceName: '',
      brandName: '',
      planName: '',
      serviceList: [],
      brandList: [],
      planList: []
    };
  }

  componentDidMount() {
    const { list } = this.props;
    if (list) {
      this.formatProducts();
    }
  }

  componentDidUpdate(prevProps) {
    const { list: prevList = [] } = prevProps;
    const { list = [] } = this.props;
    if (list && prevList && prevList.length !== list.length) {
      this.formatProducts();
    }
  }


  formatProducts = () => {
    const { list } = this.props;
    let productList = [];
    this.allServices = {};
    list.forEach((item) => {
      const { prodId, product, services, brands, servicePlans } = item;
      productList = [...productList, { productId: prodId, value: product, name: product, services: services, brands: brands, plans: servicePlans }];
      if (services) {
        let serviceList = [];
        let serviceplans = {};
        services.forEach((obj) => {
          const { serviceId, service, servicePlans } = obj;
          serviceList = [...serviceList, { serviceId: serviceId, value: service, name: service }];
          serviceplans = {
            ...serviceplans,
            [service]: servicePlans.map((item) => ({ value: item.servicePlan, name: item.servicePlan, brandId: item.brandId }))
          }
        });

        let brandList = [];
        if (brands) {
          brands.forEach((data) => {
            const { brand, brandId } = data;
            brandList = [...brandList, { value: brand, name: brand, brandId }];
          });
        }
        this.allServices = {
          ...this.allServices,
          [product]: { serviceList, brandList, serviceplans }
        };
      }
    });
    this.setState({ productList });
  }

  productChangeHandler = (e) => {
    const { target: { value } } = e;
    let serviceList = this.allServices[value].serviceList;
    let brandList = this.allServices[value].brandList;
    this.setState({
      productName: value,
      serviceName: '',
      brandName: '',
      planName: '',
      serviceList,
      brandList
    });
  }

  productSearchChangeHandler = (value) => {
    let e = {
      target: {
        value
      }
    };
    this.productChangeHandler(e);
  }

  serviceChangeHandler = (e) => {
    const { target: { value } } = e;
    let planList = this.allServices[this.state.productName].serviceplans[value];
    this.setState({ serviceName: value, planList });
  }

  serviceSearchChangeHandler = (value) => {
    let e = {
      target: {
        value
      }
    };
    this.serviceChangeHandler(e);
  }

  brandChangeHandler = (e) => {
    const { target: { value } } = e;
    this.setState({ brandName: value });
  }

  brandSearchChangeHandler = (value) => {
    let { planName, productName, planList, brandName, brandList } = this.state;
    planList = this.allServices[this.state.productName].serviceplans[this.state.serviceName];
    let selectedBrand = brandList && brandList.length > 0 && brandList.find(brand => value == brand.name);
    if (selectedBrand) {
      planList = planList && planList.length > 0 && planList.filter((list) => {
        return (list.brandId == selectedBrand.brandId);
      });
    }
    this.setState({ brandName: value, planList, planName: planList.length == 1 ? planList[0].value : '' });
  }

  planChangeHandler = (e) => {
    const { target: { value } } = e;
    this.setState({ planName: value });
  }

  planSearchChangeHandler = (value) => {
    this.setState({ planName: value });
  }

  searchHandler = () => {
    const { productName, serviceName, brandName, planName } = this.state;
    const { productList } = this.state;
    const product = productList.filter((item) => item.name === productName)[0];
    let productId = '';
    productId = product.productId;
    let service;
    let serviceId = '';
    if (serviceName) {
      service = product.services.filter((item) => item.service === serviceName)[0];
      serviceId = service.serviceId;
    }
    let brand;
    let brandId = '';
    if (brandName && product.brands.length > 0) {
      brand = product.brands && product.brands.filter((item) => item.brand === brandName)[0];
      brandId = brand.brandId;
    }
    this.props.onSearch({
      productId,
      serviceId,
      brandId,
      planName
    });
  }

  resetHandler = () => {
    this.setState({
      productName: '',
      serviceName: '',
      brandName: '',
      planName: '',
    });
    this.props.onReset();
  }

  renderProductName = () => {
    const { productName, productList } = this.state;
    return (
      <div className="explore-user-search-input">
        <SearchDropdown
          data={productList}
          search={true}
          emptyMessage={'Not found'}
          placeholder={'Choose Product'}
          onChange={this.productSearchChangeHandler}
          value={productName}
        />
      </div>
    );
  }

  renderServiceName = () => {
    let { serviceName, serviceList, productName, brandName, planName } = this.state;
    return (
      <div className="explore-user-search-input">
        <SearchDropdown
          data={serviceList}
          search={true}
          emptyMessage={'Not found'}
          placeholder={'Choose Service'}
          onChange={this.serviceSearchChangeHandler}
          value={serviceName}
        />
      </div>
    );
  }

  renderBrandName = () => {
    const { brandName, brandList, productName } = this.state;
    return (
      brandList && brandList.length > 0 &&
      <div className="explore-user-search-input">
        <SearchDropdown
          data={brandList}
          search={true}
          emptyMessage={'Not found'}
          placeholder={'Choose Brand'}
          onChange={this.brandSearchChangeHandler}
          value={brandName}
        />
      </div>

    );
  }

  renderPlanName = () => {
    let { planName, productName, planList, brandName, brandList } = this.state;
    return (
      planList && planList.length > 0 &&
      <div className="explore-user-search-input">
        <SearchDropdown
          data={planList}
          search={true}
          emptyMessage={'Not found'}
          placeholder={'Choose Plan'}
          onChange={this.planSearchChangeHandler}
          value={planName}
        />
      </div>
    );
  }

  renderButtons = () => {
    const { productName, serviceName, brandName, planName } = this.state;
    const isDisabled = !(productName || serviceName || brandName || planName);
    return (
      <div className="explore-user-search-control">
        <button
          className="btn btn-primary"
          onClick={this.searchHandler}
          disabled={isDisabled}
        >Search</button>
        <button
          className="btn btn-secondary"
          onClick={this.resetHandler}
          disabled={isDisabled}
        >Reset</button>
      </div>
    );
  }

  render() {
    return (
      <>
        {(this.props.totalRecords > 10 || this.props.advisorDetails.name) && (<div>
          <div className="explore-user-search-block">
            <div className="explore-user-search-label">
              <span>Search:</span>
            </div>
          </div>
          <div className="explore-user-search">
            {this.renderProductName()}
            {this.renderServiceName()}
            {this.renderBrandName()}
            {this.renderPlanName()}
            {this.renderButtons()}
          </div>
        </div>)}
      </>
    );
  }
}

export default ProductSearch;
