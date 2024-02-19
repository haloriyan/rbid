import React, { useState } from "react";
import styles from "./styles/Create.module.css";
import config from "../config";
import Button from "../components/Button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [accessToken, setAccessToken] = useState(null);
    const navigate = useNavigate();

    const authToAPI = (name, email, photo, password, expiry) => {
        axios.post(`${config.baseUrl}/api/user/login`, {
            name: name,
            email: email,
            photo: photo,
            at: password,
        }, {
            method: "POST"
        })
        .then(response => {
            let res = response.data;
            console.log(res);
            if (response.status === 200) {
                window.localStorage.setItem('gat', JSON.stringify({
                    token: password,
                    expiry,
                }))
                window.localStorage.setItem('user_data', JSON.stringify(res.user));
                navigate('/home');
            }
        })
        .catch(err => {
            console.log('ERROR COK', err);
        })
    }
    const getProfile = (token, expiry) => {
        axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
        .then(res => {
            res = res.data;
            console.log(res);
            authToAPI(res.name, res.email, res.picture, token, expiry);
        });
    }
    const loggingIn = useGoogleLogin({
        onSuccess: response => {
            console.log(response);
            getProfile(response.access_token, response.expires_in);
        },
        flow: 'implicit'
    });
    
    return (
        <div className="content">
            <div className={styles.Container}>
                <div className={styles.Content}>
                    <div style={{height: 60}}></div>
                    <div className={styles.Title} style={{color: config.primaryColor,textAlign: 'center'}}>Pakkos</div>
                    <Button accent="secondary" style={{width: '100%',marginTop: 40}} onClick={loggingIn}>Login dengan Google</Button>
                </div>
            </div>
        </div>
    )
}

export default Login;