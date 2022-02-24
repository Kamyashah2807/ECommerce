import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face'
import './LoginSignup.css';

import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login, register } from '../../actions/userAction';
import { useAlert } from 'react-alert'

const LoginSignup = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();

    const { error, isAuthenticated } = useSelector(state => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = user;

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        dispatch(register(myForm))
    }

    const onChange = (e) => {
        setUser(e.target.value)
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            history("/account")
        }
    }, [dispatch, error, alert, history, isAuthenticated])

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }
    return (
        <Fragment>
            <div className='loginsignupcontainer'>
                <div className='loginsignupbox'>
                    <div>
                        <div className='login_signup_toggle'>
                            <p onClick={(e) => switchTabs(e, "login")}>LOGIN </p>
                            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className='loginEmail'>
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder='Email'
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className='loginPassword'>
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder='Password'
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forgot">Forgot Password?</Link>
                        <input type="submit" value="Login" className='loginBtn' />
                    </form>
                    <form
                        className='signUpForm'
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className='signUpName'>
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder='Name'
                                required
                                value={name}
                                name="name"
                                onChange={onChange}
                            />
                        </div>
                        <div className='signUpEmail'>
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder='Email'
                                required
                                value={email}
                                name="email"
                                onChange={onChange}
                            />
                        </div>
                        <div className='signUpPassword'>
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder='Password'
                                required
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <input type="submit" value="Register" className='signUpBtn' />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default LoginSignup