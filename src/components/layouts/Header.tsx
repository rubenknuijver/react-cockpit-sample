import React, { useContext, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Switch from "@material-ui/core/Switch";
import Context from "../context";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  }
}));

interface HeaderProps {
  title: string;
  menuOpen: boolean;
  handleMenuOpen: (state: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  menuOpen,
  handleMenuOpen: handleDrawerOpen
}) => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const { state, dispatch } = useContext(Context);

  const toggleDarkMode = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  const login = async () => {
    return {
      name: "r.knuijver"
    };
  };
  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, menuOpen && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          className={clsx(
            classes.menuButton,
            menuOpen && classes.menuButtonHidden
          )}
          color="inherit"
          aria-label="menu"
          onClick={() => handleDrawerOpen(menuOpen)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h2"
          variant="h6"
          color="inherit"
          className={classes.title}
        >
          {title}
        </Typography>
        <Switch checked={state.darkMode} onChange={toggleDarkMode} />
        {user ? (
          <Button color="inherit" onClick={() => setUser(null)}>
            Logout
          </Button>
        ) : (
          <Button
            color="inherit"
            onClick={async () => {
              const user = await login();
              setUser(user);
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
