import {useEffect,useMemo,useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Autorized from './Components/Autorized';
import SignIn from "./Components/Pages/SignIn";
import SignOut from "./Components/Pages/SignOut";
import Posts from "./Components/Pages/Posts";
import Navigator from "./Components/Navigators/Navigator";
import config_nav from "./Config/config-nav.json"
import { useDispatch } from "react-redux";
import { useSelectorCashPosts, useSelectorUserState } from "./Redux/store";
import { userStateAction } from "./Redux/slices/AuthorizedSlice";
import { getMenuItem } from "./Services/AuthService";
import './App.css';
import {postService} from "./Config/service-config"
import PostsService from './Services/PostsService';

function App() {

  const currentUser = useSelectorUserState();
  const cashPosts = useSelectorCashPosts();

  const menuItems = useMemo(() => getMenuItem(currentUser), [currentUser]);

  return (<div style={{display:'flex', flexDirection:"column"}}>
        {!currentUser && <Autorized></Autorized>}
        <div style={{display:'flex', flexDirection:"column",alignItems:"center"}}>
        {currentUser &&  <BrowserRouter>
          <Routes style ={{display:'flex', alignItems: "center"}}>    
          <Route path ='/' element = {<Navigator navItem={menuItems} currentUser={currentUser}></Navigator>}>
          <Route path="Posts" element = {<Posts arrayPosts={cashPosts}></Posts>}/>
              <Route path="SignIn" element = {<SignIn></SignIn>}/>
              <Route path="SignOut" element = {<SignOut></SignOut>}/>
            </Route>
          </Routes>
        </BrowserRouter>}
        </div>
        
  </div>
          
);
  
       
}

export default App;
