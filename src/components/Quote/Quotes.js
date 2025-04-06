import React, { Component } from "react";
import SelfQuotes from "./SelfQuotes";
import TeamQuotes from "./TeamQuotes";
import AddQuote from "./AddQuote";

class Quotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quoteType: "self",
            selectedQuote: {}
        };
    }
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleQuoteType = (type) => {
        this.setState({ quoteType: type });
    }

    openEditQuote = (quoteObj) => {
        this.setState({ quoteType: "add", selectedQuote: quoteObj});
    }

    handleFileUpload = () => {
        this.fileInputRef.current.click();
    };

    closeCreateQuote = () => {
        this.setState({ quoteType: "self" });
    }


    render() {

        return (
            <>
                {
                    this.state.quoteType !== "add" &&
                    <div className="">
                        <ul className="custom-tabs">
                            <li
                                className={`custom-tabs-link ${this.state.quoteType === "self" ? "active" : ""}`}
                                onClick={() => this.handleQuoteType("self")}
                            >
                                Self
                            </li>
                            <li
                                className={`custom-tabs-link ${this.state.quoteType === "team" ? "active" : ""}`}
                                onClick={() => this.handleQuoteType("team")}
                            >
                                Team
                            </li>
                        </ul>
                        {/* Filter section with icons */}
                        <div className="icon-container px-3">

                            <div className="icon-wrapper" onClick={() => this.handleQuoteType("add")}>
                                <img
                                    src="../assets/images/foreviz/icon-add.svg"
                                    alt="Add" 
                                />
                            </div>

                        </div>

                    </div>
                }

                <div className="">
                    {this.state.quoteType === "self" && <SelfQuotes onTabChange={this.handleSelectedType} openCreateQuote = {(quoteObj) => this.openEditQuote(quoteObj)}/>}
                    {this.state.quoteType === "team" && <TeamQuotes />}
                    {this.state.quoteType === "add" && <AddQuote onHide={() => this.closeCreateQuote()} quoteInfo = {this.state.selectedQuote}/>}
                </div>
            </>
        );
    }
}

export default Quotes;
