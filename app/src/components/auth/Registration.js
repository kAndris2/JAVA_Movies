import React, {Component} from 'react';

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirm: "",
            username: "",

            regErrors:""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        console.log("form submuitntteed");
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

                    <input
                        type="password"
                        name="password_confirm"
                        placeholder="Confirm Password"
                        value={this.state.password_confirm}
                        onChange={this.handleChange}
                        required
                    />
                    <button type="submit">Reg</button>
                </form>
            </div>
        );
    }
}

export default Registration;