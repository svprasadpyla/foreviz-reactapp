import React, { Component } from "react";
import handleApiError from "../Shared/ErrorHandling";
import { getSalesHistoryService } from "../../services/inventory";
import _ from 'lodash';

class InventorySaleHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null,
            saleList: [
                {
                    "saleOrder": "101",
                    "customer": "Raju",
                    "plant": 1000,
                    "orderedDate": "2025-03-10",
                    "qtySold": 100,
                    "unitPrice": 2,
                    "totalValue": 10000,
                    "deliveryDate": "2025-03-10",
                    "invoiceNumber": "INV-123",
                    "status": "Done"
                },
                {
                    "saleOrder": "101",
                    "customer": "Raju",
                    "plant": 1000,
                    "orderedDate": "2025-03-10",
                    "qtySold": 100,
                    "unitPrice": 2,
                    "totalValue": 10000,
                    "deliveryDate": "2025-03-10",
                    "invoiceNumber": "INV-123",
                    "status": "Done"
                },
                {
                    "saleOrder": "101",
                    "customer": "Raju",
                    "plant": 1000,
                    "orderedDate": "2025-03-10",
                    "qtySold": 100,
                    "unitPrice": 2,
                    "totalValue": 10000,
                    "deliveryDate": "2025-03-10",
                    "invoiceNumber": "INV-123",
                    "status": "Done"
                }
            ]
        };
        this.fileInputRef = React.createRef(); // ✅ Fixed file input reference
    }

    componentDidMount() {
        this.handleInventorySalesData({
            pageNumber: 0,
            size: 10
        });
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleInventorySalesData = async (payload) => {

        try {
            const response = await getSalesHistoryService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {

            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    handleClick = (index) => {
        this.setState({ activeIndex: index });
    };

    handleFileUpload = () => {
        this.fileInputRef.current.click();
    };

    render() {


        return (
            <>


 {/* Filter section with icons */}
 <div className="icon-container">
                    <div className="icon-wrapper">
                        <img src="../assets/images/foreviz/icon-grid.svg" alt="Grid" />
                    </div>
                    <div className="icon-wrapper">
                        <img src="../assets/images/foreviz/icon-list.svg" alt="List" />
                    </div>
                    <div className="icon-wrapper">
                        <img src="../assets/images/foreviz/icon-az.svg" alt="Sort A-Z" />
                    </div>
                    <div className="icon-wrapper">
                        <img src="../assets/images/foreviz/icon-filter.svg" alt="Filter"
                            onClick={this.handleFilter}
                        />
                    </div>
                    <div className="icon-wrapper" onClick={this.handleFileUpload}>
                        <img src="../assets/images/foreviz/icon-upload.svg" alt="Upload" className="rotate-180" />
                    </div>
                    <div className="icon-wrapper">
                        <img
                            src="../assets/images/foreviz/icon-add.svg"
                            alt="Add"
                            onClick={() => this.handleQuoteType("add")}
                        />
                    </div>
                    <input type="file" ref={this.fileInputRef} style={{ display: "none" }} />
                </div> 
                <div className="table-responsive">
                    <table className="table hover border-0 tool_listtable Request-table f-table">
                        <thead>

                            <tr>
                                <th>Sales Order</th>
                                <th>Customer</th>
                                <th>Plant</th>
                                <th>Order Date</th>
                                <th>Qty Sold</th>
                                <th>Unit Price</th>
                                <th>Total Value</th>
                                <th>Delivery Date</th>
                                <th>Invoice No</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.saleList.length !== 0 ?
                                    this.state.saleList.map((requestObj) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{requestObj.saleOrder}</td>
                                                    <td>{requestObj.customer}</td>
                                                    <td>{requestObj.plant}</td>
                                                    <td>{requestObj.orderedDate}</td>
                                                    <td>{requestObj.qtySold}</td>
                                                    <td>{requestObj.unitPrice}</td>
                                                    <td>{requestObj.totalValue}</td>
                                                    <td>{requestObj.deliveryDate}</td>
                                                    <td>{requestObj.invoiceNumber}</td>
                                                    <td>{requestObj.status}</td>
                                                </tr>
                                            </>
                                        )
                                    }) : "Data not available"
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default InventorySaleHistory;
