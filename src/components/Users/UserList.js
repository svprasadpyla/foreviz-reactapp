import React, { Component } from "react";
import _ from 'lodash';
import AddUser from "./AddUser";
import PaginatedList from "../Shared/pagination";
import { getUsersService } from "../../services/users";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null,
            addUser: false,
            pageNumber: 0,
            pageSize: 10,
            totalRecords: 0,
            userList: []
        };
        this.fileInputRef = React.createRef();
    }

    componentDidMount() {
        this.handleUsers({ pageNumber: 0, pageSize: 10 });
    }

    handleUsers = async (payload) => {

        try {
            const response = await getUsersService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
                this.setState({ "userList": response.data.userList, "totalRecords": response.data.totlElements, "pageNumber": response.data.pageNumber, "pageSize": response.data.pageSize })
            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    handlePageClick = (page) => {
        this.handleUsers({ "pageNumber": page.selected, "pageSize": this.state.pageSize });
        this.setState({ pageNumber: page.selected });

    }

    createUser = () => {
        this.setState({ addUser: true });
    }

    closeCreateUser = () => {
        this.setState({ addUser: false });
        this.handleUsers({ pageNumber: 0, pageSize: 10 });
    }

    render() {

        return (
            <>
                <div className="px-3 mt-3">
                    {/* Filter section with icons */}
                    {this.state.addUser !== true && (
                        <div className="icon-container">
                            <div className="icon-wrapper">
                                <img
                                    src="../assets/images/foreviz/icon-add.svg"
                                    alt="Add"
                                    onClick={() => this.createUser()}
                                />
                            </div>
                        </div>
                    )}



                    {
                        !this.state.addUser &&
                        <div className="table-responsive">
                            <table className="table hover border-0 tool_listtable Request-table f-table">
                                <thead>
                                    <tr>
                                        <th className="w-20 ">
                                            <div className="custom-check-box">
                                                <label>
                                                    <input type="checkbox" />
                                                </label>
                                            </div>
                                        </th>

                                        <th className="pl-0">Name</th>
                                        <th>Phone Number</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Address</th>
                                        <th>Joining Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.userList.length !== 0 ?
                                            this.state.userList.map((requestObj) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <th className="w-20 ">
                                                                <div className="custom-check-box">
                                                                    <label>
                                                                        <input type="checkbox" />
                                                                    </label>
                                                                </div>
                                                            </th>
                                                            <td className="pl-0">{requestObj.userName}</td>
                                                            <td>{requestObj.phoneNumber}</td>
                                                            <td>{requestObj.email}</td>
                                                            <td>{requestObj.role}</td>
                                                            <td>{requestObj.address}</td>
                                                            <td>{requestObj.joiningDate}</td>
                                                            <td>{requestObj.status}</td>
                                                            <td className="actions-list">
                                                                <img src="../assets/images/foreviz/icon-edit.svg" alt="Edit" />
                                                                <img src="../assets/images/foreviz/icon-delete.svg" alt="Delete" />
                                                                {/* <img src="../assets/images/foreviz/icon-download.svg" alt="Download" /> */}
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            }) : <div className="text-center w-100">
                                                Data not available
                                            </div>
                                    }
                                </tbody>
                                <div className='Onboard-pagenation d-flex justify-content-between align-items-center multi-pagenation'>

                                    {/* <PaginatedList
                                        className=""
                                        page={this.state.pageNumber}
                                        size={this.state.pageSize}
                                        totalRecords={this.state.totalRecords}
                                        handlePageClick={this.handlePageClick}
                                    /> */}
                                </div>
                            </table>
                        </div>
                    }

                    {
                        this.state.addUser && <AddUser onHide={() => this.closeCreateUser()} />
                    }
                </div>
                {this.state.totalRecords > 10 &&
                    (
                        <div className='Onboard-pagenation multi-pagenation pagination-container mt-3'>
                            <PaginatedList
                                previousClassName="pagination-prev"
                                nextClassName="pagination-next"
                                breakLabel="..."
                                page={this.state.page}
                                size={this.state.size}
                                totalRecords={this.state.totalRecords}
                                handlePageClick={this.handlePageClick}
                                containerClassName="pagination"
                                activeClassName="active"
                            />
                        </div>
                    )
                }
            </>
        );
    }
}

export default UserList;
