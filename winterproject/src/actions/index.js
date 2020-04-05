import { AUTH_USER, AUTH_ERROR } from './types';
import axios from 'axios'

//redux think is applied here. it helps to return action and a dispatch function

export const signup = (user, ownProps) => {
    return async dispatch => {
        try {
            const res = await axios.post(`/api/signup`, {
                email: user.EmailAddress,
                password: user.EnterPassword
            })
            dispatch({ type: AUTH_USER, token: res.data.token, user: res.data.user })
            localStorage.setItem('token', res.data.token)
            ownProps.history.push(`/welcome`);
        } catch (e) {
            dispatch({ type: AUTH_ERROR, payload: 'Email in use' })
            console.log(e)
        }
    }
}


export const signin = (user, ownProps) => {
    return async dispatch => {
        try {
            const res = await axios.post(`/api/signin`, {
                email: user.EmailAddress,
                password: user.EnterPassword
            })
            dispatch({ type: AUTH_USER, token: res.data.token, user: res.data.user })
            localStorage.setItem('token', res.data.token)
            ownProps.history.push(`/welcome`);

        } catch (e) {
            dispatch({ type: AUTH_ERROR, payload: 'Invalid Login details' })
            console.log(e)
        }
    }
}

export const signout = () => {
    localStorage.removeItem('token')

    return {
        type: AUTH_USER,
        payload: ''
    }
}

export const postit = (post, ownProps) => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        try {
            const res = await axios.post(`/api/newpost`, {
                text: post.text
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })

            dispatch({ type: AUTH_USER, payload: localStorage.getItem('token') })
        } catch (e) {
            //dispactch function for the error that will occur.
            console.log(e)
        }
    }
}

// export const postlike = (post, ownProps) => {
//     return async dispatch => {
//         const token = localStorage.getItem('token')
//         try {
//             const res = await axios.post(`/api/newpost`, {
//                 likes: post.text
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': token
//                 }
//             })
//             getpost()
//             dispatch({ type: AUTH_USER, payload: localStorage.getItem('token') })
//         } catch (e) {
//             //dispactch function for the error that will occur.
//             console.log(e)
//         }
//     }
// }