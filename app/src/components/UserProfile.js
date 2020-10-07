import React, {Component} from "react";

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          user: this.props.user
        };
    }

    render() {
        return (
            <div className={"bg_image"}>
                <div className={"block header gradient silver"}>
                    <div className={"inner_content"}>
                        <div className={"content"}>
                            <span className={"avatar"}>
                                <a href={`/u/${this.state.user.name}`}>
                                    <span className={"background_color silver"}>
                                        A
                                    </span>
                                </a>
                            </span>
                            <div>
                                <div className={"about"}>
                                    <div className={"content_wrapper flex"}>
                                        <h2>
                                            <a href={`/u/${this.state.user.name}`}>
                                                {this.state.user.name}
                                            </a>
                                        </h2>
                                        <h3>régóta tag</h3>
                                    </div>
                                    <div className={"content_wrapper flex"}>
                                        <div className={"block"}>
                                            <div className={"consensus no_hover"}>
                                                <div className={"outer_ring"}>
                                                    <div className={"user_score_chart"} data-percent={"0"} data-track-color={"#666666"} data-bar-color={"#d4d4d4"}>
                                                        <div className={"percent"}>
                                                            <span className={"icon icon-r0"}></span>
                                                        </div>
                                                        <canvas height={"60"} width={"60"}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;