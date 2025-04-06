import React, { Component } from "react";
import handleApiError from "../Shared/ErrorHandling";
import AddRole from "./AddRole";
import _ from 'lodash';
import { getRolesService } from "../../services/roles";

class RoleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addRole: false,
            roleList: [
                {
                    permissions: [],
                    roleName: "Raju",
                    description: "+919123456789",
                    createdDate: "2025-01-01",
                    lastUpdated: "2025-01-01",
                    status: "Unknown"
                }
            ]
        };
    }

    componentDidMount() {
        this.handleUsersData({
            pageNumber: 0,
            size: 10
        });
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleUsersData = async (payload) => {

        try {
            const response = await getRolesService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {

            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    createRole = () => {
        this.setState({ addRole: !this.state.addRole });
    }

    render() {
        const iconTypes = [
            { className: "grid filter-item", src: "../assets/images/foreviz/icon-grid.svg", alt: "Grid" },
            { className: "list filter-item", src: "../assets/images/foreviz/icon-list.svg", alt: "List" },
            { className: "sort filter-item", src: "../assets/images/foreviz/icon-az.svg", alt: "Sort A-Z" },
            { className: "filter filter-item", src: "../assets/images/foreviz/icon-filter.svg", alt: "Filter" },
            {
                className: "add filter-item",
                src: "../assets/images/foreviz/icon-add.svg",
                alt: "Add",
                onClick: this.createRole
            }
        ];

        return (
            <>
                <div className="px-3">
                    
                    {
                        !this.state.addRole &&
                        <div className="text-end mt-3">
                            <ul className="filter-section">
                                {iconTypes.map((icon, index) => (
                                    <li key={index} className={icon.className} onClick={icon.onClick || null}>
                                        <img src={icon.src} alt={icon.alt} />
                                    </li>
                                ))}
                            </ul>
                            <input type="file" ref={this.fileInputRef} style={{ display: "none" }} />
                        </div>
                    }
                    {
                        !this.state.addRole &&
                        <div className="table-responsive">
                            <table className="table hover border-0 tool_listtable Request-table f-table">
                                <thead>
                                    <tr>
                                        <th>Role Name</th>
                                        <th>Permissions</th>
                                        <th>Description</th>
                                        <th>Created Date</th>
                                        <th>Last Updated</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.roleList.length !== 0 ?
                                            this.state.roleList.map((requestObj) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{requestObj.roleName}</td>
                                                            <td>{requestObj.permissions}</td>
                                                            <td>{requestObj.description}</td>
                                                            <td>{requestObj.createdDate}</td>
                                                            <td>{requestObj.lastUpdated}</td>
                                                            <td>{requestObj.status}</td>
                                                            <td className="actions-list">
                                                                <img src="../assets/images/foreviz/icon-edit.svg" alt="Edit" />
                                                                <img src="../assets/images/foreviz/icon-delete.svg" alt="Delete" />
                                                                <img src="../assets/images/foreviz/icon-download.svg" alt="Download" />
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            }) : "Data not available"
                                    }
                                </tbody>
                            </table>
                        </div>
                    }

                    {
                        this.state.addRole && <AddRole />
                    }
                </div>
            </>
        );
    }
}

export default RoleList;
