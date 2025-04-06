import React from "react";
import { Link, withRouter } from "react-router-dom";

class DashboardCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          
        };
      }

    handlePRMCategory = () => {
        this.props.history.push('/dashboard');
    }

    handleADPCategory = () => {
        this.props.history.push('/filter');
    }

    render() {
        return (
            <>
                <div className="f-service-category">
                    <div className="f-category-head px-3">
                        <div className="container-fluid">
                            <img src="../../assets/images/f-logo.png" />
                        </div>
                    </div>
                    <div className="f-category-body mt-3 px-3">
                        <div className="container-fluid">
                            <div className="f-categories">
                                <div className="f-category-item" onClick={() => this.handlePRMCategory()}>
                                    <img src="../../assets/images/icons/icon-prm.svg" />
                                    <h6>PRM</h6>
                                </div>
                                <div className="f-category-item" onClick={() => this.handleADPCategory()}>
                                    <img src="../../assets/images/icons/icon-apd.svg" />
                                    <h6>APD</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-section">
                        <div className="footer-align px-3">
                            <div className="d-flex align-items-center justify-content-between px-3 py-2">
                                <div className="fs-8">Copyright ©2025 FOREVIZ. All rights reserved.</div>
                                <div class="footer-icons">
                                    <img src="../assets/images/icons/icon-footer1.svg" />
                                    <img src="../assets/images/icons/icon-footer2.svg" />
                                    <img src="../assets/images/icons/icon-footer3.svg" />
                                    <img src="../assets/images/icons/icon-footer4.svg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};

export default withRouter(DashboardCategory);
