import * as React from "react";
import { NavLink, Route, Redirect } from "react-router-dom";
import { Header, Footer, AsideMenu } from "../components/layouts";
import { LivenessPage, WebhooksPage } from "../components/healthchecks";
import { ConfigurationPage } from "../components/configuration";
import Dashboard from "../components/dashboard";
import "./styles.scss";
import { useState } from "react";
import {
  makeStyles,
  CssBaseline,
  Container,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Theme
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import { HeartIcon, WebhooksIcon, GearIcon } from "./icons";
import clsx from "clsx";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    padding: theme.spacing(3, 0, 3, 6)
  },
  appBarSpacer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  isOpen: {
    padding: theme.spacing(3, 0, 3, 0),
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

interface AppState {
  menuOpen: boolean;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    menuOpen: false
  });

  const apiEndpoint = "https://localhost:7001/healthchecks-api";
  const webhookEndpoint = "";

  const theme = useTheme();
  const classes = useStyles(theme);

  const toggleMenu = () => {
    setState({
      menuOpen: !state.menuOpen
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        title="Auditing Cockpit"
        menuOpen={state.menuOpen}
        handleMenuOpen={() => toggleMenu()}
        darkMode={true}
      />
      <AsideMenu isOpen={state.menuOpen} onClick={() => toggleMenu()}>
        <div>
          <ListItem button component={NavLink} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={NavLink} to="/healthchecks">
            <ListItemIcon>
              <HeartIcon />
            </ListItemIcon>
            <ListItemText primary="Health Checks" />
          </ListItem>
          <ListItem button component={NavLink} to="/webhooks">
            <ListItemIcon>
              <WebhooksIcon />
            </ListItemIcon>
            <ListItemText primary="Webhooks" />
          </ListItem>
          <ListItem button component={NavLink} to="/reports">
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button component={NavLink} to="/integrations">
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
          </ListItem>
          <ListItem button component={NavLink} to="/configure">
            <ListItemIcon>
              <GearIcon />
            </ListItemIcon>
            <ListItemText primary="Configuration" />
          </ListItem>
        </div>
      </AsideMenu>
      <main
        className={clsx(classes.content, {
          [classes.isOpen]: state.menuOpen
        })}
      >
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/healthchecks" />}
          />
          <Route path="/dashboard" render={() => <Dashboard />} />
          <Route
            path="/healthchecks"
            render={() => <LivenessPage endpoint={apiEndpoint} />}
          />
          <Route
            path="/webhooks"
            render={() => <WebhooksPage endpoint={webhookEndpoint} />}
          />
          <Route path="/reports" render={() => <Dashboard />} />
          <Route path="/integrations" render={() => <Dashboard />} />
          <Route
            path="/configure"
            render={() => <ConfigurationPage endpoint={apiEndpoint} />}
          />
        </Container>
        <Footer />
      </main>
    </div>
  );
}
