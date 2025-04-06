import React, { Component } from "react";
import PartDetails from "./PartDetails";
import PriceTrends from "./PriceTrends";
import AddNewPart from "./AddNewPart";
import TableComponent from "../Inventory/TableComponent";

class PriceAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "partDetails"
        };
    }

    handleSelectedType = (type) => {
        this.setState({ selectedTab: type });
    };

    closeCreatePart = () => {
        this.setState({ selectedTab: "partDetails" });
    }

    render() {
        return (
            <>
                {
                    this.state.selectedTab !== "add" &&
                    <div>
                        <ul className="custom-tabs">
                            <li
                                className={`custom-tabs-link ${this.state.selectedTab === "partDetails" ? "active" : ""}`}
                                onClick={() => this.handleSelectedType("partDetails")}
                            >
                                Parts Details
                            </li>
                            <li
                                className={`custom-tabs-link ${this.state.selectedTab === "priceTrends" ? "active" : ""}`}
                                onClick={() => this.handleSelectedType("priceTrends")}
                            >
                                Price Trends
                            </li>
                        </ul>
                        {/* <div className="icon-container px-3">
                         
                            <div className="icon-wrapper">
                                <img
                                    src="../assets/images/foreviz/icon-add.svg"
                                    alt="Add"
                                    onClick={() => this.handleSelectedType("add")}
                                />
                            </div>
                        </div> */}
                    </div>
                }

                <div className="px-3">
                    {this.state.selectedTab === "partDetails" && <PartDetails />}
                    {this.state.selectedTab === "priceTrends" && <PriceTrends />}
                    {/* {this.state.selectedTab === "add" && <AddNewPart onHide={() => this.closeCreatePart()} />} */}
                </div>
            </>
        );
    }
}

export default PriceAnalysis;
