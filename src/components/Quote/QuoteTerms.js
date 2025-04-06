import React, { Component } from "react";

class QuoteTerms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleCancel = () => {
        this.props.onHide();
    }

    handleNext = () => {
        this.props.onNext();
    }

    render() {

        return (
            <>
                <div style={{ display: "flex", gap: "10px" }}>
                <div className=" mt-3 d-flex justify-content-end">
                    <button className="btn btn-cancel btn-sm mr-2" onClick={() => this.handleCancel()}>Cancel</button>
                    <button className="btn btn-next btn-sm" onClick={() => this.handleNext()}>Submit</button>
                </div>
                </div>
                
            </>
        );
    }
}

export default QuoteTerms;
