import React, {Component} from "react";

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <footer className={"single_column"}>
                    <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor:"#032541", fontWeight:"bold", padding:".75rem .75rem"}}>
                        <div className={"join"}>
                            <img src={require("../static/img/logo2.svg")}
                                 alt={"TMDB"}
                                 width={"130"}
                                 height={"94"}
                            />
                            {
                                this.props.logged_in_status === "LOGGED_IN" &&
                                    <a className={"rounded logged_in"}
                                       href={`/u/${this.props.user.name}`}
                                       >Hi {this.props.user.name}!</a>
                            }
                            {
                                this.props.logged_in_status !== "LOGGED_IN" &&
                                   <a className={"rounded"}
                                      href={"/register"}
                                   >Join the Community</a>
                            }
                        </div>
                        <div className={"nav-link"}>
                            <h3>The Basics</h3>
                            <ul>
                                <li><a href={"/#"}>About TMDB</a></li>
                                <li><a href={"/#"}>Contact Us</a></li>
                                <li><a href={"/#"}>Support Forums</a></li>
                                <li><a href={"/#"}>API</a></li>
                                <li>
                                    <a href={"/#"} target={"_blank"} rel={"noopener"}>System Status</a>
                                </li>
                            </ul>
                        </div>
                        <div className={"nav-link"}>
                            <h3>Get Involved</h3>
                            <ul>
                                <li><a href={"/#"}>Contribution Bible</a></li>
                                <li><a href={"/#"}>3rd Party Applications</a></li>
                                <li><a href={"/#"}>Add New Movie</a></li>
                                <li><a href={"/#"}>Add New TV Show</a></li>
                            </ul>
                        </div>
                        <div className={"nav-link"}>
                            <h3>Community</h3>
                            <ul>
                                <li><a href={"/#"}>Guidelines</a></li>
                                <li><a href={"/#"}>Discussions</a></li>
                                <li><a href={"/#"}>Leaderboard</a></li>
                                <li>
                                    <a href={"/#"} target={"_blank"} rel={"noopener"}>Twitter</a>
                                </li>
                            </ul>
                        </div>
                        <div className={"nav-link"}>
                            <h3>Legal</h3>
                            <ul>
                                <li><a href={"/#"}>Terms of Use</a></li>
                                <li><a href={"/#"}>API Terms of Use</a></li>
                                <li><a href={"/#"}>Privacy Policy</a></li>
                            </ul>
                        </div>
                    </nav>
                </footer>
            </React.Fragment>
        );
    }
}

export default Footer;