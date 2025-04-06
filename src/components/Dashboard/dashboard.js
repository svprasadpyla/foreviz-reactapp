import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import SalesManagerDashboard from "./SalesManagerDashboard";
import SalesEmployeeDashboard from "./SalesEmployeeDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { closeWindows } from "../../utils/childWindowUtils";
import { setLogout } from "../../actions/settings";
import $ from "jquery";
import storageService from "../../services/storage";
import PropTypes from 'prop-types';
import InventoryManagerDashboard from "./InventoryManagerDashboard";
import InventoryEmployeeDashboard from "./InventoryEmployeeDashboard";
import PricingManagerDashboard from "./PricingManagerDashboard";
import PricingEmployeeDashboard from "./PricingEmployeeDashboard";
import AdminDashboard from "./AdminDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: null,
      shiftEndAlert: false
    };
  }

  componentDidUpdate(prevProps) {
    let token = storageService.getItem("userdata");
    window.addEventListener("popstate", (event) => {

      const userData = sessionStorage.getItem("userdata");
      let parseUserData = JSON.parse(window.atob(userData));
      if (event && !$.isEmptyObject(token)) {
        return;
      } else {
        sessionStorage.clear();
        closeWindows(parseUserData?.userId);
        setLogout();
        this.props.history.push("/login");
      }
    });
  }

  renderDashboard = () => {
    //const { roles } = localStorage.getItem("userdata") || {};
    const storedUserData = sessionStorage.getItem("userdata");
    const roles = storedUserData ? JSON.parse(window.atob(storedUserData)).role : null;

    switch (roles) {
      case "SALESMANAGER":
        return <SalesManagerDashboard />;
      case "SALESEMPLOYEE":
        return <SalesEmployeeDashboard />;
      case "INVENTORYMANAGER":
        return <InventoryManagerDashboard />;
      case "INVENTORYEMPLOYEE":
        return <InventoryEmployeeDashboard />;
      case "PRICINGMANAGER":
        return <PricingManagerDashboard />;
      case "PRICINGEMPLOYEE":
        return <PricingEmployeeDashboard />;
      case "ADMIN":
        return <AdminDashboard />;
      case "SUPERADMIN":
        return <SuperAdminDashboard />;
      default:
        return null;
    }
  }
  render() {
    // const { userData } = this.props;
    // if (!userData.roles) {
    //   return null;
    // }

    return (
      <>
        <ToastContainer />
        {this.renderDashboard()}
      </>
    );
  }
}

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
  return {
    userData: state.twofactorauth.userData,
  };
};

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  setLogout: () => dispatch(setLogout()),
});

Dashboard.propTypes = {
  userData: PropTypes.shape({
    roles: PropTypes.array,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Dashboard));
