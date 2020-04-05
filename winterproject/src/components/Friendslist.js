import React from 'react'
import axios from 'axios'
import socketio from 'socket.io-client'
import FriendsTab from './FriendsTab'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'




class Friendslist extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            User:[]      
        }
       
        // console.log(this.props.user)
    }
    
  async componentDidMount(){
        const res = await axios.get(`api/getuser`)
        console.log(res)
        res.data.forEach(function(item) {
            this.setState({
                User: [item, ...this.state.User],
               })
            
        }, this)
        // console.log(this.state.User)
    }

    addfriend(id){


          const token = localStorage.getItem('token')
          const res =  axios.post(`api/sendrequest`,{
                    receiverId:id                 
            },{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': token
                }
            })
    }

displayname(item){
    return(
             <div className="item">
                {item.email}
               
                <button className="mini ui right floated primary button" onClick={()=>{
                    this.addfriend(item._id)
                }}>
                        Add Friend
                 </button>
                <Link to={`/chat?name=${item.email}`}>
                     <button className="mini ui right floated primary button" >
                        Chat
                    </button>
                </Link>
                
               
            </div>
            
      
     )
    
}
    render(){
    
     
        return(
        <div>
                <div className="ui massive vertical menu">
    
            
                   {
                         this.state.User.map((item,index)=>(
                            // <FriendsTab 
                            // key={index}
                            // email={item.email}
                            // />
                            this.displayname(item)

                         ))
                   
      
                   }
               
           
            <div className="item">
              <div className="ui icon input">
                <input type="text" placeholder="Search Friends" />
                <i className="search icon" />
                
              </div>
            
          </div>
            </div>
        </div>
          
        )
    }

}

const mapStateToProps = (state) => {
    return { user: state.auth.user
    }
}

export default connect(mapStateToProps,null)(Friendslist)