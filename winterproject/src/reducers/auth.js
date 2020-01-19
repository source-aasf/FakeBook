import { AUTH_USER, AUTH_ERROR } from '../actions/types'

const INITIAL_STATE = {
    autheticated: '',
    errorMessage: '',
    user: {}
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return {...state, authenticated: action.token, user: action.user }
        case AUTH_ERROR:
            return {...state, errorMessage: action.token }
        default:
            return state;
    }
}