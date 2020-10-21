import React, {Component} from "react";
import styles from "../static/css/Account.module.css";

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        };
    }

    render() {
        return (
            <>
                <div className={styles["account_page_data"]}>
                    <div className={styles["inner_block"]}>
                        <div className={styles["inner_content"]}>
                            <div className={styles["content"]}>

                                <h2>Stats</h2>

                                <div className={styles["stats_blocks"]}>
                                    <div className={styles["stat_block"]}>
                                        <h3>Total Edits</h3>
                                        <h2 className={`${styles["color"]} ${styles["green"]}`}>0</h2>
                                    </div>

                                    <div className={styles["stat_block"]}>
                                        <h3>Total Ratings</h3>
                                        <h2 className={`${styles["color"]} ${styles["green"]}`}>0</h2>
                                    </div>

                                    <div className={styles["stat_block"]}>
                                        <h3>Rating Overview</h3>
                                        <div id="rating_histogram_chart" data-role="chart" className={styles["k-chart"]}
                                             style={{position: "relative"}}>
                                            <svg
                                                style={{width: "100%", height: "100%", overflow: "hidden", left: "-0.96875px", top: "0px"}}
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1">
                                                <defs>
                                                    <clipPath id="kdef1">
                                                        <path d="M0.5 0.5 L 289.5 0.5 289.5 47.5 0.5 47.5Z"
                                                              stroke="#000" strokeLinejoin="miter" fill="none"></path>
                                                    </clipPath>
                                                </defs>
                                                <g>
                                                    <path d="M0 0 L 290 0 290 70 0 70Z" stroke="none"
                                                          fill="none"></path>
                                                    <path d="M0 0 L 289 0 289 47 0 47Z" stroke="none" fill="#fff"
                                                          fillOpacity="0"></path>
                                                    <g>
                                                        <g></g>
                                                        <g>
                                                            <path d="M0.5 47.5 L 289.5 47.5" stroke="#dfdfdf"
                                                                  strokeWidth="1" fill="none"></path>
                                                            <path d="M0.5 31.5 L 289.5 31.5" stroke="#dfdfdf"
                                                                  strokeWidth="1" fill="none"></path>
                                                            <path d="M0.5 16.5 L 289.5 16.5" stroke="#dfdfdf"
                                                                  strokeWidth="1" fill="none"></path>
                                                            <path d="M0.5 0.5 L 289.5 0.5" stroke="#dfdfdf"
                                                                  strokeWidth="1" fill="none"></path>
                                                        </g>
                                                        <g>
                                                            <g>
                                                                <g>
                                                                    <path d="M0.5 47.5 L 289.5 47.5" stroke="#b7b7b7"
                                                                          strokeWidth="1" fill="none"></path>
                                                                    <path d="M0.5 47.5 L 0.5 51.5" stroke="#b7b7b7"
                                                                          strokeWidth="1" fill="none"></path>
                                                                    <path d="M29.5 47.5 L 29.5 51.5" stroke="#b7b7b7"
                                                                          strokeWidth="1" fill="none"></path>
                                                                    <path d="M58.5 47.5 L 58.5 51.5" stroke="#b7b7b7"
                                                                          strokeWidth="1" fill="none"></path>
                                                                    <path d="M87.5 47.5 L 87.5 51.5" stroke="#b7b7b7"
                                                                          strokeWidth="1" fill="none"></path>
                                                                    <path d="M116.5 47.5 L 116.5 51.5" stroke="#b7b7b7"
                                                                          strokeWidth="1" fill="none"></path>
                                                                    <path d="M145.5 47.5 L 145.5 51.5" stroke="#b7b7b7"
                                                                          strokeWidth="1" fill="none"></path>
                                                                    <path d="M173.5 47.5 L 173.5 51.5" stroke="#b7b7b7"
                                                                          strokeWidth="1" fill="none"></path>
                                                                    <path d="M202.5 47.5 L 202.5 51.5" stroke="#b7b7b7"
                                                                          strokeWidth="1" fill="none"></path>
                                                                    <path d="M231.5 47.5 L 231.5 51.5" stroke="#b7b7b7"
                                                                          strokeWidth="1" fill="none"></path>
                                                                    <path d="M260.5 47.5 L 260.5 51.5" stroke="#b7b7b7"
                                                                          strokeWidth="1" fill="none"></path>
                                                                    <path d="M289.5 47.5 L 289.5 51.5" stroke="#b7b7b7"
                                                                          strokeWidth="1" fill="none"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                        <g clipPath="url(#kdef1)">
                                                            <g>
                                                                <g>
                                                                    <g></g>
                                                                </g>
                                                                <g>
                                                                    <g></g>
                                                                </g>
                                                                <g>
                                                                    <g></g>
                                                                </g>
                                                                <g>
                                                                    <g></g>
                                                                </g>
                                                                <g>
                                                                    <g></g>
                                                                </g>
                                                                <g>
                                                                    <g></g>
                                                                </g>
                                                                <g>
                                                                    <g></g>
                                                                </g>
                                                                <g>
                                                                    <g></g>
                                                                </g>
                                                                <g>
                                                                    <g></g>
                                                                </g>
                                                                <g>
                                                                    <g></g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                        <g>
                                                            <text
                                                                style={{font:"12px Arial, Helvetica, sans-serif",whiteSpace:"pre"}}
                                                                x="10.95" y="67" stroke="none" fill="#b7b7b7"
                                                                fillOpacity="1">1
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <text
                                                                style={{font:"12px Arial, Helvetica, sans-serif",whiteSpace:"pre"}}
                                                                x="39.849999999999994" y="67" stroke="none"
                                                                fill="#b7b7b7" fillOpacity="1">2
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <text
                                                                style={{font:"12px Arial, Helvetica, sans-serif",whiteSpace:"pre"}}
                                                                x="68.75" y="67" stroke="none" fill="#b7b7b7"
                                                                fillOpacity="1">3
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <text
                                                                style={{font:"12px Arial, Helvetica, sans-serif",whiteSpace:"pre"}}
                                                                x="97.65" y="67" stroke="none" fill="#b7b7b7"
                                                                fillOpacity="1">4
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <text
                                                                style={{font:"12px Arial, Helvetica, sans-serif",whiteSpace:"pre"}}
                                                                x="126.54999999999998" y="67" stroke="none"
                                                                fill="#b7b7b7" fillOpacity="1">5
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <text
                                                                style={{font:"12px Arial, Helvetica, sans-serif",whiteSpace:"pre"}}
                                                                x="155.45" y="67" stroke="none" fill="#b7b7b7"
                                                                fillOpacity="1">6
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <text
                                                                style={{font:"12px Arial, Helvetica, sans-serif",whiteSpace:"pre"}}
                                                                x="184.35000000000002" y="67" stroke="none"
                                                                fill="#b7b7b7" fillOpacity="1">7
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <text
                                                                style={{font:"12px Arial, Helvetica, sans-serif",whiteSpace:"pre"}}
                                                                x="213.25" y="67" stroke="none" fill="#b7b7b7"
                                                                fillOpacity="1">8
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <text
                                                                style={{font:"12px Arial, Helvetica, sans-serif",whiteSpace:"pre"}}
                                                                x="242.15" y="67" stroke="none" fill="#b7b7b7"
                                                                fillOpacity="1">9
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <text
                                                                style={{font:"12px Arial, Helvetica, sans-serif",whiteSpace:"pre"}}
                                                                x="268.05" y="67" stroke="none" fill="#b7b7b7"
                                                                fillOpacity="1">10
                                                            </text>
                                                        </g>
                                                    </g>
                                                    <g></g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className={styles["stat_block"]}>
                                        <h3>Most Watched Genres</h3>


                                        <p>You haven't logged any movies or TV shows.</p>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles["inner_block"]}>
                        <div className={styles["inner_content"]}>
                            <div className={styles["content"]}>

                                <div className={styles["title_header"]}>
                                    <div className={`${styles["title_group"]} ${styles["space_between"]}`}>
                                        <h2>Upcoming From Watchlist</h2>
                                        <div>
                                            <h3 className={`${styles["border_color"]} ${styles["green"]}`}>
                                                <a className={`${styles["color"]} ${styles["green"]}`}
                                                   href={`/u/${this.state.user.name}/watchlist`}>
                                                    Go to Watchlist
                                                </a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>


                                <p>There are no upcoming movies on your watchlist.</p>


                            </div>
                        </div>
                    </div>

                    <div className={styles["inner_block"]}>
                        <div className={styles["inner_content"]}>
                            <div className={styles["content"]}>

                                <div className={styles["title_header"]}>
                                    <div className={`${styles["title_group"]} ${styles["space_between"]}`}>
                                        <h2>Recent Discussions</h2>
                                        <div>

                                        </div>
                                    </div>
                                </div>

                                <div className={styles["discussion_container"]}>
                                    <table className={`${styles["width_100"]} ${styles["new"]} ${styles["space"]}`}>
                                        <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Status</th>
                                            <th>Replies</th>
                                            <th>Last Reply</th>
                                        </tr>
                                        </thead>
                                        <tbody className={`${styles["items_wrapper"]} ${styles["color"]} ${styles["green"]}`}>
                                        <tr>
                                            <td colSpan="4" className={styles["no_results"]}>
                                                <p>You are not watching any discussions.</p>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles["inner_block"]}>
                        <div className={styles["inner_content"]}>
                            <div className={styles["content"]}>

                                <div className={styles["title_header"]}>
                                    <div className={`${styles["title_group"]} ${styles["space_between"]}`}>
                                        <h2>Recent Activity</h2>
                                        <div>
                                            <h3 className={`${styles["border_color"]} ${styles["green"]}`}>
                                                <a className={`${styles["color"]} ${styles["green"]}`}
                                                   href={`/u/${this.state.user.name}/activity`}>
                                                    View More
                                                </a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>


                                <p>You haven't made any recent edits.</p>


                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UserProfile;
