import React from 'react';
import {Image} from 'react-bootstrap';

class AppHeader extends React.Component{
    render(){
        return(
            <div className="appHeaderImageContainer">
                <Image className="appHeaderImage" src={require('../office-entrance-1.jpg')} />
            </div>
        );
    }    
}

export default AppHeader;