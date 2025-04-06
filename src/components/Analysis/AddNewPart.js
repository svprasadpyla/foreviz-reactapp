import React, { Component } from "react";
import { createPartService, updatePartService } from "../../services/part";
import _ from 'lodash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddNewPart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPartObj: {
                partNumber: "",
                partName: "",
                category: "",
                categoryId: "",
                annotation: "",
                cost: '',
                price: '',
                predictivePrice: '',
                deviation: '',
                leadTime: '',
                predictiveLeadTime: '',
                otherSellersCount: '',
                pricingStatus: "",
                procuringOpportunity: "",
                analysisDate: "",
                salesVolume: '',
                revenue: '',
                region: "",
                source: "",
                customer: "",
                movingPrice: '',
                minimumSafetyStock: '',
                maximumStockLevel: '',
                unrestricted: '',
                deliveryQuantity: '',
                expectedQuantity: '',
                reminderTillMaxLevel: '',
                lastPostingDate: "",
                movementType: ""
            }
        };
    }

    componentDidMount() {
        this.setState({ selectedPartObj: this.props.selectedPartObj })
    }

    handleCancel = () => {
        this.props.onHide();
    }

    handleSubmit = () => {
        console.log("User Info", this.state.selectedPartObj);
        if (!_.isEmpty(this.props.selectedPartObj)) {
            console.log("Part Info Edit", this.state.selectedPartObj);
            this.handleUpdatePart(this.state.selectedPartObj);
        } else {
            console.log("Part Info Create", this.state.selectedPartObj);
            this.handleCreatePart(this.state.selectedPartObj);
        }

    }

    handleUpdatePart = async (payload) => {

        try {
            const response = await updatePartService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
                toast('Part updated successfully', { type: "success", autoClose: 2000, position: "bottom-right" });
                setTimeout(() => {
                    this.props.onHide();
                }, 3000);
            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    handleCreatePart = async (payload) => {

        try {
            const response = await createPartService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
                toast('Part created successfully', { type: "success", autoClose: 2000, position: "bottom-right" });
                setTimeout(() => {
                    this.props.onHide();
                }, 3000);
            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    handleInputs = (e) => {
        //this.setState({ [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value });
        const { selectedPartObj } = this.state;
        this.setState({
            selectedPartObj: {
                ...selectedPartObj,
                [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
            },
        });
    };

    render() {
        return (
            <>

                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="row f-form">
                                {/* Part Number */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Part Number</label>
                                    <input type="text" name="partNumber" className="form-control" value={this.state.selectedPartObj.partNumber} placeholder="Enter Part Number" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Part Name */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Part Name</label>
                                    <input type="text" name="partName" className="form-control" value={this.state.selectedPartObj.partName} placeholder="Enter Part Name" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Category */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Category</label>
                                    <input type="text" name="category" className="form-control" value={this.state.selectedPartObj.category} placeholder="Enter Category" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Annotation */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Annotation</label>
                                    <input type="text" name="annotation" className="form-control" value={this.state.selectedPartObj.annotation} placeholder="Enter Annotation" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Cost */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Cost</label>
                                    <input type="number" name="cost" className="form-control" value={this.state.selectedPartObj.cost} placeholder="Enter Cost" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Price */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Price</label>
                                    <input type="text" name="price" className="form-control" value={this.state.selectedPartObj.price} placeholder="Enter Price" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Predictive Price */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Predictive Price</label>
                                    <input type="text" name="predictivePrice" className="form-control" value={this.state.selectedPartObj.predictivePrice} placeholder="Enter Predictive Price" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Deviation */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Deviation</label>
                                    <input type="number" name="deviation" className="form-control" value={this.state.selectedPartObj.deviation} placeholder="Enter Deviation" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Lead Time */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Lead Time</label>
                                    <input type="number" name="leadTime" className="form-control" value={this.state.selectedPartObj.leadTime} placeholder="Enter Lead Time" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Predictive Lead Time */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Predictive Lead Time</label>
                                    <input type="number" name="predictiveLeadTime" className="form-control" value={this.state.selectedPartObj.predictiveLeadTime} placeholder="Enter Predictive Lead Time" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Other Sellers Count */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Other Sellers Count</label>
                                    <input type="number" name="otherSellersCount" className="form-control" value={this.state.selectedPartObj.otherSellersCount} placeholder="Enter Other Sellers Count" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Pricing Status */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Pricing Status</label>
                                    <input type="text" name="pricingStatus" className="form-control" value={this.state.selectedPartObj.pricingStatus} placeholder="Enter Pricing Status" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Procuring Opportunity */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Procuring Opportunity</label>
                                    <input type="text" name="procuringOpportunity" className="form-control" value={this.state.selectedPartObj.procuringOpportunity} placeholder="Enter Procuring Opportunity" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Analysis Date */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Analysis Date</label>
                                    <input type="date" name="analysisDate" className="form-control" value={this.state.selectedPartObj.lastPostingDate
                                        ? new Date(this.state.selectedPartObj.analysisDate).toISOString().split('T')[0]
                                        : ''} onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Sales Volume */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Sales Volume</label>
                                    <input type="number" name="salesVolume" className="form-control" value={this.state.selectedPartObj.salesVolume} placeholder="Enter Sales Volume" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Revenue */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Revenue</label>
                                    <input type="number" name="revenue" className="form-control" value={this.state.selectedPartObj.revenue} placeholder="Enter Revenue" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Region */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Region</label>
                                    <input type="text" name="region" className="form-control" value={this.state.selectedPartObj.region} placeholder="Enter Region" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Source */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Source</label>
                                    <input type="text" name="source" className="form-control" value={this.state.selectedPartObj.source} placeholder="Enter Source" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Lead Time */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Customer</label>
                                    <input type="text" name="customer" className="form-control" value={this.state.selectedPartObj.customer} placeholder="Enter Customer" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Moving Price */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Moving Price</label>
                                    <input type="number" name="movingPrice" className="form-control" value={this.state.selectedPartObj.movingPrice} placeholder="Enter Moving Price" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Other Sellers Count */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Other Sellers Count</label>
                                    <input type="number" name="minimumSafetyStock" className="form-control" value={this.state.selectedPartObj.minimumSafetyStock} placeholder="Enter Other Sellers Count" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Pricing Status */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Maximum Stock Level</label>
                                    <input type="number" name="maximumStockLevel" className="form-control" value={this.state.selectedPartObj.maximumStockLevel} placeholder="Enter Maximum Stock Level" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Procuring Opportunity */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Procuring Opportunity</label>
                                    <input type="text" name="procuringOpportunity" className="form-control" value={this.state.selectedPartObj.procuringOpportunity} placeholder="Enter Procuring Opportunity" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Unrestricted */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Unrestricted</label>
                                    <input type="number" name="unrestricted" className="form-control" value={this.state.selectedPartObj.unrestricted} onChange={(e) => this.handleInputs(e)} placeholder="Enter Unrestricted" />
                                </div>

                                {/* Delivery Quantity */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Delivery Quantity</label>
                                    <input type="number" name="deliveryQuantity" className="form-control" value={this.state.selectedPartObj.deliveryQuantity} placeholder="Enter Delivery Quantity" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Expected Quantity */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Expected Quantity</label>
                                    <input type="number" name="expectedQuantity" className="form-control" value={this.state.selectedPartObj.expectedQuantity} placeholder="Enter Expected Quantity" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Reminder Till MaxLevel */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Reminder Till MaxLevel</label>
                                    <input type="number" name="reminderTillMaxLevel" className="form-control" value={this.state.selectedPartObj.reminderTillMaxLevel} placeholder="Enter Reminder Till MaxLevel" onChange={(e) => this.handleInputs(e)} />
                                </div>

                                {/* Source */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Last Posting Date</label>
                                    <input type="date" name="lastPostingDate" className="form-control" value={this.state.selectedPartObj.lastPostingDate
                                        ? new Date(this.state.selectedPartObj.lastPostingDate).toISOString().split('T')[0]
                                        : ''} placeholder="Enter Source" onChange={this.handleInputs} />
                                </div>

                                {/* Movement Type */}
                                <div className="col-md-6 mb-2 form-group required">
                                    <label className="control-label">Movement Type</label>
                                    <input type="text" name="movementType" className="form-control" value={this.state.selectedPartObj.movementType} placeholder="Enter Movement Type" onChange={this.handleInputs} />
                                </div>

                                {/* Buttons */}
                                <div className="col-12 mt-3 d-flex justify-content-end">
                                    <button
                                        className="btn btn-cancel btn-sm mr-2"
                                        onClick={() => this.handleCancel()}
                                    >Cancel</button>
                                    <button
                                        className="btn btn-next btn-sm"
                                        onClick={() => this.handleSubmit()}
                                    >{!_.isEmpty(this.props.selectedPartObj) ? 'Update' : 'Create'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default AddNewPart;