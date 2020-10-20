import React, {Component} from 'react';

class GenericNotFound extends Component {
    render() {
        return (
            <main id="main" className="smaller  subtle show_search_false">
                <div className="column_wrapper">
                    <div className="content_wrapper error">
                        <div>
                            <div className="error_wrapper">
                                <h2>Oops! We can't find the page you're looking for</h2>
                            </div>

                            <p>You tried to request a page that doesn't exist. If you believe this to be in error, let
                                us know <a href="/talk">on the forums</a>.</p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default GenericNotFound;