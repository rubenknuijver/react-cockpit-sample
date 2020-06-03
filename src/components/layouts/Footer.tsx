import React from "react";
import { Typography, Link, Box } from "@material-ui/core";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://tasper.nl/">
        Tasper Reward B.V.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <Box pt={4}>
      <Copyright />
    </Box>
  );
};
