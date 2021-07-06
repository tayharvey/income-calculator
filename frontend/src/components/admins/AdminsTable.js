import React, {useState} from "react";

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
import {PAGE_LIMIT} from "../../consts";
import {ReactComponent as Trash} from '../../icons/trash.svg';
import {ReactComponent as Sort} from "../../icons/sort.svg";
import {getAdminInitials} from "../utils/general";


export const AdminsTable = ({
                              data,
                              count,
                              loadNextPage,
                              loadPrevPage,
                              logged_in_user_id,
                              setConfirmationOpen,
                              setSelectedUser,
                              sortTable
                            }) => {
  const [page, setPage] = useState(0)

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
                       onClick={() => sortTable("email")}>
              <div className="table-th-centered">
                Email
                <Sort/>
              </div>
            </TableCell>
            <TableCell className="users-table-head"
                       onClick={() => sortTable("is_active")}>
              <div className="table-th-centered">
                Status
                <Sort/>
              </div>
            </TableCell>
            <TableCell className="users-table-head">
              <div className="table-th-centered"></div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(admin => {
            return (
              <TableRow key={admin.email} className={"users-table"}>
                <TableCell>
                  <span className="initials">
                    {getAdminInitials(admin.email)}
                  </span>
                  {admin.email}
                </TableCell>
                {admin.is_active ?
                  <TableCell className="text-green">Active</TableCell>
                  : <TableCell className="text-greyed">Inactive</TableCell>
                }
                <TableCell align="right">
                  <IconButton
                    className="delete-btn"
                    disabled={logged_in_user_id === admin.id}
                    onClick={() => {
                      setConfirmationOpen(true);
                      setSelectedUser(admin);
                    }}
                  >
                    <Trash/>
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
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
