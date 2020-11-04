import React, {Component} from "react";
import moment from "moment";
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";
import Swal from "sweetalert2";
import {Helmet} from "react-helmet";

class MyLists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            movies: [],
            favIds: []
        }

        this.getStoredIds = this.getStoredIds.bind(this);
        this.handleIdListResponse = this.handleIdListResponse.bind(this);
        this.handleMovieResponse = this.handleMovieResponse.bind(this);
        this.addTo = this.addTo.bind(this);
        this.removeMovie = this.removeMovie.bind(this);
        this.getFavIds = this.getFavIds.bind(this);
        this.isFavorite = this.isFavorite.bind(this);
        this.handleFavIds = this.handleFavIds.bind(this);
        this.getCurrentIds = this.getCurrentIds.bind(this);
    }

    componentDidMount() {
        this.getStoredIds();
        if (this.props.type !== "favorites") {
            this.getFavIds();
        }
    }

    getFavIds() {
        axios.get(`http://localhost:3000/api/favorites/${this.props.user.id}`)
            .then(this.handleFavIds)
    }

    handleFavIds(response) {
        const temp = [];
        Promise.all(response.data.map((f) => {
            temp.push(f.movieId);
        }));
        this.setState({favIds:temp});
    }

    getCurrentIds() {
        const temp = [];
        this.state.movies.forEach(movie => {
           temp.push(movie.id);
        });
        return temp;
    }

    isFavorite(mid) {
        if (this.props.type === "favorites") {
            return this.getCurrentIds().includes(mid);
        }
        else {
            return this.state.favIds.includes(mid);
        }
    }

    async removeMovie(movieId, where) {
        let routePart = where === "watchlist" ? "delete_watch" : "delete_favorite";
        await axios.delete(`http://localhost:3000/api/${routePart}/${this.props.user.id}/${movieId}`)
            .then(res => {
                this.getStoredIds();
            })
    }

    getStoredIds() {
        axios.get(`http://localhost:3000/api/${this.props.type}/` + this.props.user.id)
            .then(this.handleIdListResponse)
    }

    handleIdListResponse(response) {
        Promise.all(response.data.map((w) => axios.get('https://api.themoviedb.org/3/movie/' +
                                                            w.movieId +
                                                            `?api_key=${this.props.apiData.key}` +
                                                            `&language=${this.props.apiData.language}`)))
            .then(this.handleMovieResponse)
    }

    handleMovieResponse(response) {
        const temp = [];
        response.forEach(movie => {
            temp.push(movie.data)
        })
        this.setState({
            movies:temp,
            loading:false
        })
    }

    async addTo(id){
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

        await axios.post('http://localhost:3000/api/add_favorite/',{userId:this.props.user.id,movieId:id})
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
                this.getStoredIds();
            });
    }

    capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render () {
        if (!this.state.loading) {

            const addToList = (props) => (
                <ReactBootstrap.Tooltip id="button-tooltip" {...props}>
                    Add To List
                </ReactBootstrap.Tooltip>
            );
            const rate = (props) => (
                <ReactBootstrap.Tooltip id="button-tooltip"{...props}>
                    Rate It!
                </ReactBootstrap.Tooltip>
            );
            const remove = (props) => (
                <ReactBootstrap.Tooltip id="button-tooltip"{...props}>
                    Remove
                </ReactBootstrap.Tooltip>
            );

            return (
                <>

                    <Helmet>
                        <title>{this.props.getCurrentTitle(`My ${this.capitalize(this.props.type)}`)}</title>
                    </Helmet>

                    <h2>My {this.capitalize(this.props.type)}</h2>

                    {this.state.movies.length === 0 &&
                        <p>You have not added movies to your {this.props.type}.</p>
                    }
                    {this.state.movies.length > 0 &&
                    <div className="white_column">
                        <section className="panel">
                            <div className="search_results movie">
                                <div className="results flex">
                                    {this.state.movies.map(movie =>
                                        <div key={movie.id} id={movie.id} className="card v4 tight">
                                            <div className="wrapper">
                                                <div className={"image"}>
                                                    <div className={"poster"}>
                                                        <a className="result" href={"/movie/" + movie.id}>
                                                            <img alt={movie.title}
                                                                 src={"https://image.tmdb.org/t/p/w94_and_h141_bestv2/" + movie.poster_path}
                                                                 className={"poster"}/>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className={"details"}>
                                                    <div className={"flex_space_between"}>
                                                        <div className={"wrapper"}>
                                                            <div className={"consensus tight"}>
                                                                <div className={"outer_ring"}>
                                                                    <div className="user_score_chart">
                                                                        <div className="percent">
                                                                            <span
                                                                                className={"icon icon-r" + movie.vote_average * 10}/>
                                                                        </div>
                                                                        <canvas height="34" width="34"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={"title"}>
                                                                <a className="result" href={"/movie/" + movie.id}>
                                                                    <h2>{movie.title}</h2>
                                                                </a>
                                                                <span className={"release_date"}>
                                                                                        {moment(movie.release_date).format("YYYY. MMM. D.")}
                                                                                    </span>
                                                            </div>
                                                        </div>
                                                        <div className={"overview true"}>
                                                            <p>
                                                                {movie.overview}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className={"action_bar"}>
                                                        <ul className="auto actions" style={{padding: "0"}}>
                                                            <li className="tooltip1 use_tooltip rating tooltip_hover">
                                                                <ReactBootstrap.OverlayTrigger
                                                                    placement="bottom"
                                                                    delay={{show: 100, hide: 300}}
                                                                    overlay={rate}
                                                                >
                                                                    <a onClick={() => {
                                                                        alert("not yet")
                                                                    }} id="rate_it" className="no_click rating"
                                                                       href="#"><span
                                                                        className="glyphicons_v2 star white false"/></a>
                                                                </ReactBootstrap.OverlayTrigger>
                                                            </li>
                                                            <li className="tooltip1 use_tooltip" data-toggle="tooltip">
                                                                <ReactBootstrap.OverlayTrigger
                                                                    placement="bottom"
                                                                    delay={{show: 100, hide: 300}}
                                                                    overlay={
                                                                        (props) => (
                                                                            <ReactBootstrap.Tooltip id="button-tooltip" {...props}>
                                                                                {this.isFavorite(movie.id) === true ? "Remove from favorites" : "Mark as favorite"}
                                                                            </ReactBootstrap.Tooltip>
                                                                        )
                                                                    }
                                                                >
                                                                    <a onClick={() => {
                                                                        this.isFavorite(movie.id) === true ? this.removeMovie(movie.id, "favorites") : this.addTo(movie.id)
                                                                    }} id="favourite"
                                                                       className="no_click add_to_account_list favourite"
                                                                       href="#"><span
                                                                        className={`glyphicons_v2 heart white ${this.props.type == "favorites" ? true : this.isFavorite(movie.id)}`}
                                                                    /></a>
                                                                </ReactBootstrap.OverlayTrigger>
                                                            </li>
                                                            <li className="tooltip1 use_tooltip list tooltip_hover">
                                                                <ReactBootstrap.OverlayTrigger
                                                                    placement="bottom"
                                                                    delay={{show: 100, hide: 300}}
                                                                    overlay={addToList}
                                                                >
                                                                    <a onClick={() => {
                                                                        alert("not yet")
                                                                    }} className="no_click" href="#"><span
                                                                        className="glyphicons_v2 thumbnails-list white"/></a>
                                                                </ReactBootstrap.OverlayTrigger>
                                                            </li>
                                                            <li className="tooltip1 use_tooltip list tooltip_hover">
                                                                <ReactBootstrap.OverlayTrigger
                                                                    placement="bottom"
                                                                    delay={{show: 100, hide: 300}}
                                                                    overlay={remove}
                                                                >
                                                                    <a onClick={() => {
                                                                        this.removeMovie(movie.id, this.props.type)
                                                                    }} className="no_click" href="#"><span
                                                                        className="glyphicons_v2 menu-close white"/></a>
                                                                </ReactBootstrap.OverlayTrigger>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
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

export default MyLists;