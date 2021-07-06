import React, {useState} from "react";
import {useHistory} from "react-router-dom";

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";
import {PAGE_LIMIT} from "../../../consts";
import {ReactComponent as Trash} from '../../../icons/trash.svg';
import {ReactComponent as Sort} from '../../../icons/sort.svg';
import {getUserInitials} from "../../utils/general";


export const UsersTable = ({
                             data,
                             count,
                             loadNextPage,
                             loadPrevPage,
                             deleteUser,
                             sortTable
                           }) => {
  const [page, setPage] = useState(0)
  const history = useHistory()

  const showUserDetails = (argyle_id) => {
    history.push(`/details/${argyle_id}`)
  }

  const onChangePage = (e, newPage) => {
    if (newPage > page) {
      loadNextPage()
    } else {
      loadPrevPage()
    }
    setPage(newPage)
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className='table-head-row'>
            <TableCell className="users-table-head"
                       onClick={() => sortTable("full_name")}>
              <div className="table-th-centered">
                Full Name
                <Sort/>
              </div>
            </TableCell>
            <TableCell className="users-table-head"
                       onClick={() => sortTable("token_status")}>
              <div className="table-th-centered">
                Token Status
                <Sort/>
              </div>
            </TableCell>
            <TableCell className="users-table-head">
              <div className="table-th-centered"></div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(user => (
            <TableRow key={user.argyle_id}
                      onClick={() => showUserDetails(user.argyle_id)}
                      className='table-row users-table'>
              <TableCell>
              <span className="initials">
                {getUserInitials(user.full_name)}
              </span>
                {user.full_name}
              </TableCell>
              <TableCell
                style={{textTransform: "capitalize"}}>{user.token_status}</TableCell>
              <TableCell align="right">
                <IconButton
                  className="delete-btn"
                  onClick={(e) => {
                    deleteUser(user.argyle_id)
                    e.stopPropagation()
                  }}>
                  <Trash/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination rowsPerPageOptions={[PAGE_LIMIT]} count={count}
                             onChangePage={onChangePage} page={page}
                             rowsPerPage={PAGE_LIMIT}/>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
