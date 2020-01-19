import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import io from 'socket.io-client'
import Infobar from '../InfoBar/InfoBar'
import Input from "../Input/Input"
import Messages from "../Messages/Messages"
import './Chat.css'
// class Chat extends React.Component{

//     constructor(props){
//         super(props)
//         this.state={
//             name:''
//        }
        
//     }

//     componentWillMount(){
//         let socket
//         const ENDPOINT = 'http://localhost:5000/'
//         const name = {
//             user:'singh'
//        }
//         socket = io(ENDPOINT)
        
//         socket.on('catch',(e)=>{
//             console.log(e.name)
//         })
//         socket.emit('join' ,{name:"fdsafsaf"},[ENDPOINT])

//         console.log(socket)
//         return() => {
//             socket.emit('disconnect')
//             socket.off();
//         }
//     }






//     render(){

//         return(

//             <h1>Chat page</h1>
//         )
//     }




// }
let socket

const Chat = (props) => {

        const [username, setName] = useState('')
        const [message, setMessage] = useState('')
        const [messages, setMessages] = useState([])
        const ENDPOINT = 'http://localhost:5000/'

        useEffect(() => {
            const {name} = queryString.parse(location.search);
            
            socket = io(ENDPOINT,{secure:true})
            
            // socket.on('catch',(e)=>{
            //     console.log(e.name)
            // })

            socket.emit('join' ,{ name:'Utkarsh', room:"r1" })

            console.log(socket)
            return() => {
                socket.emit('disconnect')
                socket.off();
            }

        },[ENDPOINT])

        useEffect(()=>{
            socket.on('message',(messag)=>{
                console.log(messag)
                setMessages([...messages, messag])

            })

        })

        const sendMessage=(event)=>{
            event.preventDefault();

            if(message){
                socket.emit('sendMessage', message, () => setMessage(''))
            }
           
        }
        console.log(message)
        console.log(messages)

        return (
                <div  className="container">
                    {/* <div> */}
                    {/* <div className="outerContainer"> */}
                    
                             <Infobar room={"r1"} />
                             <Messages messages={messages} name/>
                             <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                   
                            {/* <TextContainer users={users}/> */}
                 {/* </div> */}
                    
                        {/* <Infobar/> */}
                    {/* </div> */}
                </div>
            )


        }

        export default Chat