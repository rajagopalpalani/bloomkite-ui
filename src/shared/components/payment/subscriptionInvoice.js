import React from 'react';
import 'react-responsive-modal/styles.css';
import { createSubscription, fetchSubscription, updateOrderDetail, onPaid, cancelSubscription } from '../../actions/membership';
import { connect } from 'react-redux';
import { membershipSelector } from '../../selectors/membership';
import moment from 'moment';
import CustomModal from '../common/customModal';
import { createSinglePaymentOrder, verifySinglePayment } from '../../actions/membership';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
};

class SubscriptionInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidUpdate(oldProps) {
        let { subscription } = oldProps.membership;
        if (this.props.type == 'subscription') {
            if (this.props.membership.subscription !== subscription) {
                if (this.props.membership.subscription) {
                    this.handleCheckout();
                }
            }
        }
        if (this.props.type == 'singlepayment') {
            let { paymentOrder } = oldProps.membership;
            if (this.props.membership.paymentOrder !== paymentOrder) {
                if (this.props.membership.paymentOrder) {
                    this.handleSinglePayCheckout();
                }
            }
        }
    }

    componentDidMount() {
        if (this.props.membership.subscription) {
            this.handleCheckout();
        }
    }

    handleCancelSubscription = () => {
        const { advisorDetails } = this.props;
        let options = {
            advId: advisorDetails.advId,
            cancel_at_cycle_end: 0,
            sub_id: this.props.membership.subscription.razorpaySubId
        };
        this.props.cancelSubscription(options);
    };

    handleSinglePayVerify = (response, item) => {
        let { paymentOrder } = this.props.membership;
        let options = {
            razorpay_order_id: paymentOrder.order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            singlePaymentId: paymentOrder.singlePaymentId,
            type: 'subscription'
        };
        this.props.verifySinglePayment(options);
        if (response.razorpay_signature) {
            let orderDetail = { ...this.props.membership.subOrderNumber };
            orderDetail.razorpay_plan_id = item.razorpayPlanId;
            orderDetail.razorpay_order_id = paymentOrder.order_id;
            orderDetail.razorpay_payment_id = response.razorpay_payment_id;
            this.props.updateOrderDetail(orderDetail);
            const { advisorDetails } = this.props;
            setTimeout(() => {
                this.props.fetchSubscription({ advId: advisorDetails.advId });
            }, 2000);
            this.props.onPaid({ type: 'success' });
        } else {
            this.props.onPaid({ type: 'failure' });
        }
    };

    handleVerify = (response, item) => {
        let subscription = this.props.membership.subscription;
        let verify = {
            razorpay_payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            subscription_id: subscription.razorpaySubId
        };

        if (response.razorpay_signature) {
            let orderDetail = { ...this.props.membership.subOrderNumber };
            orderDetail.subscription_id = subscription.razorpaySubId;
            orderDetail.razorpay_plan_id = item.plan_id;
            orderDetail.razorpay_payment_id = response.razorpay_payment_id;
            this.props.updateOrderDetail(orderDetail);
            const { advisorDetails } = this.props;
            this.props.fetchSubscription({ advId: advisorDetails.advId });
            this.props.onPaid({ type: 'success' });
        } else {
            this.props.onPaid({ type: 'failure' });
        }
    };

    handleSinglePayCheckout = () => {
        let paymentOrder = this.props.membership.paymentOrder;
        let item = this.props.selectedPlan;
        let options = {
            key: paymentOrder.secretId,
            amount: paymentOrder.amount,
            order_id: paymentOrder.order_id,
            name: 'Bloomkite',
            description: item.planName,
            image: '/images/favicon.png',
            handler: (response) => {
                this.handleSinglePayVerify(response, item);
            },
            prefill: {
                name: this.props.advisorDetails.name,
                email: this.props.advisorDetails.emailId,
                contact: this.props.advisorDetails.phoneNumber
            },
            theme: {
                color: '#251534'
            },
            modal: {
                ondismiss: () => {
                    this.props.onPaid({ type: 'closed' });
                    this.props.handleClose();
                }
            }
        };
        var rzpSinglePay = new window.Razorpay(options);
        rzpSinglePay.open();
    };

    handleCheckout = () => {
        let subscription = this.props.membership.subscription;
        let item = this.props.selectedPlan;
        let options = {
            key: subscription.secretId,
            subscription_id: subscription.razorpaySubId,
            name: 'Bloomkite',
            description: item.planName,
            image: '/images/favicon.png',
            handler: (response) => {
                this.handleVerify(response, item);
            },
            prefill: {
                name: this.props.advisorDetails.name,
                email: this.props.advisorDetails.emailId,
                contact: this.props.advisorDetails.phoneNumber
            },
            theme: {
                color: '#251534'
            },
            modal: {
                ondismiss: () => {
                    this.props.onPaid({ type: 'closed' });
                    this.props.handleClose();
                }
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        this.props.handleClose();
    };

    handleJoin = () => {
        const item = this.props.selectedPlan;
        if (this.props.type == 'subscription') {
            let total_count;
            if (item.period === 'monthly') {
                total_count = 120;
            } else if (item.period === 'yearly') {
                total_count = 10;
            }
            let options = {
                advId: this.props.advisorDetails.advId,
                plan_id: item.razorpayPlanId,
                total_count: total_count
            };
            if (!this.props.membership.subscription) {
                this.props.createSubscription(options);
            } else if (this.props.membership.subscription && this.props.membership.subscription.razorpaySubId) {
                this.handleCheckout();
            }
        } else if (this.props.type == 'singlepayment') {
            let { advisorDetails } = this.props;
            let total_count;
            if (item.period === 'monthly') {
                total_count = 120;
            } else if (item.period === 'yearly') {
                total_count = 10;
            }
            let payments = {
                id: advisorDetails.advId,
                amount: item.amount,
                emailId: advisorDetails.emailId,
                name: advisorDetails.name,
                phoneNumber: advisorDetails.phoneNumber,
                type: 'subscription',
                plan_id: item.razorpayPlanId,
                period: item.period,
                total_count: total_count
            };
            this.setState({ openPopup: true });
            this.props.createSinglePaymentOrder(payments);
        }
    };

    render() {
        const { advisorDetails } = this.props;
        const item = this.props.selectedPlan;
        const dateObj = new Date();
        var testDateUtc = moment.utc(dateObj);
        var localDate = testDateUtc.local();
        const date = localDate.format('DD-MM-YYYY');
        const { subOrderNumber } = this.props.membership;
        return (
            <div style={styles}>
                {!this.props.membership.subscription && (
                    <CustomModal className={'sub-modal'} open={this.props.open} showCloseIcon={true} onClose={this.props.handleClose} closeOnOverlayClick={false}>
                        <div>
                            <h1 className="invoice-heading invoice-font">Order Summary</h1>
                            <div className="invoice-number">
                                <div className="">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Order No.</th>
                                                <th>Plan Name</th>
                                                <th>Monthly/Yearly</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{subOrderNumber.orderDetailId}</td>
                                                <td>{item.planName}</td>
                                                <td>{item.period}</td>
                                                <td>{item.amount}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">&nbsp;</td>
                                                <td>
                                                    <strong>Total</strong>
                                                </td>
                                                <td>{item.amount}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div>
                                <h4 className="invoice-heading">Billing Information</h4>
                            </div>
                            <div className="col-12 row invoice-number">
                                <div className="col-6">
                                    <h5 className="invoice-font">To:</h5>
                                    <div>{advisorDetails.name}</div>
                                    <div>{advisorDetails.emailId}</div>
                                    <div>{advisorDetails.phoneNumber}</div>
                                </div>
                                <div className="col-6">
                                    <div className="invoice-number">
                                        <table className="invoice-head">
                                            <tbody>
                                                <tr>
                                                    <td>Customer</td>
                                                    <td>{advisorDetails.advId}</td>
                                                </tr>
                                                {/* <tr>
                                                <td>Invoice #</td>
                                                <td>2340</td>
                                            </tr> */}
                                                <tr>
                                                    <td>Date</td>
                                                    <td>{date}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* <div className="col-6 invoice-website">
                                <h5 className="invoice-font">Invoice From:</h5>
                                <div>
                                    <span>
                                        <img src="/images/logo.svg" alt="bloomkite logo" />
                                    </span>
                                    <span>Bloomkite</span>
                                </div>
                                <div>info@loomkite.com</div>
                            </div> */}
                            </div>
                            <div className="invoice-pay">
                                <button type="button" className="btn btn-primary invoice-pay-btn" data-dismiss="modal" onClick={this.handleJoin}>
                                    Proceed To Pay
                                </button>
                            </div>
                        </div>
                    </CustomModal>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => membershipSelector(state);
export default connect(mapStateToProps, { createSubscription, fetchSubscription, updateOrderDetail, onPaid, cancelSubscription, createSinglePaymentOrder, verifySinglePayment })(
    SubscriptionInvoice
);
