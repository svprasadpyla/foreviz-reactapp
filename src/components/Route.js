import React, { lazy } from 'react'
const PriceStrategy = lazy(() => import("./Pricestrategy/PriceStrategy"));
const Dashboard = lazy(() => import("./Dashboard/dashboard"));
const Inventory = lazy(() => import("./Inventory/Inventory"));
const PriceAnalysis = lazy(() => import("./Analysis/PriceAnalysis"));
const Users = lazy(() => import("./Users/UserList"));
const Quotes = lazy(() => import("./Quote/Quotes"));
const Customers = lazy(() => import("./Customers/CustomerList"));
const Roles = lazy(() => import("./Roles/RoleList"));
const Modules = lazy(() => import("./Modules/ModuleList"));
const AddQuote = lazy(() => import("./Quote/AddQuote"));
const Profile = lazy(() => import("./Profile/profile"));
const Faq = lazy(() => import("./Shared/Faq"));

const Routes = [
  // {
  //   path: "/",
  //   name: "dashboard",
  //   exact: true,
  //   pageTitle: "Dashboard",
  //   component: Dashboard,
  // },
  {
    path: "/dashboard",
    name: "dashboard",
    exact: true,
    pageTitle: "Dashboard",
    component: Dashboard,
  },

  {
    path: "/inventory",
    name: "inventory",
    exact: true,
    pageTitle: "Inventory",
    component: Inventory,
  },

  {
    path: "/priceanalysis",
    name: "Price Analysis",
    exact: true,
    pageTitle: "Price Analysis",
    component: PriceAnalysis
  },

  {
    path: "/pricestrategy",
    name: "Price Strategy",
    exact: true,
    pageTitle: "Price Strategy",
    component: PriceStrategy
  },

  {
    path: "/quotes",
    name: "quotes",
    exact: true,
    pageTitle: "Quotes",
    component: Quotes,
  },

  {
    path: "/users",
    name: "users",
    exact: true,
    pageTitle: "Users",
    component: Users
  },

  {
    path: "/customers",
    name: "customers",
    exact: true,
    pageTitle: "Customers",
    component: Customers
  },

  {
    path: "/roles",
    name: "roles",
    exact: true,
    pageTitle: "Roles",
    component: Roles
  },

  {
    path: "/modules",
    name: "modules",
    exact: true,
    pageTitle: "Modules",
    component: Modules
  },
  
  {
    path: "/profile",
    name: "Profile",
    exact: true,
    pageTitle: "Profile",
    component: Profile,
  },

  {
    path: "/Faq",
    name: "Faq",
    exact: true,
    pageTitle: "faq",
    component: Faq,
  }
]

export default Routes;
