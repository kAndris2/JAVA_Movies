import React, {Component} from "react";
import styles from "../static/css/Account.module.css";

class SettingsHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profileImg: 'https://hostpapasupport.com/knowledgebase/wp-content/uploads/2018/04/1-13.png'
        }

        this.getFirstLetter = this.getFirstLetter.bind(this);
    }

    getFirstLetter(str) {
        return str.charAt(0);
    }

    render() {
        return (
            <div className={`${styles["block"]} ${styles["header"]} ${styles["gradient"]} ${styles[this.props.user.color]}`}>
                <div className={`${styles["inner_content"]} ${styles["tight"]}`}>
                    <div className={styles["content"]}>
                        <span className={styles["avatar"]}>
                            <a href={`/u/${this.props.user.name}`}>
                                    <img className={styles["avatar"]}
                                         src={this.state.profileImg}
                                         srcSet={this.state.profileImg +" 1x, "+this.state.profileImg+" 2x"}
                                         alt={this.props.user.name} width="150" height="150"/>
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