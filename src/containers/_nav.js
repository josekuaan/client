import React from "react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/user/dashboard",
    icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="c-icon c-icon-2xl c-sidebar-nav-icon" role="img"><path fill="var(--ci-primary-color, currentColor)" d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z" className="ci-primary"></path><rect width="32" height="32" x="80" y="264" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect><rect width="32" height="32" x="240" y="128" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect><rect width="32" height="32" x="136" y="168" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect><rect width="32" height="32" x="400" y="264" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect><path fill="var(--ci-primary-color, currentColor)" d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z" className="ci-primary "></path></svg>,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Transactions",
    to: "/user/dashboard/transaction",
    icon: <i className="fa fa-credit-card c-sidebar-nav-icon" style={{fontSize:'27px'}}></i>,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Deposit",
        to: "/user/dashboard/deposit",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Withdraw",
        to: "/user/dashboard/withdraw",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Open",
        to: "/user/dashboard/user-log",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Settled",
        to: "/user/dashboard/user-settled-log",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Invest",
    route: "/base",
    icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="c-icon c-icon-2xl c-sidebar-nav-icon" role="img"><path fill="var(--ci-primary-color, currentColor)" d="M489.972,119.059a23.839,23.839,0,0,0-17-7.059H456V72a24.027,24.027,0,0,0-24-24H86.627A70.628,70.628,0,0,0,16,118.627V393.373A70.628,70.628,0,0,0,86.627,464h385.4a24.047,24.047,0,0,0,24-23.923l.944-303.995A23.837,23.837,0,0,0,489.972,119.059ZM464.053,432H86.627A38.627,38.627,0,0,1,48,393.373V118.627A38.627,38.627,0,0,1,86.627,80H424v32H88v32H464.947Z" className="ci-primary"></path><rect width="32" height="32" x="392" y="264" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect></svg>,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Investment",
        to: "/user/dashboard/invest",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Support",
    route: "/base",
    icon: <i className="fa fa-phone c-sidebar-nav-icon" style={{fontSize:'27px'}}></i>,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Support",
        to: "/user/dashboard/user-support",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "User Action",
    route: "/base",
    icon: <i className="fa fa-user c-sidebar-nav-icon" style={{fontSize:'27px'}}></i>,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Profile",
        to: "/user/dashboard/user-profile",
      },
    ],
  },
];

export default _nav;
