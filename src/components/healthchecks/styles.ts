import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useHealthCheckStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(6, 0, 3)
    }
  })
);

type HCTheme = {
  primaryColor: string;
  secondaryColor: string;
  darkColor: string;
  midDarkColor: string;
  grayColor: string;
  midGrayColor: string;
  lightColor: string;
  dangerColor: string;
  warningColor: string;
  successColor: string;
  ffBase: string;
  bgMain: string;
  bgSecondary: string;
  fcNegative: string;
  fcBase: string;
  fcAction: string;
  bgAside: string;
  bgMenuActive: string;
  bcMenuActive: string;
  bcInput: string;
  bcInputHover: string;
  bgInputHover: string;
  fcInputHover: string;
  bcTable: string;
  bgTable: string;
  bgTableSecondary: string;
  bgTableButton: string;
  bgButton: string;
  bgImageDarken: string;
  bgImageLigthen: string;
  bgBulletTimeline: string;
  bgLineTimeline: string;
  bcEventTimeline: string;
  asideWidth: string;
};

const hc_theme: (props: any) => HCTheme = (props: {
  lightColor: any;
  grayColor: any;
  primaryColor: any;
  midDarkColor: any;
  darkColor: any;
  midGrayColor: any;
  bgSecondary: any;
  secondaryColor: any;
}) => ({
  primaryColor: "#5ec297",
  secondaryColor: "#349b72",
  darkColor: "#000000",
  midDarkColor: "#2f313a",
  grayColor: "#444444",
  midGrayColor: "#ebebeb",
  lightColor: "#f6f6f7",
  dangerColor: "#d26b4e",
  warningColor: "#ff8f30",
  successColor: "#3aaa97",
  ffBase: '"Roboto", sans-serif',
  bgSecondary: "#ffffff",
  fcNegative: "#ffffff",
  bgMain: props.lightColor,
  fcBase: props.grayColor,
  fcAction: props.primaryColor,
  bgAside: props.midDarkColor,
  bgMenuActive: props.darkColor,
  bcMenuActive: props.primaryColor,
  bcInput: props.midGrayColor,
  bcInputHover: props.primaryColor,
  bgInputHover: props.primaryColor,
  fcInputHover: props.primaryColor,
  bcTable: props.midGrayColor,
  bgTable: props.bgSecondary,
  bgTableSecondary: props.midGrayColor,
  bgTableButton: props.bgSecondary,
  bgButton: props.secondaryColor,
  bgImageDarken: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
  bgImageLigthen:
    "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))",
  bgBulletTimeline: props.primaryColor,
  bgLineTimeline: props.midGrayColor,
  bcEventTimeline: props.midGrayColor,
  asideWidth: "3rem"
});

const useBaseElementStyles = (theme: HCTheme) => ({});

export { useHealthCheckStyles, useBaseElementStyles };
