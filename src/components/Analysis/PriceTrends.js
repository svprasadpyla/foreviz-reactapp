import React, { Component } from "react";

class PriceTrends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null,
            partList: [
                {
                    "partNumber": "101",
                    "name": "Raju",
                    "category": "Switches",
                    "annotation": "2025-03-10",
                    "cost": 100,
                    "price": 2,
                    "predictivePrice": "Unknown",
                    "deviation": "2025-03-10",
                    "leadTime": "INV-123",
                    "predictiveLeadTime": "Done",
                    "otherSellersCount": 100,
                    "pricing": 100,
                    "procurringOppurtuinity": "None",
                    "AnalysisDate": "2025-03-10",
                    "salesVolume": 10,
                    "revenue": 100,
                    "region": "USA",
                    "source": "-"
                },
                {
                    "partNumber": "101",
                    "name": "Raju",
                    "category": "Switches",
                    "annotation": "2025-03-10",
                    "cost": 100,
                    "price": 2,
                    "predictivePrice": "Unknown",
                    "deviation": "2025-03-10",
                    "leadTime": "INV-123",
                    "predictiveLeadTime": "Done",
                    "otherSellersCount": 100,
                    "pricing": 100,
                    "procurringOppurtuinity": "None",
                    "AnalysisDate": "2025-03-10",
                    "salesVolume": 10,
                    "revenue": 100,
                    "region": "USA",
                    "source": "-"
                }
            ]
        };
        this.fileInputRef = React.createRef();
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

                <div className="table-responsive res-table">
                    <table className="table hover border-0 tool_listtable Request-table f-table">
                        <thead>

                            <tr>
                                <th>Part Number</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Annotation</th>
                                <th>Cost</th>
                                <th>Price</th>
                                <th>Predective price</th>
                                <th>Deviation</th>
                                <th>Lead time</th>
                                <th>Predective lead time</th>
                                <th>Other sellers count</th>
                                <th>Pricing status</th>
                                <th>Procurring oppurtuiniyy</th>
                                <th>Analysis date</th>
                                <th>Sales volume</th>
                                <th>Revenue</th>
                                <th>Region</th>
                                <th>Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.partList.length !== 0 ?
                                    this.state.partList.map((requestObj) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{requestObj.partNumber}</td>
                                                    <td>{requestObj.name}</td>
                                                    <td>{requestObj.category}</td>
                                                    <td>{requestObj.annotation}</td>
                                                    <td>{requestObj.cost}</td>
                                                    <td>{requestObj.price}</td>
                                                    <td>{requestObj.predictivePrice}</td>
                                                    <td>{requestObj.deviation}</td>
                                                    <td>{requestObj.leadTime}</td>
                                                    <td>{requestObj.predictiveLeadTime}</td>
                                                    <td>{requestObj.otherSellersCount}</td>
                                                    <td>{requestObj.pricing}</td>
                                                    <td>{requestObj.procurringOppurtuinity}</td>
                                                    <td>{requestObj.AnalysisDate}</td>
                                                    <td>{requestObj.salesVolume}</td>
                                                    <td>{requestObj.revenue}</td>
                                                    <td>{requestObj.region}</td>
                                                    <td>{requestObj.source}</td>
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

export default PriceTrends;
