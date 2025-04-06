import React, { Component } from "react";
import _ from 'lodash';
import { createCustomerService } from "../../services/customers";

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //customerInfo: {
            //customerImage: "101",
            customerName: "",
            phoneNumber: '',
            email: '',
            address: '',
            companyName: '',
            industryId: '',
            currencyId: '',
            countryId: '',
            taxIdOrGstNumber: '',
            customerTypeId: "",
            paymentTermsId: "",
            discountEligibility: true
            //}
        };
    }

    handleInputs = (e, field) => {
        this.setState({ field: e.target.value });
    };

    handleCreateCustomer = async (payload) => {

        try {
            const response = await createCustomerService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
                this.props.onHide();
            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    handleSubmit = () => {
        console.log("Customer Info", this.state);
        this.handleCreateCustomer(this.state);
    }

    handleCancel = () => {
        this.props.onHide();
    }

    handleCustomerName = (e) => {
        this.setState({ "customerName": e.target.value });
    }

    handlePhoneNumber = (e) => {
        this.setState({ "phoneNumber": e.target.value });
    }

    handleEmail = (e) => {
        this.setState({ "email": e.target.value });
    }

    handleCompanyName = (e) => {
        this.setState({ "companyName": e.target.value });
    }

    handleIndustryId = (e) => {
        this.setState({ "industryId": e.target.value });
    }

    handleAddress = (e) => {
        this.setState({ "address": e.target.value });
    }

    handleCountryId = (e) => {
        this.setState({ "countryId": e.target.value });
    }

    handleCurrencyId = (e) => {
        this.setState({ "currencyId": e.target.value });
    }

    handleTaxId = (e) => {
        this.setState({ "taxIdOrGstNumber": e.target.value });
    }

    handleCustomerType = (e) => {
        this.setState({ "customerTypeId": e.target.value });
    }

    handlePaymentTerms = (e) => {
        this.setState({ "paymentTermsId": e.target.value });
    }

    render() {

        return (
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="row f-form">
                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Customer Name</label>
                                    <input
                                        type="text"
                                        value={this.state.customerName}
                                        className="form-control"
                                        name="customerName"
                                        autoComplete="off"
                                        onChange={(e) => this.handleCustomerName(e)}
                                    />
                                </div>
                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Phone Number</label>
                                    <input
                                        type="text"
                                        value={this.state.phoneNumber}
                                        className="form-control"
                                        name="quoteName"
                                        autoComplete="off"
                                        onChange={(e) => this.handlePhoneNumber(e)}
                                    />
                                </div>

                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Email</label>
                                    <input
                                        type="text"
                                        value={this.state.email}
                                        className="form-control"
                                        name="email"
                                        autoComplete="off"
                                        onChange={(e) => this.handleEmail(e)}
                                    />
                                </div>
                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Company Name</label>
                                    <input
                                        type="text"
                                        value={this.state.companyName}
                                        className="form-control"
                                        name="companyName"
                                        autoComplete="off"
                                        onChange={(e) => this.handleCompanyName(e)}
                                    />
                                </div>

                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Industry</label>
                                    <input
                                        type="email"
                                        value={this.state.industryId}
                                        className="form-control"
                                        name="email"
                                        autoComplete="off"
                                        onChange={(e) => this.handleIndustryId(e)}
                                    />
                                </div>
                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Address</label>
                                    <input
                                        type="text"
                                        value={this.state.address}
                                        className="form-control"
                                        name="customerAddress"
                                        autoComplete="off"
                                        onChange={(e) => this.handleAddress(e)}
                                    />
                                </div>

                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Country</label>

                                    <input
                                        type="text"
                                        value={this.state.countryId}
                                        className="form-control"
                                        name="country"
                                        autoComplete="off"
                                        onChange={(e) => this.handleCountryId(e)}
                                    />

                                </div>

                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Currency</label>
                                    <input
                                        type="text"
                                        value={this.state.currencyId}
                                        className="form-control"
                                        name="currencyId"
                                        autoComplete="off"
                                        onChange={(e) => this.handleCurrencyId(e)}
                                    />
                                </div>

                                <div className="col-12 mt-3 border-bottom pb-2">
                                    <label className="">Tax ID / GST Number</label>
                                    <input
                                        type="text"
                                        value={this.state.taxIdOrGstNumber}
                                        className="form-control"
                                        name="taxIdOrGstNumber"
                                        autoComplete="off"
                                        onChange={(e) => this.handleTaxId(e)}
                                    />
                                </div>

                                <div className="col-12 mt-3 border-bottom pb-2">
                                    <label className="">Customer Type</label>
                                    <input
                                        type="text"
                                        value={this.state.customerTypeId}
                                        className="form-control"
                                        name="customerTypeId"
                                        autoComplete="off"
                                        onChange={(e) => this.handleCustomerType(e)}
                                    />
                                </div>
                                <div className="col-12 mt-3 border-bottom pb-2">
                                    <label className="">Payment Terms</label>
                                    <input
                                        type="text"
                                        value={this.state.paymentTermsId}
                                        className="form-control"
                                        name="paymentTermsId"
                                        autoComplete="off"
                                        onChange={(e) => this.handlePaymentTerms(e)}
                                    />
                                </div>

                                <div className="col-12 mt-3 d-flex justify-content-end">
                                    <button className="btn btn-cancel btn-sm mr-2" onClick={() => this.handleCancel()}>Cancel</button>
                                    <button className="btn btn-next btn-sm" onClick={() => this.handleSubmit()}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </>
        );
    }
}

export default AddCustomer;
