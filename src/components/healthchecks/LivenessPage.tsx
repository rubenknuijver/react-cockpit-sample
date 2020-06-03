import React, { useState, useEffect, useRef } from "react";
import { Liveness } from "./models";
import moment from "moment";
import { getData, startPolling } from "./services/healthchecks";
import { LivenessTable } from "./LivenessTable";
import { Typography, TextField, Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const bcInputHover = "var(--primaryColor)";
const bgInputHover = "var(--primaryColor)";
const fcInputHover = "var(--primaryColor)";
const bgImageLigthen =
  "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))";

const inputHover = {
  borderColor: "transparent",
  borderBottom: `2px solid ${bcInputHover}`,
  backgroundColor: bgInputHover,
  color: fcInputHover,
  backgroundImage: bgImageLigthen
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tasper_header: {
    textTransform: "uppercase",
    textAlign: "center",
    lineHeight: "1.5em",
    backgroundColor: "var(--bgTableSecondary)"
  },
  Input: {
    input: {
      borderRadius: 0,
      margin: "0 0.5rem",
      maxWidth: "5rem"
    },
    "input:hover": inputHover,
    "input:focus": inputHover
  }
}));

interface LivenessPageProps {
  endpoint: string;
}

interface LivenessState {
  error?: string;
  pollingIntervalSetting: number | undefined;
  livenessData: Array<Liveness>;
}

const healthChecksIntervalStorageKey = "healthchecks-ui-polling";

const load = async (
  endpoint: string,
  dispatch: React.Dispatch<React.SetStateAction<LivenessState>>
) => {
  const failedToConnect = (error: any) => {
    dispatch(p => ({ ...p, error: error }));
    console.error(error);
  };

  if (!endpoint || endpoint === "") {
    failedToConnect("Could not retrieve health checks data");
    return;
  }
  try {
    const livenessCollection = await getData(endpoint).then(liveness => {
      return liveness
        .filter(l => l != null)
        .map(item => {
          return {
            ...item,
            onStateFrom: `${item.status} ${moment
              .utc(item.onStateFrom)
              .fromNow()}`
          };
        });
    });

    dispatch(p => ({ ...p, livenessData: livenessCollection }));
  } catch (error) {
    failedToConnect("Could not retrieve health checks data");
  }
};

export const LivenessPage: React.FC<LivenessPageProps> = props => {
  const classes = useStyles();
  const fromLocalStorage = +(
    localStorage.getItem(healthChecksIntervalStorageKey) || 10
  );

  const [state, setState] = useState<LivenessState>({
    error: undefined,
    pollingIntervalSetting: fromLocalStorage,
    livenessData: []
  });

  const onPollinIntervalChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (event.target)
      setState(p => ({
        ...p,
        pollingIntervalSetting: +event.target.value
      }));

    event.persist();
    event.stopPropagation();
  };

  const initPolling = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    console.log(state);
    localStorage.setItem(
      healthChecksIntervalStorageKey,
      (state.pollingIntervalSetting || 0).toString()
    );
  };

  useEffect(() => {
    const configuredInterval = (): number => {
      let configuredInterval =
        localStorage.getItem(healthChecksIntervalStorageKey) ||
        state.pollingIntervalSetting ||
        0;

      return (configuredInterval as any) * 1000;
    };

    const onPollingElapsed = async () => {
      setState(p => ({ ...p, error: "" }));
      await load(props.endpoint, setState);
    };

    return startPolling(configuredInterval(), onPollingElapsed);
  }, [state.pollingIntervalSetting, props.endpoint]);

  const collapseAll = (event: any): void => {
    const tableElement = lifenessTableRef.current;
    if (tableElement) {
      Array.from(
        tableElement.getElementsByClassName("hc-checks-table-container")
      ).forEach((el: any) => el.classList.add("is-hidden"));

      Array.from(
        tableElement.getElementsByClassName("js-toggle-event")
      ).forEach((el: any) => {
        el.innerHTML = "add";
        el.setAttribute("title", "expand info");
      });
    }
  };

  const expandAll = (event: any): void => {
    const tableElement = lifenessTableRef.current;
    if (tableElement) {
      Array.from(
        tableElement.getElementsByClassName("hc-checks-table-container")
      ).forEach((el: any) => el.classList.remove("is-hidden"));

      Array.from(
        tableElement.getElementsByClassName("js-toggle-event")
      ).forEach((el: any) => {
        el.innerHTML = "remove";
        el.setAttribute("title", "hide info");
      });
    }
  };

  const lifenessTableRef = useRef<HTMLDivElement | null>(null);
  return (
    <article className={classes.root}>
      <header className={classes.header}>
        <Typography variant="h6" component="h1">
          Health Checks status
        </Typography>
        <div className="hc-refesh-group">
          <span>Refresh every</span>
          <TextField
            value={state.pollingIntervalSetting}
            onChange={e => onPollinIntervalChange(e)}
            type="number"
            data-oninput="validity.valid && value > 0 ||(value=10)"
          />
          <span>seconds</span>
          <Button onClick={initPolling} variant="contained" color="primary">
            Change
          </Button>
        </div>
      </header>
      <div className="hc-liveness__container">
        <div className="hc-table-container" ref={lifenessTableRef}>
          <LivenessTable
            expandAll={expandAll}
            collapseAll={collapseAll}
            livenessData={state.livenessData}
          />
          {state.error ? (
            <div className="w-100 alert alert-danger" role="alert">
              {state.error}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default LivenessPage;
