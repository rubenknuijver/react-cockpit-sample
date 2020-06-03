import React from "react";
import { ReactComponent as Logo } from "../../logo.svg";
import {
  makeStyles,
  Drawer,
  IconButton,
  Divider,
  Theme,
  useTheme
} from "@material-ui/core";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  hcAside: {
    //backgroundImage: "linear-gradient(rgb(5, 159, 225), rgb(1, 91, 130))"
    // flexGrow: 0,
    // flexShrink: 0,
    // backgroundColor: theme.palette.background.paper,
    // overflowY: "auto",
    // overflowX: "hidden",
    // display: "flex",
    // flexDirection: "column"
  },
  isOpen: {
    //width: "16rem"
    marginRight: "1rem"
  },
  asideHeader: {
    width: "100%",
    paddingBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  logo: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    height: "5rem",
    width: "5rem",
    margin: "0.5rem 0",
    transition: "all ease-in 0.2s"
  },
  logoSmall: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    margin: "0.5rem 0",
    height: "2.5rem",
    width: "2.5rem",
    minWidth: "2.5rem",
    transition: "all ease-in 0.2s"
  },
  root: {
    display: "flex"
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    flexShrink: 0,
    // position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7)
    }
  },
  nav: {}
}));

interface AsideMenuProps {
  onClick: () => void;
  children: any;
  isOpen: boolean;
}

const AsideMenu: React.FC<AsideMenuProps> = props => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <aside
      className={`${classes.hcAside} ${props.isOpen ? classes.isOpen : ""}`}
    >
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !props.isOpen && classes.drawerPaperClose
          )
        }}
        open={props.isOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={props.onClick}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <div className={classes.asideHeader}>
          <div
            className={clsx(classes.logo, !props.isOpen && classes.logoSmall)}
            title="Logo as background image"
          >
            <Logo />
          </div>
        </div>
        <Divider />
        <nav className={classes.nav}>{props.children}</nav>
      </Drawer>
    </aside>
  );
};

export default AsideMenu;
