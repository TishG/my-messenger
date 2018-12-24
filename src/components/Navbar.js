import React, {Component} from 'react';
 
class Navbar extends Component {
    render() {
        return (
            <nav className="pb-5">
                <h1>My Messenger <span className="far fa-comments"></span></h1>
            </nav>
        )
    }
}

export default Navbar;