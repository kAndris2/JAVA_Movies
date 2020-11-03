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
                <div className={styles["block"]}>
                    <div className={styles["inner_content"]}>
                        <div className={`${styles["scroller_warp"]} ${styles["shortcut_bar_wrapper"]} ${styles["is_fading"]}`}>
                            <ul className={`${styles["dropdown_menu"]} 
                                            ${styles["silver"]} 
                                            ${styles["scroller"]} 
                                            ${styles["k-widget"]} 
                                            ${styles["k-reset"]} 
                                            ${styles["k-header"]} 
                                            ${styles["k-menu"]} 
                                            ${styles["k-menu-horizontal"]}`}
                                id={"new_shortcut_bar"}
                                role={"menubar"}
                                tabIndex={"0"}
                                dataRole={"menu"}>
                                <li className={`${styles["true"]} 
                                                ${styles["k-item"]} 
                                                ${styles["k-menu-item"]} 
                                                ${styles["k-state-default"]}
                                                ${styles["k-first"]}`}
                                    aria-haspopup={"true"}
                                    role={"menuitem"}
                                    style={{zIndex:"auto"}}>
                                    <a href={`/u/${this.state.user.name}/favorites`} className={`${styles["k-link"]} ${styles["k-menu-link"]}`}>
                                        Favorites
                                    </a>
                                </li>
                                <li className={`${styles["false"]} 
                                                ${styles["k-item"]} 
                                                ${styles["k-menu-item"]} 
                                                ${styles["k-state-default"]}`}
                                    role={"menuitem"}>
                                    <a href={"/#"} className={`${styles["k-link"]} ${styles["k-menu-link"]}`}>
                                        Lists
                                    </a>
                                </li>
                                <li className={`${styles["false"]} 
                                                ${styles["k-item"]} 
                                                ${styles["k-menu-item"]} 
                                                ${styles["k-state-default"]}`}
                                    role={"menuitem"}>
                                    <a href={"/#"} className={`${styles["k-link"]} ${styles["k-menu-link"]}`}>
                                        Rates
                                    </a>
                                </li>
                                <li className={`${styles["false"]} 
                                                ${styles["k-item"]} 
                                                ${styles["k-menu-item"]} 
                                                ${styles["k-state-default"]}`}
                                    role={"menuitem"}>
                                    <a href={`/u/${this.state.user.name}/watchlist`} className={`${styles["k-link"]} ${styles["k-menu-link"]}`}>
                                        Watchlist
                                    </a>
                                </li>
                                <li className={`${styles["false"]} 
                                                ${styles["k-item"]} 
                                                ${styles["k-menu-item"]} 
                                                ${styles["k-state-default"]}`}
                                    role={"menuitem"}>
                                    <a href={"/settings/profile"} className={`${styles["k-link"]} ${styles["k-menu-link"]}`}>
                                        Profile
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UserHeader;