import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarNav from "./metisMenu";
import { withTranslation } from "react-i18next";
import i18n from "../../lang/i18n";
import { setMiniSidebarMenuOn, setMiniHover, setMiniSidebar, setOffcanvas } from "../../actions/settings";
import storageService from "../../services/storage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metisMenu: [],
      language: '',
      customersData: {},
      loadingModules: false,
      allowFileTransfer: false,
      orgModulesFetched: false
    }
    this.toggleSubMenu = this.toggleSubMenu.bind(this);
    this.minisidebarMouseOver = this.minisidebarMouseOver.bind(this);
    this.minisidebarMouseOut = this.minisidebarMouseOut.bind(this);
  }


  toggleSubMenu(e) {
    let menucClass = "";
    if (e.itemId) {
      const subClass = e.items.map((menuItem) => {
        if (
          menuItem.id === "main" ||
          menuItem.id === "app" ||
          menuItem.id === "extra" ||
          menuItem.id === "ui"
        ) {
          menucClass = "header";
        }
        if (menuItem.to === this.props.location.pathname) {
          menucClass = "";
        } else {
          menucClass = "collapse";
        }
        return menucClass;
      });
      return subClass;
      // return "collapse";
    } else {
      return e.visible ? "collapse" : "metismenu";
    }
  }

  minisidebarMouseOver() {
    // this.props.setMiniSidebarMenuOn(false);
    // this.props.setMiniHover(true);
  }

  minisidebarMouseOut() {
    // this.props.setMiniSidebarMenuOn(true);
    // this.props.setMiniHover(false);
  }

  componentDidMount() {
    if (this.props?.location?.search) {
      const query = new URLSearchParams(this.props.location.search);
      this.props.history.push("/dashboard");
    } else {
      const userData = storageService.getItem("userdata");

    }

    const getLitext = document.querySelectorAll("li");
    getLitext.forEach(function (el) {
      if (
        el.innerText === "Main" ||
        el.innerText === "App" ||
        el.innerText === "UI Elements" ||
        el.innerText === "Extra"
      ) {
        el.className = "header";
      }
    });

    if (this.state.language !== i18n.language) {
      this.setState({ language: i18n.language });
    }
  }

  getModulesByRole = () => {
    const storedUserData = sessionStorage.getItem("userdata");
    const userRole = storedUserData ? JSON.parse(window.atob(storedUserData)).role : null;
    let metisMenu = [
      { icon: "icon-dashboard", label: "Dashboard", to: "/dashboard" }
    ];

    if (userRole === "SUPERADMIN") {
      metisMenu.push({ icon: "icon-customers", label: "Customers", to: "/customers" });
      metisMenu.push({ icon: "icon-linces", label: "Linces", to: "/linces" });
      metisMenu.push({ icon: "icon-modules", label: "Modules", to: "/modules" });
      metisMenu.push({ icon: "icon-roles", label: "Roles", to: "/roles" });
    } else if (userRole === "ADMIN") {
      metisMenu.push({ icon: "icon-inventory", label: "Invnetory", to: "/inventory" });
      metisMenu.push({ icon: "icon-price-analysis", label: "Price Analysis", to: "/priceanalysis" });
      metisMenu.push({ icon: "icon-price-strategy", label: "Price Strategy", to: "/pricestrategy" });
      metisMenu.push({ icon: "icon-quotes", label: "Quotes", to: "/quotes" });
      metisMenu.push({ icon: "icon-customers", label: "Users", to: "/users" });
    } else if (userRole === "SALESEMPLOYEE" || userRole === "SALESMANAGER") {
      metisMenu.push({ icon: "icon-quotes", label: "Quotes", to: "/quotes" });
    } else if (userRole === "INVENTORYEMPLOYEE" || userRole === "INVENTORYMANAGER") {
      metisMenu.push({ icon: "icon-inventory", label: "Invnetory", to: "/inventory" });
    } else if (userRole === "PRICINGEMPLOYEE" || userRole === "PRICINGMANAGER") {
      metisMenu.push({ icon: "icon-price-analysis", label: "Price Analysis", to: "/priceanalysis" });
      metisMenu.push({ icon: "icon-price-strategy", label: "Price Strategy", to: "/pricestrategy" });
    }
    metisMenu.push({ icon: "icon-profile", label: "Profile", to: "/profile" });
    return metisMenu;

  }

  render() {

    const metisMenu = this.getModulesByRole();
    // let metisMenu = [
    //   { icon: "icon-dashboard", label: "Dashboard", to: "/dashboard" },
    //   { icon: "icon-inventory", label: "Invnetory", to: "/inventory" },
    //   { icon: "icon-price-analysis", label: "Price Analysis", to: "/priceanalysis" },
    //   { icon: "icon-price-strategy", label: "Price Strategy", to: "/pricestrategy" },
    //   { icon: "icon-quotes", label: "Quotes", to: "/quotes" },
    //   { icon: "icon-customers", label: "Users", to: "/users" },
    //   { icon: "icon-customers", label: "Customers", to: "/customers" },
    //   { icon: "icon-customers", label: "Roles", to: "/roles" },
    //   { icon: "icon-customers", label: "Modules", to: "/modules" },
    //   // {icon: "icon-customers",label:  i18n.t("modules.license"), to: "/license"},
    //   { icon: "icon-profile", label: "Profile", to: "/profile" },

    // ];
    const { customersData } = this.state;

    return (
      <>
        <ToastContainer />
        <div
          id="left-sidebar"
          className={`sidebar${this.props.miniSideMenuOn ? " mini_sidebar_on" : ""
            }`}
        >
          {/* <div className="navbar-brand">
            <Link to={{ pathname: metisMenu ? metisMenu[0]?.to : "" }}>
              {customersData.image && <img
                src={`../${customersData.image}`}
                alt=""
                className="img-fluid w34"
              />}
              <span>{this.props.t("headers.project")}</span>
            </Link>

            <button className="menu-toggle-button btn"
              name="ExpandorCollapse Sidebar"
              onClick={() => this.props.setMiniSidebar(!this.props.miniSidebar)}
            ><i title={this.props.miniSidebar ? "Expand" : "Collapse"}
              className={this.props.miniSidebar ? "fa fa-angle-left  rotate-180" : "fa fa-angle-left"}></i></button>

            <button
              name="offcanvas"
              type="button"
              className="btn-toggle-offcanvas btn btn-sm float-right closeIcon-mobileview"
              title={this.props.miniSidebar ? "Expand" : "Collapse"}
              onClick={() => this.props.setOffcanvas(!this.props.offcanvas, !this.props.miniSidebar)}
            >
              <i className="lnr lnr-menu icon-close inr-menuicons-close"></i>
            </button>
          </div> */}
          <div className="sidebar-scroll sidenav_bg">
            <SidebarNav history={this.props.history} metisMenu={metisMenu} toggleSubMenu={this.toggleSubMenu} />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  offcanvas: state.settings.offcanvas,
  miniSidebar: state.settings.miniSidebar,
  miniSideMenuOn: state.settings.miniSideMenuOn,
  miniHover: state.settings.miniHover,
  // userData: state.login.userData
  userData: state.twofactorauth.userData,
});

const mapDispatchToProps = (dispatch) => ({
  setOffcanvas: (e) => dispatch(setOffcanvas(e)),
  setMiniSidebarMenuOn: (e) => dispatch(setMiniSidebarMenuOn(e)),
  setMiniHover: (e) => dispatch(setMiniHover(e)),
  setMiniSidebar: (e) => dispatch(setMiniSidebar(e)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Menu));
