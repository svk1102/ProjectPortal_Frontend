import React , {useEffect, useState} from "react";
import {Container} from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {BrowserRouter , Routes , Route} from "react-router-dom"
import { Auth } from "./components/Auth/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {

    return(
        <GoogleOAuthProvider clientId="558572289536-v5sujuitmerob6k24rn3mb0jd2ng96p4.apps.googleusercontent.com">
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar/>
                <Routes>
                    <Route path="/" exact element={<Home/>}></Route>
                    <Route path="/auth" exact element={<Auth/>}></Route>
                </Routes>
            </Container>
        </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App