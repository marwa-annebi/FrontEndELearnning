import React, { useEffect, useState } from 'react'
import { Paper, Card, Typography, makeStyles, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { tableRowClasses } from '@mui/material';
import { getAllUsers } from '../../../actions/userActions';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2)
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        color:'#3c44b1'
    },
    table: {
      minWidth: 650,
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))

const PageHeader = (props) => {
  const [rows, setRows] = useState([]);
  
  useEffect(( ) => {
    (async ()=>{
      const {data : users} = await axios.get( "/api/users/users");
     setRows(users) ;
     console.log("fetching user",{users});
    })()
    

    
    },[])


    const classes = useStyles();
  const { title, subTitle, icon } = props;
  return (
    <Paper elevation={0} square className={classes.root}>

      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
      <TableContainer component={Paper}>
     <Table className={classes.table} aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell>First Name </TableCell>
           <TableCell >Email</TableCell>
           <TableCell >isAdmin</TableCell>
           <TableCell >isTeacher</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {rows.map((row) => (
           <TableRow key={row._id}>
             {/* <TableCell component="th" scope="row">
               {row.name}
             </TableCell> */}
             <TableCell >{row.first_name}</TableCell>
             <TableCell >{row.email}</TableCell>
             <TableCell >{row.isAdmin ? 'true' : 'false'}</TableCell>
             <TableCell >{row.isTeacher? 'true' : 'false'}</TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
    </Paper>
     
  )
  
}

export default PageHeader
