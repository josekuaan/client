import React from "react";

const Admin = React.lazy(() => import("./views/admin/dashboard/Dashboard"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const DepositPage = React.lazy(() => import("./views/user/deposit/Deposit"));
const WithdrawPage = React.lazy(() => import("./views/user/withdraw/Withdraw"));
const SupportPage = React.lazy(() => import("./views/user/support/Support"));
const LogPage = React.lazy(() => import("./views/user/open/Content"));
const Settledpage = React.lazy(() => import("./views/user/settled/Content"));
const PaymentPage = React.lazy(() => import("./views/user/payment/Content"));
const Invest = React.lazy(() => import("./views/user/invest/Invest"));
const CredentialsPage = React.lazy(() =>
  import("./views/user/profile/Content")
);
const MePage = React.lazy(() => import("./views/user/me/Content"));
const UserLog = React.lazy(() => import("./views/admin/userlog/Log"));
const EditUser = React.lazy(() => import("./views/admin/userlog/EditUser"));
const UserAction = React.lazy(() => import("./views/admin/useraction/Log"));
const Credit = React.lazy(() => import("./views/admin/useraction/Credit"));
const AdminProfile = React.lazy(() => import("./views/admin/profile/Content"));

const routes = [
  // { path: "/", exact: true, name: "Home" },
  { path: "/admin/dashboard", name: "Admin", component: Admin, exact: true },
  {
    path: "/user/dashboard",
    name: "Dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/user/dashboard/deposit",
    name: "Deposit",
    component: DepositPage,
    exact: true,
  },
  {
    path: "/user/dashboard/withdraw",
    name: "Withdraw",
    component: WithdrawPage,
    exact: true,
  },
  {
    path: "/user/dashboard/invest",
    name: "Investment",
    component: Invest,
    exact: true,
  },
  {
    path: "/user/dashboard/user-support",
    name: "Support",
    component: SupportPage,
    exact: true,
  },
  {
    path: "/user/dashboard/user-log",
    name: "Log",
    component: LogPage,
    exact: true,
  },
  {
    path: "/user/dashboard/user-settled-log",
    name: "Settled",
    component: Settledpage,
    exact: true,
  },
  {
    path: "/user/dashboard/new-deposit-instant",
    name: "payment",
    component: PaymentPage,
    exact: true,
  },
  // { path: '/new', name: 'payment', component: PaymentPage, exact: true },
  {
    path: "/user/dashboard/user-credentials",
    name: "credentials",
    component: CredentialsPage,
    exact: true,
  },
  {
    path: "/user/dashboard/user-profile",
    name: "me",
    component: MePage,
    exact: true,
  },
  {
    path: "/admin/dashboard/users-log",
    name: "User Log",
    component: UserLog,
    exact: true,
  },
  {
    path: "/admin/dashboard/users-actions",
    name: "User Action",
    component: UserAction,
    exact: true,
  },
  {
    path: "/admin/dashboard/edit-user/:id",
    name: "Edit User",
    component: EditUser,
    exact: true,
  },
  {
    path: "/admin/dashboard/credit-user/:id",
    name: "Credit User",
    component: Credit,
    exact: true,
  },
  {
    path: "/admin/dashboard/admin-profile",
    name: "Admin Profile",
    component: AdminProfile,
    exact: true,
  },
];

export default routes;
