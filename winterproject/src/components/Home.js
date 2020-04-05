import React from 'react';
import PostFeed from './PostFeed';
import NewPost from "./NewPost";
import axios from 'axios';
import Faker from 'faker'
import requireAuth from '../requireAuth'
import { getpost } from '../actions'
import Chat from "./Chat/Chat"
class Home extends React.Component {

    //  async componentDidMount(){

    //             const token = localStorage.getItem('token')
    //             console.log(token)
    //             const res =  await axios.get(`/api/newpost`,{
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': token
    //                 }
    //             })
    //             console.log(res)

    //    }






    constructor(props) {
        super(props);
        this.state = {
            // comments:[],
            // like: [],
            // Posttext:[],
            // username:String,
            // id:[] 
            Post: [],
        }
    }



    async componentWillMount() {

        // get all the comment
        const token = localStorage.getItem('token')
        console.log(token)
        const res = await axios.get(`/api/newpost`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        res.data.forEach(function(item) {
            this.setState({
                Post: [item, ...this.state.Post],
                // like:[item.likes, ...this.state.like],
                // username:item.createdBy.Email,
                // id:[item._id, ...this.state.id]

            })

        }, this)

        console.log(res)
        console.log(this.state)

    }

    //     async onClickPost (text){
    //     // const res = await axios.post(`/api/newpost`, { text })
    //         console.log(text);

    //     }




    // onClickLike(num){
    //         console.log(num)
    // }



    render() {
        return ( 
        <div>
            <NewPost/> 
            {
                this.state.Post.map((item, index) => ( 
                    <PostFeed key = { index }
                    text = { item.text }
                    likes = { item.likes }
                    postid = { item._id }
                    time = { item.createdAt }
                    name = { item.createdBy.Email }
                    avt = { Faker.image.avatar() }
                    image = { Faker.image.image() }
                    //  onClick={this.onClickLike}
                    />
                ))
            }

                                                                                                                                                                                                                                                                                                                 {
                /* <NewPost/>
                            <PostFeed/> */
            } {
                /* <PostFeed
                            avt={Faker.image.avatar()}
                            image={Faker.image.image()}

                            /> */
            } 
        </div>

        )
    }





}

export default requireAuth(Home)