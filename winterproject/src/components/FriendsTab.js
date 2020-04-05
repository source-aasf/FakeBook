import React from 'react'

class FriendsTab extends React.Component{
    render(){
        return(
            <a className="item">
            <div className="ui small label"></div>
                    {this.props.email}
            </a>
    
            )
    }


}

export default FriendsTab;