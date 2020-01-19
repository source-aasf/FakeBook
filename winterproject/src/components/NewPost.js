import React from 'react'
import { connect } from 'react-redux';
import { postit } from '../actions'
import { withRouter } from 'react-router-dom'
// import requireAuth from '../requireAuth'
class NewPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: " ",
            
        }
    }

     onInputChange = (val) => {
        this.setState({
            text: val.target.value
        })

    }
    clickonpost = () => {
        
        this.props.postit(this.state)
         this.setState({text:' '})  
    
    }

    render(){
        return(
                <div className="ui form"  >
                    <div style={{marginLeft: '35%', marginRight: '35%', padding:'10px'}}>
                        <label>New Post</label>
                            <div className="field"  >
                                <textarea
                                value={this.state.text}
                                onChange={this.onInputChange}
                                />
                                <button className="ui primary button" onClick={this.clickonpost}>
                                    Post
                                </button>
                           </div>
                    </div>
            </div>
        );

}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        postit: post => {dispatch(postit(post))}
        // signup: userInfo => { dispatch(signup(userInfo, ownProps)) }
    }

}

const mapStateToProps = (state) => {
    // return { errorMessage: state.auth.errorMessage }
}
    

export default (connect(null, mapDispatchToProps)(NewPost))