import React, { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import { deleteQuoteService, getSelfQuotesService } from "../../services/quotes";

class SelfQuotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null,
            type: 'list',
            selectedQuote:{},
            quoteList: [
                // {
                //     "quoteId": "101",
                //     "product": "X-Ray",
                //     "customerName": "Raju",
                //     "volume": 100,
                //     "totalPrice": 11000,
                //     "discount": 0,
                //     "netPrice": 10000,
                //     "frieghtCost": 1000,
                //     "productCost": 10000,
                //     "Date": "2025-03-10",
                //     "Status": "Pending",
                //     "customerStatus": "Under Review"
                // }
            ]
        };

    }

    componentDidMount() {
        this.handleQuotes();
    }

    handleQuotes = async (payload) => {

        try {
            const response = await getSelfQuotesService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
                this.setState({ quoteList: response.data });
            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    handleDeleteQuote = (partObj) => {
        this.handleDeleteQuoteById({ "id": partObj.id });
    }

    handleEditQuote = (quoteObj) => {
        this.props.openCreateQuote(quoteObj);
    }

    handleDeleteQuoteById = async (payload) => {
            try {
                const response = await deleteQuoteService(payload);
                if (response && response.status.toLowerCase() === "success") {
                    toast('Quote deleted successfully', { type: "success", autoClose: 2000, position: "bottom-right" });
                    this.handleQuotes();                
                }
            } catch (error) {
                this.setState({ listLoader: false });
                // handleApiError(error, this.props);
            }
        };


    render() {

        return (
            <>

                <div className="px-3">
                    {/* Table Section */}
                    <div className="table-responsive">
                        <table className="table hover border-0 tool_listtable Request-table f-table">
                            <thead>
                                <tr>
                                    <th>Quote Name</th>
                                    <th>Product</th>
                                    <th>Customer Name</th>
                                    <th>Volume</th>
                                    <th>Total Price</th>
                                    <th>Discount</th>
                                    <th>Net Price</th>
                                    <th>Freight Cost</th>
                                    {/* <th>Product Cost</th> */}
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Customer Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.quoteList.length !== 0 ? (
                                    this.state.quoteList.map((requestObj, index) => (
                                        <tr key={index}>
                                            <td>{requestObj.quoteName}</td>
                                            <td>{requestObj.parts.length > 0 ? requestObj.parts[0].partName + ' (+' + (requestObj.parts.length - 1) + ')' : ''}</td>
                                            <td>{requestObj.customerName}</td>
                                            <td>{requestObj.totalVolume}</td>
                                            <td>{requestObj.totalPrice}</td>
                                            <td>{requestObj.totalDiscount}</td>
                                            <td>{requestObj.netPrice}</td>
                                            <td>{requestObj.freightCost}</td>
                                            {/* <td>{requestObj.productCost}</td> */}
                                            <td>{requestObj.createdDate}</td>
                                            <td>{requestObj.status}</td>
                                            <td>{requestObj.customerStatus}</td>
                                            <td className="actions-list">
                                                <img src="../assets/images/foreviz/icon-edit.svg" alt="Edit" onClick={() => this.handleEditQuote(requestObj)}  />
                                                <img src="../assets/images/foreviz/icon-delete.svg" alt="Delete" onClick={() => this.handleDeleteQuote(requestObj)}/>
                                                <img src="../assets/images/foreviz/icon-download.svg" alt="Download" />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="13" className="text-center">Data not available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default SelfQuotes; 
