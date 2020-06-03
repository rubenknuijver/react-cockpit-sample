import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  panel: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export default () => {
  const [state, setState] = React.useState({
    interval: 10
  });
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={8} lg={9}>
        <Typography className={classes.panel}>xs=12</Typography>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={classes.panel}>xs=6</Paper>
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          value={state.interval}
          onChange={({ target: { value } }) =>
            setState(s => ({ ...s, interval: +value || 0 }))
          }
          InputLabelProps={{
            shrink: true
          }}
        />
      </Grid>
    </Grid>
  );
};
