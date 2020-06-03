import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  makeStyles,
  Theme,
  createStyles,
  LinearProgress
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  })
);

type ConfigurationProps = {
  endpoint: string;
};

const ConfigurationForm = (props: ConfigurationProps) => {
  const classes = useStyles();
  const [state, setState] = useState({
    endpoint: "",
    title: "",
    logo: ""
  });
  const [progress, setProgress] = React.useState(0);

  /*
  const handlers: ((event: React.ChangeEvent<HTMLInputElement>) => void)[] = [];
  const handleChange = (name: string) => {
    if (!handlers[name]) {
      handlers[name] = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(s => ({ ...s, [name]: event.target.value }));
      };
    }
    return handlers[name];
  };
*/
  const handleChange = ({
    target: { value, name }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState(s => ({ ...s, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(state);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 0) {
          return 100;
        }
        const diff = 1;
        return Math.max(oldProgress - diff, 0);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <form className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TextField
              label="Endpoint"
              name="endpoint"
              onChange={handleChange}
              value={state["endpoint"]}
              margin="normal"
              fullWidth
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <TextField
              label="Title"
              name="title"
              onChange={handleChange}
              value={state["title"]}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Logo"
              name="logo"
              onChange={handleChange}
              value={state["logo"]}
              margin="normal"
              fullWidth
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>...</Paper>
        </Grid>
      </Grid>

      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
        bgcolor="background.paper"
      >
        <Box p={2} flexGrow={1}>
          {/* <Typography>Item 1</Typography> */}
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box p={0}>
          <Button color="secondary" variant="contained" onClick={handleSubmit}>
            Persist
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export { ConfigurationForm };
