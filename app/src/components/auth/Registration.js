import React, {Component} from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirm: "",
            username: "",
            regErrors: []
        }

        this.checkData = this.checkData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleCheckData = this.handleCheckData.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.getErrors = this.getErrors.bind(this);
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push('/');
    }

    checkData(){
        const {
            email,
            password,
            password_confirm,
            username
        } = this.state;

        axios.post("http://localhost:3000/api/check/" +
                        `${email}/${password}/${password_confirm}/${username}`
        ).then(this.handleCheckData);
    }

    handleCheckData(response) {
        const errors = [];
        if (response.data.state === false) {
            if (response.data.emailError !== null) {
                errors.push(response.data.emailError);
            }
            if (response.data.passwordError !== null) {
                errors.push(response.data.passwordError);
            }
            if (response.data.usernameError !== null) {
                errors.push(response.data.usernameError);
            }
            this.setState({regErrors: errors});
        }
        else {
            this.onRegister();
        }
    }

    onRegister() {
        const {
            email,
            password,
            username
        } = this.state;

        axios.post("http://localhost:3000/api/register", {
                name: username,
                email: email,
                password: password
            },
            {withCredentials: true}
        ).then(response => {
            if (response.data.state){
                this.handleSuccessfulAuth(response.data);
            }
        })
    }

    getErrors() {
        if (this.state.regErrors.length !== 0) {
            return (
                <div className={"error_status_card"}>
                    <div className={"carton"}>
                        <a className={"open no_click"}>
                            <h2 className={"background_color red"}>
                                <span>
                                    <span className={"glyphicons_v2 circle-alert svg invert"}></span>
                                    There was an error processing your signup
                                </span>
                            </h2>
                        </a>
                        <div className={"content"}>
                            <ul>
                                {this.state.regErrors.map(error =>
                                    <li>{error}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <>
                <Helmet>
                    <title>{this.props.getCurrentTitle("Registration")}</title>
                </Helmet>

                <main id="main" className="smaller  subtle show_search_false">
                    <div className="inner_block pad_top">
                        <div className="inner_content">
                            <div className="content">
                                <div className="column_wrapper">

                                    <div className="settings_panel card no_margin">
                                        <h3 className="background_color light_blue">Benifits of membership</h3>

                                        <div>
                                            <ul className="panel svg_check no_scroll">
                                                <li><span className="glyphicons_v2 check"></span> Find something to watch on
                                                    your subscribed streaming services
                                                </li>
                                                <li><span className="glyphicons_v2 check"></span> Log the movies and TV
                                                    shows you have watched
                                                </li>
                                                <li><span className="glyphicons_v2 check"></span> Keep track of your
                                                    favourite movies and TV shows and get recommendations from them
                                                </li>
                                                <li><span className="glyphicons_v2 check"></span> Build and maintain a
                                                    personal watchlist
                                                </li>
                                                <li><span className="glyphicons_v2 check"></span> Build custom mixed lists
                                                    (movies and TV)
                                                </li>
                                                <li><span className="glyphicons_v2 check"></span> Take part in movie and TV
                                                    discussions
                                                </li>
                                                <li><span className="glyphicons_v2 check"></span> Contribute to, and improve
                                                    the information in our database
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <section className="content">
                                        <div className="column_content">
                                            <h2>Create a new account</h2>
                                            <p>
                                                Creating a user account is free and easy. Fill out the form below to get started. JavaScript is required to continue.
                                            </p>

                                            {this.getErrors()}

                                            <form className="k-form">

                                                <fieldset>
                                                    <label className="k-form-field" htmlFor="username">
                                                        <span>Username</span>
                                                        <input className="k-textbox"
                                                               type="text"
                                                               name="username"
                                                               autoCapitalize="off"
                                                               value={this.state.username}
                                                               onChange={this.handleChange}
                                                               required
                                                        />
                                                    </label>

                                                    <label className="k-form-field" htmlFor="password">
                                                        <span>Password (4 characters minimum)</span>
                                                        <input className="k-textbox"
                                                               type="password"
                                                               name="password"
                                                               value={this.state.password}
                                                               onChange={this.handleChange}
                                                               required
                                                        />
                                                    </label>

                                                    <label className="k-form-field" htmlFor="password_confirm">
                                                        <span>Confirm password</span>
                                                        <input className="k-textbox"
                                                               type="password"
                                                               name="password_confirm"
                                                               value={this.state.password_confirm}
                                                               onChange={this.handleChange}
                                                               required
                                                        />
                                                    </label>

                                                    <label className="k-form-field" htmlFor="email">
                                                        <span>E-mail</span>
                                                        <input className="k-textbox"
                                                               type="email"
                                                               name="email"
                                                               autoCapitalize="off"
                                                               value={this.state.email}
                                                               onChange={this.handleChange}
                                                               required
                                                        />
                                                    </label>
                                                </fieldset>

                                                <p>By clicking the "Sign up" button below, I certify that I have read and
                                                    agree to the TMDb terms of use and privacy policy.</p>

                                                <div className="flex">
                                                    <input type="button" className="k-button k-primary"
                                                           value="Registration"
                                                           onClick={this.checkData}/>
                                                    <p className="reset"><a href="/">Not at all</a></p>
                                                </div>
                                            </form>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

export default Registration;