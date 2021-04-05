import React, {useState} from 'react'
import {formatDate, formatRate} from '../../utils/general'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead, TablePagination, TableFooter, TableContainer,
} from '@material-ui/core'
import {PAGE_LIMIT} from "../../../consts";

export const EmploymentsTable = ({
                                   data, count, loadNextPage,
                                   loadPrevPage,
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
    <TableContainer style={{}}>
      <Table className="border-top-gray" style={{width: 1200}}>
        <TableHead>
          <TableRow className='table-head-row'>
            <TableCell className="small-table-head">Employer</TableCell>
            <TableCell className="small-table-head">Employer Address</TableCell>
            <TableCell className="small-table-head">Job Title</TableCell>
            <TableCell className="small-table-head">Division</TableCell>
            <TableCell className="small-table-head">Job Type</TableCell>
            <TableCell className="small-table-head">Base Pay Rate</TableCell>
            <TableCell className="small-table-head">Pay Period End Date</TableCell>
            <TableCell className="small-table-head">Hire Date</TableCell>
            <TableCell className="small-table-head">Separation
              Date</TableCell>
            <TableCell className="small-table-head">Termination
              Date</TableCell>
            <TableCell className="small-table-head">Termination
              Reason</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(element => {
            return <TableRow key={element.id}>
              <TableCell
                className="small-table-row">{element.employer}</TableCell>
              <TableCell
                className="small-table-row">{element.employer_address ? element.employer_address : '-'}</TableCell>
              <TableCell
                className="small-table-row">{element.job_title}</TableCell>
              <TableCell
                className="small-table-row">{element.job_title}</TableCell>
              <TableCell
                className="small-table-row">{element.job_type}</TableCell>
              <TableCell className="small-table-row">{formatRate(element.base_pay)}</TableCell>
              <TableCell
                className="small-table-row">{element.pay_period_end_date ? formatDate(element.pay_period_end_date) : '-'}</TableCell>
              <TableCell
                className="small-table-row no-wrap">{element.hire_date ? formatDate(element.hire_date) : '-'}</TableCell>
              <TableCell
                className="small-table-row no-wrap">{element.termination_date ? formatDate(element.termination_date) : '-'}</TableCell>
              <TableCell
                className="small-table-row no-wrap">{element.termination_date ? formatDate(element.termination_date) : '-'}</TableCell>
              <TableCell
                className="small-table-row">{element.termination_reason ? element.termination_reason : '-'}</TableCell>
            </TableRow>
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
