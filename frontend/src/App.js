import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ReactNotification from 'react-notifications-component'
import {Login} from "./components/auth/AuthLogin"
import {PasswordReset} from "./components/auth/AuthPasswordReset"
import {Logout} from "./components/auth/AuthLogout"
import {PasswordUpdate} from './components/auth/AuthPasswordUpdate';
import 'react-notifications-component/dist/theme.css'
import './components/stylesheets/styles-global.css'
import './components/stylesheets/custom-mui.css'
import './components/stylesheets/custom-highcharts.css'
import {AdminUserList} from "./components/admins/AdminUserList";
import {LeftNavBar} from "./components/navbar/LeftNavBar";
import {AccountActivate} from "./components/auth/AccountActivate";
import {LandingPage} from "./components/home/LandingPage";
import {ArgyleAPIKeys} from "./components/apiKeys/ArgyleAPIKeys";
import {UsersList} from "./components/users/UsersList";
import {DetailsView} from "./components/details/DetailsView";


const RouteComponent = ({
                          path,
                          children,
                          exact,
                          displayNav = false
                        }) => {

  return (
    <Route path={path} exact={exact}>
      {displayNav && <LeftNavBar/>}
      {children}
    </Route>
  );
}

const App = () => {
  return (
    <div className="container">
      <ReactNotification/>
      <Router>
        <Switch>
          <RouteComponent path="/" exact>
            <LandingPage/>
          </RouteComponent>
          <RouteComponent displayNav={true} path="/accounts/">
            <AdminUserList/>
          </RouteComponent>
          <RouteComponent displayNav={true} path="/users/" exact>
            <UsersList/>
          </RouteComponent>
          <RouteComponent displayNav={true} path="/api-keys/">
            <ArgyleAPIKeys/>
          </RouteComponent>
          <RouteComponent path="/details/:argyle_id" exact>
            <DetailsView/>
          </RouteComponent>
          <RouteComponent validateToken={false}
                          path="/auth/login/">
            <div className="container-center">
              <Login/>
            </div>
          </RouteComponent>
          <RouteComponent validateToken={false}
                          path="/auth/password-reset/">
            <PasswordReset/>
          </RouteComponent>
          <RouteComponent validateToken={false} path="/auth/activate/:user_id">
            <AccountActivate/>
          </RouteComponent>
          <RouteComponent validateToken={false}
                          path="/auth/password-update/:id/">
            <PasswordUpdate/>
          </RouteComponent>
          <RouteComponent validateToken={false}
                          path="/auth/logout/">
            <Logout/>
          </RouteComponent>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
