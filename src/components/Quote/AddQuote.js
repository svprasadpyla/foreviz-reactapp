import React, { Component } from "react";
import CustomerDetails from "./CustomerDetails";
import ProductSelection from "./ProductSelection";
import QuotePricing from "./QuotePricing";
import QuoteTerms from "./QuoteTerms";
import { createQuoteService } from "../../services/quotes";
import _ from 'lodash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddQuote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quoteModule: "customerDetails",
            quoteDetails: {
                quoteName: '',
                customerName: '',
                customerType: '',
                phoneNumber: '',
                email: '',
                customerAddress: '',
                customerLogo: '',
                customerTIN: '',
                enableNegotiationForThisQuote: false,
                partIds: [],
                parts: []
            },
            selectedProductList: []

        };
    }

    componentDidMount(){
        this.setState({quoteDetails:this.props.quoteInfo});
    }

    handleInputs = (value, field) => {
        const { quoteDetails } = this.state;
        this.setState({
            quoteDetails: {
                ...quoteDetails,
                [field]: value,
            },
        });
    }

    // handleSelectedProducts = (value, field) => {
    //     this.setState(prevState => ({
    //         selectedProductList: {
    //             ...prevState.selectedProductList,
    //             [field]: value
    //         }
    //     }));
    // }

    handleSelectedProducts = (productList) => {
        this.setState({ selectedProductList: productList });
    };

    handleQuoteType = (type) => {
        this.setState({ quoteModule: type });
    };

    cancelCustomerDetails = () => {

        this.props.onHide();
    }

    submitQuoteDetails = () => {
        console.log("---------- Data to Quote --------",this.state.quoteDetails)
        this.handleCreateQuote(this.state.quoteDetails);
    }

    handleCreateQuote = async (payload) => {

        try {
            const response = await createQuoteService(payload);
            if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
                toast('Quote created successfully', { type: "success", autoClose: 2000, position: "bottom-right" });
                setTimeout(() => {
                    this.props.onHide();
                }, 3000);
            }
        } catch (error) {
            this.setState({ listLoader: false });
            //handleApiError(error, this.props);
        }
    }

    render() {
        return (
            <>
                <ul className="custom-tabs px-0">
                    <li
                        className={`custom-tabs-link ${this.state.quoteModule === "customerDetails" ? "active" : ""}`}
                    >
                        Customer Details
                    </li>
                    <li
                        className={`custom-tabs-link ${this.state.quoteModule === "productSelection" ? "active" : ""}`}
                    >
                        Product Selection
                    </li>
                    <li
                        className={`custom-tabs-link ${this.state.quoteModule === "Pricing" ? "active" : ""}`}
                    >
                        Pricing
                    </li>
                    <li
                        className={`custom-tabs-link ${this.state.quoteModule === "terms" ? "active" : ""}`}
                    >
                        Terms & Conditions
                    </li>
                </ul>
                <div className="px-3">
                    {this.state.quoteModule === "customerDetails" && <CustomerDetails onHide={() => this.cancelCustomerDetails()} onNext={() => this.handleQuoteType("productSelection")} quoteDetails={this.state.quoteDetails} handleInputs={this.handleInputs} />}
                    {this.state.quoteModule === "productSelection" && <ProductSelection onHide={() => this.handleQuoteType("customerDetails")} onNext={() => this.handleQuoteType("Pricing")} productsSelected={this.handleSelectedProducts} quoteDetails={this.state.quoteDetails} handleInputs={this.handleInputs} />}
                    {this.state.quoteModule === "Pricing" && <QuotePricing onHide={() => this.handleQuoteType("productSelection")} onNext={() => this.handleQuoteType("terms")} selectedProducts={this.state.selectedProductList} quoteDetails={this.state.quoteDetails} handleInputs={this.handleInputs} />}
                    {this.state.quoteModule === "terms" && <QuoteTerms onHide={() => this.handleQuoteType("Pricing")} onNext={() => this.submitQuoteDetails()} quoteDetails={this.state.quoteDetails} handleInputs={this.handleInputs} />}
                </div>
            </>
        );
    }
}

export default AddQuote;
