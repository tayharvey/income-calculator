import {withStyles} from "@material-ui/core/styles";
import {Tooltip} from "@material-ui/core";

export const CalculationTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    top: "25px !important",
    whiteSpace: "pre-line"
  },
}))(Tooltip);
