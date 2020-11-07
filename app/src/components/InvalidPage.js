import React, {Component} from 'react';

class InvalidPage extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <main id={"main"} className={"smaller subtle show_search_false"}>
                <div className={"column_wrapper"}>
                    <div className={"content_wrapper error"}>
                        <div>
                            <div style={{display: "flex", marginBottom: "20px"}}>
                                {(this.props.mode === "no_account" || this.props.mode === "private_page") &&
                                    <div>
                                        <span className={"glyphicons_v2 lock"}></span>
                                    </div>
                                }
                                {this.props.mode === "no_account" &&
                                    <h2>You don't have permission to access this page</h2>
                                }
                                {this.props.mode === "no_page" &&
                                    <h2>Oops! We can't find the page you're looking for</h2>
                                }
                                {this.props.mode == "private_page" &&
                                    <h2>This page is private</h2>
                                }
                            </div>
                            {this.props.mode === "no_account" &&
                                <p>You've tried to request a page that requires you to be logged in. Log int to you account
                                    by <a href={"/login"}>clicking here</a>.</p>
                            }
                            {this.props.mode === "no_page" &&
                                <p>You tried to request a page that doesn't exist. If you believe this to be in error, let
                                    us know <a href="/talk">on the forums</a>.</p>
                            }
                            {this.props.mode === "private_page" &&
                                <p>You've tried to request a page that is private. If you believe this to be an error, let
                                    us know <a href="/talk">on the forums</a>.</p>
                            }
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default InvalidPage;