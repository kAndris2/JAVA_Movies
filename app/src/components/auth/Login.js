import React, {Component} from 'react';
import axios from 'axios';

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
            <div>
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
            </div>
        );
    }
}

export default Login;