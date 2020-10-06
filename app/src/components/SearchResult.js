import React, {Component} from 'react';
import "../static/css/Search.css";
import moment from "moment";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        let search = this.props.query.replace("+"," ");
        this.state = {
            isLoading: true,
            results: [],
            query:search
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    async componentDidMount(){
        const response = await fetch('https://api.themoviedb.org/3/search/multi?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU&query='+this.props.query+'&page=1&include_adult=false&region=HU');
        const search_res = await response.json();
        this.setState({results: search_res.results, isLoading: false });
    }
    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <>
                <div className="search_bar">
                    <section className="search show_search_true">
                        <div className="sub_media">
                            <form id="search_form" action="/search" method="GET" acceptCharset="utf-8">
                                <label style={{width:"100%"}}>
                                    <span tabIndex="-1" role="presentation" className="k-widget k-autocomplete k-autocomplete-clearable k-state-default">
                                        <input onChange={this.handleSearch} dir="auto" id="search_v4" name="query" type="text" tabIndex="1"
                                               autoCorrect="off" autofill="off" autoComplete="off" spellCheck="false"
                                               placeholder="Search for a movie, tv show, person..." value={this.state.query}
                                               data-role="autocomplete" className="k-input" role="textbox"
                                               aria-haspopup="true" aria-disabled="false" aria-readonly="false"
                                               aria-owns="search_v4_listbox" aria-autocomplete="list"/>
                                    </span>
                                </label>
                            </form>
                        </div>
                    </section>
                </div>
                <main id="main" className="smaller subtle show_search_true">
                    <section className="main_content search_results">
                        <div className="column-wrapper reverse">
                            <div className="content-wrapper">
                                <div className="grey_column">
                                    <div className="settings_panel no_margin">
                                        <h3 className="background_color light_blue">Search Results</h3>
                                        <div id="search_menu_scroller">
                                            <ul className="settings panel with_counts scroller">

                                                <li className="selected">
                                                    <a id="movie" href="/search/movie?query=star wars"
                                                       className="search_tab active" title="Movies"
                                                       alt="Movies">Movies</a>
                                                    <span>136</span>
                                                </li>

                                                <li className="">
                                                    <a id="tv" href="/search/tv?query=star wars" className="search_tab "
                                                       title="TV Shows" alt="TV Shows">TV Shows</a>
                                                    <span>23</span>
                                                </li>

                                                <li className="">
                                                    <a id="person" href="/search/person?query=star wars"
                                                       className="search_tab " title="People" alt="People">People</a>
                                                    <span>1</span>
                                                </li>

                                                <li className="">
                                                    <a id="collection" href="/search/collection?query=star wars"
                                                       className="search_tab " title="Collections"
                                                       alt="Collections">Collections</a>
                                                    <span>6</span>
                                                </li>

                                                <li className="">
                                                    <a id="company" href="/search/company?query=star wars"
                                                       className="search_tab " title="Companies"
                                                       alt="Companies">Companies</a>
                                                    <span>2</span>
                                                </li>

                                                <li className="">
                                                    <a id="keyword" href="/search/keyword?query=star wars"
                                                       className="search_tab " title="Keywords"
                                                       alt="Keywords">Keywords</a>
                                                    <span>1</span>
                                                </li>

                                                <li className="">
                                                    <a id="network" href="/search/network?query=star wars"
                                                       className="search_tab " title="Networks"
                                                       alt="Networks">Networks</a>
                                                    <span>0</span>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="white_column">
                                    <section className="panel">
                                        <div className="search_results movie">
                                            <div className="results flex">
                                                {this.state.results.map(movie =>
                                                    <div key={movie.id} id={movie.id} className="card v4 tight">
                                                        <div className="wrapper">
                                                            <div className="image">
                                                                <div className="poster">
                                                                    <a className="result" href={"/movie/"+movie.id}>
                                                                        <img src={"https://image.tmdb.org/t/p/w94_and_h141_bestv2/"+movie.poster_path} className="poster"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="details">
                                                                <div className="wrapper">
                                                                    <div className="title">
                                                                        <a className="result" href={"/movie/"+movie.id}>
                                                                            <h2>{movie.title}</h2>
                                                                        </a>
                                                                        <span className="release_date">{moment(movie.release_date).format("YYYY. MMM. D.")}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="overview">
                                                                    <p>
                                                                        {movie.overview}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </>
        );
    }
}

export default SearchResult;