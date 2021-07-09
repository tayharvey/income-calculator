import ListItem from "@material-ui/core/ListItem";
import React from "react";
import {NavLink} from "react-router-dom";
import "../stylesheets/styles-navigation.css"

export const NavBarItem = ({link, title, icon, align}) => {
  return <ListItem className={align === "bottom" && "logout-btn"}>
    {icon}
    <NavLink to={link} className="navbar-link">
      {title}
    </NavLink>
  </ListItem>
}
