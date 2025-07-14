import React from 'react';
import { createSinglePaymentOrder, verifySinglePayment, createOrderNumber, updateOrderDetail } from '../../actions/membership';
import { connect } from 'react-redux';
import { membershipSelector } from '../../selectors/membership';
import CustomModal from '../common/customModal';

class SinglePayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopup: false,
            loading: false,
            open: false,
            payOrderNumber: {}
        };
    }

    componentDidUpdate(oldProps) {
        let { paymentOrder } = oldProps.membership;
        if (this.props.membership.paymentOrder !== paymentOrder) {
            if (this.props.membership.paymentOrder) {
                this.handleCheckout();
            }
        }
        if (this.props.membership.payOrderNumber !== oldProps.membership.payOrderNumber) {
            this.setState({
                payOrderNumber: this.props.membership.payOrderNumber
            });
        }
    }

    createOrder = () => {
        let { advisorDetails } = this.props;
        let options = {
            roleBasedId: advisorDetails.advId,
            emailId: advisorDetails.emailId,
            name: advisorDetails.name,
            phoneNumber: advisorDetails.phoneNumber,
            type: 'payment'
        };
        this.props.createOrderNumber(options);
        setTimeout(() => {
            this.setState({ openPopup: true });
        }, 1000);
    };

    handleJoin = () => {
        let { advisorDetails } = this.props;
        let payments = {
            id: advisorDetails.advId,
            amount: 200,
            emailId: advisorDetails.emailId,
            name: advisorDetails.name,
            phoneNumber: advisorDetails.phoneNumber
        };
        this.setState({ openPopup: true });
        this.props.createSinglePaymentOrder(payments);
    };

    handleClose = () => {
        this.setState({
            openPopup: false
        });
    };

    handleVerify = (response) => {
        let { paymentOrder } = this.props.membership;
        let options = {
            razorpay_order_id: paymentOrder.order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            singlePaymentId: paymentOrder.singlePaymentId
        };
        this.props.verifySinglePayment(options);
        let orderDetail = { ...this.props.membership.payOrderNumber };
        orderDetail.razorpay_order_id = paymentOrder.order_id;
        orderDetail.razorpay_payment_id = response.razorpay_payment_id;
        this.props.updateOrderDetail(orderDetail);
        this.handleClose();
    };

    handleCheckout = () => {
        let paymentOrder = this.props.membership.paymentOrder;
        let options = {
            key: paymentOrder.secretId,
            amount: 20000,
            order_id: paymentOrder.order_id,
            name: 'Bloomkite',
            description: 'Single payment',
            image: '/images/favicon.png',
            handler: (response) => {
                this.handleVerify(response);
            },
            prefill: {
                name: this.props.advisorDetails.name,
                email: this.props.advisorDetails.emailId,
                contact: this.props.advisorDetails.phoneNumber
            },
            theme: {
                color: '#251534'
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    render() {
        const { advisorDetails } = this.props;
        return (
            <div>
                <div>
                    <button onClick={() => this.createOrder()} className="plan-button">
                        Pay
                    </button>
                </div>
                <CustomModal open={this.state.openPopup} showCloseIcon={true} onClose={this.handleClose} closeOnOverlayClick={false}>
                    <div>
                        <h1 className="invoice-heading invoice-font">Order Summary</h1>
                        <div className="invoice-number">
                            <div className="">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Payment</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {this.state.payOrderNumber && <td>{this.state.payOrderNumber.orderDetailId}</td>}
                                            <td>Planning</td>
                                            <td>200</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="1">&nbsp;</td>
                                            <td>
                                                <strong>Total</strong>
                                            </td>
                                            <td>200</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <h4 className="invoice-heading">Billing Information</h4>
                        </div>
                        <div className="col-12 row invoice-number">
                            {advisorDetails && (
                                <div className="col-6">
                                    <h5 className="invoice-font">To:</h5>
                                    <div>{advisorDetails.name}</div>
                                    <div>{advisorDetails.emailId}</div>
                                    <div>{advisorDetails.phoneNumber}</div>
                                </div>
                            )}
                            <div className="col-6">
                                <div className="invoice-number">
                                    <table className="invoice-head">
                                        <tbody>
                                            <tr>
                                                <td>Customer</td>
                                                {advisorDetails && <td>{advisorDetails.advId}</td>}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="invoice-pay">
                            <button type="button" className="btn btn-primary invoice-pay-btn" data-dismiss="modal" onClick={this.handleJoin}>
                                Proceed To Pay
                            </button>
                        </div>
                    </div>
                </CustomModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => membershipSelector(state);
export default connect(mapStateToProps, { createSinglePaymentOrder, verifySinglePayment, createOrderNumber, updateOrderDetail })(SinglePayment);
