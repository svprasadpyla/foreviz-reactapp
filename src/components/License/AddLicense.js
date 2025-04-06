import React, { Component } from "react";
import { createUserService } from "../../services/users";
import _ from 'lodash';

class AddLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerInfo: {
                licenseId: "",
                licenseName: "",
                type: "",
                maxUsers: 100,
                validity: 11000,
                startDate: 0,
                expiryDate: 10000,
                assignedRoles: [],
                description:"",
                status: ""
            }
        };
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleInputs = (e, field) => {
        this.setState({ field: e.target.value });
    };

    handleCreateUser = async (payload) => {

        try {
            const response = await createUserService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {

            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    render() {

        return (
            <>
                <div style={{ display: "flex", gap: "10px" }}>
                    <div className="from-group required w-100 mb-0 px-1">
                        <label className="mb-1 control-label">
                        License Name
                        </label>
                        <input
                            type="text"
                            value={this.state.licenseName}
                            className="form-control"
                            placeholder=""
                            name="licenseName"
                            autoComplete="off"
                            onChange={(e) => this.handleInputs(e, "licenseName")}
                        />
                    </div>
                    <div className="from-group required w-100 mb-0 px-1">
                        <label className="mb-1 control-label">
                        License Type
                        </label>
                        <input
                            type="text"
                            value={this.state.type}
                            className="form-control"
                            placeholder=""
                            name="type"
                            autoComplete="off"
                            onChange={(e) => this.handleInputs(e, "type")}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <div className="from-group required w-100 mb-0 px-1">
                        <label className="mb-1 control-label">
                        Max Users
                        </label>
                        <input
                            type="text"
                            value={this.state.maxUsers}
                            className="form-control"
                            placeholder=""
                            name="maxUsers"
                            autoComplete="off"
                            onChange={(e) => this.handleInputs(e, "maxUsers")}
                        />
                    </div>
                    
                    <div className="from-group required w-100 mb-0 px-1">
                        <label className="mb-1 control-label">
                        Validity Period
                        </label>
                        <input
                            type="text"
                            value={this.state.validity}
                            className="form-control"
                            placeholder=""
                            name="validity"
                            autoComplete="off"
                            onChange={(e) => this.handleInputs(e, "validity")}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <div className="from-group required w-100 mb-0 px-1">
                        <label className="mb-1 control-label">
                        Start Date
                        </label>
                        <input
                            type="text"
                            value={this.state.startDate}
                            className="form-control"
                            placeholder=""
                            name="startDate"
                            autoComplete="off"
                            onChange={(e) => this.handleInputs(e, "startDate")}
                        />
                    </div>
                    <div className="from-group required w-100 mb-0 px-1">
                        <label className="mb-1 control-label">
                        Expiry Date
                        </label>
                        <input
                            type="text"
                            value={this.state.expiryDate}
                            className="form-control"
                            placeholder=""
                            name="expiryDate"
                            autoComplete="off"
                            onChange={(e) => this.handleInputs(e, "expiryDate")}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <div className="from-group required w-100 mb-0 px-1">
                        <label className="mb-1 control-label">
                        Status
                        </label>
                        <input
                            type="text"
                            value={this.state.status}
                            className="form-control"
                            placeholder=""
                            name="status"
                            autoComplete="off"
                            onChange={(e) => this.handleInputs(e, "status")}
                        />
                    </div>
                    
                    <div className="from-group required w-100 mb-0 px-1">
                        <label className="mb-1 control-label">
                        Description
                        </label>
                        <input
                            type="text"
                            value={this.state.description}
                            className="form-control"
                            placeholder=""
                            name="description"
                            autoComplete="off"
                            onChange={(e) => this.handleInputs(e, "description")}
                        />
                    </div>
                </div>

                

            </>
        );
    }
}

export default AddLicense;
