import React, { Component } from "react";
import InventoryList from "./InventoryList";
import InventoryPurchaseHistory from "./InventoryPurchaseHistory";
import InventorySaleHistory from "./InventorySaleHistory";
import TableComponent from "./TableComponent";

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "inventory"
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
                        className={`custom-tabs-link ${this.state.selectedTab === "inventory" ? "active" : ""}`} 
                        onClick={() => this.handleQuoteType("inventory")}
                    >
                        Inventory
                    </li>
                    <li 
                        className={`custom-tabs-link ${this.state.selectedTab === "purchase" ? "active" : ""}`} 
                        onClick={() => this.handleQuoteType("purchase")}
                    >
                        Purchase history/Purchase Price
                    </li>
                    <li 
                        className={`custom-tabs-link ${this.state.selectedTab === "sales" ? "active" : ""}`} 
                        onClick={() => this.handleQuoteType("sales")}
                    >
                        Sales History/Sales Price
                    </li>
                </ul>
                <div className="px-3">
                {this.state.selectedTab === "inventory" && <InventoryList />}
                {this.state.selectedTab === "purchase" && <InventoryPurchaseHistory />}
                {this.state.selectedTab === "sales" && <InventorySaleHistory />}
                </div>
            </>
        );
    }
}

export default Inventory;
