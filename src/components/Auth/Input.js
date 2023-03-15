import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React from 'react'

const Input = ({half, handleChange,handleShowPassword, label , autoFocus, type , name}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12} >
        <TextField variant="outlined" name={name} onChange={handleChange} required fullWidth label={label} autoFocus={autoFocus} type={type} 
        InputProps={
            name === "password" ? {
                endAdornment:(
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type==="password" ? <Visibility/>:<VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            } : null
        }
        />
    </Grid>
  )
}

export default Input