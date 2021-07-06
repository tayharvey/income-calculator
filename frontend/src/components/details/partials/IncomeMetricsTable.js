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
import {CollapsableRow} from "./CollapsableRow";

export const IncomeMetricsTable = ({data}) => {
  return (
    <TableContainer>
      <Table className="border-top-gray">
        <TableHead>
          <TableRow className='table-head-row'>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Calculations <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Last Year <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                YTD <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Projected <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <CollapsableRow name="Total days with employer"
                          data={data.total_days}
                          dataKey="total_days"/>
          <CollapsableRow name="Hours worked per week"
                          data={data.hours_per_week}
                          dataKey="hours_per_week"/>
          <CollapsableRow name="Pay frequency"
                          data={data.pay_frequency}
                          dataKey="pay_frequency"/>
          <CollapsableRow name="Rate of pay"
                          data={data.rate_of_pay}
                          dataKey="rate_of_pay"/>
          <CollapsableRow name="Base pay"
                          data={data.base_pay}
                          dataKey="base_pay"/>
          <CollapsableRow name="Overtime pay"
                          data={data.overtime}
                          dataKey="overtime"/>
          <CollapsableRow name="Commission pay"
                          data={data.commission}
                          dataKey="commission"/>
          <CollapsableRow name="Bonus pay"
                          data={data.bonuses}
                          dataKey="bonuses"/>
          <CollapsableRow name="Other pay"
                          data={data.reimbursements}
                          dataKey="reimbursements"/>
          <CollapsableRow name="Total gross pay"
                          data={data.gross_pay}
                          dataKey="gross_pay"/>
          <CollapsableRow name="Gross Monthly Income"
                          data={data.gross_monthly}
                          dataKey="gross_monthly"/>
          <CollapsableRow name="Gross Monthly Income + 1 Year Avg"
                          data={data.gross_monthly_with_last_year}
                          dataKey="gross_monthly_with_last_year"/>
          <CollapsableRow name="Total taxes"
                          data={data.taxes}
                          dataKey="taxes"/>
          <CollapsableRow name="Other deductions"
                          data={data.deductions}
                          dataKey="deductions"/>
          <CollapsableRow name="Total net pay"
                          data={data.net_pay}
                          dataKey="net_pay"/>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
