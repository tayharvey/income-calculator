import React, {useState} from 'react'
import {formatDate, formatRate} from '../../utils/general'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import {PAGE_LIMIT} from "../../../consts";
import {ReactComponent as Sort} from "../../../icons/sort.svg";
import {ReactComponent as Empty} from "../../../icons/empty.svg";


export const EmploymentsTable = ({
                                   data, count, loadNextPage,
                                   loadPrevPage,
                                 }) => {
  const [page, setPage] = useState(0);

  let employments = [
    {name: "Employer", dataKey: "employer"},
    {name: "Employer Address", dataKey: "employer_address"},
    {name: "Job Title", dataKey: "job_title"},
    {name: "Division", dataKey: "job_title"},
    {name: "Job Type", dataKey: "job_type"},
    {name: "Base Pay Rate", dataKey: "base_pay"},
    {name: "Pay Period End Date", dataKey: "pay_period_end_date"},
    {name: "Hire Date", dataKey: "hire_date"},
    {name: "Separation Date", dataKey: "termination_date"},
    {name: "Termination Date", dataKey: "termination_date"},
    {name: "Termination Reason", dataKey: "termination_reason"}
  ];

  const onChangePage = (e, newPage) => {
    if (newPage > page) {
      loadNextPage()
    } else {
      loadPrevPage()
    }
    setPage(newPage);
  }

  const formatData = (record, dataKey) => {
    if (dataKey === "pay_period_end_date" || dataKey === "hire_date" || dataKey === "termination_date") {
      record = formatDate(record);
    } else if (dataKey === "base_pay") {
      record = formatRate(record);
    }

    if (!record) {
      return <Empty/>;
    } else {
      return record;
    }
  }

  return (
    <TableContainer>
      <Table className="border-top-gray" style={{width: 1200}}>
        <TableHead>
          <TableRow className='table-head-row'>
            {employments.map(employment => (
              <TableCell className="small-table-head">
                <div className="table-th-centered">
                  {employment.name} <Sort/>
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => {
            return (
              <TableRow key={row.id}>
                {employments.map(employment => {
                  const key = employment.dataKey;
                  return (
                    <TableCell className="small-table-row">
                      {formatData(row[key], key)}
                    </TableCell>
                  );
                })}
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
