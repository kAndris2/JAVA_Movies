import React, {Component} from "react";
import styles from "../static/css/Account.module.css";

class UserHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            profileImg: 'https://hostpapasupport.com/knowledgebase/wp-content/uploads/2018/04/1-13.png'
        };
    }

    render() {
        const {user, profileImg} = this.state;

        return (
            <>
                <div className={styles["bg_image"]}>
                    <div className={`${styles["block"]} ${styles["header"]} ${styles["gradient"]} ${styles["green"]}`}>
                        <div className={styles["inner_content"]}>
                            <div className={styles["content"]}>

                              <span className={styles["avatar"]}>
                                <a href={"/u/"+user.name}>
                                    <img className={styles["avatar"]}
                                         src={profileImg}
                                         srcSet={profileImg +" 1x, "+profileImg+" 2x"}
                                         alt={user.name} width="150" height="150"/>
                                </a>
                              </span>
                                <div>
                                    <div className={styles["about"]}>
                                        <div className={`${styles["content_wrapper"]} ${styles["flex"]}`}>
                                            <h2><a href={"/u/"+user.name}>{user.name}</a></h2>
                                            <h3>Member since November 2019</h3>
                                        </div>
                                        <div className={`${styles["content_wrapper"]} ${styles["flex"]}`}>
                                            <div className={styles["block"]}>
                                                <div className={`${styles["consensus"]} ${styles["no_hover"]}`}>
                                                    <div className={styles["outer_ring"]}>
                                                        <div className={styles["user_score_chart"]} data-percent="0"
                                                             data-track-color="#666666" data-bar-color="#d4d4d4">
                                                            <div className={styles["percent"]}>

                                                                <span className={`${styles["icon"]} ${styles["icon-r0"]}`}/>

                                                            </div>
                                                            <canvas height="60" width="60"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles["text"]}>Average<br/>Movie Score</div>
                                            </div>

                                            <div className={styles["block"]}>
                                                <div className={`${styles["consensus"]} ${styles["no_hover"]}`}>
                                                    <div className={styles["outer_ring"]}>
                                                        <div className={styles["user_score_chart"]} data-percent="0"
                                                             data-track-color="#666666" data-bar-color="#d4d4d4">
                                                            <div className={styles["percent"]}>
                                                                <span className={`${styles["icon"]} ${styles["icon-r0"]}`}/>
                                                            </div>
                                                            <canvas height="60" width="60"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles["text"]}>Average<br/>TV Score</div>
                                            </div>
                                            <div className={styles["social_links"]}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UserHeader;