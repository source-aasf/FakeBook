import React from 'react'
import requireAuth from '../requireAuth'
import socketio from 'socket.io-client'
let socket;
class Welcome extends React.Component{


    constructor(){

    }





        render(){
            return(
                <div>
                    <h3>Welcome your are logged in</h3>
                </div>

            )
        }

}

export default requireAuth(Welcome)