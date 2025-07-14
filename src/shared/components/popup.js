import React from 'react';
import { homeStaticMessage } from '../constants/homeStatic';

class PopUp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">{this.props.title}</h4>
                                <button type="button" className="close" data-dismiss="modal">
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body terms-conditions">{this.props.body}</div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">
                                    {homeStaticMessage.contactClose}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="myModal12" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content contactus-width">
                            <div className="modal-header">
                                <h4 className="modal-title">{this.props.title}</h4>
                                <button type="button" className="close" data-dismiss="modal">
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">{this.props.body}</div>
                            <table className="modal-number contactus-table">
                                <tbody>
                                    <tr>
                                        <td className="contact-details">
                                            Email
                                        </td>
                                        <td className="contact-details">
                                            <a className="mail-mobile-content" href="mailto:info@bloomkite.com">
                                                info@bloomkite.com
                                             </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="contact-details">
                                            Mobile
                                        </td>
                                        <td className="contact-details">
                                            <a className="mail-mobile-content" href="tel:+917676733903">
                                                7676733903
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="address-vertical">
                                            Address
                                        </td>
                                        <td>
                                            <p className="contact-details">Sowise Technologies Private Limited<br />
                                            CIN.NO.U74999TZ2018PTC030561<br />
                                            D2B,Coral Ennar Apartment, <br />
                                             Avarampalayam Road, <br />
                                            Ganapathy,
                                            Coimbatore <br />
                                            641006</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="planDeleteModal" role="dialog" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title text-center">{this.props.title}</h4>
                                <button type="button" className="close" data-dismiss="modal">
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">{this.props.body}</div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.props.handleDelete(this.props.planUser)}>
                                    Delete
                                </button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopUp;
