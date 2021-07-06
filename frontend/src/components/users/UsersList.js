import React, {useEffect, useState} from "react";
import {
  Button,
  Container,
  InputAdornment,
  InputBase,
  Paper
} from "@material-ui/core";
import jwt_decode from "jwt-decode";
import {UsersService} from "../../services/UsersService";
import {typeWatch} from "../utils/general";
import {
  displayErrorNotifications,
  renderNotification
} from "../utils/notifications";
import {UsersTable} from "./partials/UsersTable";
import {
  API_KEYS_INITIAL_STATE,
  PAGINATION_INITIAL_STATE,
  SEARCH_TIMEOUT
} from "../../consts";
import {AddUserDialog} from "./partials/AddUserDialog";
import {ConfirmationDialog} from "./partials/ConfirmationDialog";
import {useHistory} from "react-router-dom";
import {ProgressContainer} from "../common/ProgressContainer";
import {getAPIKeys} from "../../services/SettingService";
import Typography from "@material-ui/core/Typography";
import {ReactComponent as Search} from '../../icons/search.svg';


export const UsersList = () => {
  const [userList, setUserList] = useState([])
  const [paginationState, setPaginationState] = useState(PAGINATION_INITIAL_STATE)
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [argyleId, setArgyleId] = useState(false);
  const [argyleKeys, setArgyleKeys] = useState(API_KEYS_INITIAL_STATE);
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const getKeys = () => {
    setLoading(true);
    getAPIKeys().then((response) => {
      setArgyleKeys(response.data)
      if (response.data.client_id && response.data.client_secret) {
        fetchUsers()
      }
    }).catch((error) => {
      displayErrorNotifications(error)
      setLoading(false);
    })
  }

  const fetchUsers = (url = null) => {
    setLoading(true);
    const action = url ? UsersService.fetchUsersListByUrl(url, sort, search) : UsersService.fetchUsersList(sort, search)
    action.then(response => {
      const data = response.data;
      const {count, next, previous} = data;

      setUserList(data.results);
      setPaginationState({count, next, previous});
      setLoading(false);
    }).catch(error => {
      displayErrorNotifications(error);
      setLoading(false);
    });
  }

  const deleteUser = (argyle_id) => {
    UsersService.deleteUser(argyle_id).then(res => {
        renderNotification('User successfully deleted.')
        fetchUsers()
      }
    ).catch(err =>
      displayErrorNotifications(err)
    )
  }

  const loadNextPage = () => {
    fetchUsers(paginationState.next)

  }
  const loadPrevPage = () => {
    fetchUsers(paginationState.previous)
  }

  const addNewUser = (token) => {
    try {
      const decodedToken = jwt_decode(token);
      const {user_id, exp} = decodedToken;

      UsersService.createUser({
        argyle_id: user_id,
        token_expiry: exp
      }).then(res => {
        setArgyleId(user_id)
        setSuccessDialogOpen(true)
        fetchUsers()
      }).catch(error => {
        setErrorDialogOpen(true)
      })
    } catch {
      setErrorDialogOpen(true)
    }
  }

  const searchUsers = (e) => {
    const value = e.target.value.toLowerCase();
    typeWatch(() => {
      setSearch(value);
    }, SEARCH_TIMEOUT);
  }

  const sortTable = (sort_by) => {
    if (sort === sort_by && sort_by === "full_name") {
      sort_by = "-full_name"; // Reverse sorting order
    } else if (sort === sort_by && sort_by === "-full_name") {
      sort_by = "full_name"; // Reverse sorting order
    }

    if (sort === sort_by && sort_by === "token_status") {
      sort_by = "-token_status"; // Reverse sorting order
    } else if (sort === sort_by && sort_by === "-token_status") {
      sort_by = "token_status"; // Reverse sorting order
    }

    setSort(sort_by);
  }

  const onCloseAddUser = (addUser, token) => {
    setAddUserOpen(false)
    if (addUser && token) {
      addNewUser(token)
    }
  }

  const onCloseSuccess = (redirect) => {
    setSuccessDialogOpen(false)
    if (redirect) {
      history.push(`/details/${argyleId}`)
    }
  }

  const onCloseError = (redirect) => {
    setErrorDialogOpen(false);

    if (redirect) {
      setAddUserOpen(true);
    }
  }

  const areArgyleKeysExist = () => {
    if (!argyleKeys) {
      return false;
    }
    return argyleKeys.client_id && argyleKeys.client_secret;
  }

  useEffect(getKeys, [sort, search]);

  if (!userList) {
    return <ProgressContainer/>
  }
  return (
    <Container maxWidth="md">
      <InputBase
        size="small"
        fullWidth
        className="gray-input"
        placeholder="Search"
        onChange={searchUsers}
        startAdornment={<InputAdornment position="start">
          <Search/>
        </InputAdornment>}
      />
      <Paper className="medium-paper-container">
        <Button className="align-right"
                color="primary"
                variant="contained"
                disabled={!areArgyleKeysExist()}
                onClick={() => setAddUserOpen(true)}>Add User</Button>

        {!areArgyleKeysExist() && (
          <div className="no-keys-container">
            <Typography>
              No results found - Set Argyle API Keys
            </Typography>
          </div>
        )}
        {areArgyleKeysExist() && (
          <UsersTable data={userList} count={paginationState.count}
                      loadNextPage={loadNextPage} loadPrevPage={loadPrevPage}
                      deleteUser={deleteUser} sortTable={sortTable}/>
        )}
        <AddUserDialog
          open={addUserOpen}
          onClose={onCloseAddUser}
        />
        <ConfirmationDialog
          open={successDialogOpen}
          onClose={onCloseSuccess}
          message='User has been successfully connected!'
          rightBtnText='View User Details'
          success={true}
        />
        <ConfirmationDialog
          open={errorDialogOpen}
          onClose={onCloseError}
          message={`Couldn't add this User.\nPlease try again.`}
          rightBtnText='Retry Connection'
          success={false}
        />
      </Paper>
    </Container>
  )
}
