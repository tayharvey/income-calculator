import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import {IconButton, TextField} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {onEnterPressed} from "../../utils/general";

export const AddUserDialog = ({onClose, open}) => {

  const [token, setToken] = useState("")
  const [error, setError] = useState("")

  const handleClose = (addUser = false) => {
    if (addUser) {
      if (!token) {
        setError("This field cannot be empty.")
      } else {
        onClose(addUser, token);
        setToken("")
      }
    } else {
      onClose(false, token)
      setToken("")
    }
  };

  const resetToken = () => {
    setToken("")
  }
  const updateState = (e) => {
    setToken(e.target.value)
    setError("")
  }
  useEffect(resetToken, [])

  return (
    <Dialog onClose={() => handleClose()} open={open} fullWidth={true}
            className="medium-width-modal">
      <Paper className="column">
        <IconButton className="close-btn" onClick={() => handleClose(false)}>
          <CloseIcon/>
        </IconButton>
        <TextField
          className="grey-font full-width-input medium-width-input"
          onChange={updateState}
          placeholder="Enter User Token"
          value={token}
          name="token"
          variant="outlined"
          size="small"
          multiline={true}
          error={!!error}
          helperText={error}
          onKeyPress={(evt) => onEnterPressed(evt, () => {
            handleClose(true)
          })}
        />
        <Button
          className="medium-width-input"
          variant="contained"
          color="primary"
          style={{marginTop: 20}}
          onClick={() => handleClose(true)}
          disabled={!token}
        >
          Connect
        </Button>
      </Paper>
    </Dialog>
  );
}
