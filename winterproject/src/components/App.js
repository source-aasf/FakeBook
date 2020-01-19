import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import Home from './Home'
import PostFeed from './PostFeed';
import NewPost from "./NewPost";
import Navbar from "./Navbar"
import FriendsTab from "./FriendsTab"
import Signupform from "./Signupform"
import Faker from 'faker'
import Form from './Form'
import Welcome from './Welcome'
import signoutpage from './signout'
import Chat from './Chat/Chat'
import Friendslist from './Friendslist'
import "./Form.css"
class App extends React.Component {
   render() {
        return ( 
            <div> 
            <BrowserRouter>
            <Navbar/>
            <Route path = "/signinform" exact component = { Form }/> 
            <Route path = "/signupform" exact component = { Signupform } /> 
            <Route path = "/welcome" exact component = { Welcome }/>   
            <Route path = "/signout"exact component = { signoutpage }/>  
            <Route path = "/home" exact component = { Home }/> 
            <Route path = "/chat" exact component = { Chat }/>
            <Route path = "/friends" exact component = {Friendslist}/>
            </BrowserRouter>  
            </div>
        );
    }
};

export default App;