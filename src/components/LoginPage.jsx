import { Button, Text, Title } from '@mantine/core'
import { Link } from "react-router-dom";
import "./LoginPage.css"
import React, { useEffect } from 'react'
import { RiGoogleFill } from "@react-icons/all-files/ri/RiGoogleFill"
// import { FirebaseSignIn, useAuth, useDbData, useDbUpdate } from '../utils/firebase';

const LoginPage = ({setOnboardOpen}) => {
    useEffect(() => {
        setOnboardOpen(true);
    }, []);
    
    // Sign in the user if they are not signed in already
    // const user = useAuth();
    // const [data, error] = useDbData("/");
    // const [update, result] = useDbUpdate(`/users/${user? user.uid : "unknown"}`);
   

    
    //TODO: Auth emulator on port 9099
    //TODO: DB emulator port 9000
    //TODO: Hosting port 8080
    //TODO: Storage on 9199
    
    
  
    return (
        <div data-cy="login-page" className="login">
            <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWM4ZmJiNGVkNjIyZjk3ZDdiNzdlMzM5ZmNhNjU5NDIxZDY3MGFjMSZjdD1z/kC9CzOnDVMj2QGIwEh/giphy.gif" height="300" />
            <Text className="title">Welcome to</Text>
            <Title>Platter Pal</Title>
            <Text className="blurb" style={{ margin: 20, textAlign: "center" }}>Over its lifespan, one reusable takeout container can save up to 1,000 others types of takeout containers from entering our landfills. By using Platter Pal’s reusable containers for your large order, you are making a difference.</Text>
            <div style={{ height: 70 }}></div>
            <Link to={"/browse"}><Button leftIcon={<RiGoogleFill data-testid="sign-in"/>}>Sign in with Google</Button></Link>
        </div>
    )
}

export default LoginPage;