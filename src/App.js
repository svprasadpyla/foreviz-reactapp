import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import storageService from "./services/storage";
import Loader from "react-js-loader";
import PropTypes from 'prop-types';
import "react-toastify/dist/ReactToastify.css";

const Login = lazy(() => import("./components/Authentication/login"));
const Category = lazy(() => import("./components/Dashboard/DashboardCategory"));
const TableFilter = lazy(() => import("./components/Inventory/TableComponent"));
const ForgotPassword = lazy(() => import("./components/Authentication/forgotpassword"));
const Layout = lazy(() => import("./components/Shared/Layout"));
class App extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      customersData: {},
    };
    this.leftSidebar = React.createRef();
  }

  handleChildWindowsAndClearStorage = () => {
    const childWindowsInSession = Object.keys(sessionStorage).find((key) => {
      try {
        const value = JSON.parse(sessionStorage.getItem(key) || "[]");
        return (
          Array.isArray(value) &&
          value.every((windowName) => typeof windowName === "string" && windowName.startsWith("_blank"))
        );
      } catch {
        return false;
      }
    });

    if (childWindowsInSession) {
      const childWindows = JSON.parse(sessionStorage.getItem(childWindowsInSession));
      childWindows.forEach((windowName) => {
        const childWindow = window.open("", windowName);
        if (childWindow) {
          childWindow.close();
        }
      });
    }
    storageService.clear();
  };

  clearStorageOnRoutes = (clearStorage = true) => {
    if (!clearStorage) return;
    const userData = storageService.getItem("userdata");
    if (userData && typeof userData === "object" && Object.keys(userData)?.length > 0) {
      //this.handleChildWindowsAndClearStorage();
    }
  };

  render() {
    const {
      themeColor,
      fontStyle,
      lightVersion,
      RtlVersion,
      offcanvas,
      miniSidebar,
      horizontalMenu,
      miniHover,
    } = this.props;
    document.getElementsByTagName(
      "body"
    )[0].className = `${themeColor} ${fontStyle}${lightVersion ? " light_version" : ""
    }${RtlVersion ? " rtl" : ""}${offcanvas ? " offcanvas-active" : ""}${horizontalMenu ? " h-menu" : ""
      } ${miniSidebar ? " mini_sidebar" : ""}${miniHover ? " mini_hover" : ""}`;

    const { customersData } = this.state;
    /**
    * set the href in the index.html
    */
    if (customersData?.image) {
      const link = document.querySelector('link[rel="icon"]');
      const imageSrc = link?.getAttribute('href');
      if (link && imageSrc !== customersData.image) {
        link.setAttribute('href', customersData.image);
      }
    }

    return (
      <div>
        <div ref={this.leftSidebar}
        // ref={(leftSidebar) => {
        //   this.leftSidebar = leftSidebar;
        // }}
        >
          <Router>
            <Suspense fallback={<div className={"item"}>
              <Loader type="box-rectangular" size={100} />
            </div>}>
              <Switch>
                <Route exact path="/"
                  render={() => {
                    this.clearStorageOnRoutes();
                    return <Login />;
                  }}
                />
                {/* <Route exact path="/email" 
                    render={() => {
                        this.clearStorageOnRoutes();
                        return <Email />;
                    }} 
                /> */}
                {/* <Route exact path="/login" 
                    render={() => {
                        // const modules = JSON.parse(sessionStorage.getItem("moduleStatus") || "{}");
                        // if (!modules || Object.keys(modules)?.length === 0) {
                            this.clearStorageOnRoutes();
                        //}
                        return <Login />;
                    }}
                /> */}
                
                <Route path="/forgotpassword" component={ForgotPassword} />
                <Route path="/category" component={Category} />
                <Route path="/filter" component={TableFilter} />

                <Route component={Layout} />
              </Switch>
            </Suspense>
          </Router>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  themeColor: state.settings.themeColor,
  fontStyle: state.settings.fontStyle,
  lightVersion: state.settings.lightVersion,
  RtlVersion: state.settings.RtlVersion,
  offcanvas: state.settings.offcanvas,
  horizontalMenu: state.settings.horizontalMenu,
  miniSidebar: state.settings.miniSidebar,
  miniHover: state.settings.miniHover,
});

const mapDispatchToProps = (dispatch) => ({});

App.propTypes = {
  RtlVersion: PropTypes.bool,
  fontStyle: PropTypes.string,
  horizontalMenu: PropTypes.bool,
  lightVersion: PropTypes.bool,
  miniHover: PropTypes.bool,
  miniSidebar: PropTypes.bool,
  offcanvas: PropTypes.bool,
  themeColor: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
