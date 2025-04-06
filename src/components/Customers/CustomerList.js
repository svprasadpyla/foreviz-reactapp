import React, { Component } from "react";
import _ from 'lodash';
import { getCustomerService } from "../../services/customers";
import AddCustomer from "./AddCustomer";
import PaginatedList from "../Shared/pagination";
import AddUser from "../Users/AddUser";

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOrHideCustomers:true,
            addCustomer: false,
            addUser:false,
            pageNumber: 1,
            pageSize: 10,
            totalRecords: 0,
            customerList: [],
            selectedCustomer : {}
        };
    }

    componentDidMount() {
        this.handleCustomers({
            pageNumber: 0,
            pageSize: 10
        });
    }

    handleCustomers = async (payload) => {

        try {
            const response = await getCustomerService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
                this.setState({ "customerList": response.data.customerList, "totalRecords": response.data.totlElements, "pageNumber": response.data.pageNumber, "pageSize": response.data.pageSize })
            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    handlePageClick = (page) => {
        this.handleCustomers({ "pageNumber": page.selected, "pageSize": this.state.pageSize });
        this.setState({ pageNumber: page.selected });

    }

    createUser = (requestObj) => {
        this.setState({addUser:true,addCustomer:false,showOrHideCustomers:false,selectedCustomer:requestObj})
    }

    closeCreateUser = () => {
        this.setState({ addUser: false,addCustomer:false,showOrHideCustomers:true });
    }

    createCustomer = () => {
        this.setState({ addCustomer: true,addUser: false,showOrHideCustomers:false });
    }

    closeCreateCustomer = () => {
        this.setState({ addCustomer: false,addUser: false,showOrHideCustomers:true });
        this.handleCustomers({ pageNumber: 0, pageSize: 10 });
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
                onClick: this.createCustomer
            }
        ];
        return (
            <>
                <div className="px-3">
                    {/* <h6 onClick={() => this.createCustomer()}>Add</h6> */}
                    {
                        !this.state.addCustomer &&
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
                        this.state.addCustomer && <AddCustomer onHide={() => this.closeCreateCustomer()} />
                    }

                    {
                        this.state.addUser && <AddUser onHide={() => this.closeCreateUser()} customerId={this.state.selectedCustomer.id}/>
                    }

                    {
                        this.state.showOrHideCustomers &&
                        <div className="table-responsive">
                            <table className="table hover border-0 tool_listtable Request-table f-table">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Phone Number</th>
                                        <th>Email</th>
                                        <th>Customer Name</th>
                                        <th>Industry</th>
                                        <th>Country</th>
                                        <th>Currency</th>
                                        <th>Created Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.customerList.length !== 0 ?
                                            this.state.customerList.map((requestObj) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{requestObj.companyName}</td>
                                                            <td>{requestObj.phoneNumber}</td>
                                                            <td>{requestObj.email}</td>
                                                            <td>{requestObj.customerName}</td>
                                                            <td>{requestObj.industryId}</td>
                                                            <td>{requestObj.countryId}</td>
                                                            <td>{requestObj.currencyId}</td>
                                                            <td>{requestObj.createdDate}</td>
                                                            <td>{requestObj.status}</td>
                                                            <td className="actions-list">
                                                                <img src="../assets/images/foreviz/icon-add.svg" alt="Add User" onClick={() => this.createUser(requestObj)}/>
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
                                <div className='Onboard-pagenation d-flex justify-content-between align-items-center multi-pagenation'>
                                    
                                    <PaginatedList
                                        className=""
                                        page={this.state.pageNumber}
                                        size={this.state.pageSize}
                                        totalRecords={this.state.totalRecords}
                                        handlePageClick={this.handlePageClick}
                                    />
                                </div>
                            </table>
                        </div>
                    }

                </div>
            </>
        );
    }
}

export default CustomerList;
