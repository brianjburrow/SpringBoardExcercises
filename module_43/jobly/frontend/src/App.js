import React, {useState, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes/Navigation";
import Routes from "./routes/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
import logo from './logo.svg';
import './App.css';

// set key name for storing token in localStorage for 'remember-me' re-logins

/** Jobly
 * 
 * -infoLoaded: has user data been pulled from API
 * 
 * currentUser: user object from API.  This becomes the way to tell if someone
 * is logged in.  This is passed around via context throughout.
 * 
 * Token : for logged in users, this is their JWT for authentication.
 * This is required to be set for most API calls.  This is initially read
 * from localStorage, and synced to there via useLocalStorage hook.
 */
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
);


  // on initial load, pull user info from API.  Until a user is logged in
  // and they have a token, this shouldn't run.  
  // it only needs to rerun when a user logs out
  useEffect(function loadUserInfo(){
    console.debug("App useEffect loadUserInfo", "token=", token);
    async function getCurrentUser(){
      if(token){
        // current user is logged in
        try{
          let {username} = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          // get the list of jobs they have applied for
          setApplicationIds(new Set(currentUser.applications));
        } catch (err){
          console.error("App loadUserInfo: did not load correctly", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs
    // once data is fetched, this wil be set back to true
    setInfoLoaded(false);
    console.log("GCU", getCurrentUser)
    getCurrentUser();
  }, [token]);
  
  // handle logouts
  function logout(){
    setCurrentUser(null);
    setToken(null);
  }

  // Check if the current user has applied for a specific job
  function hasAppliedToJob(id){
    return applicationIds.has(id);
  }
  // handle signup
  // auto log in

  async function signup(signupData){
    try{
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return {sucess:true};
    } catch (err){
      console.error("signup failed", err);
      return {success: false, errors: err};
    }
  }

  // handle login
  async function login(loginData){
    try{
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return {success: true};
    } catch(err){
      return {success: false, errors: err};
    }
  }

  // apply to a job: no return so no async needed
  function applyToJob(id){  
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <LoadingSpinner />;
  return (
    <BrowserRouter>
      <UserContext.Provider 
      value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <Navigation logout={logout}/>
          <Routes login={login} signup={signup}/>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
