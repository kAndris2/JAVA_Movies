import React, {Component} from "react";
import "../static/css/Footer.css";

class Footer extends Component {

    render() {
        return (
            /*<React.Fragment>
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
                                      href={"/signup"}
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
            </React.Fragment>*/
            <>
            <footer className="single_column">
                <nav>
                    <div className="join">
                        <img
                            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                            alt="The Movie Database (TMDb)" width="130" height="94"/>


                        {
                            this.props.logged_in_status === "LOGGED_IN" &&
                            <a className={"rounded logged_in"}
                               href={`/u/${this.props.user.name}`}
                            >Hi {this.props.user.name}!</a>
                        }
                        {
                            this.props.logged_in_status !== "LOGGED_IN" &&
                            <a className={"rounded"}
                               href={"/signup"}
                            >Join the Community</a>
                        }

                    </div>

                    <div>
                        <h3>The Basics</h3>
                        <ul>
                            <li><a href="/about">About TMDb</a></li>
                            <li><a href="/about/staying-in-touch">Contact Us</a></li>
                            <li><a href="/talk">Support Forums</a></li>
                            <li><a href="/documentation/api">API</a></li>
                            <li><a href="https://status.themoviedb.org/">System
                                Status</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Get Involved</h3>
                        <ul>
                            <li><a href="/bible"><span className="glyphicons glyphicons-asterisk"></span> Contribution
                                Bible</a></li>
                            <li><a href="/apps">3rd Party Applications</a></li>
                            <li><a href="/movie/new">Add New Movie</a></li>
                            <li><a href="/tv/new">Add New TV Show</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Community</h3>
                        <ul>
                            <li><a href="/documentation/community/guidelines">Guidelines</a></li>
                            <li><a href="/discuss">Discussions</a></li>
                            <li><a href="/leaderboard">Leaderboard</a></li>
                            <li><a href="https://twitter.com/themoviedb">Twitter</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="/documentation/website/terms-of-use">Terms of Use</a></li>
                            <li><a href="/documentation/api/terms-of-use">API Terms of Use</a></li>
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                        </ul>
                    </div>
                </nav>

                <section>Build b887a8e (420)</section>
            </footer>
            </>
        );
    }
}

export default Footer;