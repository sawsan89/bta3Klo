import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import { login } from './UserMethods'
import StyleSheet from './StyleSheet.css';
import logo from './Logo.png';
import AuthService from "../services/auth.service";


class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
          email: this.state.email,
          password: this.state.password
        }
        
        AuthService.login(user ).then(res => {
          if (res) {
            this.setState({loading : true});
            console.log("logged ")
            this.props.history.push(`/profile`)
          }
        })
    }

    render() {
        return (
          <>
          {/* <img src={logo} alt='Logo' className='logo'></img> */}
        <div className="form">
            <form onSubmit={this.handleSubmit} >
            <div>
                <label id='emLog'>E-Mail Address</label>
<br></br>
                <input type="email" id="emailLog"placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>
<br></br>
              <div>
                <label id='pLog'>Password</label>
<br></br>
                <input type="password" id="passwordLog" placeholder="Enter your password" autoComplete="off" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
<br></br>
              <div id= 'xx'>
                  <button id='logBttn'  disabled={this.state.loading}>Sign In</button> Don't have an account ? <Link id='x' to="signup">SignUp</Link> {/*TODO add link to send to signUp */}
              </div>
            </form>
          </div>
          </>
        );
    }
}

export default SignInForm;