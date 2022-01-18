import React from 'react'
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  appRoot: {
    "& .MuiFormControl-root": {
      width: "70%",
      margin: theme.spacing(1),
    },
  },
}));
export default function Form(props) {
    const classes = useStyles();
    return (
        <form className={classes.appRoot}>
            {props.children}
        </form>
    )
}
