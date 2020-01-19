import React from 'react';
import 'tachyons'
import ReactDOM from 'react-dom';
import App from './components/App'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import {BrowserRouter, Route} from 'react-router-dom'
import reducers from './reducers' 
import Signupform from './components/Signupform';

function saveToLocalStorage(state){
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state',serializedState)
    }catch(e){
        console.log(e)
    }

}

function loadFromLocalStorage(){
    try{
        const serializedState = localStorage.getItem('state')
        if(serializedState===null) return undefined
        return JSON.parse(serializedState)
    } catch(e){
        console.log(e)
        return undefined
    }
}

const preservedState = loadFromLocalStorage()

const store = createStore(
    reducers,
    preservedState,
    applyMiddleware(reduxThunk)
)


store.subscribe(()=> saveToLocalStorage(store.getState()))


ReactDOM.render( 
<Provider store ={store}>
    <BrowserRouter>
        <div>
        < App / >  
        </div>
    </BrowserRouter>
</Provider>, document.querySelector('#root'));