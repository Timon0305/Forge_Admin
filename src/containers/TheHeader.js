import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import {
  TheHeaderDropdown,
  TheHeaderDropdownNotif,
} from './index'
import {sidebar} from "../store/sidebar/actions";


const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarDesktop = useSelector(state => state.SidebarDeskTop.sidebars);
  const sidebarMobile = useSelector(state => state.SidebarMobile.sidebars);
  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarDesktop) ? false : 'responsive';
    dispatch(sidebar(val))
  };

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarMobile) ? true : 'responsive';
    dispatch(sidebar(val))
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif/>
        {/*<TheHeaderDropdownTasks/>*/}
        {/*<TheHeaderDropdownMssg/>*/}
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
