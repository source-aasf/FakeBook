import React from 'react'
import postlikes from '../actions'
import axios from "axios"
class PostFeed extends React.Component{

    state = { liked:false,
              likes:this.props.likes, 
              comment:[]
            }



            componentWillMount(){
              const id = this.props.postid
              console.log(id)
            }

    onInputChange = (val) =>{
      this.setState({
          comment: val.target.value  
      })

  } 
    changelike=()=>{

        if(!this.state.liked){
          this.setState(prevState => {
            return{ likes: prevState.likes + 1,
                  liked: !this.state.liked
            }
           }, ()=>{console.log(this.state)
          //   const token = localStorage.getItem('token')
          //   try {
          //       const res = axios.post(`/api/updatepost`, {
          //           likes: this.state.likes,
          //           id:this.state.id
          //       }, {
          //           headers: {
          //               'Content-Type': 'application/json',
          //               'Authorization': token
          //           }
          //       })
          //       } catch (e) {
          //       console.log(e)
          //   }
           })
        }
        
         else {
          this.setState(prevState => {
            return{ likes: prevState.likes - 1,
                  liked: !this.state.liked
            }
           }, ()=>{
             // sendlikestoserver()
             // this.props.onClick(this.state.likes)
           })
         }
        
      
    }
    // sendcomment = () =>{
    //   // this.props.Newcomment(this.state.comment)
    //      console.log(this.state.comment)
    //      this.setState({comment:[ ]})
        
    //      const token = localStorage.getItem('token')
    //      console.log(token)
    //      const res =  await axios.post(`/api/newpost`,{
    //          headers: {
    //              'Content-Type': 'application/json',
    //              'Authorization': token
    //          }
    //      })




    


    //  mappingprops= () => {
    //       this.props.comments.map((comment,index) => ( 

    //       ))
    //  } 
    render(){
      const label = this.state.liked ? 'Unlike' : 'Like'
        return(
         
          <div className="ui card" style={{marginLeft: '36%', marginRight: '49%'}}>
          <div className="content" >
        <div>{this.props.postid}</div>
        <div className="right floated meta">{this.props.time}</div>
            <img className="ui avatar image" src={this.props.avt} /> {this.props.name}
            <div className="ui huge image">
              {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgdmgiXDeDj7Osrvbdl1Ppuos_q_uCDIUZims8fBQjFzXwRoxX" /> */}
              <p>{this.props.text}</p>
            </div>
            <div className="content">
            <button className="ui icon button">
              <i className="share square outline icon"></i>
              S
            </button>
              <span className="middle aligned" style={{marginLeft:"20px"}}>
                <button className="ui icon button">
                <i className="comment icon" />
                C  
                </button>
              </span>
              <button className="ui icon button" onClick={this.changelike} >
              <span style={{marginleft:"25px"}}>
                {label}
                
                   {this.props.likes}
             
                {/* <i className="heart outline like icon" /> */}
                
              </span>
             </button>
             
                {/* <div className="ui left labeled button" tabIndex={0}>
                          <a className="ui basic right pointing label">
                            2,048
                          </a>
                        <div className="ui button">
                          <i className="heart icon" /> Like
                   </div>
              </div> */}
              <div className="extra content" style={{padding:"8px"}}>
                    <div className="ui large transparent left icon input">
                    <i className="comment icon" />  
                      <input 
                      type="text" placeholder="Add Comment..." 
                      value={this.state.comment}
                      onChange={this.onInputChange}                                      
                      />
                      <button onClick={this.sendcomment}>post</button>
                    </div>
                  </div>

            </div>
           
          </div>
        </div>
        
        )
            };
};

export default PostFeed;
