import React, { Component } from "react";
import _ from 'lodash';
import { getCustomerService } from "../../services/customers";
import AddLicense from "./AddLicense";

class LicenseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCustomer: false,
            licenseList: [
                {
                    licenseId: "101",
                    licenseName: "Raju",
                    type: "10001",
                    maxUsers: 100,
                    validity: 11000,
                    startDate: 0,
                    expiryDate: 10000,
                    assignedRoles: [],
                    status: "Pending"
                }
            ]
        };
    }

    componentDidMount() {
        this.handleSelfQuotes({
            pageNumber: 0,
            size: 10
        });
    }

    handleSelfQuotes = async (payload) => {

        try {
            const response = await getCustomerService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {

            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    createCustomer = () => {
        this.setState({ addCustomer: !this.state.addCustomer });
    }

    render() {

        return (
            <>
            <h6 onClick={() => this.createCustomer()}>Add</h6>
                {
                    this.state.addCustomer && <AddLicense />
                }
                
                {
                    !this.state.addCustomer && <table className="table hover border-0 tool_listtable Request-table  ">
                        <thead>
                            <tr>
                                <th>License ID</th>
                                <th>License Name</th>
                                <th>Type</th>
                                <th>Max Users</th>
                                <th>Validity</th>
                                <th>Start Date</th>
                                <th>Expiry Date</th>
                                <th>Assigned roles</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.licenseList.length !== 0 ?
                                    this.state.licenseList.map((requestObj) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{requestObj.licenseId}</td>
                                                    <td>{requestObj.licenseName}</td>
                                                    <td>{requestObj.type}</td>
                                                    <td>{requestObj.maxUsers}</td>
                                                    <td>{requestObj.validity}</td>
                                                    <td>{requestObj.startDate}</td>
                                                    <td>{requestObj.expiryDate}</td>
                                                    <td>{requestObj.assignedRoles}</td>
                                                    <td>{requestObj.status}</td>
                                                </tr>
                                            </>
                                        )
                                    }) : "Data not available"
                            }
                        </tbody>
                    </table>
                }


            </>
        );
    }
}

export default LicenseList;
