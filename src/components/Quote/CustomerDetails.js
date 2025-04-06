import React, { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CustomerDetails extends Component {

    handleInputs = (e, field) => {
        this.props.handleInputs(e.target.value, field);
    };

    handleCancel = () => {
        this.props.onHide();
    }

    handleNext = () => {
        if (this.props.quoteDetails.quoteName.length === 0) {
            toast('Enter Quote Name', { type: "error", autoClose: 2000, position: "bottom-right" });
        } else if (this.props.quoteDetails.customerName.length === 0) {
            toast('Enter Customer Name', { type: "error", autoClose: 2000, position: "bottom-right" });
        } else if (this.props.quoteDetails.customerType.length === 0) {
            toast('Enter Customer Type', { type: "error", autoClose: 2000, position: "bottom-right" });
        } else if (this.props.quoteDetails.phoneNumber.length === 0) {
            toast('Enter Phone Number', { type: "error", autoClose: 2000, position: "bottom-right" });
        } else if (this.props.quoteDetails.email.length === 0) {
            toast('Enter Email', { type: "error", autoClose: 2000, position: "bottom-right" });
        } else if (this.props.quoteDetails.customerAddress.length === 0) {
            toast('Enter Address', { type: "error", autoClose: 2000, position: "bottom-right" });
        } else if (this.props.quoteDetails.customerTIN.length === 0) {
            toast('Enter Customer TIN', { type: "error", autoClose: 2000, position: "bottom-right" });
        } else {
            this.props.onNext();
        }

    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="row f-form">
                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Quote Name</label>
                                    <input
                                        type="text"
                                        value={this.props.quoteDetails.quoteName || ''}
                                        className="form-control"
                                        name="quoteName"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "quoteName")}
                                    />
                                </div>
                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Customer Name</label>
                                    <input
                                        type="text"
                                        value={this.props.quoteDetails.customerName || ''}
                                        className="form-control"
                                        name="customerName"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "customerName")}
                                    />
                                    {/* <select
                                        value={this.state.quoteDetails.customerName}
                                        className="form-control"
                                        name="customerName"
                                        onChange={(e) => this.handleInputs(e, "customerName")}
                                    >
                                        <option value="">Select Customer</option>
                                        <option value="SecureTech Ltd.">SecureTech Ltd.</option>
                                    </select> */}
                                </div>

                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Customer Type</label>
                                    <input
                                        type="text"
                                        value={this.props.quoteDetails.customerType || ''}
                                        className="form-control"
                                        name="customerType"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "customerType")}
                                    />
                                    {/* <select
                                        value={this.state.quoteDetails.customerType}
                                        className="form-control"
                                        name="customerType"
                                        onChange={(e) => this.handleInputs(e, "customerType")}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Regular Customer">Regular Customer</option>
                                    </select> */}
                                </div>
                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Phone Number</label>
                                    <input
                                        type="text"
                                        value={this.props.quoteDetails.phoneNumber || ''}
                                        className="form-control"
                                        name="phoneNumber"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "phoneNumber")}
                                    />
                                </div>

                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Email</label>
                                    <input
                                        type="email"
                                        value={this.props.quoteDetails.email || ''}
                                        className="form-control"
                                        name="email"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "email")}
                                    />
                                </div>
                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Customer Address</label>
                                    <input
                                        type="text"
                                        value={this.props.quoteDetails.customerAddress || ''}
                                        className="form-control"
                                        name="customerAddress"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "customerAddress")}
                                    />
                                </div>

                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Customer Logo</label>

                                    <div className="input-group">
                                        <input type="file" class="form-control p-1" id="inputGroupFile02" />
                                    </div>

                                </div>

                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Customer TIN</label>
                                    <input
                                        type="text"
                                        value={this.props.quoteDetails.customerTIN || ''}
                                        className="form-control"
                                        name="customerTIN"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "customerTIN")}
                                    />
                                </div>

                                <div className="col-12 mt-3 border-bottom pb-2">
                                    <label className="">Enable negotiation for this quote:</label>
                                    <div className="custom-check-box mb-2">
                                        <label>
                                            <input type="checkbox" />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="custom-check-box">
                                        <label>
                                            <input type="checkbox" />
                                            Prefer to go with the market price
                                        </label>
                                    </div>
                                </div>

                                <div className="col-12 mt-3 d-flex justify-content-end">
                                    <button className="btn btn-cancel btn-sm mr-2" onClick={() => this.handleCancel()}>Cancel</button>
                                    <button className="btn btn-next btn-sm" onClick={() => this.handleNext()}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CustomerDetails;
