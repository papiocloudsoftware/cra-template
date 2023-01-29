import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  inputField: {
    width: "100%",
    minWidth: "150px"
  },
  equalSpace: {
    display: "flex",
    "& > *": {
      flexGrow: 1
    }
  },
  verticallyCentered: {
    marginTop: "auto",
    marginBottom: "auto"
  }
});
