import React, { Component, createRef } from "react";
import { FaFilter } from "react-icons/fa";
import { getInventoryListService } from "../../services/inventory";
import _ from "lodash";
import 'react-toastify/dist/ReactToastify.css';
import PaginatedList from "../Shared/pagination";
import ManageTag from "./ManageTag";
import { getTagsService } from "../../services/tag";
import AddNewPart from "../Analysis/AddNewPart";

class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventoryList: [],
            filters: {},
            selectedFilterKey: '',
            selectedFilterValue: 0,
            selectedDropdownValue: 'CONTAINS',
            selectedFilterType : '',
            filterToTagList: [],
            manageTagList: [],
            manageTag: false,
            showPopup: null,
            page: 0,
            size: 10,
            totalRecords: 10,
            addPart: false,
            partDetails: true
        };
        this.popupRef = createRef();
    }

    componentDidMount() {
        this.handleInventoryData({ "page": 0, "size": this.state.size, "filters": this.state.filterToTagList });
        this.handleTagData();
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.popupRef.current && !this.popupRef.current.contains(event.target)) {
            this.setState({ showPopup: null, filters: {}, selectedFilterKey: '', selectedFilterValue: '' });
        }
    };

    setFilter = (columnId, value,type) => {
        this.setState({ selectedFilterKey: columnId, selectedFilterValue: type === "number" ? Number(value) : value, selectedFilterType : type });
    };

    handleDropdown = (e) => {
        this.setState({ selectedDropdownValue: e.target.value });
    }

    handleApplyFilter = () => {
        let filterList = this.state.filterToTagList;
        let selectedKey = this.state.selectedFilterKey;

        if (!Array.isArray(filterList)) {
            filterList = [];
        }

        filterList = [...filterList, {
            "field": this.state.selectedFilterKey,
            //"operation": (selectedKey === "partNumber" || selectedKey === "partName" || selectedKey === "customerId") ? "CONTAINS" : this.state.selectedDropdownValue,
            "operation": this.state.selectedFilterType === "number" ? this.state.selectedDropdownValue : "CONTAINS",
            "value": this.state.selectedFilterValue
        }];

        this.setState({ filterToTagList: filterList });

        this.handleInventoryData({ "page": 0, "size": this.state.size, "filters": filterList });

    }

    togglePopup = (columnId) => {
        this.setState((prevState) => ({
            showPopup: prevState.showPopup === columnId ? null : columnId
        }));
    };

    handleTagData = async (payload) => {
        try {
            const response = await getTagsService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
                this.setState({ manageTagList: response.data });
            }
        } catch (error) {
            this.setState({ listLoader: false });
            // handleApiError(error, this.props);
        }
    };

    filterData = () => {
        const { inventoryList, filters } = this.state;
        return inventoryList.filter((row) =>
            Object.keys(filters).every((key) =>
                row[key].toString().toLowerCase().includes(filters[key].toLowerCase())
            )
        );
    };

    handleInventoryData = async (payload) => {
        try {
            const response = await getInventoryListService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
                console.log("Inventory List", response.data);
                this.setState({ inventoryList: response.data.parts, totalRecords: response.data.totalItems });
            }
        } catch (error) {
            this.setState({ listLoader: false });
            // handleApiError(error, this.props);
        }
    };

    handlePageClick = (page) => {
        this.handleInventoryData({ "page": page.selected, "size": this.state.size, "filters": this.state.filterToTagList });
    }

    openManageTag = () => {
        this.setState({ manageTag: true, addPart: false, partDetails: true });
    }

    closeManageTag = () => {
        this.setState({ manageTag: false, addPart: false, partDetails: true });
    }

    openAddPart = () => {
        this.setState({ addPart: true, manageTag: false, partDetails: false });
    }

    closeAddPart = () => {
        this.setState({ addPart: false, manageTag: false, partDetails: true });
    }

    render() {
        const columns = [
            { Header: "Part ID", accessor: "partNumber" },
            { Header: "Part Name", accessor: "partName" },
            { Header: "Category", accessor: "category" },
            { Header: "Annotation", accessor: "annotation" },
            { Header: "Customer", accessor: "customerId" },
            { Header: "Tag", accessor: "tag" },
            { Header: "Cost", accessor: "cost" },
            { Header: "Price", accessor: "price" },
            { Header: "Predictive Price", accessor: "predictivePrice" },
            { Header: "Deviation", accessor: "deviation" },
            { Header: "Lead Time", accessor: "leadTime" },
            { Header: "Predictive Lead Time", accessor: "predictiveLeadTime" },
            { Header: "Other Sellers Count", accessor: "otherSellersCount" },
            { Header: "Procuring Opportunity", accessor: "procuringOpportunity" },
            { Header: "Pricing Status", accessor: "pricingStatus" },
            { Header: "Sales Volume", accessor: "salesVolume" },
            { Header: "Revenue", accessor: "revenue" },
            { Header: "Region", accessor: "region" },
            { Header: "Source", accessor: "source" },
            { Header: "Analysis Date", accessor: "analysisDate" },
            { Header: "Movement Type", accessor: "movementType" },
            { Header: "Moving Price", accessor: "movingPrice" },
            { Header: "Min Safety Stock", accessor: "minimumSafetyStock" },
            { Header: "Maximum Stock Level", accessor: "maximumStockLevel" },
            { Header: "Unrestricted", accessor: "unrestricted" },
            { Header: "Delivery Quantity", accessor: "deliveryQuantity" },
            { Header: "Expected Quantity", accessor: "expectedQuantity" },
            { Header: "Reminder till Max Level", accessor: "reminderTillMaxLevel" },
            { Header: "Last Posting Date", accessor: "lastPostingDate" },
        ];

        const filteredData = this.filterData();

        return (
            <>

                {
                    this.state.manageTag && <ManageTag filtersToTag={this.state.filterToTagList} onHide={this.closeManageTag} />
                }

                {
                    this.state.addPart && <AddNewPart onHide={() => this.closeAddPart()} />
                }

                {
                    this.state.partDetails &&
                    <div>
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
                                    onClick={() => this.openManageTag()}
                                />
                            </div>

                            <div className="icon-wrapper" onClick={() => this.openAddPart()}>
                                <img
                                    src="../assets/images/foreviz/icon-add.svg"
                                    alt="Add"
                                    
                                />
                            </div>
                            <input type="file" ref={this.fileInputRef} style={{ display: "none" }} />
                        </div>
                        <div className="table-container">
                            <table border="1" className="table hover border-0 tool_listtable Request-table f-table">
                                <thead className="head-stycsticky">
                                    <tr className="th-background">
                                        {columns.map((column) => (
                                            <th key={column.accessor} style={{ position: "relative", padding: "10px" }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    <span>{column.Header}</span>
                                                    <FaFilter
                                                        onClick={() => this.togglePopup(column.accessor)}
                                                        style={{ cursor: "pointer", color: "gray" }}
                                                    />
                                                </div>
                                                {this.state.showPopup === column.accessor && (
                                                    <div ref={this.popupRef} className="filter-popup">
                                                        <p className="mb-2">{column.Header}</p>
                                                        {
                                                            (column.accessor === "partNumber" || column.accessor === "partName" || column.accessor === "customerId" || column.accessor == "annotation" ||
                                                                column.accessor === "category" || column.accessor === "procuringOpportunity" || column.accessor === "pricingStatus" || column.accessor == "region" || column.accessor === "source" || column.accessor == "movementType"
                                                            ) && (
                                                                <input
                                                                    type="text"
                                                                    className="filter-input"
                                                                    //value={this.state.filters[column.accessor] || ""}
                                                                    value={this.state.selectedFilterValue || ""}
                                                                    onChange={(e) => this.setFilter(column.accessor, e.target.value,e.target.type)}
                                                                    placeholder={`Filter ${column.Header}`}
                                                                />
                                                            )
                                                        }
                                                        {
                                                            column.accessor === "tag" && (
                                                                <select className="filter-input">
                                                                    <option value="">Select a Tag</option>
                                                                    {

                                                                        this.state.manageTagList.map((tag) => (
                                                                            <option key={tag.tagName} value={tag.tagName}>
                                                                                {tag.tagName}
                                                                            </option>
                                                                        ))}
                                                                </select>
                                                            )
                                                        }

                                                        {/* {
                                                    column.accessor === "partNumber" && (
                                                        <select className="filter-input">
                                                            <option value="">Select a Part ID</option>
                                                            {this.state.partID.map((part) => (
                                                                <option key={part.id} value={part.id}>
                                                                    {part.id}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )
                                                }

                                                {
                                                    column.accessor === "partName" && (
                                                        <select className="filter-input">
                                                            <option value="">Select a Part Number</option>
                                                            {this.state.partName.map((part) => (
                                                                <option key={part.number} value={part.number}>
                                                                    {part.number}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )
                                                }
                                                {
                                                    column.accessor === "customer" && (
                                                        <select className="filter-input">
                                                            {this.state.customers.map((customer, index) => (
                                                                <option key={index} value={customer.name}>{customer.name}</option>
                                                            ))}
                                                        </select>
                                                    )
                                                } */}


                                                        {(
                                                            column.accessor === "cost"
                                                            || column.accessor === "price"
                                                            || column.accessor === "predictivePrice"
                                                            || column.accessor === "deviation"
                                                            || column.accessor === "leadTime"
                                                            || column.accessor === "predictiveLeadTime"
                                                            || column.accessor === "otherSellersCount"
                                                            || column.accessor === "salesVolume"
                                                            || column.accessor === "revenue"
                                                            || column.accessor === "movingPrice"
                                                            || column.accessor === "minimumSafetyStock"
                                                            || column.accessor === "maximumStockLevel"
                                                            || column.accessor === "unrestricted"
                                                            || column.accessor === "deliveryQuantity"
                                                            || column.accessor === "expectedQuantity"
                                                            || column.accessor === "reminderTillMaxLevel"

                                                        ) && (
                                                                <>
                                                                    <input
                                                                        type="number"
                                                                        className="filter-input"
                                                                        //value={this.state.filters[column.accessor] || ""}
                                                                        value={this.state.selectedFilterValue || ""}
                                                                        onChange={(e) => this.setFilter(column.accessor, e.target.value,e.target.type)}
                                                                        placeholder={`Filter ${column.Header}`}
                                                                    />
                                                                    <select
                                                                        className="filter-input" onChange={(e) => this.handleDropdown(e)}
                                                                    >
                                                                        <option value="EQUAL">Equal To</option>
                                                                        <option value="GREATER_THAN">Greater Than</option>
                                                                        <option value="GREATER_THAN_EQUAL">Grater Than or Equal To</option>
                                                                        <option value="LESS_THAN">Less Than</option>
                                                                        <option value="LESS_THAN_EQUAL">Less Than or Equal To</option>
                                                                    </select>
                                                                </>
                                                            )}
                                                        {column.accessor === "lastPostingDate" && (
                                                            <div className="date-filter">
                                                                <input
                                                                    type="date"
                                                                    className="filter-input"
                                                                    value={this.state.filters.startDate || ""}
                                                                    onChange={(e) => this.setFilter("startDate", e.target.value,e.target.type)}
                                                                    placeholder="Start Date"
                                                                />
                                                                <input
                                                                    type="date"
                                                                    className="filter-input ml-2"
                                                                    value={this.state.filters.endDate || ""}
                                                                    onChange={(e) => this.setFilter("endDate", e.target.value,e.target.type)}
                                                                    placeholder="End Date"
                                                                />
                                                            </div>
                                                        )}

                                                        {/* {column.accessor === "momentType" && (
                                                    <select
                                                        className="filter-input ml-2"
                                                        value={this.state.filters[column.accessor] || ""}
                                                        onChange={(e) => this.setFilter(column.accessor, e.target.value)}
                                                    >
                                                        <option value="">Select Type</option>
                                                        <option value="Routine">Routine</option>
                                                        <option value="Urgent">Urgent</option>
                                                        <option value="Normal">Normal</option>
                                                        <option value="Critical">Critical</option>
                                                    </select>
                                                )} */}

                                                        <div className="d-flex align-items-center justify-content-between mt-3">
                                                            <button type="button" className="btn btn-xs btn-cancel">Cancel</button>
                                                            <button type="button" className="btn btn-xs btn-next" onClick={() => this.handleApplyFilter()}>Apply</button>
                                                        </div>

                                                    </div>
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((row) => (
                                        <tr key={row.id}>
                                            {columns.map((column) => (
                                                <td key={column.accessor}>{row[column.accessor]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                                {filteredData.length > 10 &&
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


                            </table>
                        </div>
                    </div>
                }


            </>
        );
    }
}

export default TableComponent;
