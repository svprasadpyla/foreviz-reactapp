import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";

const SidebarNav = (props) => {
  const { metisMenu } = props;
  const [activeMenu, setActiveMenu] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Set the default active menu based on the current URL
    const currentPath = location.pathname; // Get the current path from URL
    const activeMenuItem = metisMenu.find((menu) => menu.to === currentPath);
    if (currentPath === "/Task") {
      setActiveMenu("/Cruiser");
    }
    else if (activeMenuItem) {
      setActiveMenu(activeMenuItem.to);
    } else {
      setActiveMenu(null);
    }
  }, [location.pathname, metisMenu]);

  const handleMenuClick = (to) => {
    setActiveMenu(to);
    history.push(to);
  };

  return (
    <nav id="left-sidebar-nav" className="sidebar-nav">
      <ul className="metismenu">
        {metisMenu.map((menu, index) => (
          <li key={menu.to} className={activeMenu === menu.to ? "active" : ""}>
            <a
              href={menu.to}
              id="hasSubMenu"
              className={activeMenu === menu.to ? "active" : ""}
              onClick={(e) => {
                e.preventDefault(); // Prevent default navigation
                handleMenuClick(menu.to);
              }}
            >
              <i className={menu.icon} title={menu.label}></i>
              <span>{menu.label}</span>
            </a>
            {menu.subMenu && activeMenu === menu.to && (
              <ul className="submenu">
                {menu.subMenu.map((subItem, subIndex) => (
                  <li key={subItem.to} className="submenu-item">
                    <a
                      href={subItem.to}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default navigation
                        history.push(subItem.to);
                      }}
                    >
                      {subItem.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

SidebarNav.propTypes = {
  metisMenu: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      icon: PropTypes.string,
      label: PropTypes.string.isRequired,
      subMenu: PropTypes.arrayOf(
        PropTypes.shape({
          to: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default SidebarNav;
