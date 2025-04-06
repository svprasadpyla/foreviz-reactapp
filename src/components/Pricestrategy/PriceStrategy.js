import React, { Component } from "react";
import ValueDriver from "./ValueDriver";
import ConfidenceLevel from "./ConfidenceLevel";
import Execution from "./Execution";
import RevenueProjection from "./RevenueProjection";
import PartsOverview from "./PartsOverview";

class PriceStrategy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "Value Driver"
        };
    }

    handleQuoteType = (type) => {
        this.setState({ selectedTab: type });
    };

    render() {
        return (
            <>
                <ul className="custom-tabs">
                    <li 
                        className={`custom-tabs-link ${this.state.selectedTab === "Value Driver" ? "active" : ""}`} 
                        onClick={() => this.handleQuoteType("Value Driver")}
                    >
                        Value Driver
                    </li>
                    <li 
                        className={`custom-tabs-link ${this.state.selectedTab === "Confidence Level" ? "active" : ""}`} 
                        onClick={() => this.handleQuoteType("Confidence Level")}
                    >
                        Confidence Level
                    </li>
                    <li 
                        className={`custom-tabs-link ${this.state.selectedTab === "Execution" ? "active" : ""}`} 
                        onClick={() => this.handleQuoteType("Execution")}
                    >
                        Execution
                    </li>
                    <li 
                        className={`custom-tabs-link ${this.state.selectedTab === "Revenue Projection" ? "active" : ""}`} 
                        onClick={() => this.handleQuoteType("Revenue Projection")}
                    >
                        Revenue Projection
                    </li>
                    <li 
                        className={`custom-tabs-link ${this.state.selectedTab === "Parts Overview" ? "active" : ""}`} 
                        onClick={() => this.handleQuoteType("Parts Overview")}
                    >
                        Parts Overview
                    </li>
                </ul>
                <div className="px-3">
                {this.state.selectedTab === "Value Driver" && <ValueDriver />}
                {this.state.selectedTab === "Confidence Level" && <ConfidenceLevel />}
                {this.state.selectedTab === "Execution" && <Execution />}
                {this.state.selectedTab === "Revenue Projection" && <RevenueProjection />}
                {this.state.selectedTab === "Parts Overview" && <PartsOverview />}
                </div>
                
            </>
        );
    }
}

export default PriceStrategy;
