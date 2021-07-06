import React, {useState} from "react";
import {TableCell, TableRow} from "@material-ui/core";
import {ReactComponent as DownArrow} from "../../../icons/down-arrow.svg";
import {ReactComponent as UpArrow} from "../../../icons/up-arrow.svg";
import {ReactComponent as Empty} from "../../../icons/empty.svg";
import {
  CALCULATION_TOOLTIPS,
  FORMAT_MONEY_FIELDS,
  RATE_FIELDS
} from '../../../consts';
import {formatMoney, formatRate} from "../../utils/formatting";
import {CalculationTooltip} from "../../common/CalculationTooltip";


export const CollapsableRow = ({name, data, dataKey}) => {
  const [expanded, setExpanded] = useState(false);

  const formatData = (value) => {
    let retValue = <Empty/>;
    if (!!value) {
      if (FORMAT_MONEY_FIELDS.includes(dataKey)) {
        retValue = formatMoney(value);
      } else if (RATE_FIELDS.includes(dataKey)) {
        retValue = formatRate(value);
      } else if (dataKey === 'hours_per_week') {
        retValue = value;
      } else if (Array.isArray(value)) {
        if (value.length) retValue = value.join(', ');
      } else {
        retValue = value;
      }
    }
    return retValue;
  }

  return (
    <>
      <TableRow className="expandable-row"
                onClick={() => setExpanded(!expanded)}>
        <TableCell
          className="small-table-row">
          {name}
        </TableCell>

        <CalculationTooltip
          title={CALCULATION_TOOLTIPS[dataKey]?.last_year_total}
          placement="top">
          <TableCell
            className="small-table-row">
            {formatData(data.last_year_total)}
          </TableCell>
        </CalculationTooltip>

        <CalculationTooltip
          title={CALCULATION_TOOLTIPS[dataKey]?.last_year_total}
          placement="top">
          <TableCell
            className="small-table-row">
            {formatData(data.ytd_total)}
          </TableCell>
        </CalculationTooltip>

        <CalculationTooltip
          title={CALCULATION_TOOLTIPS[dataKey]?.last_year_total}
          placement="top">
          <TableCell
            className="small-table-row">
            {formatData(data.projected_total)}
          </TableCell>
        </CalculationTooltip>

        <TableCell
          className="small-table-row action-cell" style={{paddingLeft: 0}}>
          {expanded ? (
            <UpArrow style={{padding: "5px 0px 0px", width: 19, height: 19}}/>
          ) : (
            <DownArrow style={{padding: "5px 0px 0px", width: 19, height: 19}}/>
          )}
        </TableCell>
      </TableRow>

      {!!expanded && Object.keys(data.companies).map(company => {
        const company_data = data.companies[company];
        return (
          <TableRow className="collapsable-row">
            <TableCell
              className="small-table-row">
              {company}
            </TableCell>

            <CalculationTooltip
              title={CALCULATION_TOOLTIPS[dataKey]?.companies[company]}
              placement="top">
              <TableCell
                className="small-table-row">
                {formatData(company_data.last_year_total)}
              </TableCell>
            </CalculationTooltip>

            <CalculationTooltip
              title={CALCULATION_TOOLTIPS[dataKey]?.companies[company]}
              placement="top">
              <TableCell
                className="small-table-row">
                {formatData(company_data.ytd_total)}
              </TableCell>
            </CalculationTooltip>

            <CalculationTooltip
              title={CALCULATION_TOOLTIPS[dataKey]?.companies[company]}
              placement="top">
              <TableCell
                className="small-table-row">
                {formatData(company_data.projected_total)}
              </TableCell>
            </CalculationTooltip>
            <TableCell></TableCell>
          </TableRow>
        );
      })}
    </>
  )
};
