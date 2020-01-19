import React from 'react';
import fakebook from './fakebook.svg';
import './Form.css';
import {connect} from 'react-redux';

import {signin} from '../actions'


class Form extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      EmailAddress:"",
      EnterPassword:"",
      }

  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitForm = () =>{          
        console.log(this.state)
        this.props.signin(this.state)
      
}
  render(){

  return (
    <div>
    <div className="App bg-blue br-pill shadow-5">
      <img src={fakebook}className="App-logo bg-dark-blue" alt="logo" />
    </div>
    <div className="search pt5 mv2 tc br-pill bg-light-green shadow-5 ">
      <input className="mb3 tc pa2 ph5 br-pill" type='text' placeholder='Email address '
      value={this.state.EmailAddress} onChange={this.handleChange} name="EmailAddress"
      />
      <br />
      <input className="tc mb4 pa2 ph5 br-pill" type='password' placeholder='Enter Password'
      value={this.state.EnterPassword} onChange={this.handleChange} name="EnterPassword"
      />
      <br />
      <div>{this.props.errorMessage}</div>
      <button className='tc mb3 bg-blue br4 pa2 mr2 ba bw2 pointer' onClick={this.submitForm}>
          Log In
         </button>
      <br />
      <a href="#" classname=" link b mb3 f5 lh-copy dark-blue hover-dark-red">Forgot Password</a>
    </div>
    <h3 classname="tc">or</h3>
    <div classname="tc br-pill bg-light-purple shadow-5">
      <button classname="tc mv3 bg-blue br4 pa2 mr2 ba bw2 pointer ">
        <a classname="link f5 lh-copy hover-dark-red dark-blue" href="#">Create new account</a>
      </button>
    </div>
  </div>
  

  )
  }
}
const mapDispatchToProps = (dispatch, ownProps)=>{
  return{
    signin: (user) => { dispatch(signin(user,ownProps)) }
  }

  }
  const mapStateToProps= (state) =>{
    return{errorMessage: state.auth.errorMessage}
  }
export default connect(mapStateToProps,mapDispatchToProps)(Form)
