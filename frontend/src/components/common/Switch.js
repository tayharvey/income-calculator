import Typography from "@material-ui/core/Typography";
import {Grid, withStyles} from "@material-ui/core";
import Switch from '@material-ui/core/Switch';

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 35,
    height: 17,
    padding: 0,
    display: 'flex',
    overflow: "visible"
  },
  switchBase: {
    padding: 2,
    color: "white",
    '& + $track': {
      opacity: 1,
      backgroundColor: "#6563FF79",
      borderColor: "transparent"
    },
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: "#6563FF",
        borderColor: "#6563FF"
      },
    },
  },
  thumb: {
    width: 15,
    height: 15,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 12,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export const CustomSwitch = ({is_sandbox_mode, updateFormState}) => {
  return (
    <Typography component="div" style={{margin: "10px auto 10px 0"}}>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Sandbox Mode</Grid>
        <Grid item>
          <AntSwitch checked={is_sandbox_mode}
                     onChange={(event) => updateFormState(event)}
                     name="is_sandbox_mode"/>
        </Grid>
      </Grid>
    </Typography>
  );
}




