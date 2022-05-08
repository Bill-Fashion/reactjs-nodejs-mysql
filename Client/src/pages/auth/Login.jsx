import React, { useState } from 'react'
import './login.scss'
import { LoginReq } from '../../services/api'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate();
    let initLoginForm = {
        username: '',
        password: ''
    }
    const [loginForm, setLoginForm] = useState(initLoginForm);
    const onChangeForm = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (loginForm.username === '' || loginForm.password === '') {
            alert("Please fill all the field")
            return
        } else {
            LoginReq(loginForm)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.data) {
                        navigate('home', { state: result.data })
                    } else {
                        alert("Username and Password should be 19184");
                    }
                });
        }
    }
    return (
        <div>
            <form className="login" onSubmit={submitHandler}>
                <input type="text" name='username' placeholder="Username (ex: 19184)" onChange={onChangeForm} />
                <input type="password" name='password' placeholder="Password" onChange={onChangeForm} />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login