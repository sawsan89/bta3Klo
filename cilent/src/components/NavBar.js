import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import AuthService from "../services/auth.service";



class NavBar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
          currentUser: undefined
        };
      }
      componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user
          });
        }
      }
    logOut(event) {
        event.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }


    render() {

        const {currentUser} = this.state;
        const loginSingUpLink = (
                <ul className="navbarNav">
                    <li id="navItemLogin">
                        <NavLink style={{color: "White"}} to="/login" className="navLink">Login</NavLink>
                    </li>
                </ul>
            )

            const userLink = (
                <ul className="navbarNav">
                    <li id="navItemPro">
                        <NavLink style={{color: "White"}} to="/profile" className="navLink">Profile</NavLink>
                    </li>
                    <li id="navItemLogout">
                        <a href="" onClick={this.logOut} className="navLink">Logout</a>
                    </li>
                </ul>
            )

                return (
                    <div id="navbar">
                        <ul className="navbarNav">
                            <li id="navItemHome">
                                <NavLink style={{color: "White"}} to ='/' className='navLink'>Home</NavLink>
                            </li>
                        </ul>
                        {localStorage.usertoken ? userLink : loginSingUpLink}
                    </div>
                )

        }
}


export default withRouter(NavBar);