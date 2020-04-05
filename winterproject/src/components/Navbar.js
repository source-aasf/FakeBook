import React from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
class Navbar extends React.Component{
    state = { term: ''};

    onInputChange(event){
        this.setState({term: event.target.value})

    }
    renderLinks(){
        if(this.props.authenticated)
        {
            return(
                <div className="ui pointing menu">

                <a className="item"/>
                <NavLink to="/home">Home </NavLink>              
                
                   
                 <a className="item"/>
                 <NavLink to="/chat">Chat </NavLink>               

                 <a className="item"/>
                 <NavLink to="/welcome">welcome </NavLink>
                 
                 <a className="item"/>
                 <NavLink to="/friends">Friends </NavLink>
                
                <div className="right menu">
                        <a class="item"/>
                <NavLink to="/signout"> signout </NavLink>
                         
                </div>
                 
                   
                </div>
            )
        }else{
            return(
                <div className="ui pointing menu">

                <a className="item"/>
                <NavLink to="/signinform"> Sign In</NavLink>
                 
                 <a className="item"/>
                 <NavLink to="/signupform"> Sign Up</NavLink>
               
                </div>
            )
        }
    }

    render(){
                return(
                    
                <div>
                             {/* <div className="ui menu"> */}
                               {this.renderLinks()}
                                {/* <NavLink to="/home"> home</NavLink> */}
                               
                                {/* <div className="right menu">
                            <div className="item">
                                <div className="ui transparent icon input"> */}
        {/* should we use form tag and if form tag will be used then we will prevent it from refreshing the page(See video 7.10)*/}
                                {/* <input 
                                    type="text" 
                                    placeholder="Search..."
                                    value={this.state.term} 
                                    onChange={this.onInputChange}
                                    />
                                <i className="search link icon" />
                                </div>
                            </div>
                        </div> */}
                {/* </div> */}
                        

                    </div>
                    )
            }
}

const mapStateToProps =(state) =>{
    return{authenticated:state.auth.authenticated}
}
export default connect(mapStateToProps)(Navbar)