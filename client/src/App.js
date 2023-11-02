import React, { useState, useEffect } from 'react';
import {Route,Routes} from 'react-router-dom';
import {Main,Login, Dashboard} from "./containers/index";
import { validateUserJWTToken } from "../src/api/index";

import { getAuth } from "firebase/auth";
import {app} from "./config/firebase.config";
import { useDispatch, useSelector } from 'react-redux';
import {setUserDetails} from "./context/actions/userActions";
import {motion} from "framer-motion";
import { fadeInOut } from './animations';
import { Alert, MainLoader } from './components';

const App = () => {

  const firebaseAuth = getAuth(app);

  const [isLoading , setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const alert = useSelector((state) => state.alert)

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged(cred => {
      if(cred){
          cred.getIdToken().then(token => {
              validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
              });
          });
      }
      setInterval(() => {
        setIsLoading(false)
      }, 3000);
  });
  },[]);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      { isLoading && (
        <motion.div {...fadeInOut} className=" fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md w-full items-center justify-center flex">
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
      
      {alert?.type && <Alert alert={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App
