import React, { Component } from "react";
import handleApiError from "../Shared/ErrorHandling";
import { getPurchaseHistoryService } from "../../services/inventory";
import _, { filter } from 'lodash';

class InventoryPurchaseHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null,
            showFilter: false,
            movingPrice: 0,
            lastPostingDate: "2025-12-02",
            materialMoved: null,
            expectedQuantity: "",
            purchaseList: [
                {
                    "poNumber": "101",
                    "vendor": "Raju",
                    "plant": 1000,
                    "poDate": "2025-03-10",
                    "qtyOrdered": 100,
                    "unitPrice": 2,
                    "totalValue": 10000,
                    "grDate": "2025-03-10",
                    "invoiceNumber": "INV-123",
                    "status": "Done"
                },
                {
                    "poNumber": "101",
                    "vendor": "Raju",
                    "plant": 1000,
                    "poDate": "2025-03-10",
                    "qtyOrdered": 100,
                    "unitPrice": 2,
                    "totalValue": 10000,
                    "grDate": "2025-03-10",
                    "invoiceNumber": "INV-123",
                    "status": "Done"
                }
            ]
        };

        this.fileInputRef = React.createRef(); // ✅ Fixed file input reference
    }

    componentDidMount() {
        this.handleInventoryPurchaseData({
            pageNumber: 0,
            size: 10
        });
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleInventoryPurchaseData = async (payload) => {

        try {
            const response = await getPurchaseHistoryService(payload);
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
    handleFilter = () => {
        this.setState((prevState) => ({ showFilter: !prevState.showFilter }));
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

                
                {this.state.showFilter && (
                    <div className="f-filter-container">
                        <div className="f-filter-section">

                            <div className="f-filter-item">

                                <p className="f-filter-item-name">Moving price</p>

                                <input type="range" min="0" max="80000.94" />
                                <div className="input-group">
                                    <input type="text" value="0.00" readOnly />
                                    <input type="text" value="80,000.94" readOnly />
                                </div>
                            </div>


                            <div className="f-filter-item">
                                <p className="f-filter-item-name">Material ever Moved (890)</p>

                                <div className="custom-check-box mb-2">
                                    <label>
                                        <input type="checkbox" />
                                        Yes <span className="dot f-green"></span>
                                    </label>
                                </div>
                                <div className="custom-check-box">
                                    <label>
                                        <input type="checkbox" />
                                        No <span className="dot f-red"></span>
                                    </label>
                                </div>

                            </div>


                            <div className="f-filter-item">
                                <p className="f-filter-item-name">Last posting date (890)</p>
                                <input type="range" min="2025-01-01" max="2025-12-31" />
                                <div className="input-group">
                                    <input type="text" value="12/02/2025" readOnly />
                                    <input type="text" value="12/02/2025" readOnly />
                                </div>
                            </div>


                            <div className="f-filter-item">
                                <p className="f-filter-item-name">Expected quantity</p>
                                
                                <div className="custom-check-box mb-2">
                                    <label>
                                        <input type="checkbox" />
                                        Above max <img src="../../assets/images/icons/flag-alt-above.svg"/>
                                    </label>
                                </div>

                                <div className="custom-check-box  mb-2">
                                    <label>
                                        <input type="checkbox" />
                                        Below max <img src="../../assets/images/icons/flag-alt-below.svg"/>
                                    </label>
                                </div>
                                <div className="custom-check-box">
                                    <label>
                                        <input type="checkbox" />
                                        Below min<img src="../../assets/images/icons/flag-alt-min-below.svg"/>
                                    </label>
                                </div>
                            </div>


                            <div className="f-filter-item additional-selection">
                                <p className="f-filter-item-name">Additional selection</p>
                                <p className="mb-2">Movement type: Stock Adjustment</p>
                                <p>Unrestricted: 0789 - 8907</p>
                                <button className="apply-btn mt-2">Apply</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="table-responsive">
                    <table className="table hover border-0 tool_listtable Request-table f-table">
                        <thead>

                            <tr>
                                <th>PO Number</th>
                                <th>Vendor</th>
                                <th>Plant</th>
                                <th>PO Date</th>
                                <th>Qty Ordered</th>
                                <th>Unit Price</th>
                                <th>Total Value</th>
                                <th>GR Date</th>
                                <th>Invoice No</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.purchaseList.length !== 0 ?
                                    this.state.purchaseList.map((requestObj) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{requestObj.poNumber}</td>
                                                    <td>{requestObj.vendor}</td>
                                                    <td>{requestObj.plant}</td>
                                                    <td>{requestObj.poDate}</td>
                                                    <td>{requestObj.qtyOrdered}</td>
                                                    <td>{requestObj.unitPrice}</td>
                                                    <td>{requestObj.totalValue}</td>
                                                    <td>{requestObj.grDate}</td>
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

export default InventoryPurchaseHistory;
