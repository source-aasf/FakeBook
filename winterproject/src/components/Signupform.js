import React from 'react';
import { connect } from 'react-redux';
import fakebook from './fakebook.svg';
import './Form.css';
import { signup } from '../actions'
// import { compose } from 'redux'
// import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'
class Signupform extends React.Component {

    // onSubmit = formProps => {
    //   this.props.signup(formProps);
    // }
    constructor(props) {
        super(props)

        this.state = {
            FirstName: "",
            LastName: "",
            EmailAddress: "",
            EnterPassword: "",
            ConfirmPassword: ""
        }

    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitForm = () => {


        if (this.state.EnterPassword != this.state.ConfirmPassword) {
            alert("confirmed password does not match")
        } else {
            console.log(this.state)
            this.props.signup(this.state)

        }

    }

    render() {
        // const {handleSubmit} = this.props;


        return (   <div>
            <div className="App bg-blue br-pill shadow-5">
                <img src={fakebook} className="App-logo bg-dark-blue" alt="logo" />
            </div>
        
            <div className='search pt5 mv2 tc br-pill bg-light-green shadow-5 '>
              <label>First Name</label>
              <input className='mb3 tc pa2 ph5 br-pill' type='text' placeholder='First Name'
               value={this.state.FirstName} onChange={this.handleChange} name="FirstName"
              />
              <br/>
              <label>Last Name</label>
              <input className='tc mb4 pa2 ph5 br-pill' type='text' placeholder='Last Name'
              value={this.state.LastName} onChange={this.handleChange} name="LastName"
              />
              <br/>
              <label>Email Address</label>
              <input className='mb3 tc pa2 ph5 br-pill' type='text' placeholder='Email address '
              value={this.state.EmailAddress} onChange={this.handleChange} name="EmailAddress"
              />
              <br/>
              <label>Enter Password</label>
              <input className='mb3 tc pa2 ph5 br-pill' type='password' placeholder='Enter Password'
              value={this.state.EnterPassword} onChange={this.handleChange} name="EnterPassword"
              />
              <br/>
              <label>Confirm Password</label>
              <input className='mb3 tc pa2 ph5 br-pill' type='password' placeholder='Confirm Password '
              value={this.state.ConfirmPassword} onChange={this.handleChange} name="ConfirmPassword"
              />
              <br/>
              <div>
                {this.props.errorMessage}
              </div>
               <button className='tc mb3 bg-blue br4 pa2 mr2 ba bw2 pointer' onClick={this.submitForm}>
                 Sign up
                 </button>
            </div>          
            </div>                   
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        signup: userInfo => { dispatch(signup(userInfo, ownProps)) }
    }

}

const mapStateToProps = (state) => {
    return { errorMessage: state.auth.errorMessage }
}

// export default Signupform

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signupform)) // withRouter is used for the history purpose

// export default compose(
//   connect(null, actions),
//   reduxForm({form:'signup'})
// )(Signupform)