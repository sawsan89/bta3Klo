import React, { Component } from 'react'
// import { singUp } from './UserMethods'
import { Link } from 'react-router-dom'
import StyleSheet from './StyleSheet.css';
import logo from './Logo.png';
import Axios from 'axios';
import AuthService from "../services/auth.service";


class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            category:'',
            service:'',
            successful: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            category:this.state.category,
            service:this.state.service
        }

        //send values to DB
        AuthService.register(newUser).then(res => {
                this.setState({
                    successful: true
                  });
            this.props.history.push(`/login`)
        })
    }

    render() {
        return (
            <>
            <img src={logo} alt='Logo' className='logo'></img>
        <div className="form">
            <form onSubmit={this.handleSubmit}>
            <div >
                <label id="nmSign">Name</label>
<br></br>
                <input type="text" id="nameSign"  placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.handleChange} />
            </div>
            <div>
                <label id="emSing">E-Mail Address</label>
<br></br>
                <input type="email" id="emailSign" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
            </div>
            <div>
                <label id="pSign">Password</label>
<br></br>
                <input type="password" id="passwordSign" placeholder="Enter your password" name="password" autoComplete="off" value={this.state.password} onChange={this.handleChange} />
            </div>
<br></br>
<div>
                <label id="cat">Category</label>
<br></br>
                <input type="text"  placeholder="Enter your service category" name="category" autoComplete="off" value={this.state.category} onChange={this.handleChange} />
            </div>
<br></br>

<div>
                <label id="service">service</label>
<br></br>
                <input type="text"  placeholder="Enter your service" name="service" autoComplete="off" value={this.state.service} onChange={this.handleChange} />
            </div>
<br></br>
            <div className="FormField">
                <button id="signBttn">Sign Up</button> I'm already member <Link to="/login">Login</Link> {/*TODO: send me to the log in */}
            </div>
            </form>
        </div>
        </>
        );
    }
}

export default SignUpForm;