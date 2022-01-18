import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import controls from './Controls/controls';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(0),
        position: 'absolute',
        top: theme.spacing(5),
        background:'transparent',
        width:"400px",     
  backdropFilter: "blur(8.5px)",
  webkitBackdropFilter:" blur(8.5px)",
  
    },
    dialogTitle: {
        letterSpacing:6,
        fontFamily: '"Raleway", sans-serif',
         textTransform: "uppercase",
          color: "white",
         


    },

}))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex',height:"25px" }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    <Box sx={{ letterSpacing: 8,textAlign:"center"}}> {title}</Box> 
                    </Typography>
                    <controls.ActionButton
                        
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers className={classes.dividers}>
                {children}
            </DialogContent>
        </Dialog>
    )
}
