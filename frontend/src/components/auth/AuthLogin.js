import React, {useEffect, useState} from "react";
import {Button, Card, TextField, Typography,} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHistory} from "react-router-dom";
import {LOGIN_INITIAL_STATE} from "../../consts";
import {onEnterPressed} from "../utils/general"
import {loginService} from "../../services/AuthService"
import {displayErrorNotifications} from "../utils/notifications"
import "../stylesheets/styles-auth.css";
import {ReactComponent as Lock} from '../../icons/lock.svg';
import {ReactComponent as SignIn} from '../../icons/sign-in.svg';

export const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(LOGIN_INITIAL_STATE);
  const [formErrors, setFormErrors] = useState(LOGIN_INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Anything in here is fired on component mount.
    document.body.style.margin = "0px";
    return () => {
      // Anything in here is fired on component unmount.
      document.body.style.margin = "25px";
    }
  }, []);

  const handleChange = (evt) => {
    setFormErrors({...formErrors, [evt.target.name]: ""});
    setFormData({...formData, [evt.target.name]: evt.target.value});
  };

  const handleSubmit = () => {
    setLoading(true)
    setFormErrors(LOGIN_INITIAL_STATE);
    loginService(formData)
      .then((response) => {
        setLoading(false)
        localStorage.setItem("token", response.data["token"]);
        localStorage.setItem("user", response.data["user"]);
        history.push('/users/');
      })
      .catch((error) => {
        setLoading(false)
        displayErrorNotifications(error, Object.keys(LOGIN_INITIAL_STATE))
        if (error.response !== undefined) {
          setFormErrors(error.response.data)
        }
      });
  };

  return (
    <div className="login-background">
      <div className="center">
        <Card className="card-auth">
          <Lock className="top-icon"/>
          <Typography className="margin-top-25" variant="h5" align="center">
            Sign In
          </Typography>
          <div className="input-container">
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              size="small"
              margin="normal"
              type="email"
              required
              fullWidth
              value={formData.email}
              onChange={handleChange}
              onKeyPress={(evt) => onEnterPressed(evt, handleSubmit)}
              error={!!formErrors.email}
              helperText={formErrors.email}
              autoFocus
            />
          </div>
          <div className="input-container">
            <TextField
              label="Password"
              name="password"
              variant="outlined"
              size="small"
              margin="normal"
              type="password"
              required
              fullWidth
              value={formData.password}
              onChange={handleChange}
              onKeyPress={(evt) => onEnterPressed(evt, handleSubmit)}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
          </div>
          <div className="input-container margin-top-25">
            <Button
              variant="contained"
              color="primary"
              className="spinner-container"
              type="submit"
              fullWidth
              onClick={handleSubmit}>
              {loading ?
                <CircularProgress size={30} color='inherit'/> : (
                  <>
                    Sign In
                    <SignIn className="right-icon"/>
                  </>
                )}
            </Button>
          </div>
          <div className="margin-top-25">
            <a
              className="link-disable-visited link-center"
              href="/auth/password-reset/"
            >
              Forgot password?
            </a>
          </div>
        </Card>
        {/*<Typography variant="subtitle1" align="center">*/}
        {/*  Don't have an account? <a href="#">Sign Up</a>*/}
        {/*</Typography>*/}
      </div>
    </div>
  );
};
