import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import Logo from '../assets/icons/logo_mark.png';

// sidebar nav config
import navigation from './_nav'
import {sidebar} from "../store/sidebar/actions";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.SidebarDeskTop.sidebars);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch(sidebar(val))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img src={Logo} alt={'logo'} height={'100px'} style={{padding: 10}}/>
        <div>&nbsp;ForgePC Admin</div>
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
    </CSidebar>
  )
};

export default React.memo(TheSidebar)
