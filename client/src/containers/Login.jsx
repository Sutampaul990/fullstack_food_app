import React, { useEffect, useState } from 'react';
import {LoginBg,Logo} from "../assets";
import { LoginInput } from '../components';
import {FaEnvelope, FaLock, FcGoogle} from "../assets/icons";
import {motion} from "framer-motion";
import { buttonClick } from '../animations';
import {useNavigate} from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {app} from "../config/firebase.config";
import { validateUserJWTToken } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../context/actions/userActions';

import { alertInfo, alertWarning, alertNULL } from '../context/actions/alertActions';


const Login = () => {

    const [userEmail,setUserEmail] = useState("")
    const [isSignUp,setIsSignUp] = useState(false)
    const [password,setPassword] = useState("")
    const [confirm_password,setConfirm_password] = useState("")

    const provider = new GoogleAuthProvider();
    const firebaseAuth = getAuth(app);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const alert = useSelector((state) => state.alert)

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if(user){
            navigate("/",{replace : true});
        }
    }, [ user]);

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth ,provider).then(userCred => {
            firebaseAuth.onAuthStateChanged(cred => {
                if(cred){
                    cred.getIdToken().then(token => {
                        validateUserJWTToken(token).then((data) => {
                            dispatch(setUserDetails(data));
                        });
                        navigate("/",{replace : true});
                    });
                }
            });
        });
    };
    
    const signUpWithEmailPass = async () => {
        if( userEmail === "" || password === "" || confirm_password === ""){
            dispatch(alertInfo("Required fields should not be empty"));
            setTimeout(() => {
                dispatch(alertNULL())
            }, 3000);
        }
        else{
            if(confirm_password === password){
                setConfirm_password("");
                setPassword("");
                setUserEmail("");
                await createUserWithEmailAndPassword(firebaseAuth , userEmail , password).then((userCred) => {
                    firebaseAuth.onAuthStateChanged(cred => {
                        if(cred){
                            cred.getIdToken().then(token => {
                                validateUserJWTToken(token).then((data) => {
                                    dispatch(setUserDetails(data));
                                });
                                navigate("/",{replace : true});
                            });
                        }
                    });
                });
            }
            else{
                dispatch(alertWarning("Password doesn't match"));
                setTimeout(() => {
                    dispatch(alertNULL())
                }, 3000);
            }
        }
    };

    const signInWithEmailPass = async () => {
        if( userEmail !== "" && password !== "" ){
            await signInWithEmailAndPassword(firebaseAuth , userEmail , password).then((userCred) => {
                firebaseAuth.onAuthStateChanged(cred => {
                    if(cred){
                        cred.getIdToken().then(token => {
                            validateUserJWTToken(token).then((data) => {
                                dispatch(setUserDetails(data));
                            });
                            navigate("/",{replace : true});
                        });
                    }
                });
            });
        }
        else if(userEmail === "" || password === "" ){
            dispatch(alertInfo("Required fields should not be empty"));
            setTimeout(() => {
                dispatch(alertNULL())
            }, 3000);
        }
        else{
            dispatch(alertWarning("Password doesn't match"));
            setTimeout(() => {
                dispatch(alertNULL())
            }, 3000);
        }
    };


  return (
    <div className=" w-screen h-screen relative overflow-hidden">

        {/* Background Image */} 
        <img src={LoginBg} 
        className=" w-full h-full object-cover absolute top-0 left-0" 
        alt="" />

        {/* Content Box */} 
        <div className=" flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6" >

            {/* Top Logo Section */} 
            <div className=" flex items-center justify-start gap-4 w-full" >
                <img src={Logo} className="w-8" alt="" />
                <p className=" text-headingColor font-semibold text-2xl" >City</p>
            </div>

            {/* Welcome Section */} 
            <p className=" text-3xl font-semibold text-headingColor" >Welcome Back</p>
            <p className=" text-xl text-textColor -mt-6" >{isSignUp ? "Sign Up" : "Sign In"} with following</p>

            {/* Input Section */} 
            <div className=" w-full flex flex-col items-center justify-center gap-4 px-4 md:px-12 py-4" >

                <LoginInput 
                placeholder="Enter your Email" 
                icon={<FaEnvelope className="text-xl text-textColor" />} 
                inputState={userEmail} 
                inputStateFunc={setUserEmail} 
                type="email" 
                isSignUp={isSignUp} 
                />

                <LoginInput 
                placeholder="Enter your Password" 
                icon={<FaLock className="text-xl text-textColor" />} 
                inputState={password} 
                inputStateFunc={setPassword} 
                type="password" 
                isSignUp={isSignUp} 
                />

                { isSignUp && (
                    <LoginInput 
                    placeholder="Confirm your Password" 
                    icon={<FaLock className="text-xl text-textColor" />} 
                    inputState={confirm_password} 
                    inputStateFunc={setConfirm_password} 
                    type="password" 
                    isSignUp={isSignUp} 
                    />
                )}

                { (!isSignUp) ? 
                <p>Doesn't have an account?{" "} 
                    <motion.button {...buttonClick} 
                    className=" text-red-500 bg-transparent underline cursor-pointer font-semibold" 
                    onClick={() => setIsSignUp(true)} >
                        Create Account
                    </motion.button>
                </p> 
                : 
                <p>Already have an account.{" "} 
                    <motion.button {...buttonClick} 
                    className=" text-red-500 bg-transparent underline cursor-pointer font-semibold"
                    onClick={() => setIsSignUp(false)} >
                        Sign In
                    </motion.button>
                </p>
                }

                {/* Button Section */} 
                
                { isSignUp ? (
                    <motion.button
                    {...buttonClick}
                    className=" w-full cursor-pointer rounded-md px-4 py-2 bg-red-400 text-xl text-white hover:bg-red-500 capitalize transition-all duration-150"
                    onClick={signUpWithEmailPass}
                    >
                        Sign Up
                    </motion.button>

                ) : (
                    <motion.button
                    {...buttonClick}
                    className=" w-full cursor-pointer rounded-md px-4 py-2 bg-red-400 text-xl text-white hover:bg-red-500 capitalize transition-all duration-150"
                    onClick={signInWithEmailPass}
                    >
                        Sign In
                    </motion.button>
                )}

            </div>

            <div className=" flex items-center justify-between gap-16" >
                <p className=" w-24 h-[1px] rounded-md bg-black" ></p>
                <p className="text-black font-bold" >Or</p>
                <p className=" w-24 h-[1px] rounded-md bg-black" ></p>
            </div>

            <motion.div 
            {...buttonClick}
            className=" flex items-center px-20 py-2 bg-lightOverlay cursor-pointer backdrop-blur-md rounded-full gap-4" 
            onClick={loginWithGoogle}
            >
                <FcGoogle className="text-3xl"/>
                <p className="capitalize text-base text-headingColor font-semibold">Sign with Google</p>
            </motion.div>

        </div>


    </div>
  )
}

export default Login
