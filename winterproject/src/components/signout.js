import React from 'react'
import requireAuth from '../requireAuth'
import {signout} from '../actions'
import {connect} from 'react-redux';


class signoutpage extends React.Component{
        componentDidMount(){
            this.props.signout();
        }

        render(){ 
            return(
                <div>
                    <h3>bye</h3>
                </div>

            )

                }
   }
const mapDispatchToProps = (dispatch)=>{
    return{
      signout: () => { dispatch(signout()) }
    }
  
  }

export default connect(null,mapDispatchToProps)(signoutpage)