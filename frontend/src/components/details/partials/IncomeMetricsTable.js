import React, {useState} from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import {ReactComponent as Sort} from "../../../icons/sort.svg";
import {CollapsableRow} from "./CollapsableRow";
import {sortTable} from "../../utils/general";

export const IncomeMetricsTable = ({data}) => {
  const [sort, setSort] = useState(null);

  let metrics = [
    {name: "Total days with employer", dataKey: "total_days"},
    {name: "Hours worked per week", dataKey: "hours_per_week"},
    {name: "Pay frequency", dataKey: "pay_frequency"},
    {name: "Rate of pay", dataKey: "rate_of_pay"},
    {name: "Base pay", dataKey: "base_pay"},
    {name: "Overtime pay", dataKey: "overtime"},
    {name: "Commission pay", dataKey: "commission"},
    {name: "Bonus pay", dataKey: "bonuses"},
    {name: "Other pay", dataKey: "reimbursements"},
    {name: "Total gross pay", dataKey: "gross_pay"},
    {name: "Gross Monthly Income", dataKey: "gross_monthly"},
    {
      name: "Gross Monthly Income + 1 Year Avg",
      dataKey: "gross_monthly_with_last_year"
    },
    {name: "Total taxes", dataKey: "taxes"},
    {name: "Other deductions", dataKey: "deductions"},
    {name: "Total net pay", dataKey: "net_pay"}
  ];

  const displayMetrics = () => {
    if (sort === "name") {
      metrics = metrics.sort((item1, item2) => (item1.name > item2.name) ? 1 : -1);
    } else if (sort === "-name") {
      metrics = metrics.sort((item1, item2) => (item1.name < item2.name) ? 1 : -1);
    }
    return metrics.map(metric => (
      <CollapsableRow key={metric.name} name={metric.name}
                      data={data[metric.dataKey]}
                      dataKey={metric.dataKey}/>
    ));
  }

  return (
    <TableContainer>
      <Table className="border-top-gray">
        <TableHead>
          <TableRow className='table-head-row'>
            <TableCell className="small-table-head"
                       onClick={() => sortTable("name", sort, setSort)}>
              <div className="table-th-centered">
                Calculations <Sort/>
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Last Year
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                YTD
              </div>
            </TableCell>
            <TableCell className="small-table-head">
              <div className="table-th-centered">
                Projected
              </div>
            </TableCell>
            <TableCell className="small-table-head"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayMetrics()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
