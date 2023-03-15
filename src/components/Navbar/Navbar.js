import React, { useEffect, useState } from 'react'
import { Typography,AppBar, Toolbar, Avatar, Button } from '@material-ui/core'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import useStyles from './styles'
import Logo from '../../assets/logo.png'
import jwt_decode from "jwt-decode"
import { useDispatch } from 'react-redux'

function Navbar() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    // const [user , setUser] = useState(jwt_decode(JSON.parse(localStorage.getItem("profile"))))
    const [user , setUser] = useState(null)

    useEffect(() => {
        const credential = (localStorage.getItem("profile"))
        if(credential !== null){
            if(JSON.parse(credential).token){
                setUser(JSON.parse(credential).result)
                const decodedToken = jwt_decode(JSON.parse(credential).token)
                if(decodedToken.exp * 1000 < new Date().getTime()) logout(); 
                
            }else{
                setUser(jwt_decode(credential))
                if(jwt_decode(credential).exp * 1000 < new Date().getTime()) logout();
            }
        }
    },[location])

    const logout = () => {
        dispatch({type:"LOGOUT"})
        navigate("/auth")
        setUser(null)
    }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Testing Portal</Typography>
                <img className={classes.image} src={Logo} alt="memories" height="60"></img>
        </div>
        <Toolbar className={classes.toolbar}>
            {
                user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.name} src={user?.picture}>{user?.name.charAt(0)}</Avatar> 
                        <Typography className={classes.userName} variant="h6">{user?.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )
            }
        </Toolbar>
    </AppBar>
  )
}

export default Navbar