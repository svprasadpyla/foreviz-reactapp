import React, { Component } from "react";
import handleApiError from "../Shared/ErrorHandling";
import AddModule from "./AddModule";
import _ from 'lodash';
import { getModulesService } from "../../services/modules";

class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModule: false,
            moduleList: [
                {
                    moduleId: [301],
                    moduleName: "Raju",
                    category: "Core",
                    createdDate: "2025-01-01",
                    lastUpdated: "2025-01-01",
                    description: "Testing",
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
            const response = await getModulesService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {

            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    createModule = () => {
        this.setState({ addModule: !this.state.addModule });
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
                onClick: this.createModule
            }
        ];
        return (
            <>
                <div className="px-3">
                    {
                        !this.state.addModule &&
                        <div className="text-end mt-3">
                            <ul className="filter-section">
                                {iconTypes.map((icon, index) => (
                                    <li key={index} className={icon.className} onClick={icon.onClick || null}>
                                        <img src={icon.src} alt={icon.alt} />
                                    </li>
                                ))}
                            </ul>

                        </div>
                    }
                    {
                        !this.state.addModule &&
                        <div className="table-responsive">
                            <table className="table hover border-0 tool_listtable Request-table f-table">
                                <thead>
                                    <tr>
                                        <th>Module ID</th>
                                        <th>Module Name</th>
                                        <th>Category</th>
                                        <th>Created Date</th>
                                        <th>Last Updated</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.moduleList.length !== 0 ?
                                            this.state.moduleList.map((requestObj) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{requestObj.moduleId}</td>
                                                            <td>{requestObj.moduleName}</td>
                                                            <td>{requestObj.category}</td>
                                                            <td>{requestObj.createdDate}</td>
                                                            <td>{requestObj.lastUpdated}</td>
                                                            <td>{requestObj.description}</td>
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
                        this.state.addModule && <AddModule />
                    }
                </div>
            </>
        );
    }
}

export default ModuleList;
