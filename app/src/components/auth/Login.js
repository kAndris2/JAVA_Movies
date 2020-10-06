import React, {Component} from 'react';
import axios from 'axios';
import '../../static/css/Login.css'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            username: "",

            regErrors:""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push('/');
    }

    handleSubmit(event){
        //destruct tho
        const {
            email,
            password,
            username
        } = this.state;

        axios.post("http://localhost:3000/api/login", {
                name: username,
                email: email,
                password: password
            },
            {withCredentials: true}
        ).then(response => {
            if (response.data.state){
                this.handleSuccessfulAuth(response.data);
            }
            else {
                this.setState({regErrors: response.data})
            }
        }).catch( error => {
            console.log("login error", error);
        })
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <section className="main_content content">
                <div className="column_wrapper">
                    <div className="content_wrapper">
                        <div className="wrapper">
                            <h2>Login to your account</h2>
                            <p>In order to use the editing and rating capabilities of TMDb, as well as get personal recommendations you will need to login to your account. If you do not have an account, registering for an account is free and simple. <a href="/register">Click here</a> to get started.</p>
                            <p>If you signed up but didn't get your verification email, <a href="/resend-email-verification">click here</a> to have it resent.</p>
                            {this.state.regErrors &&
                            <div className="error_status card">
                                <div className="carton">
                                    <a href="/#" className="open no_click">
                                        <h2 className="background_color red">
                                          <span>
                                          <span className="glyphicons_v2 circle-alert svg invert"/>&nbsp;There was a problem
                                          </span>
                                        </h2>
                                    </a>

                                    <div className="content">
                                        <ul>
                                            <li>We couldn't validate your information. Want to try again?</li>
                                            <li>You have x remaining login attempts.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            }
                            <form className="k-form" onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <label className="k-form-field" htmlFor="email">
                                        <span>E-mail</span>
                                        <input onChange={this.handleChange} className="k-textbox" type="email" name="email" value={this.state.email}
                                               autoCapitalize="off"/>
                                    </label>

                                    <label className="k-form-field" htmlFor="password">
                                        <span>Password</span>
                                        <input onChange={this.handleChange} id="password" className="k-textbox" type="password" name="password"/>
                                    </label>
                                </fieldset>
                                <div className="flex">
                                    <input className="k-button k-primary" type="submit" value="Login"/>
                                    <p className="reset"><a href="/reset-password">Reset password</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            /*<div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />

                    <button type="submit">Log in</button>
                </form>
            </div>*/
        );
    }
}

export default Login;