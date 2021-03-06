import React, {Component} from "react";
import styles from "../static/css/Account.module.css";
import axios from "axios";
import moment from "moment";
import Statistics from "./Statistics";
import MyLists from "./MyLists";
import InvalidPage from "./InvalidPage";

class UserHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            user: undefined,
            defaultImg: 'https://hostpapasupport.com/knowledgebase/wp-content/uploads/2018/04/1-13.png',
            userImg: undefined,
            ratesAvg: 0,
            invalidPage: false
        };

        this.getAverageOfRatings = this.getAverageOfRatings.bind(this);
        this.getProfileImage = this.getProfileImage.bind(this);
        this.handleProfileImage = this.handleProfileImage.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getNameFromUrl = this.getNameFromUrl.bind(this);
    }

    async componentDidMount() {
        await this.getUser();
        await this.getProfileImage();
        await this.getAverageOfRatings();
    }

    getNameFromUrl() {
        const urlParts = (`${window.location.href}`).split("/");
        for (let i = 0; i < urlParts.length; i++) {
            if (urlParts[i] === "u") {
                return urlParts[i+1];
            }
        }
    }

    async getUser() {
        const userName = this.getNameFromUrl();
        await axios.get(`http://localhost:3000/api/username/${userName}`)
            .then(result => {
                if (result.data.length == 0) {
                    this.setState({invalidPage: true });
                }
                else {
                    this.setState({user: result.data});
                }
            });
    }

    async getProfileImage() {
        if (this.state.user !== undefined) {
            await axios.get(`http://localhost:3000/api/profile_image/${this.state.user.id}`)
                .then(this.handleProfileImage)
        }
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

    async getAverageOfRatings() {
        if (this.state.user !== undefined) {
            await axios.get(`http://localhost:3000/api/avg_ratings/${this.state.user.id}`)
                .then(result => {
                    this.setState({
                        ratesAvg: result.data,
                        loading: false
                    })
                })
        }
    }

    render() {
        const {user, defaultImg, userImg, loading, invalidPage} = this.state;
        const lists = ["watchlist", "favorites"];

        if (!loading) {
            if (lists.includes(this.props.children) && this.props.guestID !== user.id) {
                return (
                    <InvalidPage mode={"private_page"} />
                );
            }

            if (invalidPage) {
                return (
                    <InvalidPage mode={"no_page"} />
                );
            }

            return (
                <>
                    <div className={styles["bg_image"]}>
                        <div
                            className={`${styles["block"]} ${styles["header"]} ${styles["gradient"]} ${styles[user.color]}`}>
                            <div className={styles["inner_content"]}>
                                <div className={styles["content"]}>

                                  <span className={styles["avatar"]}>
                                    <a href={"/u/" + user.name}>
                                        {userImg === undefined &&
                                        <img className={styles["avatar"]}
                                             src={defaultImg}
                                             srcSet={defaultImg + " 1x, " + defaultImg + " 2x"}
                                             alt={user.name} width="150" height="150"/>
                                        }
                                        {userImg !== undefined &&
                                        <img className={styles["avatar"]}
                                             src={userImg}
                                             srcSet={userImg + " 1x, " + userImg + " 2x"}
                                             alt={user.name} width="150" height="150"/>
                                        }
                                    </a>
                                  </span>
                                    <div>
                                        <div className={styles["about"]}>
                                            <div className={`${styles["content_wrapper"]} ${styles["flex"]}`}>
                                                <h2><a href={"/u/" + user.name}>{user.name}</a></h2>
                                                <h3>Member since {moment(user.registrationDate).format('LL')}</h3>
                                            </div>
                                            <div className={`${styles["content_wrapper"]} ${styles["flex"]}`}>
                                                <div className={styles["block"]}>
                                                    <div className={styles["text"]}>Average<br/>of all Ratings</div>
                                                </div>

                                                <div className={styles["block"]}>
                                                    <div className={`${styles["consensus"]} ${styles["no_hover"]}`}>
                                                        <div className={styles["outer_ring"]}>
                                                            <div className={styles["user_score_chart"]} data-percent="0"
                                                                 data-track-color="#666666" data-bar-color="#d4d4d4">
                                                                <div className={styles["percent"]}>
                                                                    <span
                                                                        className={`icon icon-r${this.state.ratesAvg}`}/>
                                                                </div>
                                                                <canvas height="60" width="60"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles["social_links"]}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.guestID === user.id &&
                    <div className={styles["block"]}>
                        <div className={styles["inner_content"]}>
                            <div
                                className={`${styles["scroller_warp"]} ${styles["shortcut_bar_wrapper"]} ${styles["is_fading"]}`}>
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
                                        style={{zIndex: "auto"}}>
                                        <a href={`/u/${this.state.user.name}/favorites`}
                                           className={`${styles["k-link"]} ${styles["k-menu-link"]}`}>
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
                                        <a href={`/u/${this.state.user.name}/watchlist`}
                                           className={`${styles["k-link"]} ${styles["k-menu-link"]}`}>
                                            Watchlist
                                        </a>
                                    </li>
                                    <li className={`${styles["false"]} 
                                                    ${styles["k-item"]} 
                                                    ${styles["k-menu-item"]} 
                                                    ${styles["k-state-default"]}`}
                                        role={"menuitem"}>
                                        <a href={"/settings/profile"}
                                           className={`${styles["k-link"]} ${styles["k-menu-link"]}`}>
                                            Profile
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    }
                    {this.props.children === "statistics" &&
                        <Statistics
                            user={user}
                            getCurrentTitle={this.props.getCurrentTitle}
                        >
                        </Statistics>
                    }
                    {lists.includes(this.props.children) &&
                        <MyLists
                            user={user}
                            apiData={this.props.apiData}
                            type={this.props.children}
                            getCurrentTitle={this.props.getCurrentTitle}
                        >
                        </MyLists>
                    }
                </>
            );
        }
        else {
            return (
                <h1>Loading...</h1>
            );
        }
    }
}

export default UserHeader;