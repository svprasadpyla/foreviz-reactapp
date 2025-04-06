import React, { Component } from "react";
import { createUserService } from "../../services/users";
import _ from 'lodash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                userName: "",
                phoneNumber: "",
                password: "",
                email: "",
                role: "",
                joiningDate: "",
                address: "",
                country: "",
                zipCode: "",
                ssn: "",
                userImage: "",
                customerId: props.customerId,
                permissions: []
            }
        };
    }

    handleInputs = (e, field) => {
        this.setState(prevState => ({
            userInfo: {
                ...prevState.userInfo,
                [field]: e.target.value
            }
        }));
    };

    handleCancel = () => {
        this.props.onHide();
    }

    handleSubmit = () => {
        console.log("User Info", this.state.userInfo);
        this.handleCreateUser(this.state.userInfo);

    }

    handleCreateUser = async (payload) => {

        try {
            const response = await createUserService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
                toast('User created successfully', { type: "success", autoClose: 2000, position: "bottom-right" });
                setTimeout(() => {
                    this.props.onHide();
                }, 3000);
            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    render() {
        return (
            <>
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="row f-form ">

                                {/* Name Field */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Name</label>
                                    <input
                                        type="text"
                                        value={this.state.userInfo.userName}
                                        className="form-control"
                                        name="name"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "userName")}
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Phone Number</label>
                                    <input
                                        type="text"
                                        value={this.state.userInfo.phoneNumber}
                                        className="form-control"
                                        name="phoneNumber"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "phoneNumber")}
                                    />
                                </div>

                                {/* Email */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Email</label>
                                    <input
                                        type="email"
                                        value={this.state.userInfo.email}
                                        className="form-control"
                                        name="email"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "email")}
                                    />
                                </div>

                                {/* Password */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Password</label>
                                    <input
                                        type="email"
                                        value={this.state.userInfo.password}
                                        className="form-control"
                                        name="password"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "password")}
                                    />
                                </div>

                                {/* Role */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Role</label>
                                    {/* <input
                                        type="text"
                                        value={this.state.userInfo.role}
                                        className="form-control"
                                        name="role"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "role")}
                                    /> */}
                                    <select
                                        className="form-control"
                                        value={this.state.userInfo.role}
                                        onChange={(e) => this.handleInputs(e, "role")}
                                    >
                                        <option value="SALESEMPLOYEE">SALESEMPLOYEE</option>
                                        <option value="SALESMANAGER">SALESMANAGER</option>
                                        <option value="INVENTORYEMPLOYEE">INVENTORYEMPLOYEE</option>
                                        <option value="INVENTORYMANAGER">INVENTORYMANAGER</option>
                                        <option value="PRICINGEMPLOYEE">PRICINGEMPLOYEE</option>
                                        <option value="PRICINGMANAGER">PRICINGMANAGER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                </div>

                                {/* Joining Date */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Joining Date</label>
                                    {/* <input
                                        type="date"
                                        value={this.state.userInfo.joiningDate}
                                        className="form-control"
                                        name="joiningDate"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "joiningDate")}
                                    /> */}
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={this.state.userInfo.joiningDate || ""}
                                        onChange={(e) => this.handleInputs(e, "joiningDate")}
                                        placeholder="Start Date"
                                    />
                                </div>

                                {/* Address */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Address</label>
                                    <input
                                        type="text"
                                        value={this.state.userInfo.address}
                                        className="form-control"
                                        name="address"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "address")}
                                    />
                                </div>

                                {/* Country */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Country</label>
                                    <input
                                        type="text"
                                        value={this.state.userInfo.country}
                                        className="form-control"
                                        name="country"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "country")}
                                    />
                                </div>

                                {/* Zip Code */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Zipcode</label>
                                    <input
                                        type="text"
                                        value={this.state.userInfo.zipCode}
                                        className="form-control"
                                        name="zipCode"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "zipCode")}
                                    />
                                </div>

                                {/* SSN */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">SSN</label>
                                    <input
                                        type="text"
                                        value={this.state.userInfo.ssn}
                                        className="form-control"
                                        name="ssn"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "ssn")}
                                    />
                                </div>

                                {/* Status */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Status</label>
                                    <input
                                        type="text"
                                        value={this.state.userInfo.status}
                                        className="form-control"
                                        name="status"
                                        autoComplete="off"
                                        onChange={(e) => this.handleInputs(e, "status")}
                                    />
                                </div>

                                <div className="col-md-6 mb-2  form-group required">
                                    <label className="control-label">Customer Logo</label>

                                    <div className="input-group">
                                        <input type="file" class="form-control p-1" id="inputGroupFile02" />
                                    </div>

                                </div>

                                <div className="col-12 mt-3 border-bottom pb-2">
                                    <label className="mb-2">Permissions:</label>
                                    <div className="col-md-12 f-check-box">
                                        <div className="custom-check-box">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="manageInventory"
                                                    name="permissions"
                                                    value="Manage Inventory"
                                                    checked={this.state.permissions === "Manage Inventory"}
                                                    onChange={(e) => this.handleRadioChange(e)}
                                                />
                                                Manage Inventory</label>
                                        </div>

                                        <div className="custom-check-box">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="createQuotes"
                                                    name="permissions"
                                                    value="Create Quotes"
                                                    checked={this.state.permissions === "Create Quotes"}
                                                    onChange={(e) => this.handleRadioChange(e)}
                                                />
                                                Create Quotes</label>
                                        </div>

                                        <div className="custom-check-box">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="approveQuotes"
                                                    name="permissions"
                                                    value="Approve Quotes"
                                                    checked={this.state.permissions === "Approve Quotes"}
                                                    onChange={(e) => this.handleRadioChange(e)}
                                                />
                                                Approve Quotes</label>
                                        </div>

                                        <div className="custom-check-box">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="analyzePricing"
                                                    name="permissions"
                                                    value="Analyze Pricing"
                                                    checked={this.state.permissions === "Analyze Pricing"}
                                                    onChange={(e) => this.handleRadioChange(e)}
                                                />
                                                Analyze Pricing</label>
                                        </div>

                                        <div className="custom-check-box">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="setPricingStrategy"
                                                    name="permissions"
                                                    value="Set Pricing Strategy"
                                                    checked={this.state.permissions === "Set Pricing Strategy"}
                                                    onChange={(e) => this.handleRadioChange(e)}
                                                />
                                                Set Pricing Strategy</label>
                                        </div>

                                        <div className="custom-check-box">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="manageUsers"
                                                    name="permissions"
                                                    value="Manage Users"
                                                    checked={this.state.permissions === "Manage Users"}
                                                    onChange={(e) => this.handleRadioChange(e)}
                                                />
                                                Manage Users</label>
                                        </div>



                                        <div className="custom-check-box">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="manageUsers"
                                                    name="permissions"
                                                    value="Manage Users"
                                                />
                                                Manage Users
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-3 d-flex justify-content-end">
                                    <button className="btn btn-cancel btn-sm mr-2" onClick={() => this.handleCancel()}>Cancel</button>
                                    <button className="btn btn-next btn-sm" onClick={() => this.handleSubmit()}>Save</button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AddUser;
