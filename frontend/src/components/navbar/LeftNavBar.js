import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import {NavBarItem} from "./NavBarItem";
import {ReactComponent as UserList} from '../../icons/user-list.svg';
import {ReactComponent as UserListActive} from '../../icons/user-list-active.svg';
import {ReactComponent as AdminList} from '../../icons/admin-list.svg';
import {ReactComponent as AdminListActive} from '../../icons/admin-list-active.svg';
import {ReactComponent as Api} from '../../icons/api.svg';
import {ReactComponent as ApiActive} from '../../icons/api-active.svg';
import {ReactComponent as Logout} from '../../icons/logout.svg';
import "../stylesheets/styles-navigation.css"


export const LeftNavBar = () => {

  const isActive = (url) => window.location.pathname === url;

  return <Drawer variant="permanent" anchor={"left"} style={{
    flexShrink: 0,
  }}>
    <List className='menu-container'>
      <NavBarItem link="/users/" title="User List"
                  icon={isActive("/users/") ? <UserListActive/> : <UserList/>}/>
      <NavBarItem link="/accounts/" title="Admin List"
                  icon={isActive("/accounts/") ? <AdminListActive/> : <AdminList/>}/>
      <NavBarItem link="/api-keys/" title="API"
                  icon={isActive("/api-keys/") ? <ApiActive/> : <Api/>}/>
      <NavBarItem link="/auth/logout/" title="Log Out" align="bottom"
                  icon={<Logout/>}/>
    </List>
  </Drawer>
}
