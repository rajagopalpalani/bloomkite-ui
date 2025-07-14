import React from 'react';
import { connect } from 'react-redux';
import CustomModal from '../common/customModal';
import { membershipSelector } from '../../selectors/membership';
import { cancelSubscription } from '../../actions/membership';

class PaymentResponse extends React.Component {
    cancelPayment = () => {
        const { advisorDetails } = this.props;
        let options = {
            advId: advisorDetails.advId,
            cancel_at_cycle_end: 0,
            sub_id: this.props.membership.subscription.razorpaySubId
        };
        this.props.cancelSubscription(options);
        this.props.onCloseModal();
    };

    render() {
        return (
            <CustomModal className={'sub-modal'} open={this.props.openPopup} showCloseIcon={true} onClose={this.props.onCloseModal} closeOnOverlayClick={false}>
                <div className="payment-popup pt-1">
                    <div className="col-12">
                        <div className="pay-center bg-white">
                            {this.props.membership.paymentSuccess && (
                                <div>
                                    <img className="pay-rounded-circle" src={'/images/pay-tick.png'} width="55" />
                                    <h3 className="pay-heading">Success!</h3>
                                    <h4 className="pay-h">Your payment is completed successfully. Please wait, It will take few minutes to activate your plan.</h4>
                                </div>
                            )}
                            {this.props.membership.paymentClosed && (
                                <div>
                                    <img className="pay-rounded-circle" src={'/images/pay-wrong.png'} width="55" />
                                    <h4 className="pay-h">Your payment is not completed. Please try again later.</h4>
                                </div>
                            )}
                            {this.props.membership.paymentFailure && (
                                <div>
                                    <img className="pay-rounded-circle" src={'/images/pay-wrong.png'} width="55" />
                                    <h4 className="pay-h">Your payment is failed. Please try again later.</h4>
                                </div>
                            )}
                        </div>
                    </div>
                    {(this.props.membership.paymentClosed || this.props.membership.paymentFailure) && this.props.type === 'subscription' && (
                        <div className="pay-cancel">
                            <p>Do you want to cancel your Subscription ?</p>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.cancelPayment}>
                                Cancel Subscription
                            </button>
                        </div>
                    )}
                </div>
            </CustomModal>
        );
    }
}

const mapStateToProps = (state) => membershipSelector(state);
export default connect(mapStateToProps, { cancelSubscription })(PaymentResponse);
