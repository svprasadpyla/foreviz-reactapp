import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import {
  setLogout,
  setOffcanvas,
  toggleMegamenu,
  toggleNotificationBar,
  toggleSearchBar,
} from "../../actions/settings";
import { closeWindows } from "../../utils/childWindowUtils";
import { withTranslation } from "react-i18next";
import i18n from "../../lang/i18n";
import Selecttag from "../Authentication/Selecttag";
import { logoutApi } from "../../services/logout";
import handleApiError from './ErrorHandling';
import _ from 'lodash';
import PropTypes from "prop-types";

export const logout = async (setLogout = false, props = { history: { push: () => { return } } }) => {
  try {
    const response = await logoutApi();
    if (!response?.data || _.isEmpty(response.data)) return;
    const userData = sessionStorage.getItem("userdata");
    let parseUserData = JSON.parse(window.atob(userData));
    if (window?.process?.type) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send('closeallchildwindows');
    } else {
      closeWindows(parseUserData?.userId);
    }
    props.history.push("/email");
  } catch (error) {
    handleApiError(error, props);
  }
}

const Header = ({ setLogout, setOffcanvas, offcanvas, userData, t }) => {
  const dispatch = useDispatch();
  let userInfo = _.cloneDeep(userData)
  const [scrolled, setScrolled] = useState(0);
  const history = useHistory()


  userInfo.firstName = userInfo.firstName ? userInfo.firstName : ''
  userInfo.lastName = userInfo.lastName ? userInfo.lastName : ''

  const historyProp = {
    history: history,
    t: t
  }

  const scrollProgress = () => {
    const scrollPx = document.documentElement.scrollTop;

    const winHeightPx =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolleda = `${(scrollPx / winHeightPx) * 100}%`;
    setScrolled(scrolleda);
  };
  window.addEventListener("scroll", scrollProgress);

  const { pathname } = useLocation();

  const progressBarStyle = {
    width: scrolled,
  };


  const getHeaderTitle = () => {
    let title = pathname.slice(1) === "Vai" ? "Cruiser" : pathname.slice(1);
    switch (title) {
      case "Dashboard":
        return i18n.t("labels.dashboard");
      default:
        return title;
    }
  };
  return (
    <nav className="navbar top-navbar">
      <div className="container-fluid">
        <div className="navbar-left d-flex align-items-center">
          <div className="navbar-btn">
            <button type="button" name="mobileoffcanvas" className="btn-toggle-offcanvas"
              onClick={() => setOffcanvas(!offcanvas)}><i className="lnr lnr-menu fa fa-bars"></i>
            </button>
          </div>

          <ul className="nav navbar-nav">
            <li>
              <div className=" d-flex align-items-center">
                <div>
                  <img className="logo" src="../assets/images/foreviz/logo.png" />
                </div>
                <span className="mb-0 fs-7 text-highlight">
                  {getHeaderTitle()}
                </span>

              </div>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <div id="navbar-menu">
            <ul className="nav navbar-nav mininav-ul">
              <li>
                <img src="../assets/images/foreviz/icon-notification.svg" />
              </li>
              <li className="">
                <img src="../assets/images/foreviz/icon-colormode.svg" />
              </li>
              <li className="nav-user-align">
                <div className="nav-user">
                  <img src="../assets/images/foreviz/icon-user.svg" />
                </div>
              </li>




            </ul>
          </div>
        </div>
      </div>
      <div className="progress-container">
        <div
          style={progressBarStyle}
          className="progress-bar"
          id="myBar"
        ></div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isMegaMenu: state.settings.isMegaMenu,
  offcanvas: state.settings.offcanvas,
  // userData: state.login.userData,
  userData: state.twofactorauth.userData,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMegamenu: (e) => dispatch(toggleMegamenu(e)),
  toggleSearchBar: (e) => dispatch(toggleSearchBar(e)),
  toggleNotificationBar: (e) => dispatch(toggleNotificationBar(e)),
  setOffcanvas: (e) => dispatch(setOffcanvas(e)),
  setLogout: () => dispatch(setLogout()),
});

Header.propTypes = {
  t: PropTypes.func.isRequired,
  setLogout: PropTypes.func,
  setOffcanvas: PropTypes.func,
  offcanvas: PropTypes.bool,
  userData: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Header));
