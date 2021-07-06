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
import {ReactComponent as Sort} from "../../../icons/sort.svg";
import {ReactComponent as Empty} from "../../../icons/empty.svg";


export const EmploymentsTable = ({
                                   data, count, loadNextPage,
                                   loadPrevPage,
                                 }) => {

  const [page, setPage] = useState(0);

  const onChangePage = (e, newPage) => {
    if (newPage > page) {
      loadNextPage()
    } else {
      loadPrevPage()
    }
    setPage(newPage);
  }

  const formatData = (data) => {
    return data ? data : <Empty/>;
  }

  return (
    <TableContainer style={{}}>
      <Table className="border-top-gray" style={{width: 1200}}>
        <TableHead>
          <TableRow className='table-head-row'>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Employer <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Employer Address <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Job Title <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Division <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Job Type <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Base Pay Rate <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Pay Period End Date <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Hire Date <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Separation Date <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Termination Date <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Termination Reason <Sort/>
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(element => {
            return <TableRow key={element.id}>
              <TableCell
                className="small-table-row">{formatData(element.employer)}</TableCell>
              <TableCell
                className="small-table-row">{formatData(element.employer_address)}</TableCell>
              <TableCell
                className="small-table-row">{formatData(element.job_title)}</TableCell>
              <TableCell
                className="small-table-row">{formatData(element.job_title)}</TableCell>
              <TableCell
                className="small-table-row">{formatData(element.job_type)}</TableCell>
              <TableCell
                className="small-table-row">{formatData(formatRate(element.base_pay))}</TableCell>
              <TableCell
                className="small-table-row">{formatData(formatDate(element.pay_period_end_date))}</TableCell>
              <TableCell
                className="small-table-row no-wrap">{formatData(formatDate(element.hire_date))}</TableCell>
              <TableCell
                className="small-table-row no-wrap">{formatData(formatDate(element.termination_date))}</TableCell>
              <TableCell
                className="small-table-row no-wrap">{formatData(formatDate(element.termination_date))}</TableCell>
              <TableCell
                className="small-table-row">{formatData(element.termination_reason)}</TableCell>
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
