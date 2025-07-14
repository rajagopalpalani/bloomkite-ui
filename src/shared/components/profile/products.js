import React from 'react';
import Brands from './brands';
import CustomReactTooltip from '../common/customReactTooltip';
import FontIcon from '../common/fontAwesomeIcon';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
// import Teams from './Teams';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            domLoaded: false
        };
    }

    componentDidMount() {
        this.setState({ domLoaded: true });
    }

    render() {
        const { list, products = {}, remuneration = {}, services = {} } = this.props;
        return list && list.length > 0 ? (
            <div className="bloomkite-profile-products">
                <h5 className="profile-title">
                    <strong className="experts-head">Products</strong>
                </h5>
                <div className="row nopadding nomargin">
                    {list.map((item, index) => {
                        const { prodId, remId, serviceId } = item;
                        const serviceIdList = (serviceId || '').split(',');
                        const product = products[prodId] || {};
                        const remun = remuneration[remId] || {};
                        // const brandList = brands && brands.filter((item) => prodId === item.prodId);
                        return (
                            <div key={'profile-product-' + index} className="profile-product col-lg-4 col-md-4 col-sm-6">
                                <div className="product-box bg-white profile-border">
                                    <h5 className="padding15 product-name">{product.product}</h5>
                                    {remun.remuneration && (
                                        <span>
                                            <a className="remun-icon-upload" id="comments-icon" data-tip data-for={'rejectComments' + index}>
                                                <FontIcon className="profile-icon" icon={faInfo} />
                                            </a>
                                            {this.state.domLoaded && (
                                                <CustomReactTooltip id={'rejectComments' + index} type="info" effect="solid">
                                                    <span className="command-details">{remun.remuneration}</span>
                                                </CustomReactTooltip>
                                            )}
                                        </span>
                                    )}
                                    <ul className="padding15">
                                        {serviceIdList &&
                                            serviceIdList.map((item, si) => {
                                                const serviceName = services[item] || {};
                                                return (
                                                    <li key={'service-product-' + si} className="service-text">
                                                        {serviceName.service}
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                                {/* <Brands list={brandList} /> */}
                                {/* <Teams list={teams} /> */}
                            </div>
                        );
                    })}
                </div>
            </div>
        ) : null;
    }
}

// const mapStateToProps = state => profileSelector(state);

export default Products;
