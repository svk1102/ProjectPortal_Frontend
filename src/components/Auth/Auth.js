import React,{useState} from 'react'
import { Avatar , Button , Typography , Container , Paper , Grid, TextField } from '@material-ui/core'
import useStyles from './styles'
import {LockOutlined} from "@material-ui/icons"
import Input from './Input'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'

import {signin,signup} from "../../actions/auth"

const initialFormData = {
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : "",
}

export const Auth = () => {

    const [showPassword,setShowPassword] = useState(false)
    const [isSignUp,setIsSignUp] = useState(false)
    const [formData,setFormData] = useState(initialFormData)

    const dispatch = useDispatch()
    const classes = useStyles();
    const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)

        if(isSignUp){
            dispatch(signup(formData,navigate))
        }else{
            dispatch(signin(formData,navigate))
        }

    }

    const handleChange = (e) => {
        setFormData({...formData , [e.target.name] : e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev)
    }

    const switchMode = () => {
        setIsSignUp((prev) => !prev)
    }

    const googleSuccess = async(res) => {
        const credential = res?.credential; //Optinal chaining operator (?.) Does not throw an error if initial object is not defined.
        const clientId = res?.clientId;

        try {
            dispatch({type:'AUTH' , data: {credential:credential,clientId:clientId}})
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlined/>
            </Avatar>
            <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2} >
                    {
                        isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />

                    {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>}
                </Grid>
                <GoogleLogin 
                onSuccess={googleSuccess}
                onError={(err) => console.log(err)}
                // type="icon"
                size="large"
                
                />
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignUp ? "Sign Up" : "Sign In"}</Button>
                <Grid container justifyContent="flex-end" >
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp ? "Already Have an account ? Sign In" : "Don't have an account ? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}
