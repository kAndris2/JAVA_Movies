import React, {Component} from "react";
import moment from "moment";
import axios from 'axios';
import '../static/css/cards.css';
import {faCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPlayer from "react-player";
import * as ReactBootstrap from "react-bootstrap";
import '../static/css/Modal.css';
import ColorThief from 'colorthief';
import '../static/css/Application.css';
import '../static/css/Movie.css';
import Swal from 'sweetalert2';
import styles from '../static/css/MovieDetail.module.css';
import {getCountryName} from './Function';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.test = this.test.bind(this);
        this.addTo = this.addTo.bind(this);
        this.setTextColor = this.setTextColor.bind(this);
        this.errors = this.errors.bind(this);
        this.formatMoney = this.formatMoney.bind(this);
    }
    state = {
        isLoading: true,
        showHide : false,

        image_post: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces",
        image_pre: "https://image.tmdb.org/t/p/w500",
        video_pre: "https://youtube.com/watch?v=",
        profile_pre:"https://image.tmdb.org/t/p/w138_and_h175_face",

        genres: [],
        companies: [],
        movie: [],

        credits:[],
        certificates: [],

        from_dominant_colors: [],
        to_dominant_colors: [],
        color_palette:[],
        textColor: '',
        loaded_backdrop:false,

        loadingBarProgress: 0,

        videos:[]
    };

    async componentDidMount() {
        //movie details
        const response = await fetch('https://api.themoviedb.org/3/movie/'+ this.props.movie_id +'?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU');
        const movie = await response.json();

        //main characters and actors
        const cresp = await fetch('https://api.themoviedb.org/3/movie/'+ this.props.movie_id +'/credits?api_key=04a30d5152c77afe4a81783d17e20316');
        const creds = await cresp.json();

        //Age certifications
        const certification = await fetch('https://api.themoviedb.org/3/movie/'+ this.props.movie_id +'/release_dates?api_key=04a30d5152c77afe4a81783d17e20316');
        const cert = await certification.json();

        //Movie videos, trailers
        const trailers = await fetch('https://api.themoviedb.org/3/movie/'+ this.props.movie_id +'/videos?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU');
        const vids = await trailers.json();

        this.setState({movie: movie, genres:movie.genres, companies: movie.production_companies,credits:creds.cast, certificates:cert.results ,isLoading: false ,videos:vids.results});

    }

    minutesToHours(num)
    {
        let hours = Math.floor(num / 60);
        let minutes = num % 60;
        return hours + "h " + minutes +"m";
    }

    formatMoney(amount) {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',

            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0,
            //maximumFractionDigits: 0,
        });
        return formatter.format(amount);
    }


    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    setTextColor(rgb){
        const brightness = Math.round((
            (rgb[0]  * 299) +
            (rgb[1] * 587) +
            (rgb[2] * 114)) / 1000);
        const asd = (brightness > 125) ? 'black' : 'white';
        this.setState({textColor:asd});
    }

    async test(){
        const colorThief = new ColorThief();
        const img = this.myRef.current;
        img.crossOrigin = "Anonymous";

        if (img.complete) {
           await this.setState({from_dominant_colors :colorThief.getPalette(img)[0],to_dominant_colors: colorThief.getPalette(img)[1], color_palette: colorThief.getPalette(img)[2]});
           this.setTextColor(colorThief.getPalette(img)[0]);
        }
        else {
            let asd = document.getElementById("asd");
            asd.addEventListener('load', function() {
               return colorThief.getColor(img);
            });
        }
    }

    errors(type){
        switch (type){
            case "not_logged_in":
                Swal.fire({
                    icon: 'error',
                    title: 'You are not logged in...',
                    text: 'Why are u not logged in to our site m8 🤦‍♂️',
                })
            break;
        }
    }

    async addTo(what,id){
        const Toast = Swal.mixin({
            toast: true,
            position: 'center-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        switch (what){
            case "watchlist":
                const watch = await axios.put('http://localhost:3000/api/add_watch/'+this.props.user.id+'/'+id+'')
                    .then(res => {
                        if (res.statusText === "OK"){
                            Toast.fire({
                                icon: 'success',
                                title: 'Added to watchlist successfully'
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: 'Something went wrong 🤷‍♂️'
                            })
                        }
                    });
                break;
            case "favourite":
                let fav = await axios.post('http://localhost:3000/api/add_favorite/',{userId:this.props.user.id,movieId:id})
                    .then(res => {
                        if (res.statusText === "OK"){
                            Toast.fire({
                                icon: 'success',
                                title: 'Added to favourites successfully'
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: 'Something went wrong 🤷‍♂️'
                            })
                        }
                    });
                break;
            default:
                console.log("default");
        }
    }


    render() {
        //toast notification
        const Toast = Swal.mixin({
            toast: true,
            position: 'center-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        const addToList = (props) => (
            <ReactBootstrap.Tooltip id="button-tooltip" {...props}>
                Add To List
            </ReactBootstrap.Tooltip>
        );
        const favourite = (props) => (
            <ReactBootstrap.Tooltip id="button-tooltip" {...props}>
                Mark As Favourite
            </ReactBootstrap.Tooltip>
        );
        const watchlist = (props) => (
            <ReactBootstrap.Tooltip id="button-tooltip" {...props}>
                Add To your Watchlist
            </ReactBootstrap.Tooltip>
        );
        const rate = (props) => (
            <ReactBootstrap.Tooltip id="button-tooltip"{...props}>
                Rate It!
            </ReactBootstrap.Tooltip>
        );
        const {movie, genres, companies, isLoading, image_pre,image_post,credits, certificates, showHide,videos, video_pre, to_dominant_colors, profile_pre} = this.state;



        if (isLoading) {
            return ( <p>Loading....</p>
            );
        }

        return (
            <React.Fragment>
                <div id="cards_landscape_wrap-2" style={{backgroundImage: `url(${image_post + movie.backdrop_path})`, backgroundPosition: "right -200px top", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                    <img style={{display:"none"}} ref={this.myRef}  src={image_pre+movie.poster_path} onLoad={this.test}/>
                    <div className="details" style={{backgroundImage: "linear-gradient(to right, rgba("+this.state.from_dominant_colors[0]+", "+this.state.from_dominant_colors[1]+", "+this.state.from_dominant_colors[2]+", 1) 150px, rgba("+this.state.to_dominant_colors[0]+", "+this.state.to_dominant_colors[1]+", "+this.state.to_dominant_colors[2]+", 0.84) 100%)"}}>
                        <div className="container" style={{maxWidth: "1300px", padding: "30px 40px"}}>
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="card-flyer">
                                        <div className="text-box">
                                            <div className="image-box">
                                                <img style={{position: "relative"}} src={image_pre + movie.poster_path} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-9 MovieDetailsRight" style={{color:this.state.textColor}}>
                                    <div>
                                        <h2 style={{fontWeight:"700"}}>{movie.title}</h2>
                                    </div>
                                    <div>
                                        {certificates[0].release_dates[0].certification} {certificates[0].iso_3166_1}
                                        {moment(certificates[0].release_dates[0].release_date).format("YYYY/MM/DD")}
                                        <FontAwesomeIcon icon={faCircle} style={{color:"#fff"}} size="xs"/>
                                        {genres.map((genre , index) =>
                                            index + 1 === genres.length ? genre.name : genre.name + ","
                                        )}
                                        <FontAwesomeIcon icon={faCircle} style={{color:"#fff"}} size="xs"/>
                                        {this.minutesToHours(movie.runtime)}
                                        <p>{companies[0].name}</p>
                                    </div>

                                    <div>
                                        <ul className="auto actions" style={{padding:"0"}}>
                                            <li className="chart">
                                                <div className="consensus details">
                                                    <div className="outer_ring">
                                                        <div className="user_score_chart">
                                                            <div className="percent">
                                                                <span className={"icon icon-r"+movie.vote_average * 10}/>
                                                            </div>
                                                            <canvas height="60" width="60"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text">User<br/>Score</div>
                                            </li>
                                            <li className="tooltip1 use_tooltip list tooltip_hover">
                                                <ReactBootstrap.OverlayTrigger
                                                    placement="bottom"
                                                    delay={{ show: 100, hide: 300 }}
                                                    overlay={addToList}
                                                >
                                                    <a onClick={() => {alert("not yet")}} className="no_click" href="#"><span className="glyphicons_v2 thumbnails-list white"/></a>
                                                </ReactBootstrap.OverlayTrigger>
                                            </li>
                                            <li className="tooltip1 use_tooltip" title="ayy" data-toggle="tooltip">
                                                <ReactBootstrap.OverlayTrigger
                                                    placement="bottom"
                                                    delay={{ show: 100, hide: 300 }}
                                                    overlay={favourite}
                                                >
                                                    <a onClick={() => {this.props.logged_in_status ==="LOGGED_IN" ? this.addTo("favourite",movie.id):this.errors("not_logged_in")}} id="favourite" className="no_click add_to_account_list favourite" href="#"><span className="glyphicons_v2 heart white false"/></a>
                                                </ReactBootstrap.OverlayTrigger>
                                            </li>
                                            <li className="tooltip1 use_tooltip" title="" >
                                                <ReactBootstrap.OverlayTrigger
                                                    placement="bottom"
                                                    delay={{ show: 100, hide: 300 }}
                                                    overlay={watchlist}
                                                >
                                                    <a onClick={() => {this.props.logged_in_status ==="LOGGED_IN" ? this.addTo("watchlist",movie.id):this.errors("not_logged_in")}} id="watchlist" className="no_click add_to_account_list watchlist"
                                                       href="#"><span className="glyphicons_v2 bookmark white false"/></a>
                                                </ReactBootstrap.OverlayTrigger>
                                            </li>
                                            <li className="tooltip1 use_tooltip rating tooltip_hover" title="Login to rate this movie">
                                                <ReactBootstrap.OverlayTrigger
                                                    placement="bottom"
                                                    delay={{ show: 100, hide: 300 }}
                                                    overlay={rate}
                                                >
                                                    <a onClick={() => {alert("not yet")}} id="rate_it" className="no_click rating" href="#"><span
                                                        className="glyphicons_v2 star white false"/></a>
                                                </ReactBootstrap.OverlayTrigger>
                                            </li>
                                            {videos.length > 0 &&
                                            <li className="video none">
                                                <a onClick={() => this.handleModalShowHide()}
                                                   className="no_click play_trailer" href="#" data-site="YouTube"
                                                   data-id="s1l914WkO6Y" data-title="Play Trailer"><span
                                                    className="glyphicons_v2 play invert svg"/> Play Trailer</a>
                                            </li>
                                            }
                                            {videos.length === 0 &&
                                            <li className="video none">
                                                <a
                                                   className="no_click play_trailer" href="#" data-site="YouTube"
                                                   data-id="s1l914WkO6Y" data-title="Play Trailer"><span
                                                    className="glyphicons_v2 play invert svg"/> No Trailer Available</a>
                                            </li>
                                            }
                                        </ul>
                                    </div>


                                    <div>
                                        <h3>Overview</h3>

                                        <p>
                                            {movie.overview}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ReactBootstrap.Modal show={showHide} dialogClassName={"my-modal"}>
                            <ReactBootstrap.Modal.Header id="modal-header">
                                <div className="text-right">
                                    <button className="close-button" onClick={() => this.handleModalShowHide()}>
                                        <FontAwesomeIcon icon={faTimes} style={{color:"#fff"}} size="lg"/>
                                    </button>
                                </div>
                            </ReactBootstrap.Modal.Header>
                            <ReactBootstrap.Modal.Body id="modal-body">
                                {videos.length > 0 &&
                                <ReactPlayer playing={true} controls={true} width="1280px" height="720px" url={video_pre + videos[0].key}/>
                                }
                            </ReactBootstrap.Modal.Body>
                            {/*<ReactBootstrap.Modal.Footer>

                            </ReactBootstrap.Modal.Footer>*/}
                        </ReactBootstrap.Modal>

                    </div>
                </div>
                {/*<div className="container" style={{maxWidth: "1300px", padding: "30px 40px"}}>
                    <div>
                        <h4>Top Billed Cast</h4>
                        <div id="cards_landscape_wrap-2">
                            <div className="container" style={{maxWidth:"1300px", paddingLeft: "40px", paddingRight: "40px", paddingTop: "30px", paddingBottom: "30px"}}>
                                <div className="row flex-row flex-nowrap">
                                    {credits.map((credit, index) =>
                                        index < 6 ?
                                        <div key={credit.id} className="col-xs-3 col-sm-3 col-md-3 col-lg-2">
                                            <a href={"/person/"+credit.id}>
                                                <div className="card-flyer">
                                                    <div className="text-box">
                                                        <div className="image-box">
                                                            <img src={image_pre + credit.profile_path} alt="" />
                                                        </div>
                                                        <div className="text-container">
                                                            <h6>{credit.name}</h6>
                                                            <p className="text-muted">{credit.character}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div> : ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/}
                <div id={"asd"}>

                </div>
                <div id="media_v4" className={`${styles["media"]} ${styles["movie_v4"]} ${styles["header_large"]}`}>
                    <div className={styles["column_wrapper"]}>
                        <div className={styles["content_wrapper"]}>
                            <div>
                                <div className={styles["white_column"]}>
                                    <section className={`${styles["panel"]} ${styles["top_billed"]} ${styles["scroller"]}`}>
                                        <h3 dir={"auto"}>Top Billed Cast</h3>
                                        <div id="cast_scroller" className={`${styles["scroller_wrap"]} ${styles["should_fade"]} ${styles["is_fading"]}`}>
                                            <ol className={`${styles["people"]} ${styles["scroller"]}`}>
                                                {credits.map((credit,index) =>
                                                    <li key={credit.id} className={styles["card"]}>
                                                        <a href={"/person/"+credit.id}>
                                                            <img className={styles["profile"]} alt={credit.name} data-src={profile_pre + credit.profile_path} src={profile_pre + credit.profile_path} />
                                                        </a>
                                                        <p>
                                                            <a href={"/person/"+credit.id} >{credit.name}</a>
                                                        </p>
                                                        <p className={styles["character"]}>{credit.character}</p>
                                                    </li>
                                                )}
                                            </ol>
                                        </div>
                                    </section>
                                    <section className={`${styles["panel"]} ${styles["media_panel"]} ${styles["social_panel"]}`}>
                                        <section className={styles["review"]}>
                                            <div className={styles["menu"]}>
                                                <h3 dir={"auto"}>Social</h3>
                                                <ul>
                                                    <li>
                                                        <a href={"#"} className={styles["media_panel"]}>Reviews <span>0</span></a>
                                                    </li>
                                                    <li className={styles["active"]}>
                                                        <a href={"#"} className={styles["media_panel"]}>Discussions <span>1</span></a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className={styles["content"]}>
                                                <div className={styles["original_content"]}>
                                                    <div className={styles["discussion_container"]}>
                                                        <table className={`${styles["new"]} ${styles["space"]}`}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Subject</th>
                                                                    <th>Status</th>
                                                                    <th>Replies</th>
                                                                    <th>Last Reply</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr className={styles["open"]}>
                                                                <td className={styles["subject"]}>
                                                                    <div className={styles["post_info"]}>
                                                                        <div className={styles["flex_wrapper"]}>
                                                                            <div className={styles["avatar_wrapper"]}>
                                                                              <span className={`${styles["avatar"]} ${styles["thirty-two"]}`}>
                                                                                <a href="/u/acontributor" alt="Discussion started by acontributor">
                                                                                    <span className={`${styles["background_color"]} ${styles["silver"]}`}>a</span>
                                                                                </a>
                                                                              </span>
                                                                            </div>
                                                                            <div className={styles["link_wrapper"]}>
                                                                                <a className={styles["topic"]}
                                                                                   href="#">Not
                                                                                    what I expected</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td><p className={styles["status"]}>Open</p></td>
                                                                <td><p>1</p></td>
                                                                <td>
                                                                    <p>
                                                                        Oct 29, 2020 at 6:29 AM<br/>by <span className={styles["username"]}><a href="/movie/615665-holidate/discuss/5f9a3960e942ee0037abfd28?page=1#5f9a5356aad9c20036d68b27">mechajutaro</a></span>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </section>
                                    <section className={`${styles["panel"]} ${styles["media_panel"]} ${styles["media"]} ${styles["scroller"]}`}>
                                        <div className={styles["menu"]}>
                                            <h3>Media</h3>
                                            <ul>
                                                <li><a className={styles["media_panel"]}>Most Popular</a></li>
                                                <li><a className={styles["media_panel"]}>Videos <span>2</span></a> </li>
                                                <li><a className={styles["media_panel"]}>Backdrops <span>8</span></a></li>
                                                <li><a className={styles["media_panel"]}>Posters <span>11</span></a></li>
                                                <li className={styles["view_all"]}></li>
                                            </ul>
                                        </div>
                                        <div className={`${styles["scroller_wrap"]} ${styles["should_fade"]} ${styles["is_fading"]}`}>
                                            <div className={`${styles["h_scroller"]} ${styles["content"]} ${styles["scroller"]}`}>
                                                <div className={`${styles["video"]} ${styles["card"]} ${styles["no_border"]}`}>
                                                    {/*ezt itt hagytam abba*/}
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className={styles["grey_column"]}>
                                    <div>
                                        <section className={styles["split_column"]}>
                                            <div>
                                                <div className={`${styles["column"]} ${styles["no_bottom_pad"]}`}>
                                                    <section className={`${styles["facts"]} ${styles["left_column"]}`}>
                                                        <p>
                                                            <strong><bdi>Status</bdi></strong> {movie.status}
                                                        </p>
                                                        <p><strong><bdi>Original Language</bdi></strong> {getCountryName(movie.original_language)}</p>
                                                        <p><strong><bdi>Budget</bdi></strong> {this.formatMoney(movie.budget)}</p>
                                                        <p><strong><bdi>Revenue</bdi></strong> {this.formatMoney(movie.revenue)}</p>
                                                    </section>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default MovieDetail;