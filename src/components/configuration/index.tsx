import React from "react";
import { ConfigurationForm } from "./ConfigurationForm";
import Typography from "@material-ui/core/Typography";

type ConfigurationProps = {
  endpoint: string;
};

export const ConfigurationPage = (props: ConfigurationProps) => (
  <>
    <Typography variant="h5">Configuration</Typography>
    <ConfigurationForm />
  </>
);
