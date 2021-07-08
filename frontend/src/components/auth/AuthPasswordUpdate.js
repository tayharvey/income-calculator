import React, {useEffect, useState} from "react";
import {Button, Card, TextField, Typography,} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHistory, useParams} from "react-router-dom";
import {passwordUpdateService} from "../../services/AuthService";
import "../stylesheets/styles-auth.css";
import {PASSWORD_INITIAL_STATE} from "../../consts";
import {
  displayErrorNotifications,
  renderNotification
} from "../utils/notifications"
import {onEnterPressed} from "../utils/general"
import {ReactComponent as SignIn} from "../../icons/sign-in.svg";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

export const PasswordUpdate = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    ...PASSWORD_INITIAL_STATE,
    ...useParams(),
  });
  const [formErrors, setFormErrors] = useState(PASSWORD_INITIAL_STATE);
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async () => {
    setLoading(true)
    await passwordUpdateService(formData)
      .then(() => {
        setLoading(false)
        renderNotification('Password successfully changed.')
        setTimeout(() => {
          history.push("/auth/login")
        }, 3000);
      })
      .catch((error) => {
        setLoading(false)
        displayErrorNotifications(error, Object.keys(PASSWORD_INITIAL_STATE))
        if (error.response !== undefined) {
          setFormErrors(error.response.data)
        }
      });
  };

  return (
    <div className="login-background">
      <div className="center">
        <Card className="card-auth">
          <EditTwoToneIcon style={{fill: "#6565F6"}} className="top-icon"/>
          <Typography className="margin-top-25" variant="h5" align="center">
            Change Password
          </Typography>
          <div className="input-container">
            <TextField
              label="New password"
              name="password"
              type="password"
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
              autoFocus
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              onKeyPress={(evt) => onEnterPressed(evt, handleSubmit)}
            />
          </div>
          <div className="input-container">
            <TextField
              label="Repeat password"
              name="password_confirmed"
              type="password"
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
              required
              value={formData.password_confirmed}
              onChange={handleChange}
              error={!!formErrors.password_confirmed}
              helperText={formErrors.password_confirmed}
              onKeyPress={(evt) => onEnterPressed(evt, handleSubmit)}
            />
          </div>
          <div className="input-container margin-top-25">
            <Button
              variant="contained"
              color="primary"
              className="spinner-container"
              fullWidth
              onClick={handleSubmit}
            >
              {loading ?
                <CircularProgress size={30} color='inherit'/> : (
                  <>
                    Set Password
                    <SignIn className="right-icon"/>
                  </>
                )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
