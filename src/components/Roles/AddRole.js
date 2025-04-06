import React, { Component } from "react";
import _ from 'lodash';
import { createRoleService } from "../../services/roles";

class AddRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                permissions: [],
                roleName: "",
                description: "",
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
            const response = await createRoleService(payload);
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
                            Role Name
                        </label>
                        <input
                            type="text"
                            value={this.state.roleName}
                            className="form-control"
                            placeholder=""
                            name="roleName"
                            autoComplete="off"
                            onChange={(e) => this.handleInputs(e, "roleName")}
                        />
                    </div>
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
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
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
                    
                    <div className="from-group required w-100 mb-0 px-1">
                        <label className="mb-1 control-label">
                            Permissions
                        </label>
                        <input
                            type="text"
                            value={this.state.customerAddress}
                            className="form-control"
                            placeholder=""
                            name="status"
                            autoComplete="off"
                            onChange={(e) => this.handleInputs(e, "status")}
                        />
                    </div>
                </div>

            </>
        );
    }
}

export default AddRole;
