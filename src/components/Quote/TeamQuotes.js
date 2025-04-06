import React, { Component } from "react";

class TeamQuotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null,
            quoteList: [
                {
                    "quoteId": "201",
                    "product": "X-Ray",
                    "customerName": "Member1",
                    "volume": 100,
                    "totalPrice": 11000,
                    "discount": 0,
                    "netPrice": 10000,
                    "frieghtCost": 1000,
                    "productCost": 10000,
                    "Date": "2025-03-10",
                    "Status": "Approved",
                    "customerStatus": "Approved"
                },
                {
                    "quoteId": "202",
                    "product": "X-Ray",
                    "customerName": "Member2",
                    "volume": 100,
                    "totalPrice": 11000,
                    "discount": 0,
                    "netPrice": 10000,
                    "frieghtCost": 1000,
                    "productCost": 10000,
                    "Date": "2025-03-10",
                    "Status": "Pending",
                    "customerStatus": "Pending"
                },
                {
                    "quoteId": "203",
                    "product": "X-Ray",
                    "customerName": "Member3",
                    "volume": 100,
                    "totalPrice": 11000,
                    "discount": 0,
                    "netPrice": 10000,
                    "frieghtCost": 1000,
                    "productCost": 10000,
                    "Date": "2025-03-10",
                    "Status": "Approved",
                    "customerStatus": "Approved"
                }
            ]
        };
        this.fileInputRef = React.createRef();
    }
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }



    render() {


        return (
            <>

<div className="px-3">


                <div className="table-responsive">
                    <table className="table hover border-0 tool_listtable Request-table f-table">
                        <thead>
                            <tr>
                                <th>Quote Id</th>
                                <th> Product</th>
                                <th>Customer Name</th>
                                <th>Volume</th>
                                <th>Total Price</th>
                                <th>Discount</th>
                                <th>Net Price</th>
                                <th>Frieght Cost</th>
                                <th>Product Cost</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Customer Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.quoteList.length !== 0 ?
                                    this.state.quoteList.map((requestObj) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{requestObj.quoteId}</td>
                                                    <td>{requestObj.product}</td>
                                                    <td>{requestObj.customerName}</td>
                                                    <td>{requestObj.volume}</td>
                                                    <td>{requestObj.totalPrice}</td>
                                                    <td>{requestObj.discount}</td>
                                                    <td>{requestObj.netPrice}</td>
                                                    <td>{requestObj.frieghtCost}</td>
                                                    <td>{requestObj.productCost}</td>
                                                    <td>{requestObj.Date}</td>
                                                    <td>{requestObj.Status}</td>
                                                    <td>{requestObj.customerStatus}</td>
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
                </div>
            </>
        );
    }
}

export default TeamQuotes;
