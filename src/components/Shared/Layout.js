import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import jQuery from "jquery";
import $ from "jquery";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
// import ThemeSetting from "./ThemeSetting";
import Routes from "../Route";
import storageService from "../../services/storage";
import { getUserData } from "../../actions/twofactorauth";

let routeList=[];
let url=''
class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      sessionExpireAlert: false,
    };
  }

  componentDidMount() {
    
    if (!storageService.getItem("userdata")) {
      
      this.props.history.push("/dashboard");
      return;
    }

    if (jQuery.isEmptyObject(this.props.userData)) {
      this.props.getUserData();
    }

    window.addEventListener("sessionExpired", this.handleContinue, false);
  }

  componentWillUnmount() {
    window.removeEventListener("sessionExpired", this.handleContinue, false);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.userData 
    ) {
      
    }
  }
  closeWindow = () => {
    this.props.history.push("/login");
  };

  handleContinue = (event) => {
    if (event.detail === true) {
      this.setState({ sessionExpireAlert: true });
    }
  };

  handleSessionExpire = () => {
    const host = process.env.REACT_APP_API_URL || window.location.origin;
    storageService.clear();
    window.location.href = `${host}`;
  };

  render() {
    return (
      <>

        {/* <ThemeSetting /> */}
        <div className="overlay" />
        <div id="wrapper">
          <Header url={url}/>
          {/* <Searchbar /> */}
          {/* <Megamenu /> */}
          <Menu {...this.props} />
          <div className="Main-Scroll-bodylayout">
            <div className="scrollbox scrollbox_delayed">
              <div className="scrollbox-content">
                <div id="main-content">
                  <Switch>
                    {
                      
                      
                    Routes.map((layout, i) => {
                      
                        return (
                          <Route
                            key={`r${i}`}
                            exact={layout.exact}
                            path={layout.path}
                            component={layout.component}
                          ></Route>
                        );
                      
                    })
                    }
                  </Switch>
                  <Footer /> 
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </>
    );
  }
}

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
  if (!$.isEmptyObject(state.twofactorauth.userData)) {
    return {
      userData: state.twofactorauth.userData,
    };
  } else {
    return {
      userData: state.twofactorauth.multifactorUserResponse,
    };
  }
};

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  getUserData: () => dispatch(getUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);