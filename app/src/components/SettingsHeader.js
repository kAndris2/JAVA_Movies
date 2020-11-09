import React, {Component} from "react";
import styles from "../static/css/Account.module.css";
import axios from "axios";

class SettingsHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultImg: 'https://hostpapasupport.com/knowledgebase/wp-content/uploads/2018/04/1-13.png',
            userImg: undefined
        }

        this.getProfileImage = this.getProfileImage.bind(this);
        this.handleProfileImage = this.handleProfileImage.bind(this);
    }

    componentDidMount() {
        this.getProfileImage();
    }

    async getProfileImage() {
        await axios.get(`http://localhost:3000/api/profile_image/${this.props.user.id}`)
            .then(this.handleProfileImage)
    }

    handleProfileImage(response) {
        if (response.data.length != 0) {
            let temp = undefined;
            Promise.all(
                temp = response.data.route
            );
            this.setState({userImg: `http://localhost:3000/pics/${temp}`});
        }
    }

    render() {
        return (
            <div className={`${styles["block"]} ${styles["header"]} ${styles["gradient"]} ${styles[this.props.user.color]}`}>
                <div className={`${styles["inner_content"]} ${styles["tight"]}`}>
                    <div className={styles["content"]}>
                        <span className={styles["avatar"]}>
                            <a href={`/u/${this.props.user.name}`}>
                                {this.state.userImg === undefined &&
                                <img className={styles["avatar"]}
                                     src={this.state.defaultImg}
                                     srcSet={this.state.defaultImg + " 1x, " + this.state.defaultImg + " 2x"}
                                     alt={this.props.user.name} width="150" height="150"/>
                                }
                                {this.state.userImg !== undefined &&
                                <img className={styles["avatar"]}
                                     src={this.state.userImg}
                                     srcSet={this.state.userImg + " 1x, " + this.state.userImg + " 2x"}
                                     alt={this.props.user.name} width="150" height="150"/>
                                }
                            </a>
                        </span>
                        <div className={styles["about"]}>
                            <div className={styles["content_wrapper"]}>
                                <h2>
                                    <a href={`/u/${this.props.user.name}`}>
                                        {this.props.user.name}
                                    </a>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingsHeader;