import React, {useEffect, useState} from "react";
import {
  addAdminUserService,
  fetchAdminUsersService,
  fetchAdminUsersServiceByUrl,
  removeAdminUserService,
} from "../../services/AdminUserService";
import Button from "@material-ui/core/Button";
import {Container, InputAdornment, InputBase, Paper} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  displayErrorNotifications,
  renderNotification
} from "../utils/notifications"
import {AddAdminUserDialog} from "./AddAdminUserDialog";
import {ConfirmDialog} from "../common/ConfirmDialog";
import {ProgressContainer} from "../common/ProgressContainer";
import {PAGINATION_INITIAL_STATE, SEARCH_TIMEOUT} from "../../consts";
import {ReactComponent as Search} from '../../icons/search.svg';
import {AdminsTable} from "./AdminsTable";
import {typeWatch} from "../utils/general";


export const AdminUserList = () => {
  const INITIAL_STATE = {
    email: ""
  };
  const [userList, setUserList] = useState([]);
  const [inputFormErrors, setInputFormErrors] = useState(INITIAL_STATE);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [paginationState, setPaginationState] = useState(PAGINATION_INITIAL_STATE)
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState(null);
  const logged_in_user_id = localStorage.getItem('user')

  const loadNextPage = () => {
    fetchAdmins(paginationState.next)
  }
  const loadPrevPage = () => {
    fetchAdmins(paginationState.previous)
  }

  const fetchAdmins = (url = null) => {
    const action = url ? fetchAdminUsersServiceByUrl(url, sort, search) : fetchAdminUsersService(sort, search)

    action.then((response) => {
      setUserList(response.data.results);
      const {count, next, previous} = response.data;
      setPaginationState({count, next, previous});
    })
      .catch((error) => {
        displayErrorNotifications(error)
      })
  };

  const removeUser = (confirmed) => {
    setConfirmationOpen(false);
    if (confirmed) {
      setLoading(true)
      removeAdminUserService(selectedUser.id)
        .then((response) => {
          renderNotification('User removed.')
          fetchAdmins();
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          displayErrorNotifications(error)
        });
    }
  };

  const onChangePage = (e, newPage) => {
    if (newPage > page) {
      loadNextPage()
    } else {
      loadPrevPage()
    }
    setPage(newPage)
  }

  const addUser = (email) => {
    setAddUserOpen(false);
    setInputFormErrors(INITIAL_STATE);
    if (email) {
      setLoading(true)
      addAdminUserService({email})
        .then((response) => {
          setLoading(false)
          renderNotification('User successfully added.')
          fetchAdmins();
        })
        .catch((error) => {
          setLoading(false)
          setAddUserOpen(true)
          displayErrorNotifications(error, Object.keys(INITIAL_STATE))
          if (error.response !== undefined) {
            setInputFormErrors(error.response.data)
          }
        });
    }
  };

  const searchAdmins = (e) => {
    const value = e.target.value.toLowerCase();
    typeWatch(() => {
      setSearch(value);
    }, SEARCH_TIMEOUT);
  }

  const sortTable = (sort_by) => {
    if (sort === sort_by && sort_by === "email") {
      sort_by = "-email"; // Reverse sorting order
    } else if (sort === sort_by && sort_by === "-email") {
      sort_by = "email"; // Reverse sorting order
    }

    if (sort === sort_by && sort_by === "is_active") {
      sort_by = "-is_active"; // Reverse sorting order
    } else if (sort === sort_by && sort_by === "-is_active") {
      sort_by = "is_active"; // Reverse sorting order
    }

    setSort(sort_by);
  }

  useEffect(fetchAdmins, [sort, search]);
  if (!userList) {
    return <ProgressContainer/>
  }
  return (
    <Container maxWidth="md">
      <InputBase
        size="small"
        margin="normal"
        required
        fullWidth
        className="gray-input"
        placeholder="Search"
        onChange={searchAdmins}
        startAdornment={<InputAdornment position="start">
          <Search/>
        </InputAdornment>}
      />
      <Paper className="medium-paper-container">
        <div className={"right-flex-container"}>
          <Button className="align-right"
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setAddUserOpen(true)
                  }}>
            {loading ? <CircularProgress size={30}
                                         color="inherit"/> : "Add Admin User"}
          </Button>
        </div>

        <AdminsTable data={userList} count={paginationState.count}
                     loadNextPage={loadNextPage} loadPrevPage={loadPrevPage}
                     logged_in_user_id={logged_in_user_id}
                     setConfirmationOpen={setConfirmationOpen}
                     setSelectedUser={setSelectedUser} sortTable={sortTable}/>
        <ConfirmDialog
          open={confirmationOpen}
          onClose={removeUser}
        />
        <AddAdminUserDialog
          open={addUserOpen}
          onClose={addUser}
          errors={inputFormErrors}
        />
      </Paper>
    </Container>
  );
}
